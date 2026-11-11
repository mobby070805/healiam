# Healiam site: project notes

Read this first (people and Claude alike). Rules come from `docs/website-build-playbook.md`
and `docs/homepage-sop.md`; this file records the decisions made on top of them.

## What this is

Next.js 15 (App Router) + TypeScript + Tailwind 3 site for healiam.com (preventive blood testing).

| Route | What |
|---|---|
| `/` | Homepage, built to the homepage SOP |
| `/texas/blood-testing` | Landing page, keyword "Blood Test in Texas". Moved from `/texas/blood-test` on 1 Nov 2026 (301) |
| `/colorado/blood-testing` | Colorado state hub, keyword "blood testing in Colorado". See `docs/LOCATION-PAGES-AUDIT.md` |
| `/new-jersey/blood-testing` | New Jersey state page, keyword "blood testing in New Jersey" (Rahway). See `docs/LOCATION-PAGES-AUDIT.md` |
| `/georgia/blood-testing` | Georgia state page, keyword "blood testing in Georgia" (Lawrenceville). See `docs/LOCATION-PAGES-AUDIT.md` |
| `/texas/blood-testing-in-plano` | Plano city fair page, keyword "blood testing in Plano TX". `/fairs/` page for the same fair stays as it is. See `docs/LOCATION-PAGES-AUDIT.md` |
| `/colorado/blood-testing-in-denver` | Denver city fair page, keyword "blood testing in Denver CO". `/fairs/` page for the same fair stays as it is. See `docs/LOCATION-PAGES-AUDIT.md` |
| `/new-jersey/blood-testing-in-rahway` | Rahway city fair page, keyword "blood testing in Rahway NJ". `/fairs/` page for the same fair stays as it is. See `docs/LOCATION-PAGES-AUDIT.md` |
| `/georgia/blood-testing-in-lawrenceville` | Lawrenceville city fair page, keyword "blood testing in Lawrenceville GA". `/fairs/` page for the same fair stays as it is. See `docs/LOCATION-PAGES-AUDIT.md` |

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
- **Pushed, not deployed.** The owner authorised publishing to GitHub on 30 Oct 2026 for client
  review. Deployment is still not authorised: do not deploy until the owner says so.

## Location pages (from 31 Oct 2026)

- **Plan and tracker live in `docs/LOCATION-PAGES-AUDIT.md`.** Sources: the "Healiam SEO URLs" and
  "Healiam_Fair_City_Pages" Google Sheets. One page per day, each approved before it starts.
- **No city-name-swap pages.** A location page exists only if it answers a question the others cannot.
  Nearby-town pages are not being built; towns go into a "closest for" line on the fair city instead.
- **Texas URL (owner, 1 Nov 2026):** moved to `/texas/blood-testing` to match `/colorado/blood-testing`; `/texas`, `/texas/blood-test` and `/texas/blood-test/` redirect there permanently (`next.config.mjs` and `public/_redirects`). The two sheets
  disagree on the city-page URL scheme; decide before the first city page.
- **The fair-city sheet's $94.99 prices are stale.** Use `site.price` ($95) everywhere.
- **Location facts come from `lib/fairs.ts` only,** so a hub page and the `/fairs/<slug>` pages cannot disagree.
- **State pages use the Texas page's sections (owner, 31 Oct 2026).** The components in
  `components/sections/` take their content as props and default to Texas. A new state page fills
  `StateLandingPage` (in `lib/pages/texas-blood-test.ts`) with its own copy; same design, different words.

- **Mobile check, all 15 pages (31 Oct 2026).** At 375px and 430px: no horizontal overflow anywhere, no
  console errors. Fixed: footer links, `.btn-link` text links and the homepage "See how it works" link were
  18 to 21px tall on phones; they now get a 36px tap height below `sm` (desktop unchanged). Left as is:
  the logo (29px tall but 101px wide), the `/tests` jump chips (28px, above the 24px minimum), and the
  small text inside the illustrated phone mockups.
- **Copy fixes from that check (31 Oct 2026).** Category count: `labCategoryCount` (10) in `lib/panel.ts`
  is now the one source; fair pages, /tests ("10 lab categories"), Texas, Colorado and llms.txt all read it,
  and say biometrics are logged in the app. Previously fair pages and /tests said 11 next to the 56 lab
  measurements, which mixed two counts. Texas price card now says "Every marker in the panel" (it sits above
  the list on phones). Centennial venue note no longer says "near the Streets of SouthGlenn"; it now says
  the fair is at the Centennial Public Works building on South Eagle Street. The live healiam.com page
  still carries the SouthGlenn line.

