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

## Phone header: three-bar menu (11 Nov 2026)

- **Owner, 11 Nov 2026:** phones (below md, 768px) get a three-bar menu. The header row is logo, Book now
  and the menu button; Fairs and Locations move into the menu. md up the header is unchanged.
- `components/MobileMenu.tsx`. The panel fills the screen under the header and scrolls on its own; the
  page behind doesn't scroll while it's open. Contents, top to bottom (owner: Fairs and Locations first):
  Fairs (collapsed; opens to every fair with its date and upcoming dot or "Ended", then "All upcoming
  fairs"), Locations (collapsed; each state links to its page and its chevron opens its cities), this
  page's section links (the same `nav` the desktop header shows), the phone number, Book now.
- Closes on a link tap, Escape, the X button, or widening past md. Fairs and Locations reset to collapsed
  each time it closes.
- The panel is `absolute top-full` with `h-[calc(100dvh-4rem)]`, not `fixed`: the header's backdrop blur
  makes it the containing block for fixed children, so `fixed` would size to the 64px header.

## Blog homepage (13 Nov 2026)

- **Owner, 13 Nov 2026:** the blog moves into this site with a new design, and new posts will be added.
  The client's existing posts must never be removed. Built here, not in healiam.com's current codebase.
- `/blog`: dark hero (as /about), the latest post as a large featured card, a topic filter (All, Markers
  explained, Preventive health, Cost and access, The panel) over a card grid, the black CTA band, footer.
  **Owner, 13 Nov 2026:** no images on the client's posts; their cards are text only. Posts we write
  get one banner each (`banner` in `lib/pages/blog.ts`, file in `/public/blog/`, about 1600x900), shown
  on their card and, when the post is the latest, in the featured card.
- Data: `lib/pages/blog.ts`. The ten client posts (8–24 Oct 2026) are copied word for word from
  healiam.com/blog: title, summary, topic, date, read time. New posts go at the top of `posts`.
- **Open:** the client posts themselves are not rebuilt here yet, so their cards link to
  `https://healiam.com/blog/<slug>`. Before this site replaces healiam.com, rebuild each one at
  `/blog/<slug>` (same slug) and switch its `href`, or those links break. The posts use stat cards,
  tables, numbered steps, tag chips, callouts, blockquotes and a Sources list, so the post template
  needs all of those.
- Footer "Blog" now links to `/blog`; `/blog` is in the sitemap; JSON-LD is CollectionPage + Blog with a
  BlogPosting per post.

## Blog posts we write (13 Nov 2026)

- Post pages: `app/blog/[slug]/page.tsx`, built only for posts with full text in `lib/blog/articles.ts`
  (each also needs a card entry at the top of `posts` in `lib/pages/blog.ts`, same slug).
- Layout: light title block (breadcrumb, topic, H1, summary, author/date/read time, banner if set), then
  the article (720px) with an "On this page" list (xl up) and a sticky $95 booking card (lg up), then
  Sources, the client's disclaimer, the FAQ (site FAQ component), Keep reading (3 cards), the CTA band.
- Body blocks: p, h2 (id for the contents list), ul, ol (numbered circles), table (scrolls on its own on
  phones), callout. `**bold**` for lead-ins; links with `link()`.
- JSON-LD: BlogPosting + FAQPage + BreadcrumbList.
- First post: /blog/full-blood-panel-cost-without-insurance (brief row 2). Every price is from the labs'
  own pages, checked 13 Nov 2026, or from CMS, HealthCare.gov and the IRS. Re-check prices before
  updating the post. Links to the client's hospital-price post go through `postHref()`, so they switch
  to the local page once that post is rebuilt here.

### Blog post page layout follows BoldDesk (13 Nov 2026)

Owner asked for the post page to follow bolddesk.com's post pages (example: /blogs/trustworthy-ai-customer-support-webinar),
every component, in Healiam's colours and fonts.

- Title block: "‹ Blog" back link, H1 left, banner right (drawn cover with the post's key figure until a banner exists;
  `cover` in lib/blog/articles.ts), "by Healiam • Updated on" with the Healiam mark as avatar.
- Sticky left column: "In this page" (folds, marks the current section), booking card, "Summarize with" (ChatGPT, Claude,
  Perplexity, Grok links with a summary prompt), share buttons (Facebook, X, LinkedIn, WhatsApp, email, copy link).
- Article: summary box with a brand left edge, plain bullets, bordered tables, Sources, Related articles (links),
  FAQs (line-separated, chevron), About the author, disclaimer. Then "Explore more content" (3 latest posts) and the footer.
- Reading bar under the header and a back-to-top button with a progress ring.
- Left out on purpose: BoldDesk's comment form and email subscribe box (the site has no backend to store either), and its
  RSS share button (no feed; copy link is in its place). The final CTA band was removed to match; the phone sticky bar now
  works on pages without one.
- Banner for the first post (13 Nov 2026): public/blog/full-blood-panel-cost-without-insurance.jpg, 1600x900. Owner first
  asked for the H1 in the banner, then (same day) for no title text: just the Healiam logo and the picture. Healiam black with pink, the same price receipt as the
  article (Quest list prices, total $225) and a $400+ tag. Banners have text in them, so they always show whole at 16:9
  and are never cropped (PostBanner).
- Post page polish (13 Nov 2026, owner: "more creative and attractive"): faint grid and pink glow behind the title block,
  topic and read-time chips; a three-figure stats row under the TL;DR (`stats` block; removed from the first post the same day at the owner's request, the block type stays available);
  numbered section headings ("01"…) and matching numbers in "In this page" (both removed the same day, owner: "not good"); numbered lists as question cards; a dark $95
  booking band closing the Healiam section (`promo` block). Sidebar card picture is a sample results card marked "Sample".
- Post page sides (13 Nov 2026, owner): article on the left, the sticky side column (contents, booking card, summarize,
  share) on the right from lg up, since readers look left first. On phones the side column still comes before the article.
- Sidebar booking card (13 Nov 2026, owner): built like the "What's inside the panel" card on /tests. Healiam black,
  no pink fill; headline "One panel, 50+ measurements"; the same six icon tiles as /tests (from `tests.hero.card.tiles`);
  "$95" shown as the price for the full panel; button "Book your spot" (owner: 3 words or fewer). Never "$95 for 50+
  tests" or "50+ blood tests" (client's price framing, 6 Nov 2026).
- Article booking box (`promo` block, 13 Nov 2026, owner): same content and look as the sidebar card, wider: "One panel,
  50+ measurements", six tiles in one row, "$95" shown once with "Price for the full panel", buttons "Book your spot"
  and "See what's tested". The price never repeats inside a box.
- Author (13 Nov 2026, owner): the first post is by Madhesh G, SEO Specialist. Profiles live in `authorProfiles`
  (lib/pages/blog.ts): role, short bio, LinkedIn and website (rulethetop.com/author/madhesh). The byline shows the name
  and role; the author box shows the photo (public/authors/madhesh.jpg, 320px square from the owner's photo,
  shown as a circle; initials only if a writer has no photo), bio, "Read more articles by this author" (website) and
  LinkedIn. Schema marks the post author as a Person. Posts signed "Healiam" (the client's) keep the Healiam box.
- External links and sources (13 Nov 2026, owner): no separate Sources list under a post. Each post carries 2 external
  links, inside the text, to its main sources. First post: Quest Health's price page and the CMS 2025 Clinical
  Laboratory Fee Schedule. Other sources are named in the text without links. Copy is checked for overlap with the
  pages it draws on (six-word runs); wording that followed HealthCare.gov and IRS Publication 502 was rewritten.
- No "Related articles" list in the post (13 Nov 2026, owner: it repeats "Explore more content"). The post's `related`
  slugs now fill the "Explore more content" cards first.
- Booking box placement (13 Nov 2026, owner): the `promo` block sits mid-article, after "What the totals come to"
  (readers have just seen the $225 total), not at the end of the post.

## Header: same as the live healiam.com header (13 Nov 2026)

- **Owner, 13 Nov 2026:** use the exact nav bar of the live site, so nothing changes for visitors at launch.
  This replaces the earlier header notes above (29 Oct, 1 Nov, 6 Nov, 11 Nov): no Fairs dropdown, no
  page section links, no phone number in the header.
- Links, in the live order: Home, Our Tests, Fairs, Locations (menu), FAQs, More (menu: Demo, Download,
  Employer, Blogs, About), Contact; Book Now on the right. Data in `lib/header-nav.ts`; desktop links in
  `components/HeaderNav.tsx`, phone menu in `components/MobileMenu.tsx`. `HeaderMenu.tsx` was removed.
- Pages built here use their path; FAQs and Download still open on healiam.com (`site.links.faq`,
  `site.links.download`).
- Locations menu, laid out like the live one: "Blood testing near you", one column per state (pin icon,
  state name linking to the state page), the state's city pages under it, then "Don't see your city? We
  add fairs regularly." and "Request a fair near you" (/contact). States A to Z. It lists this site's state
  and city pages (`locationsMenu()` in `lib/locations.ts`), so it has more cities than the live menu, and
  New York, which the live menu doesn't list.
- The current page's link is ink and semibold (Locations for state and city pages, More for its pages).
- From lg (1024px) the links show in the bar; below that, logo, Book Now and a three-bar menu with the
  same links (Locations opens to states, each state to its cities; More's links under a small label).
- Left out: the live site's dark-mode switch (this site has no dark theme).
- Pages still pass a `nav` list in their data files; the header no longer shows it.
- Title block (13 Nov 2026, owner): no topic or read-time chips above the H1; "‹ Blog", then the H1.
- Schema (13 Nov 2026, owner: article and author schema): the post is `["Article", "BlogPosting"]` with headline,
  description, dates, section, wordCount, timeRequired, banner ImageObject, publisher and author. The author is a
  separate Person node (`@id` = website#person; name, jobTitle, bio, photo, url, sameAs LinkedIn and website),
  also on /blog. Posts signed "Healiam" point at the Organization.

## Blog post 2: what not to do before a blood test (14 Nov 2026)

- Owner, 14 Nov 2026: every post we write keeps the first post's design and structure; only the content
  changes, and it must be unique. This post is data only (lib/blog/articles.ts, a card in lib/pages/blog.ts)
  plus its banner, public/blog/what-not-to-do-before-blood-test.jpg (no title text: a "Before your draw"
  checklist, a clock, a glass of water and an "8–12 hrs" tag).
- Brief row 3. The rules match Healiam's own prep on /tests: 8 to 12 hour fast, water fine, no coffee, tea,
  juice or gum, no hard exercise for 24 hours, medicines as the doctor advises.
- Facts checked 14 Nov 2026 on MedlinePlus (fasting for a blood test, lab test prep, CK, cholesterol),
  Cleveland Clinic (fasting for blood work), UPMC (CBC needs no fast) and the FDA's biotin safety
  communication (2017, updated 2019; named without a link because the FDA page URLs keep moving).
- The 2 external links: MedlinePlus "Fasting for a Blood Test" and Cleveland Clinic "Fasting for Blood Work".
- Overlap check: 0 six-word runs shared with 13 source and competitor pages, apart from the brief's own FAQ
  questions (search queries) and test names. Lines that repeated the site's prep copy word for word were
  reworded.

## Blog post 3: HSA and FSA for blood tests (14 Nov 2026)

- Brief row 6, /blog/hsa-fsa-blood-tests. Same structure as the other posts; banner
  public/blog/hsa-fsa-blood-tests.jpg (HSA and FSA cards, a "Keep for your claim" receipt checklist, a Dec 31 page).
- Facts checked 14 Nov 2026: IRS Publication 502 (what medical expenses are; lab fees; physical examination,
  "don't have to be ill"), IRS Publication 969 (HSA records and 20% additional tax, FSA third-party statement,
  grace period or carryover, 2026 HSA limits $4,400 / $8,750, HDHP minimum deductible $1,700 / $3,400),
  Rev. Proc. 2025-32 (2026 health FSA $3,400, carryover $680; via benefits-firm summaries).
- The 2 external links: IRS Publication 502 and IRS Publication 969.
- Healiam facts used: credit cards and HSA cards accepted, no doctor's order (healiam.com/faq).
- **Open, needs the client (brief note):** whether Healiam accepts FSA cards and gives itemized receipts. The
  post claims neither: the Healiam section says "ask us" for FSA, and the FAQ "Does Healiam provide a receipt…"
  points to /contact. Update both once the client confirms.

## Mid-article booking box redesigned (14 Nov 2026)

- Owner, 14 Nov 2026: the mid-article box and the sidebar card "both look same". The sidebar keeps the dark
  "One panel, 50+ measurements" card. The `promo` block in posts is now a light card with its own message:
  "How a Healiam test works" / "Get your numbers at a morning health fair", three steps (book a fair online;
  two vials, about seven minutes; results in the app in 4 to 5 business days), then $95 for the full panel,
  "Book your spot" and a "See what's tested" link. No tiles, no "50+ measurements" in it. Applies to every post.

## Blog post 4: health fair blood test, what to expect (14 Nov 2026)

- Brief row 8, /blog/health-fair-blood-test-what-to-expect, topic "The panel". Banner
  public/blog/health-fair-blood-test-what-to-expect.jpg (booking ticket, two tubes, phone with results, "About 7 min").
- Healiam facts from healiam.com/faq and the demo walkthrough: booking steps, card or HSA at checkout, licensed
  phlebotomist, private setting, two vials in under seven minutes, CLIA-certified partner labs on FDA-approved
  equipment, results in 4 to 5 business days with ranges and graphs, PDF for your doctor. Panel table from
  lib/panel.ts (56 lab measurements).
- The 2 external links: CMS's CLIA page and MedlinePlus "How to Understand Your Lab Results".
- Colorado first (brief): the "near you" section links the Denver city page and the Centennial fair page.
- **Open, needs the client:** walk-ins. The FAQ says to book ahead and to call 720-761-7869 before coming
  without a booking. Update once the client confirms whether walk-ins are taken.

## "From the blog" band above the footer (14 Nov 2026)

- Owner, 14 Nov 2026: show the blog posts at the bottom of every page, above the footer. `components/LatestPosts.tsx`
  ("From the blog" / "Read before your blood test", "See all articles" to /blog, three post cards in the
  "Explore more content" card style). It shows the three newest posts we wrote (href /blog/…), so it
  updates itself as new posts are added; client posts (still on healiam.com) aren't shown there.
- Rendered by `Footer` on every page. `/blog` and the post pages use `<Footer blog={false} />`: they already end with
  post cards, and the band would repeat them.
- Owner, 14 Nov 2026: keep the mid-article booking box in the health fair post, even though it overlaps the
  post's own steps.

## Location pages moved to /locations/ (14 Nov 2026)

- Owner, 14 Nov 2026: location pages use healiam.com's addresses. State pages are `/locations/<state>`
  (was `/<state>/blood-testing`), city pages `/locations/<state>/<city>` (was `/<state>/blood-testing-in-<city>`).
  Routes live in `src/app/locations/`. Copy files (`lib/pages/*-blood-testing.ts`) keep their names.
- Every link, canonical, og:url, breadcrumb and schema URL was updated (97 places in 22 files); no page links
  to an old address.
- 301 redirects from every earlier address straight to the new one, in `next.config.mjs` (Vercel) and
  `public/_redirects` (static export): the short state URLs (`/texas`…), `/<state>/blood-testing`,
  `/<state>/blood-testing-in-<city>` and Texas's original `/texas/blood-test`. No chains.
- The push-log Apps Script was updated to read `/locations/` URLs from the sitemap and `src/app/locations/`
  file paths (the owner installs it).
- **Open:** healiam.com also has `/locations` (an index of all locations), `/locations/texas/frisco` and
  `/locations/colorado/centennial`. This site has none of the three yet, so those addresses would 404 after
  launch unless built or redirected.
