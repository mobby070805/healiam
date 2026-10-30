# Website Build Playbook (for AI assistants)

Give this file to an AI before asking it to build or change a website. It is the complete set of rules, patterns and preferences learned while building **rulethetop.com**. Follow it by default. If a new prompt contradicts a rule here, follow the prompt for that one change and say which rule you overrode.

---

## 0. How to work with me

- **Maintain every earlier rule automatically.** I give prompts one at a time. Anything I corrected before must stay corrected on new pages without me repeating it.
- **Some layouts are fixed.** Where this file says *fixed layout*, keep it even if a later prompt describes that section differently. Tell me you kept it.
- **Ask only when it changes the outcome.** For example, when a prompt contradicts a rule, or when facts would need inventing (prices, guarantees, legal text). Otherwise pick the sensible default and tell me.
- **Honest content only.** Never invent statistics, client names, reviews, ratings, prices, guarantees or timelines. Use real data files. If data is missing, say so.
- **Verify before saying "done".** Run the type check, load every changed page, screenshot desktop (1440px) and phone (390px), and look at the result.
- **My screenshots may be stale.** If a screenshot doesn't match the current code, say so and suggest a hard refresh (Cmd+Shift+R) instead of redoing work.
- **Don't push or deploy until I say "push and deploy".** Then build, commit, push and deploy, and check the live site.
- **Replies:** short and plain. Name what changed and where, in plain terms I can check on the page.

---

## 1. Tech stack (start every new site with this)

| Layer | Choice | Notes |
|---|---|---|
| Framework | **Next.js 15 (App Router)** | Server components by default; `"use client"` only for interactive pieces |
| Language | **TypeScript** (strict) | Run `npx tsc --noEmit` after every change |
| Styling | **Tailwind CSS 3** | Design tokens in `tailwind.config.ts`; shared classes in `globals.css` `@layer components` |
| Icons | **lucide-react** | Outline icons, `strokeWidth` 1.5–1.8. Render by name via a `LucideByName` helper when names come from data |
| Animation | **framer-motion** | Subtle only: reveal on scroll, toggle pills, tab changes. Respect `prefers-reduced-motion` |
| Fonts | `next/font/google`: **Sora** (display 600/700/800), **Inter** (body) | Self-hosted at build, `display: swap` |
| Images | `next/image` for photos; inline SVG/markup for illustrations | Illustrations cost no image weight and stay crisp |
| Brand logos | Real full-colour SVG/PNG files in `/public/logos`, `/public/tools`, `/public/ai` | Never tinted single-colour marks |
| Hosting | **Railway** (`railway up`), Nixpacks, `npm run build` / `npm run start` | Domain DNS at DreamHost: `www` CNAME → Railway; apex A record → Railway IP; app also redirects apex → www |
| Analytics | **GA4** via `next/script` `strategy="afterInteractive"` in root layout | Never block first paint |
| Repo | GitHub; conventional commit messages with a clear body | |

### Project structure

```
src/
  app/                      routes (page.tsx per route, [slug] dynamic routes with generateStaticParams + dynamicParams=false)
    sitemap.ts  robots.ts  layout.tsx  globals.css
  components/
    sections/               home/page sections
    wd/                     shared website-development sections (Roadmap, Features, Technology, FinalCta, Comparison, StickyCta, Ecosystem, AiTraffic)
    industry/               IndustryCard, SiteMock, LucideByName
    pricing/                PackagesPricing, FromPrice
    ChannelIcon.tsx  PageSpeedLogo.tsx  CustomerAvatars.tsx  JsonLd.tsx
  lib/
    site.ts                 ONE source of truth: name, phone, email, WhatsApp number, nav, socials
    schema.ts               JSON-LD builders
    packages.ts             pricing data
    currency.ts             INR/USD display logic
    industries/<slug>.ts    one content file per industry page (+ types.ts, index.ts)
docs/                       playbooks and change logs
```

**Rule:** all words live in `lib/` data files; components only lay them out. A new page of an existing type = a new data file, not a new component.

---

## 2. Design system

### Colours (brand only, no new palette)

