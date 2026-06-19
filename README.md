# Cleaning With Purpose — Public Site

The client-facing sales site for Cleaning With Purpose's senior-friendly repositioning
(strategy: https://cleaningwithpurpose.netlify.app · current site being replaced: cleaningwithpurpose.org).

## What's here

- `index.html` — single-page public site: hero, offer, how-it-works, pricing, trust, FAQ, intake form
- `thanks.html` — post-submission confirmation page
- `css/styles.css` — design system carried over from the strategy microsite (Fraunces / Inter / IBM Plex Mono, forest–cream–brass–sage palette)
- `js/main.js` — mobile nav + FAQ accordion (site works fully without JS)
- `assets/` — logo files (`logo-mark.svg`, `logo-lockup.svg`, reverse variants, `favicon.svg`) and alternates under `assets/branding/`
- `docs/strategy-brief.md` — the strategy distilled; single source of truth for copy decisions
- `netlify.toml` — static deploy config (no build step)

## Deploying

Drag this folder into Netlify (or connect a repo). The intake form uses **Netlify Forms** —
after the first deploy, check Site → Forms for `home-reset-request` submissions, and set up
an email notification to info@cleaningwithpurpose.org.

## Before launch (client to-dos)

1. ~~Founder photo + name~~ — DONE. The founder-letter section (`#founder`) now shows Danielle's real
   portrait (`assets/img/danielle.jpg`, cropped 4:5) and is signed "Danielle, Founder."
2. **Replace the sample testimonials** — the `#testimonials` cards (Renee A. / Marcus T. / Linda O.)
   are written in the right voice for layout only. Swap in real, permission-given quotes before launch.
   Do NOT add Review/AggregateRating schema for your own reviews (Google flags self-serving rating
   markup). Collect real reviews on the Google Business Profile — those show stars natively in Maps/Search.
3. **Insurance/bonding** — once coverage is bound, add "Bonded · Insured" to the trust chips and footer.
   Deliberately absent until then.
4. **Confirm the canonical domain** — `index.html` (canonical + og:url), `sitemap.xml`, `robots.txt`,
   the JSON-LD `@id`s, and `netlify.toml` all point to `https://cleaningwithpurpose.org/`. If you deploy
   somewhere else first (e.g. a Netlify preview URL), either keep it `noindex` or update those five spots.
5. **Set up Google Business Profile** — category "House Cleaning Service", the same NAP byte-for-byte
   (Cleaning With Purpose · 313-451-2221 · Metro Detroit), service-area cities, photos. This is the single
   biggest off-site lever for both local SEO and AI answer-engine recommendations; the on-page schema
   accelerates it but doesn't replace it. Submit `sitemap.xml` in Google Search Console after launch.
6. Optionally confirm/replace the schema `addressLocality` ("Detroit") and `geo` coords with the city
   she's actually based in, and verify the served-cities list matches reality.
7. Delete `design-board.html`, `logo-board.html`, `design-board/`, and `docs/` from the production deploy
   if you want a minimal publish.

## SEO / AEO (built in)

- **JSON-LD `@graph`** in `<head>`: `LocalBusiness`+`CleaningService` (service-area business, no street
  address, `areaServed` cities + 40km `GeoCircle`, hours, geo, priceRange), a `Service` node with the
  4-package `OfferCatalog`, and a `FAQPage` mirroring the 7 visible Q&As. NAP matches the footer exactly.
- Self-referencing **canonical**, explicit **robots** meta, completed **Open Graph + Twitter** cards,
  `robots.txt`, `sitemap.xml`, optional `llms.txt`.
- **Answer-first** lead paragraph under Pricing (price + city in the first ~60 words for AI extraction);
  FAQ summaries are already natural-language questions. Hours reconciled (Mon–Fri 8–4) across copy + schema.
- CWV: hero `preload`+`fetchpriority`, explicit `width`/`height` on imgs to prevent layout shift.
- Note on FAQ rich results: Google retired the FAQ SERP dropdown (May 2026). FAQPage schema is kept for
  AI-answer-engine comprehension, not the old accordion — that's expected, not a bug.

## Current version (v4 — de-AI copy pass + SEO/AEO + testimonials)

Em-dashes cut ~24→1 (the #1 AI writing tell; kept only the 911 line). Softened a couple staged contrasts.
Added the second Purpose Note (Mr. Walter, so the example shows a mom *and* a dad), a testimonials band,
named Metro Detroit cities, and the full SEO/AEO layer above. Research-backed via a multi-agent audit;
the design itself was judged largely *not* AI-templated (the navy palette, real copy, and custom hero
were called out as strengths to keep).

## Current version (v3 — blue palette + reference merge)

## Current version (v3 — blue palette + reference merge)

JB-approved merge: "harbor" navy palette (#1F3D5C — blue for trust, cream/brass for warmth),
free-walkthrough funnel, bridge section, founder letter with polaroid frame, We always/We never
boundary card with the 911 line, photos-by-permission in the Purpose Note, mobile sticky
call/walkthrough bar. Logo assets recolored to navy (green originals in assets/branding/held-home/).

## Previous version (v2 — approved direction)

Photo-led rebuild: full-bleed hero, **the Purpose Note** (the after-visit email) as the
centerpiece shown in real email chrome, four-step how-it-works, photo dignity band, trimmed
8-field intake form. Copy cut roughly 60% from v1 (v1 archived at `docs/v1-index-archive.html`).
Imagery is art-directed AI (`assets/img/`) for launch; swap in the client's real photos over time.
Direction/logo boards that led here: `design-board.html`, `logo-board.html` (delete before production deploy).

## Deliberate decisions

- **No "insured and bonded" language anywhere.** The strategy flags this: insurance/bonding
  quotes are still in progress, so the trust section leans only on verified items
  (background check, written agreement, photo consent, access policy, visit summary, non-medical scope).
  Once coverage is bound, add it to the trust section and hero chips.
- **No testimonials/reviews yet** — the offer is new. The proof slot is the sample visit summary.
  Swap in real reviews as the 30-day plan produces them.
- **Pricing shows "starting at" anchors** exactly as set in the strategy, with the
  quote-before-booking promise repeated at every step.
- The sample summary uses fictional names (Denise / Miss Helen).

## Contact facts used

313-451-2221 · info@cleaningwithpurpose.org · Mon–Fri 8am–4pm · Metro Detroit · est. 2024
