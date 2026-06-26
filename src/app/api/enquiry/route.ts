import { NextResponse } from "next/server";
import { EnquirySchema } from "@/lib/enquiry";

/**
 * Enquiry handler (PRD §10 FORMS): validates, drops honeypot hits, rate-limits,
 * then routes the enquiry. By default it logs server-side and (if configured)
 * forwards to a webhook, set ENQUIRY_WEBHOOK_URL to wire email/WhatsApp/CRM.
 * Replace this seam with your provider at launch; the contract stays the same.
 */

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; reset: number }>();

function limited(ip: string) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now > rec.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  rec.count += 1;
  return rec.count > MAX_PER_WINDOW;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  if (limited(ip)) {
    return NextResponse.json({ ok: false, error: "Too many enquiries, please try again shortly." }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  const parsed = EnquirySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Please check the highlighted fields.", issues: parsed.error.flatten().fieldErrors },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // Honeypot tripped → pretend success, drop silently.
  if (data.company) return NextResponse.json({ ok: true });

  const record = { ...data, receivedAt: new Date().toISOString(), ip };

  const webhook = process.env.ENQUIRY_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      });
    } catch (err) {
      console.error("Enquiry webhook failed", err);
    }
  } else {
    // No provider configured yet, make the lead visible in server logs.
    console.info("[enquiry] new lead:", record);
  }

  return NextResponse.json({ ok: true });
}
