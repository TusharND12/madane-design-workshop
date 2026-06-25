# Madane Design Workshop — Website

An editorial, architecture-grade marketing site for Madane Design Workshop — architecture, interiors and turnkey delivery for homes and workspaces. Built to the standard set in `Madane_Website_PRD.pdf` (v1.0), the single source of truth for scope, design language and acceptance.

Built by **Athreix Innovations LLP**.

---

## Stack

- **Next.js 14** (App Router, SSG/ISR) · **TypeScript**
- **Tailwind CSS** — design tokens are the single theme source (`tailwind.config.ts` + `src/styles/tokens.css`)
- **Motion** — Lenis (smooth scroll) · Framer Motion (reveals, transitions, menu) — all `prefers-reduced-motion` aware
- **Content** — typed local layer in `src/content` validated by Zod (`src/lib/schema.ts`), read through `src/lib/cms.ts`. This seam is **Sanity-ready**: reimplement only `cms.ts` to swap to a headless CMS without touching components.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the build
```

## Project structure

```
src/
  app/                 # routes (App Router); (site) group carries header/footer/chrome
    (site)/            # home, studio, projects[/slug], services, process, contact, privacy, terms
    api/enquiry/       # enquiry route handler (validation + honeypot + rate-limit)
    sitemap.ts robots.ts not-found.tsx
  components/          # primitives · layout · home · projects · project · studio · services · process · contact · common
  content/             # site, projects, services, process, studio (CMS-shaped data)
  lib/                 # cms, schema, seo, motion, enquiry, cn
  hooks/               # usePrefersReducedMotion
  styles/tokens.css
public/assets/         # all photography, video, logos, team portraits, client logos
```

## Design system (from PRD §6)

- **Colour:** Ink `#262626` · Paper `#F7F7F2` · Cool Stone `#DEDBE6` · Warm Sand `#EAE3D9`. ~90% Ink+Paper; no gradients or extra colour.
- **Type:** Gantari (display) · Poppins (body/UI) · IBM Plex Mono (bracket labels & indices), self-hosted via `next/font`.
- **Motion:** reveal = opacity 0→1 + 16px rise, ~720ms, `cubic-bezier(.16,1,.3,1)`, once only. Parallax 6–10%, off below tablet. Reduced motion → instant cross-fade.

## Before launch — replace these placeholders

All live in `src/content/site.ts` unless noted; the Madane team can edit them directly (or via the CMS once wired).

1. **Contact details** — phone, WhatsApp number, email, address, hours, social URLs.
2. **Team roles** (`src/content/studio.ts`) — confirm names/roles; four members currently use an initial-monogram avatar because no clean portrait was available (aasawari, priyankag, priyankam, madhuri).
3. **Enquiry routing** — set `ENQUIRY_WEBHOOK_URL` (see `.env.example`) to forward leads to email/WhatsApp/CRM; otherwise they are logged server-side.
4. **Canonical origin** — set `NEXT_PUBLIC_SITE_URL`.
5. **Project copy/metadata** — `src/content/projects.ts` holds editorial narratives derived from the supplied imagery; confirm client names, areas, years and statuses.

## Content notes

- Projects, services, process steps, team and clients all live in `src/content` and validate against `src/lib/schema.ts`.
- Gallery imagery uses a `span` rhythm (`full` / `wide` / `half` / `tall`) to compose a mixed-ratio editorial sequence from the source photography.
- SEO: per-page metadata + OpenGraph/Twitter, JSON-LD (Organization, LocalBusiness, per-project CreativeWork, breadcrumbs), dynamic `sitemap.xml` and `robots.txt`.

## Accessibility

WCAG 2.1 AA target — semantic landmarks, single H1 per page, keyboard-navigable menu/filters/form, visible focus, enforced alt text, and a full `prefers-reduced-motion` path that disables smooth scroll, parallax, cursor and grain.
