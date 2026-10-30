# Healiam site: project notes

Read this first (people and Claude alike). Rules come from `docs/website-build-playbook.md`
and `docs/homepage-sop.md`; this file records the decisions made on top of them.

## What this is

Next.js 15 (App Router) + TypeScript + Tailwind 3 site for healiam.com (preventive blood testing).

| Route | What |
|---|---|
| `/` | Homepage, built to the homepage SOP |
| `/texas/blood-test` | Landing page, keyword "Blood Test in Texas" |

## Run it

Needs Node.js 20 or newer.

```bash
npm install
npm run dev:clean
```

Open http://localhost:3000. If the dev server ever sticks at "Starting...", stop it and run
`npm run dev:clean` again (it clears the `.next` cache first).

Production check: `npm run build`. Static export for Cloudflare Pages:
`STATIC_EXPORT=1 npm run build` (output in `out/`, redirects in `public/_redirects`).

## Where things live

| File | Holds |
|---|---|
| `src/lib/site.ts` | Price ($95), phone, email, booking and app links, socials. Change once, updates everywhere. |
| `src/lib/pages/home.ts` | All homepage copy |
| `src/lib/pages/texas-blood-test.ts` | All Texas page copy |
| `src/lib/panel.ts` | The 50+ marker panel (shared) |
| `src/lib/fairs.ts` | Upcoming health fairs (shared). Dates go stale: re-copy from healiam.com/fairs before each release. |
| `src/lib/schema.ts` | JSON-LD (Organization, Service with the $95 offer, FAQ, fair Events) |
| `src/components/home/` | Homepage sections |
| `src/components/sections/` | Texas sections and shared pieces (FAQ, final CTA, phone mockup, trust strip) |

## Decisions

- **Price:** $95 for the full panel. One price, no add-ons. Confirmed final by the owner on
  30 Oct 2026: the price was changed to $95, so the $94.99 still shown on healiam.com is the
  stale figure, not this one.
- **Font:** Outfit only, site-wide (SOP "one consistent font family"). This overrides the playbook's Sora + Inter.
- **Colours:** pink `#E83656` for primary CTA buttons only; Healiam black `#0A0A0F` for dark accents
  (phone frame, price block, final CTA band, step dots); green `#168A4C` for the one H1 accent word and ticks.
  The state tag on each fair card uses `green.tint` with `green.deep` (`#0F6B3A`) text: the default
  green only reaches 3.9:1 on the tint, which fails AA at that size. Pink stays off anything that
  is not a primary CTA.
- **Icons:** Lucide React only.
- **No at-home draws (owner, 29 Oct 2026).** Healiam tests at health fairs only. Every at-home
  or doorstep claim was removed from both pages, along with `site.price.atHomeFee`. The two
  "No fair nearby?" cards now invite the visitor to ask for a fair in their area instead.

- **Copy:** no em or en dashes; use commas, "to", or a plain hyphen ("4-5 days").
- **Honesty:** every fact comes from healiam.com. No invented stats, reviews, ratings or prices.
  The client story is Healiam's own published story.
- **Hero visual:** code-drawn phone mockups (no screenshots; the user rejected real app screenshots).
  The homepage shows three (results, marker graph, booking); the Texas page keeps the single phone.
- **Hero phone on mobile (Oct 2026):** the single device is about 63% of the viewport and rises out
  of the bottom of the dark band, which crops it. A whole device centred in the band with dark space
  all round it read as floating. The crop is a hard section edge against the trust strip's hairline
  border, not the opacity fade the owner rejected earlier. Device size and crop box share one clamp
  curve, so the cut lands on the same row from 375px to 639px.