- **Header Locations menu (owner, 1 Nov 2026).** A "Locations" menu, like a services menu, sits beside
  Book now on every page and at every width (`components/LocationsMenu.tsx`, data in `lib/locations.ts`).
  Grouped by state: the state page where one exists (Texas, Colorado), then each fair city with its date,
  then "All upcoming fairs". Built from `lib/fairs.ts`, so new fairs appear automatically; add a new state
  page to `statePages` in `lib/locations.ts`. Phones: full-width panel under the one-row header. Closes on
  Escape (focus returns to the button), outside click and link click. Adds about 1 kB of JS per page.
  This replaces the 29 Oct "logo and Book now only" header on phones with logo, Locations and Book now.
- **Header breakpoints changed with it:** page section links now show from lg (1024px), not md, because at
  768px they wrapped onto two lines once Locations joined; the phone number shows from xl (1280px). The
  Texas page's "Locations" section link is renamed "Texas fairs" so it does not clash with the menu.
- **Locations menu, polished (1 Nov 2026).** Three levels: state as a small muted label with a hairline;
  the state SEO page as a bold link with a green arrow; each fair city as a row with a compact date on the
  right. A green dot marks a fair whose date is today or later, judged in the visitor's browser after load
  (never the build date); a past fair shows "Ended" instead of a date. City names drop the ", TX" suffix
  because the state label already says it. Summary line "N health fairs across N states". State labels are
  styled text, not headings, so the header never adds headings above a page's H1.
  Layout: one column on phones (full width under the header), two columns from sm, a 600px card anchored
  to the button from md (capped at 100vw - 4rem). Open and close: 150ms fade and 4px lift via CSS, no
  library; closed panel is `inert` and invisible. Keyboard: Arrow Down on the button opens and focuses the
  first link; Up, Down, Home, End move through links (wrapping); Escape closes and refocuses the button;
  tabbing out closes. Header is now z-50 so the panel sits above the phone sticky bar (z-40).

## Client feedback round (6 Nov 2026)

- **Phone shows +1.** `site.phone` is now "+1 720-761-7869"; schema derives "+1-720-761-7869" from it.
- **"Local time", never a zone name.** Fair times say "8:00 to 10:00 AM local time" on every page; no
  Central, Mountain or Eastern. The one exception is /contact's support hours ("business hours, Mountain
  Time"), which are Healiam's own office hours, not a fair time, so local time would be wrong there.