| Token | Hex | Use |
|---|---|---|
| `ink` | #1C1917 | Text, dark bands, numbered step circles, primary icon colour |
| `ink-soft / muted / faint` | #44403C / #78716C / #A8A29E | Body, secondary text, hints |
| `cream-soft` | #F5F1EA | Alternate section background |
| `white` | #FFFFFF | Page and card background |
| `brand` (orange) | #EA5A2A (hover #D64C1F) | **Primary CTA buttons only**, section eyebrow labels |
| `green` | #168A4C (tint #E8F3EA) | **H1 accent words**, ticks, "Save %", positive tags |

- **No category or rainbow colours**, including per-industry colour themes. They were tried and rejected.
- **No orange glows**, orange radial washes or tinted hero backgrounds.

### Typography
- H1: Sora extrabold, tight tracking, 2.1rem mobile → ~3.5–4.75rem desktop.
- H2 (`.h2`): Sora extrabold 1.6rem → 2.25rem.
- Eyebrow above H2: small caps, wide tracking, orange (`.eyebrow-text`).
- Body: Inter, 14–15px mobile, 16–19px desktop, relaxed line height.

### Shared classes
- `.shell`: `max-w-content (1280px) mx-auto px-5 sm:px-8`
- `.section`: `py-9 sm:py-16 lg:py-20`
- `.btn-primary`: orange pill; `.btn-ghost`: white outlined pill; `.btn-on-ink`: outlined on dark
- `.card`: white, `border-ink/10`, `rounded-2xl sm:rounded-3xl`

---

## 3. Hero (every page), fixed rules

- **Background:** plain white (`bg-white`), optional faint neutral grid (`.grid-backdrop` with radial mask). No orange tint, no glow, never dark.
- **No pill or tag badge above the H1.** The headline starts the hero, after an optional breadcrumb.
- **H1:** short (ideally ≤ 7 words), often two lines. **Only one important word (or short phrase) in green.** For example: "Customers are searching. Will they **find** you?"
- Prefer a **customer pain point** that fits every visitor type on that page, e.g. both new and existing website owners.
- **CTA:** one orange `btn-primary`; optional second `btn-ghost`. On phones, the two buttons sit **side by side in one row**, never stacked full-width.
- **Trust ticks under CTAs:** plain green ✓ (no circle behind), three only: `SEO Ready · Mobile First · PageSpeed 90+`. **Never "You Own Everything".**
- **Home hero:** centred, **no image**. Below the CTA, a "We work to rank you on" row of **logo-only** circles (Google, ChatGPT, Gemini, Claude, Perplexity, Copilot), all on one line on every screen, with compact spacing.

---

## 4. Cards and lists

- **Card with ticks → no description paragraph.** Choose one: a one-line description or a tick list.
- **Whole card clickable** when it has a destination (not just the button).
- **Icons:** plain ink outline icons (Lucide). **No coloured icon tiles or orange icon backgrounds.**
- **Feature/capability grids:** heading centred on top, **two columns of four** on desktop, icon + title (+ one line on desktop).
- **Numbered steps:** black circles with white numbers, never orange.
- **Tags** like "Best for …": green pill.
- **Consistent heights:** cards in a row line up; use fixed-height preview areas and `h-full`.
- **Long titles on phones:** give the title the full card width (hide side icon tiles, pin arrows to a corner) so titles wrap to at most two balanced lines.

### Industry / category cards (fixed design)
Monochrome with the single green accent. They differ by **structure, not colour**:
- **Top:** a mini website preview whose layout matches the industry: gallery, booking calendar, menu, membership dashboard, service tracker, listings, consultation/trust, product grid or spec comparison.
- **Body:** industry icon (outlined tile, hidden on phones) + **name** + ↗ arrow; three feature rows with micro-icons (desktop only).
- **No** green label line and **no** description line.
- 4 per row desktop, 2 per row phones. Keep the total a multiple of 4.

### Rejected card designs (don't repeat)
Big mockups crammed with text, tags and "See the … website" text; oversized simple icon cards; black icon tiles; rotating orange/green/coral tiles; per-industry rainbow gradients; alternating white/peach backgrounds.

---

## 5. Hover and motion

- Hover = **subtle lift + soft shadow**, arrow nudge, small zoom on previews.
- **Hover never recolours icons, chips, badges or numbers orange.**
- On **phones**, horizontal swipe rows (`AutoScrollRow`) and comparison tab strips **auto-advance every 2.5 s** while on screen, pause for 6 s after a tap, and never move for reduced-motion users.
- No decorative floating blobs or scrolling tagline bands (removed).

---

## 6. Logos and channels