- **Homepage hero (Oct 2026, from the owner's approved design):** dark Healiam-black band, an eyebrow
  pill above the H1, and two pink accent words in the H1. This **overrides three playbook rules**:
  "hero background plain white, never dark", "no pill or tag badge above the H1" and "only one
  important word in green". Green is still the accent on every light section.
- **Comprehensive panel section (owner, 29 Oct 2026):** rebuilt to match healiam.com's own
  "One panel. Everything you need." band: dark, six named groups (CBC, Thyroid, Kidney, Vitamin D,
  Iron, HbA1c) with Healiam's line-art icons, and one "View all tests" link. This replaces the
  value-grouped "What you learn" cards. The icons are Healiam's own PNGs, copied from
  healiam.com/images/icon-*.png into `public/panel/`; they are black line art, so `.icon-white`
  whitens them for the dark band. This is the one place the site uses non-Lucide icons.
  Marker-level detail still lives on `/tests`, not here.
- **"HbA1c", not "Hba1c".** healiam.com's panel section writes it "Hba1c"; the rest of that site
  and all of this one use the correct capitalisation, so this site is consistent.
- **Motion and hover:** hover changes colour only. No lift, scale, arrow nudge, glow or growing
  shadow anywhere, and no scroll-reveal on the homepage (`Reveal` is used by the Texas page only).
- **Hero copy (Oct 2026):** one paragraph under the H1, not two. The approved design had a lead line
  and a spec line; the owner asked for a single description, so the value line and the $95 / 50+
  markers / 4 to 5 days facts are now one paragraph.
- **Hero buttons:** both sit on one row at every width, phones included. Phones use the short labels
  ("Book now", "Get the app") from `hero.primary.short` / `hero.secondary.short`, because the full
  labels cannot share a 375px row.

- **App section (Oct 2026):** `#app`, a dark band between "How it works" and the client story,
  so the black store badges sit on white cards. Store links and the 4.9 / 183 rating come from the
  live listings (App Store `id1601281502`, Play `com.servinq.blood_testing`), checked 29 Oct 2026.
  QR codes in `public/qr/` are generated from those two URLs and decode back to them; regenerate
  them if a link changes. The hero's "Download the Healiam app" button scrolls here rather than
  firing the smart link, so desktop visitors reach the QR codes.
- **Store badges:** Apple's and Google's official artwork, copied from `Assets/` into
  `public/badges/`, both as SVG (the App Store one was cropped to the badge; the owner supplied
  the Google Play SVG on 29 Oct 2026, replacing a PNG that looked soft when scaled down).
  Both must keep their official wording and proportions. The small square store icons
  (`*-icon.png`, from the owner) sit inside the hero's app button in place of a download glyph,
  and are marked decorative since the button text already says what it does.

- **Cost comparison (Oct 2026):** a three column table (question, hospital route, Healiam) below
  the "Why Healiam" reasons, not a pair of stacked cards. Both routes answer the same question on
  the same line, so "Included" sits directly opposite each charge. The hospital figures
  ($50 to $500, $50 to $600+, $100 to $800+) and "your money goes toward getting cured, not toward
  getting diagnosed" are healiam.com's own published comparison, not our estimate.

- **Video (Oct 2026):** Healiam's own film from youtube.com/@healiam_co (`XxLR2IzRDdA`), beside the
  "Why Healiam" heading. `VideoEmbed` is a facade: the poster is a frame saved to
  `public/video/healiam-intro.jpg`, and nothing is requested from Google, no player script and no
  cookies, until the visitor presses play. It then loads youtube-nocookie.com. Any future video
  goes through the same component rather than a bare iframe.

- **Header (owner, 29 Oct 2026):** one row at every width, logo and "Book now" only. The section
  links show from md up; the scrollable row of them that sat under the logo on phones is gone.
  `scroll-padding-top` is back to 5rem for the 64px header.
- **Store badges on phones:** shown bare, side by side, with no card behind them. The badges are
  already buttons; a white card around each one just added empty space.

- **Five pages added (29 Oct 2026):** `/tests`, `/fairs`, `/about`, `/demo` and `/contact`, rebuilt
  from healiam.com's own pages. They use this site's system (dark hero, trust strip, alternating
  white and mist bands, shared FinalCta and StickyCta) rather than healiam.com's all-dark styling,
  so they sit with the homepage. Each has its own data file in `lib/pages/`, a canonical, a
  breadcrumb (visible plus BreadcrumbList) and a JSON-LD graph in `lib/schema.ts`, and is listed
  in `app/sitemap.ts`. `site.links` for these now point at local paths, not healiam.com.
- **Panel data:** `lib/panel.ts` is the single source for the marker list, now with a slug, an icon
  image and short names per category. `labMeasurementCount` is computed, not typed in, so the
  "56 measurements" figure on /tests can never contradict the list under it. Biometrics are
  excluded from that count because you log them yourself.
- **/tests on mobile:** the desktop "Browse a category" sidebar becomes a horizontally scrolling
  row of jump links under the heading. Everything stays in the DOM and visible, so nothing is
  hidden from crawlers the way an accordion would hide it.
- **/demo** is the only client component on these pages. Its icons are named imports, not
  `LucideByName`: the dynamic lookup pulled the whole icon set into the browser bundle and took
  first load from 105 kB to 271 kB.
- **No Street View photos on /fairs.** healiam.com renders fair photos through the Google Street
  View Static API with its key in the page source. Copying the key was not an option, and Google's
  terms do not allow saving the imagery as site assets, so the fair cards are built without photos.

- **Fair detail pages (30 Oct 2026):** `/fairs/[slug]`, statically generated from `lib/fairs.ts`
  (six pages). Per-fair intro, parking and venue copy live on the fair itself, so a new fair
  needs one entry and nothing else. An unknown slug 404s.
- **CTA hierarchy:** healiam.com's fair pages stack three full-width pills of equal weight
  (Book / Download App / Get Directions), which the owner called out as too big and hard. Ours
  give the hero one primary and one secondary, side by side at about 44% of the viewport, and
  move "Open in Google Maps" to a quiet link under the address, where directions are actually
  wanted. Three equal stacked CTAs are not a pattern to repeat.

- **Footer (30 Oct 2026):** carries both store badges under the socials (replacing the plain
  "Download the app" text link) and a "Fairs by city" row linking all six detail pages, so every
  new page is one click from anywhere. FAQ points at `/#faq` on this site rather than
  healiam.com/faq. The fair row is generated from `lib/fairs.ts`, so it never goes stale.

- **/employer (30 Oct 2026):** rebuilt, not copied. healiam.com/employer is four long HR
  paragraphs with no CTA and nothing about how a workplace fair actually runs. Ours keeps their
  four benefit themes (cut to a couple of sentences each) and adds what was missing: how a fair
  runs on site, a privacy line saying results go to the individual and never to the employer,
  and a price card. No minimum headcount, tier or billing term is stated, because none is known:
  the card says billing is agreed directly.
- **`LucideByName` now throws in development on an unknown name.** lucide-react exports some
  icons as components that are absent from its `icons` record (`Smile`, `Building2`), and the
  helper used to return null, leaving a silently empty tile. Two had already shipped that way.

- **Homepage FAQ (owner, 30 Oct 2026):** healiam.com's own six questions, in its own words,
  under its own "Questions / Frequently asked" heading. Replaces the twelve we had written.
  Two edits only: the price reads from `site.price` so it says $95 rather than $94.99, and the
  "At-home visits are an extra $40" sentence is gone, since we do not offer at-home draws.
  The Texas page keeps its own longer FAQ, as healiam.com has no Texas page to copy from.

- **sitemap.xml, robots.txt and llms.txt are all generated, never hand-written.** The sitemap
  reads `livePages` plus `lib/fairs.ts`; `/llms.txt` (route handler at `app/llms.txt/route.ts`,
  llmstxt.org format) reads the same page data, the fair list and the marker list, so the price,
  the 56 measurements and the fair dates can never drift from the pages. Adding a page means
  adding it to `livePages` and the `pages` array in the llms.txt route. robots.txt allows
  everything and points at the sitemap; it blocks no AI crawler, which is a decision to revisit
  only if the owner asks.

- **Repeated CTAs:** at most one button pair per section, and never two sections in a row with the
  same pair. The "What you learn" section ends in a plain text link, not a second "Book for $95".

- **postcss is pinned forward with an `overrides` entry in package.json.** Next 15.5.28 vendors its
  own copy of postcss, pinned to 8.4.31, which carries four published advisories. npm's only
  offered fix was `next@16`, a major upgrade we are not doing before client review, so the override
  forces every postcss in the tree to ^8.5.28 instead. The advisories all concern parsing untrusted
  CSS; ours is authored in this repo and only runs at build time, so they were never exploitable
  here. The override exists so `npm install` reports zero vulnerabilities rather than handing a
  reviewer a critical-severity warning. Verified after the change: typecheck clean, all 22 pages
  build, 693 CSS rules compile, no console errors, /demo still hydrates. Remove the override once
  Next ships a postcss bump of its own.

## Open items

- **Source the "80% of medical decisions" hero stat.** It came from the owner's approved design, not
  from healiam.com. It is a widely quoted lab-industry figure but it is not cited anywhere on our
  site, so it needs a source (or a softer wording) before launch.
- Confirm the homepage hero headline is final, since it no longer leads with the $95 price. Price
  now appears in the hero paragraph, the comparison card and the sticky bar.
- **Re-check the App Store rating before each release.** The homepage prints "4.9 from 183
  ratings" from `site.app.rating`; it was true on 29 Oct 2026 and it moves.
- Compare against an approved design and run the senior/team design review (SOP final review).
- **/contact has no form endpoint.** Set `NEXT_PUBLIC_CONTACT_FORM_ENDPOINT` to a form handler and
  the page swaps its email panel for a real form; until then it does not show a form that cannot
  deliver.
- **Fair photos:** if the owner wants them, add their own Maps key and render Street View live
  (never cached), or supply real venue photos.
- **healiam.com/demo still sells at-home visits** ("At-home visits available (+$40)") and says the
  panel has "6+ markers". Both are wrong; our /demo says fairs only and the real count.
- **Decide whether AI crawlers should be allowed.** robots.txt currently allows every bot,
  GPTBot and friends included. Blocking them is a business call, not a default.
- **/texas/blood-test ships 55 kB of JS against 2 kB for every other page** (158 kB vs 105 kB first
  load). Same cause as the /demo regression fixed earlier: an icon component inside a client
  boundary pulls in the whole of lucide-react. The fix is named imports plus a local icon map, as
  done in the demo. Raised with the owner on 30 Oct 2026, who chose to leave it for now.
- No Google Business Profile section yet (no profile found on healiam.com).
- **healiam.com still advertises at-home visits** ("At-home visits are an extra $40" in its FAQ,
  and an at-home option on the booking flow). This site no longer does. The live site and the
  booking flow need the same correction.
- **Pushed, not deployed.** The owner authorised publishing to GitHub on 30 Oct 2026, so the code
  lives at `madheshg1813/healiam-site` (private) for client review. Deployment is still not
  authorised: do not deploy until the owner says so.