- **Links inside FAQ answers.** Copy strings can carry `[label](href)` links, built with `link()` from
  `lib/rich-text.ts` and rendered by `components/RichText.tsx`. JSON-LD gets the plain text via
  `plainText()`. Used for: fairs page, contact ("tell us if you need one closer", "send us your town"),
  booking, the app (#app) and the fair section (#locations).
- **Price framing: one panel, one price.** Not "$95 for 50+ tests". `site.price.panelName`
  ("Comprehensive Health Screening Panel") and `site.price.panelLine` (the client's sentence) are the one
  source. The price card names the panel, its chip says "All tests included", and every price card line,
  cost FAQ, page title, meta description, sticky bar and final CTA that tied the price to a marker count
  was reworded. The marker count stays where it describes the panel's size with no price beside it
  (/tests, panel section headings, hero mockups, the comparison "Coverage" tab).
- **No referral / walk-ins said once per page, in the hero.** Removed from FAQ answers, process steps,
  location intros and final CTAs. Kept on purpose: Google meta descriptions (not on the page), the
  comparison table's Referral tab and the homepage "No referral needed" reason card (each is the topic of
  its section). Walk-ins: hero ticks on Texas and Plano; the homepage fairs intro and the fair pages'
  "When" card are the single mention on those pages.
- **FAQ box is booking-first.** "Still have a question? Talk to a person before you book." is gone. Every
  FAQ ends with "Ready when you are", a Book now button, and call/email as quiet text links. The client
  does not want people to call before booking.

## Header: Fairs and Locations menus (6 Nov 2026)

- **Two menus side by side, Fairs then Locations** (owner, 6 Nov 2026), both from `components/HeaderMenu.tsx`
  with data from `fairsMenu()` and `locationsMenu()` in `lib/locations.ts`.
  - **Fairs:** every fair by state, with its date and an upcoming dot or "Ended", linking to `/fairs/<slug>`,
    plus "All upcoming fairs". This is what the old Locations menu showed.
  - **Locations:** each state page (bold, green arrow), then that state's city pages from `lib/city-pages.ts`.
    No fair pages and no dates. A fair without a city page (Arlington, Centennial) is not listed here.
  - **Locations shows states only (owner, 7 Nov 2026).** The panel lists just the state names (each links to
    its state page). Hovering or focusing a state shows its cities beside it, by city name only (no "Blood
    testing in"). The hover waits 90ms so a diagonal mouse move doesn't switch states. Keyboard: Right arrow
    moves from a state into its cities, Left arrow back. Phones have no hover, so each state has a chevron
    that opens its cities underneath. Built as `StatesPanel` (`layout: "states"` in `locationsMenu()`).
  - **States first, cities only on hover (owner, 7 Nov 2026).** The panel opens showing the states alone; a
    state's cities appear beside it only once that state is hovered or focused, and reset when the menu
    closes.
  - **Centered under the button (owner, 11 Nov 2026).** Both menus (Fairs and Locations) now open centered
    under their own button on md up. The Locations states card sits under "Locations"; a hovered state's
    cities open as a second card beside it, so the states card never moves or resizes.
  - **Cities open on the right (owner, 11 Nov 2026).** Chevrons point right; Right arrow moves into the
    cities, Left arrow back. "Locations" sits near the header's right edge, so when the cities card
    (320px + 8px) wouldn't fit, the menu moves left by up to half the states card (still under the
    button). Narrower than that (about 1180px and below), the cities open on the left instead, with
    chevrons and arrow keys flipped. Decided once on load and on resize (`citySide`), never mid-hover. A transparent 8px bridge between the cards
    keeps hover from dropping. Where centering would run past the window (the 600px Fairs panel at about
    1180px and below), the panel is nudged back inside with a 16px gutter, measured on load and resize.
  - **Both header menus open on hover (owner, 7 Nov 2026).** With a mouse, Fairs and Locations open when the
    pointer is over them and close 180ms after it leaves (the delay covers the gap above the panel). Touch
    and keyboard still open them with a tap or Enter; a mouse click while hovering keeps the menu open.
- The homepage's "Health fairs" section link is gone from the middle of the bar; the Fairs menu replaces it.
- Phones: menu labels, button and logo are a little smaller below 640px so logo, Fairs, Locations and
  Book now fit one row down to 360px. Desktop sizes are unchanged.

## Nearby city pages: Garland, Dallas, Irving, Arlington, Fort Worth (6 Nov 2026)

- **What they are** (owner, 6 Nov 2026): city pages for DFW cities with no Healiam fair of their own, at
  `/texas/blood-testing-in-<city>`. Same design as the fair-city pages; the locations section shows both
  DFW fairs, **soonest first** (owner: "whichever happens first goes first"), each card with the distance
  from the city ("About 8 miles from Garland") and the fair's real locality (Grand Prairie, not the
  "Arlington" label).
- **Distances** are straight-line miles between city centers from OpenStreetMap coordinates, checked
  6 Nov 2026, rounded, stored once in `lib/city-pages.ts` (`miles`). Pages say "straight-line miles
  between city centers". Not driving distances.
- **One list of city pages:** `lib/city-pages.ts` `cityPageList` holds fair cities (`fair`) and nearby
  cities (`miles`). The state page's city section, the header Locations menu and the fair cards all read
  it. State page city cards now show "Healiam fair city, <date>" or "Closest fair: <town>, about N miles"
  instead of the venue name.
- **Shared facts only** in `lib/pages/nearby-city.ts` (`dfwFairs`, `dfwDates`, `nearby()`); every sentence
  is written per city. Schema: `nearbyCityGraph()` (Service for the city, both fairs as Events with city-only
  locations, breadcrumb, FAQ).
- **No walk-in claims** on these pages: walk-ins are confirmed for Plano only, and each page covers both fairs.
- Weekday wording is neutral ("weekend morning"), since fair days vary.

## New York state page (6 Nov 2026)

- `/new-york/blood-testing`, keyword "blood testing in New York" (owner, 6 Nov 2026). State-page design.
  Healiam has no fair in New York, so the page says so and is about reaching the nearest one, Rahway, NJ:
  NJ Transit from Penn Station, a short walk from Rahway station; Staten Island across the Arthur Kill.
