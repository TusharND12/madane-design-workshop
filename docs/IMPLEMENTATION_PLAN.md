# Madane Design Workshop — Implementation Plan
**Single source of truth: `Madane_Website_PRD.pdf` v1.0.** This plan operationalises it. Nothing here overrides the PRD; where the PRD is silent, decisions are made as a Creative Director consistent with the design language.

---

## 0. Reading of the PRD (binding constraints)

- **Identity:** Monochrome editorial. ~90% of every page is **Ink + Paper**; two neutrals (cool stone, warm sand) only separate sections / warm a card. No gradients, no extra colour, no glassmorphism, no blue.
- **Signature motif:** Monospaced **bracket labels** `[ Selected Work ]` in nav, section heads, captions. Section spine numbers `01 / 02 / 03`.
- **The interface must disappear.** If a visitor remembers a button or animation instead of a building, we failed.
- **Motion is Apple-grade & restrained:** reveal = opacity 0→1 + 16px rise, 600–800ms, `cubic-bezier(.16,1,.3,1)`, once only. Parallax 6–10% travel, off below tablet. Hover/page transitions ≤300ms. No bounce/spin/elastic/overshoot. `prefers-reduced-motion` → instant cross-fade everywhere.
- **Performance gates:** LCP ≤1.8s mobile / ≤1.2s desktop, CLS ≤0.05, Lighthouse Perf/SEO/A11y ≥95 each. Reserved image dimensions, AVIF/WebP, no render-blocking scripts.
- **A11y:** WCAG 2.1 AA, keyboard nav, visible focus, enforced alt text, reduced motion.

## 1. Design Tokens (binding — build as CSS vars + Tailwind theme)

**Colour**
| Token | Hex | Use |
|---|---|---|
| Ink | `#262626` | text, dark sections, footer |
| Paper | `#F7F7F2` | primary working background |
| Cool Stone | `#DEDBE6` | section tint, hovers |
| Warm Sand | `#EAE3D9` | accent blocks, cards |
| Pure White | `#FFFFFF` | image mounts only |
| Hairline | `#E4E4E2` | 1px borders (1.5px Ink for emphasis) |

**Type** — Headings: **Gantari** (geometric, low-contrast). Body/UI: **Poppins**. Mono: **IBM Plex Mono** (labels/indices only). Self-host via `next/font/google`, `font-display: swap`.
- Scale (px): 12 · 14 · 16 · 18 · 24 · 32 · 40 · 56 · 72 · 96. Body 16/1.65. Max line length 66–72ch. Headings tracked −1% to −2%.
- Roles: Display 64/1.0/−2% · H1 40/1.05 · H2 28/1.1 · Lead 18/1.5/300 · Body 16/1.6/400 · Mono label 12/+18%/uppercase.

**Grid / spacing / radius**
- Grid: 12 col · 1280px max content · 24px gutter (desktop) · 4 col / 16px (mobile).
- Spacing: 4·8·12·16·24·32·48·64·96·128 (8px rhythm).
- Section padding: 120–160px desktop, 64–80px mobile.
- Radius: 0px structural; 12–16px on soft teaser cards only.

## 2. Tech Stack

- **Next.js 14 App Router** + **TypeScript** (SSG/ISR, clean SEO).
- **Tailwind CSS** with tokens as the single theme source.
- **Motion:** Lenis (smooth scroll) + Framer Motion (reveals, page/menu transitions) + GSAP ScrollTrigger (surgical — pinned/horizontal storytelling only). Honours PRD intent (light, reduced-motion aware) while reaching Awwwards-grade choreography.
- **Content:** Typed local content layer (`/content` + Zod schemas) that mirrors a headless CMS model 1:1, so the site runs instantly and is swappable to **Sanity** with no component changes.
- **Media:** `next/image`, AVIF/WebP, reserved dimensions, blur placeholders.
- **Forms:** Next Route Handler → email/WhatsApp/CRM webhook; honeypot + rate-limit.
- **Hosting target:** Vercel edge, preview deploys.

## 3. Folder Architecture

```
src/
  app/
    (site)/
      layout.tsx              # Lenis + header/footer + page-transition shell
      page.tsx                # Home
      studio/page.tsx
      projects/page.tsx
      projects/[slug]/page.tsx
      services/page.tsx
      services/[slug]/page.tsx
      process/page.tsx
      contact/page.tsx
    api/enquiry/route.ts
    sitemap.ts  robots.ts  manifest.ts
    not-found.tsx  layout.tsx (root, fonts+metadata)  globals.css
  components/
    primitives/   # Bracket, SectionHeader, Button, Reveal, MonoIndex, HairlineRule
    layout/       # Header, Footer, MobileMenu, PageTransition, SmoothScroll, Cursor, Grain, Loader, ScrollProgress
    home/         # Hero, ProofStat, SelectedWork, StudioIntro, ServicesTeaser, ProcessStrip, EnquiryBand
    projects/     # FilterBar, ProjectGrid, ProjectTile, LoadMore
    project/      # Cover, Narrative, Gallery, Facts, NextProject
    studio/ services/ process/ contact/
  content/        # projects/*.ts, services.ts, process.ts, studio.ts, site.ts
  lib/            # cms.ts, schema.ts (zod), seo.ts, analytics.ts, motion.ts, useReducedMotion.ts
  styles/tokens.css
```

## 4. Component Architecture (key reusables)

- `SectionHeader` = `MonoIndex` + `Bracket` label + Gantari H2 + `HairlineRule` (the repeating editorial unit).
- `Reveal` = single source for the 16px-rise/opacity reveal; reads reduced-motion → cross-fade.
- `Button` variants: primary (Ink fill) / secondary (hairline outline) / tertiary (underlined link). One primary CTA per view enforced by convention.
- `ProjectTile` = image + mono index + name + location/year; hover zoom 1.03 + caption fade-in; fixed aspect ratios only.
- `MagneticButton`, `Cursor`, `Grain`, `Loader`, `ScrollProgress` = premium layer, all reduced-motion aware.