- Every channel or tool shows its **real, full-colour logo**: Google, Google Maps, WhatsApp, Instagram/Facebook/LinkedIn, ChatGPT, Gemini, Claude, Perplexity, Copilot, GA4, Search Console, Tag Manager, PageSpeed Insights, Lighthouse, Next.js, Sanity, Cloudinary, PostHog, Clarity, WordPress, Shopify, React, Node.js.
- Use named AI assistants, **never a generic "AI" label**.
- Shared components: `ChannelIcon` (channels), `PageSpeedLogo`, `TechLogo` (tech stack; white tile on dark backgrounds so black logos stay visible).
- **Never put a logo inline inside a sentence, tick item, plan feature or table row.** Logos go in badges, chips, icon tiles and card corners only.
- People photos (customer avatars) come from one shared component (`CustomerAvatars`) and are swappable files.

---

## 7. Sections (fixed layouts)

- **Challenges:** cards show **only the number + dark title**. No problem or fix lines. 2/row phones, 3/row desktop.
- **Comparison ("Typical agency vs ours"):** factor tabs on the left, two panels with animated bars, a PageSpeed badge top-right of "ours", and **one centred orange button** whose label changes per factor (e.g. "Get more clicks from Google" → SEO page; others → WhatsApp with a matching pre-filled message). Note: "Bars are illustrative, not measured scores."
- **Process / How we work:** compact single-view stepper: numbered black dots on one line, short title + 2–3 word subline. No long descriptions.
- **FAQ:** heading centred on top, **two columns**, 8+ questions (12 on detailed pages). Honest answers.
- **Logo strip ("Trusted by"):** a slim band, not a tall section.
- **No stat-counter sections** (projects/industries/years/satisfaction) and no stat pills.
- **Final CTA:** plain black rounded band, no orange glow, copy that doesn't repeat itself; orange primary + outlined secondary.
- **Sticky CTA bar** on long service pages; it hides while the final CTA is on screen.
- **Never repeat** the same content or illustration in two sections of one page.
- **Related items:** show 8 (two rows of four), randomised but **fixed per page** (seeded by slug).

---

## 8. Mobile rules

- Pages must not scroll too far: **2 cards per row** (3 for tiny step cards), compact padding (`p-3.5`) and text (12–14px).
- Hide long body copy on phones where the title says enough.
- Tall showcase cards (pricing plans, client stories, category cards) become **horizontal swipe rows** (86% card width, next card peeking, "Swipe →" hint).
- Buttons: normal pill size on phones, not full-width, and button pairs side by side.
- Always screenshot at 390px wide before calling it done.

---

## 9. Pricing page pattern

- **Toggle** between plan families (e.g. New website / Existing website), plus a **currency switch** (₹ INR / $ USD).
- **One shared headline and description** for all toggle states. Only the plans change.
- Plan card: name, tagline (no "days" pills), "Starts at", **selling price + crossed-out "before" price (~14–18% higher) + "Save X%" + "You save …"**, "+ GST" (INR) or "excl. taxes" (USD), a **normal-sized** CTA, features with green ticks (guarantee lines bold), 6 features + "Show all" on phones.
- **Currency:** INR for India; **USD = INR +40% at ₹85/$1, rounded to …9** elsewhere. Detect by browser timezone (`Asia/Kolkata`); the server always renders INR for Google; the manual choice is remembered.
- Extra sections: "Structured to be found and cited on" (Google & AI logos), "What we set up for you" tool grid with real logos and "All plans / Pro & Growth" tags, a comparison table, a checklist band, a 4-step "How it works", FAQs and the final CTA.
- Home page shows the same packages compactly with a link to `/pricing`.
- Keep guarantees consistent everywhere (FAQs, terms, schema). If pricing says "guaranteed", no FAQ may say "we don't guarantee".

---

## 10. Page templates

### Service hub (e.g. /website-development)
Hero (centred, growth-ecosystem diagram: Traffic → Website → Leads → Customers → Revenue, with real channel logos and customer photos) → slim logo strip → category cards (the two most important as large cards on top) → comparison → AI search traffic section (live-looking chat demo cycling ChatGPT/Claude/Gemini/Perplexity) → roadmap → 2×4 capabilities → tech stack (dark) → FAQ (2 columns) → final CTA.