- Distances (straight line, OpenStreetMap, 6 Nov 2026): lower Manhattan to Rahway 16 miles (matches the
  client's sheet, 26 km), Staten Island to Rahway 7 miles. The fair card shows "About 16 miles from New
  York City".
- The header Locations menu now lists states that have a page but no fair (`statesWithoutFairs` in
  `lib/locations.ts`). The page's city section is empty until New York city pages exist.
- **To confirm before publishing:** that New York residents can book the Rahway fair (open since
  31 Oct 2026). The page assumes they can.

## More nearby city pages, and how distances are measured (6 Nov 2026)

- **New pages:** `/new-jersey/blood-testing-in-newark`, `/new-jersey/blood-testing-in-jersey-city`,
  `/new-york/blood-testing-in-new-york-city`, `/colorado/blood-testing-in-aurora`,
  `/georgia/blood-testing-in-atlanta`, from the client's city list. Each written for its own city (Newark:
  NJ Transit from Newark Penn; Jersey City: PATH then NJ Transit, or the Turnpike; New York City: borough by
  borough; Aurora: Denver or Centennial, on different days; Atlanta: honest about the 26-mile drive).
- **Distances now measure from the city center to the fair's address**, which is how the client's city sheet
  measures (it matched within 2 km everywhere checked). The five Texas pages were updated to match
  (Garland 13 mi to Plano, was 8 from city center to city center). Exception: the Grand Prairie fair address
  isn't in OpenStreetMap or the Census geocoder, so its ZIP (75050) center stands in for it.
- New York City's borough distances (Staten Island 7, Brooklyn 17, Manhattan 18, Queens 25, Bronx 27 miles)
  live in its page file. **Still to confirm before publishing:** that New York residents can book Rahway.

## Fair pages rewritten (6 Nov 2026, client approved)

- Each `/fairs/<slug>` page now has its own copy. Intro, parking and venue note in `lib/fairs.ts`;
  section headings, hero note, "What to bring", panel line, nearby-town label, meta line and closing CTA in
  `lib/pages/fair-pages.ts` (`fairPageCopy(slug)` throws if a fair has no copy). Similarity between fair
  pages went from 45 to 76% down to 15% or less, with no shared sentence.
- **Walk-ins:** only Plano says walk-ins are welcome (confirmed on healiam.com). The old shared "Walk-ins
  welcome" line on every fair page is gone.
- Design within the same sections: H1 "Blood testing fair in <City>" with the city in brand pink (as the
  home hero), venue line with a pin, icon tiles on the "What to expect" cards, nearby-town chips in the
  parking card, and "Other upcoming fairs" ordered same state first, then soonest.
- A new fair needs an entry in `lib/fairs.ts` and in `lib/pages/fair-pages.ts`.

## No fair timing or venue on city and state pages (owner, 6 Nov 2026)

- Fair dates, days (Saturday, weekend), hours (8 to 10 AM), venue names, street addresses, suites,
  floors, parking and "short walk from the station" never appear in the copy of state or city pages:
  they change from fair to fair. This covers hero text, ticks, trust strip, comparison tabs, process,
  benefits, FAQs, final CTA, sticky bar, page titles and meta descriptions.
- The only place fair details appear on these pages is the fair cards in the "fair locations" section,
  built from `lib/fairs.ts`, so they update when the fair list does. On state pages those cards are now
  `cityOnly` too (town, date and hours, no venue or street). The other-states list shows no dates or
  venue photos; the state pages' city list shows no dates.
- City-level facts stay: the fair's town, distances to it, and getting to the town (NJ Transit to Rahway).
- Fair pages (`/fairs/<slug>`) are the one place for venue, address, parking and timing.

## Site check, 11 Nov 2026

A full pass over all 32 pages at 1440px and 390px: every link (63 internal, 91 external), every FAQ
accordion (209) and tab (114), both header menus on desktop and phones. All passed except two things,
both fixed:

- **Short state addresses.** `/colorado`, `/new-jersey`, `/georgia` and `/new-york` were 404s while
  `/texas` redirected. All four now 301 to their `/<state>/blood-testing` page, in `next.config.mjs` and
  `public/_redirects` (keep the two lists the same).
- **Small tap targets on phones.** Breadcrumb links (18px tall), fair-card titles on state and city
  pages (19px) and the Tests page category chips (28px) were hard to tap. Each now has an invisible
  `before:` box that extends the tap area to about 42px without changing the look. The Tests chip bar
  scrolls sideways (which clips anything outside it), so it gained `pt-2 pb-3` offset by `-my-2` to
  make room for the taller tap areas without moving the layout.