## 5. Animation Architecture

- **SmoothScroll**: Lenis, rAF-driven, paused under `prefers-reduced-motion`; disabled parallax ≤ tablet.
- **Reveal system**: Framer `whileInView` (once) with shared variants in `lib/motion.ts`.
- **Page transitions**: overlay fade (Ink/Paper wipe) ≤300ms; scroll restoration; image continuity where feasible.
- **Hero**: word-by-word headline reveal + subtle letter-spacing settle, slow background scale, mouse-parallax (very small), CTA fade.
- **GSAP ScrollTrigger** only for: Process pinned timeline w/ animated line, optional horizontal gallery moment.
- All motion centralised so a single reduced-motion switch neutralises it.

## 6. Responsive Strategy (PRD breakpoints)

- Mobile ≤640: single column, full-screen overlay menu, **parallax off**, tap targets ≥44px, section padding 64–80px.
- Tablet 641–1024: two-up tiles, condensed nav, reduced padding.
- Desktop 1025–1440: full 12-col, staggered archive, full motion.
- Large >1440: content capped 1280–1440, margins grow, content does not stretch.
- Layouts are **re-composed** per breakpoint, never naively stacked.

## 7. CMS Structure (Sanity-ready schema, local now)

- **project**: slug, name, type[Architecture|Interior|Exterior|Turnkey], location, year, area, status, cover, gallery[{src,ratio,alt}], narrative(brief/site/response ≤150w), facts, related[], seo, order.
- **service**: slug, title, summary, includes[], audience, heroImage, relatedQuery.
- **process**: steps[{index,title,body}].
- **studio**: philosophy, image, team[{name,role,portrait}], milestones[].
- **site**: nav, contact (phone/whatsapp/email/address/hours/socials), seo defaults.
- Alt-text required at the schema level (a11y gate). Swap local loader → Sanity client with no component edits.

## 8. SEO Strategy

- Per-page `generateMetadata` (title/description/canonical/OG/Twitter).
- JSON-LD: `Organization` + `LocalBusiness` (site-wide) and project items on detail pages.
- Dynamic `sitemap.ts` + `robots.ts`; semantic HTML; clean slugs; local city/area keywords in copy + metadata.

## 9. Performance Strategy

- SSG/ISR; `next/image` with explicit sizes + blur placeholders (kills CLS).
- Hero LCP image priority + preconnect; everything else lazy.
- Transform-only animation; rAF; no layout thrash; GSAP/Lenis dynamically loaded client-side.
- Font subsetting via `next/font`; no render-blocking third-party.
- CI Lighthouse budget ≥95.

## 10. Accessibility Strategy

- Semantic landmarks, single H1/page, logical heading order.
- Full keyboard nav incl. menu/filters/form; visible focus rings (Ink on Paper holds AA).
- `prefers-reduced-motion` → instant cross-fade, parallax/cursor/grain disabled.
- Enforced alt text; ARIA on menu/dialog/form; contrast verified within monochrome.

## 11. Milestones

- **M0 Scaffold** — Next.js+TS+Tailwind, tokens, fonts, Lenis shell, primitives, header/footer, loader/cursor/grain/progress.
- **M1 Home** — all 7 sections (H1–H7) with motion.
- **M2 Projects archive** — filter bar (URL-synced, animated), staggered grid, load-more, deep-link/empty states.
- **M3 Project detail** — cover→narrative→gallery→facts→next, pinned/parallax gallery.
- **M4 Studio / Services / Process** — editorial long-form, per-service sections, pinned process timeline.
- **M5 Contact** — form + validation + success, WhatsApp/call/email, map, route handler.
- **M6 System & polish** — 404/privacy/terms, SEO/schema/sitemap, page transitions, a11y + Lighthouse pass, responsive QA.

## 12. Page Plans (section-by-section per PRD §8)

- **Home:** H1 Hero (full-bleed signature project, "We design homes, inside and out", 1-line sub, single CTA, one viewport) · H2 Proof stat (projects/years/cities, large mono numerals) · H3 Selected Work (4–6 editorial tiles + View all) · H4 Studio intro (2-sentence philosophy + image) · H5 Services teaser (4 soft cards) · H6 Process strip (3–5 mono-numbered, horizontal desktop) · H7 Enquiry band (full-width Ink).
- **Projects:** filter bar (type+location, instant/animated/URL-synced) · staggered two-up tiles · load-more · shareable/empty/deep-link states.
- **Project detail:** P1 Cover (full-bleed + mono meta row) · P2 Narrative (≤150w) · P3 Gallery (mixed ratio) · P4 Facts · P5 Next/related · P6 Enquire (pre-tagged).
- **Studio:** philosophy long-form · team grid · image · milestones · soft CTAs.
- **Services:** one section per service · deep-link to filtered Projects.
- **Process:** Discovery→Concept→Design Development→Execution→Handover, pinned animated timeline.
- **Contact:** single-column form (name, contact, type, location, budget?, message), inline validation, success state, WhatsApp/call/email, map, hours, socials.
- **System:** 404 (→Projects), privacy, terms.

## Open items requiring a decision
1. **Assets** — none present; the work *is* the product. Need a sourcing decision (curated royalty-free interim vs. placeholders vs. wait).
2. **CMS** — local typed layer now (Sanity-ready) vs. wire Sanity immediately.
3. **Motion stack** — Lenis+Framer+GSAP (recommended) vs. strict PRD Framer/CSS-only reading.
