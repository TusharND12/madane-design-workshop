"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { EnquirySchema, PROJECT_TYPE_OPTIONS, BUDGET_OPTIONS, type EnquiryInput } from "@/lib/enquiry";
import { ButtonAction } from "@/components/primitives/Button";
import { EASE } from "@/lib/motion";

type Errors = Partial<Record<keyof EnquiryInput, string>>;

const EMPTY: EnquiryInput = { name: "", contact: "", type: "Not sure yet", location: "", budget: "", message: "", project: "", company: "" };

export function ContactForm() {
  const params = useSearchParams();
  const projectTag = params.get("project") ?? "";

  const [data, setData] = useState<EnquiryInput>({ ...EMPTY, project: projectTag });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  function update<K extends keyof EnquiryInput>(key: K, value: EnquiryInput[K]) {
    setData((d) => ({ ...d, [key]: value }));
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = EnquirySchema.safeParse(data);
    if (!parsed.success) {
      const f = parsed.error.flatten().fieldErrors;
      const next: Errors = {};
      (Object.keys(f) as (keyof EnquiryInput)[]).forEach((k) => (next[k] = f[k]?.[0]));
      setErrors(next);
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="flex min-h-[420px] flex-col justify-center"
      >
        <motion.svg width="44" height="44" viewBox="0 0 44 44" fill="none" aria-hidden="true">
          <motion.circle cx="22" cy="22" r="21" stroke="currentColor" strokeWidth="1" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, ease: EASE }} />
          <motion.path d="M13 22.5l6 6 12-13" stroke="currentColor" strokeWidth="1.4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.6, ease: EASE }} />
        </motion.svg>
        <h2 className="mt-8 font-display text-3xl tracking-tight">Thank you, it&rsquo;s with us.</h2>
        <p className="mt-4 max-w-prose text-base text-ink-muted">
          We read every enquiry ourselves and reply within one working day. For anything urgent, WhatsApp is the fastest way to reach the studio.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-8">
      {projectTag && (
        <p className="font-mono text-2xs uppercase tracking-label text-ink-muted">Re: {projectTag.replace(/-/g, " ")}</p>
      )}

      <Field id="name" label="Your name" value={data.name} onChange={(v) => update("name", v)} error={errors.name} autoComplete="name" />
      <Field id="contact" label="Phone or email" value={data.contact} onChange={(v) => update("contact", v)} error={errors.contact} autoComplete="email" />

      <div className="grid gap-8 sm:grid-cols-2">
        <SelectField id="type" label="Project type" value={data.type} onChange={(v) => update("type", v as EnquiryInput["type"])} options={[...PROJECT_TYPE_OPTIONS]} />
        <SelectField id="budget" label="Budget (optional)" value={data.budget ?? ""} onChange={(v) => update("budget", v as EnquiryInput["budget"])} options={["", ...BUDGET_OPTIONS]} placeholder="Prefer not to say" />
      </div>

      <Field id="location" label="Location / city (optional)" value={data.location ?? ""} onChange={(v) => update("location", v)} error={errors.location} autoComplete="address-level2" />
      <Field id="message" label="About the project" value={data.message} onChange={(v) => update("message", v)} error={errors.message} textarea />

      {/* Honeypot */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" tabIndex={-1} autoComplete="off" value={data.company} onChange={(e) => update("company", e.target.value)} />
      </div>

      <div className="flex flex-wrap items-center gap-6 pt-2">
        <ButtonAction type="submit" variant="tertiary" disabled={status === "sending"} arrow>
          {status === "sending" ? "Sending…" : "Send enquiry"}
        </ButtonAction>
        <AnimatePresence>
          {status === "error" && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-mono text-2xs uppercase tracking-label text-ink">
              Something went wrong, please WhatsApp us instead.
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}

/* Floating-label underlined field --------------------------------------- */
function Field({
  id, label, value, onChange, error, textarea, autoComplete,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void; error?: string; textarea?: boolean; autoComplete?: string;
}) {
  const [focused, setFocused] = useState(false);
  const floated = focused || value.length > 0;
  const common = {
    id, value, autoComplete,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    "aria-invalid": !!error,
    "aria-describedby": error ? `${id}-err` : undefined,
    className: "peer w-full rounded-none border-0 border-b border-ink/20 bg-transparent pb-3 pt-7 text-lead text-ink outline-none transition-colors duration-300 focus:border-ink",
  };
  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={cn(
          "pointer-events-none absolute left-0 font-mono uppercase tracking-label text-ink-muted transition-all duration-300 ease-editorial",
          floated ? "top-0 text-[0.6rem]" : "top-7 text-xs"
        )}
      >
        {label}
      </label>
      {textarea ? (
        <textarea rows={4} {...common} />
      ) : (
        <input type="text" {...common} />
      )}
      <span className={cn("absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-ink transition-transform duration-300 ease-editorial peer-focus:scale-x-100", floated && "scale-x-100")} aria-hidden="true" />
      {error && (
        <span id={`${id}-err`} className="mt-2 block font-mono text-[0.6rem] uppercase tracking-label text-ink">{error}</span>
      )}
    </div>
  );
}

// Native <option> popups can't take Tailwind classes reliably; style them to the
// dark theme tokens so the dropdown list is legible (otherwise light text renders
// on the OS default white popup and disappears).
const OPTION_STYLE: React.CSSProperties = { backgroundColor: "#181818", color: "#ECECE6" };

function SelectField({
  id, label, value, onChange, options, placeholder,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void; options: string[]; placeholder?: string;
}) {
  return (
    <div className="relative">
      <label htmlFor={id} className="block font-mono text-[0.6rem] uppercase tracking-label text-ink-muted">{label}</label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ colorScheme: "dark" }}
          className="w-full appearance-none rounded-none border-0 border-b border-ink/20 bg-transparent py-3 pr-8 text-lead text-ink outline-none transition-colors duration-300 focus:border-ink"
        >
          {options.map((o) => (
            <option key={o || "none"} value={o} style={OPTION_STYLE}>{o === "" ? placeholder ?? "" : o}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-1 top-1/2 -translate-y-1/2 text-ink-muted" aria-hidden="true">↓</span>
      </div>
    </div>
  );
}