### Category page (e.g. /website-development/ecommerce)
Same design as the hub. Content specific to that category: audiences as industry cards linking to child pages, category-specific comparison factors, benefits, roadmap steps, 8 features, typical sitemap, real client stories, 8 FAQs, a tailored final CTA line. Non-live child pages show "Coming soon" placeholders.

### Industry page (e.g. /website-development/small-business/clinic)
One shared template; **only content changes** (a data file per industry). Content is ~70% industry-specific, 20% website expertise and 10% internal links:
- **Hero:** industry-specific mock website.
- **Main sections:** 6 challenges (fixed layout), 11–12 features, a visual sitemap, a 5–6 step journey with channel logos, 8 modules.
- **SEO section:** local SEO (small business) or ecommerce SEO (stores), with 6 real-style searches.
- **Comparison:** 6 factors with CTAs.
- **Closing:** a real client story if one exists, 8 related industries, 12 FAQs and a tailored final CTA.

To add an industry: create `lib/industries/<slug>.ts`, validate icon names against `lucide-react` `icons`, register it in `index.ts`, and add a preview `KIND` entry in `IndustryCard.tsx`. Sitemap and links update automatically.

---

## 11. Copy and wording rules

- Short, plain, specific. Speak to the customer's pain first, then the fix.
- Use the audience's context (e.g. India: WhatsApp, UPI, Google Maps, GST, local areas).
- No filler ("world-class", "cutting-edge"), no repeated phrases across heading, sub-line and button.
- Headlines: one green accent word; ≤ 7 words where possible.
- Tag labels in sentence case; names match their destination page titles exactly.
- Keep regulated industries modest (law/CA: no outcome promises; health/ayurveda: no cure claims).
- `a` vs `an` must be correct in generated text (helper function).
- Keep acronyms uppercase when lower-casing names mid-sentence (e.g. "RO companies").

---

## 12. SEO, schema and analytics

- **Metadata per page:** title (≤ 60 chars, keyword first), description (140–160 chars), canonical, Open Graph.
- **Sitemap** lists only live pages; keep it generated from the same data arrays as the routes.
- **Redirects** (`next.config.mjs`, permanent): old URLs → nearest new page; junk/WordPress leftovers → home. Handle trailing slashes. Renamed pages keep a redirect from the old path (e.g. `/testimonials` → `/customers`).
- **Structured data (JSON-LD, one graph site-wide + per page):**
  - Site-wide: `Organization`/`ProfessionalService` (logo, phone, email, `ContactPoint`, address, price range, `sameAs` = real social profiles only) and `WebSite`.
  - Per page: `WebPage` / `AboutPage` / `ContactPage` / `CollectionPage`, `BreadcrumbList`, `FAQPage`, `Service` (price range only on priced services), `ItemList` for card lists, and an `OfferCatalog` with `Offer`s in INR and USD on the pricing page. `Article` for case studies.
  - Don't mark up self-published reviews/ratings (Google ignores or penalises them), and don't use HowTo (deprecated).
- **GA4:** `next/script`, `afterInteractive`, in the root layout once. Offer event tracking for WhatsApp, call and form clicks.
- **Performance:** PageSpeed 90+ is a promise. No heavy libraries, inline SVG illustrations, self-hosted fonts, lazy images.

---

## 13. Site-wide constants

- One source of truth (`lib/site.ts`) for name, phone, email, WhatsApp number, nav and socials. Changing the number there updates every page, `tel:` link, WhatsApp link and schema.
- **Footer:** brand, services and company columns; only real social profiles (LinkedIn, Instagram, Facebook); no "Free tools" column.
- **Nav:** Services, Pricing, Customers, FAQ, plus an orange CTA.

---

## 14. Definition of done (checklist)

- [ ] Hero white, no pill, short H1 with one green word, orange CTA, three trust ticks
- [ ] Brand colours only; no orange hover; plain outline icons
- [ ] Ticks XOR description on cards; whole card clickable
- [ ] Fixed layouts respected (challenges, comparison, FAQ 2-column, compact process)
- [ ] Real full-colour logos; none inline in text
- [ ] Mobile: 2/row grids, side-by-side buttons, swipe rows auto-advance, no long scroll
- [ ] Content specific, honest, no invented numbers; guarantees consistent
- [ ] Metadata, sitemap, redirects, JSON-LD added and valid
- [ ] `npx tsc --noEmit` clean; production build passes
- [ ] Screenshots checked at 1440px and 390px
- [ ] Not pushed until I say "push and deploy"; after deploy, live URLs verified
