# Location pages: audit and page tracker

Started 31 Oct 2026. Read with `docs/PROJECT-NOTES.md`. No location page is built yet; this file decides
which ones deserve to exist, what each one is for, and in what order we build them, one page at a time.

## Sources used

| Source | What it gave us |
|---|---|
| Google Sheet "Healiam SEO URLs" (owner devakarmurugan, edited 31 Oct 2026) | 4 state hubs, 31 city pages, 12 test pages, 14 blog posts, `/fairs`, plus an "SEO Rules" tab |
| Google Sheet "Healiam_Fair_City_Pages" (26 Oct 2026, two identical copies) | 41 fair-city and nearby-town pages with ZIPs, straight-line km to venue, H1s and meta |
| `src/lib/fairs.ts` and live healiam.com/fairs | Six upcoming fairs (they match each other) |
| Live healiam.com sitemap and fair pages | Two past fairs not in this repo; which planned URLs exist live |
| `/texas/blood-test` content report (31 Oct 2026) | The existing Texas page, section by section |

Search volume, difficulty and CPC: **none available.** The SEO sheet says so itself and asks for
Keyword Planner, Semrush or Ahrefs data before final prioritisation. Nothing below uses invented demand.

## What we actually know about service coverage

Healiam tests only at scheduled morning fairs (8:00 to 10:00 AM). No lab, no home draws.

| Fair | Venue | Date | Status |
|---|---|---|---|
| Plano, TX | Brightway Insurance, 6832 Coit Rd, Suite 270A, 75023 | Sat Nov 14, 2026 | Upcoming |
| "Arlington", TX | Goldmine Enterprise, 1106 N Watson Rd, Suite 318, **Grand Prairie** 75050 | Sat Nov 21, 2026 | Upcoming |
| Denver, CO | 3955 Irving St, 80211 (Berkeley; **no venue name**) | Sat Nov 14, 2026 | Upcoming |
| Centennial, CO | Centennial Public Works, 7272 S Eagle St, 80112 | **Sun** Nov 22, 2026 | Upcoming |
| Rahway, NJ | Rahway Pharmacy, 1421 Irving St, 07065 | Sat Nov 14, 2026 | Upcoming |
| Lawrenceville, GA | 755 Longleaf Blvd, 30046 (**no venue name**) | Sat Nov 21, 2026 | Upcoming |
| Plano, TX | Shree Swaminarayan Gurukul, 621 Park Vista Rd, 75094 | Jul 12, 2026 | Past (live page still offers booking) |
| Frisco, TX | Blissful Beauty MedSpa, 5899 Preston Rd, Suite 501, 75034 | Aug 29, 2026 | Past (live page still offers booking) |

What this means for page strategy:

- **Every upcoming fair is over by 22 Nov 2026**, three weeks from now. A page built around one date
  goes stale almost immediately unless fairs recur. Only DFW has evidence of recurrence (three venues,
  four dates, July to November). For Denver, Centennial, Rahway and Lawrenceville we have one date each.
- **Texas and Colorado have two fair locations each. New Jersey and Georgia have one.** A state page for
  a state with one fair is the city page with a bigger name, and risks implying statewide service.

## Existing and live URLs that overlap the plan

| URL | Where | Overlaps with |
|---|---|---|
| `/texas/blood-test` | This repo only (404 live) | Planned `/texas/blood-testing` (same intent) |
| `/fairs/plano-tx`, `/fairs/denver-co`, `/fairs/rahway-nj`, `/fairs/lawrenceville-ga`, `/fairs/arlington-tx`, `/fairs/centennial-co` | Repo and live | Planned city pages for the same cities |
| `/fairs` | Repo and live | Sheet keeps it as the event hub: "avoid duplicating the full event schedule across city pages" |
| `/texas/blood-testing`, `/colorado/blood-testing`, `/texas/blood-testing-in-plano`, `/plano/blood-testing`, `/denver/blood-testing` | 404 live | Not indexed anywhere, so no redirect cost to choosing either scheme |

## Conflicts in the planning data

1. **Two URL schemes for the same city.** SEO sheet: `/texas/blood-testing-in-plano/`. Fair sheet:
   `/plano/blood-testing` and `/frisco-tx/blood-testing`. Plus the existing `/fairs/plano-tx`. That is three
   URLs for one search. Pick one scheme before any city page.
2. **Price.** Fair sheet uses $94.99 in every title and description. Confirmed price is **$95**
   (PROJECT-NOTES, 30 Oct 2026). Sheet titles cannot be used as written.
3. **City lists disagree.** The fair sheet uses a 10 km radius and excludes Richardson (11+ km) and Dacula
   (10.8 km). The SEO sheet includes both, plus McKinney, Garland, Carrollton, Lewisville, Golden,
   Broomfield, Thornton, Northglenn, Duluth, Suwanee, Buford, Sugar Hill and Johns Creek, with no distances.
4. **Gaps in both sheets.** No nearby towns for the Grand Prairie fair or the Centennial fair.
5. **Units.** Distances are straight-line kilometres. A US page needs miles, and straight-line is not
   driving distance.
6. **Staten Island, NY** is listed as a Rahway nearby page. The test happens in NJ; booking eligibility
   for NY residents is unconfirmed (the sheet flags this too).
7. **Fair sheet H1s are a city-name swap** ("Affordable Blood Testing Near {City}, {ST}" x 41). Not usable.

## Recommendation per proposed page

| # | Proposed page | Verdict | Why |
|---|---|---|---|
| 1 | Texas hub `/texas/blood-testing` | **Build, by reworking `/texas/blood-test`** | Two fair locations plus fair history. One Texas page only; the current one fails the "remove the city names" test (it reads as the homepage pitch), so it becomes the hub rather than a sibling. Needs your OK: it changes a completed page and adds a 301. |
| 2 | Plano city page | **Build** | Recurring market with evidence (Jul and Nov fairs, two venues). Evergreen page that outlives each fair; `/fairs/plano-tx` stays the dated event page. |
| 3 | Colorado hub `/colorado/blood-testing` | **Build** | Two fairs on opposite sides of the metro, Saturday and Sunday. A real choice to explain. |
| 4 | Denver city page | **Build after recurrence is confirmed** | One known date. Without a repeat fair, it duplicates `/fairs/denver-co`. |
| 5 | Rahway city page | **Build after recurrence is confirmed** | Same as Denver. Would also serve the New Jersey searches until a second NJ fair exists. |
| 6 | Lawrenceville city page | **Build after recurrence is confirmed** | Same as Denver. Would also serve the Georgia searches. |
| 7 | New Jersey hub | **Hold** | One fair location. Would duplicate Rahway and imply statewide coverage. Revisit at two locations. |
| 8 | Georgia hub | **Hold** | Same as New Jersey. |
| 9 | 31 nearby-city pages (SEO sheet), 35 nearby or area pages (fair sheet) | **Do not build as pages** | The only distinct fact per town is a distance. That is a doorway page. Nearby towns become a "Coming from nearby" block on the fair-city page instead, with verified miles. |
| 10 | Frisco | **Hold, revisit** | The one nearby town with its own past fair. Worth a page only if fairs return there. |
| — | Grand Prairie / Arlington, Centennial city pages | **Not in either sheet** | Covered by their `/fairs/` pages and the state hubs for now. Flag to the SEO owner. |

Test-category pages, blog posts and `/fairs` in the SEO sheet are out of scope for this audit. Test-plus-city
keywords ("kidney function test Plano", "CBC test Denver") stay on the city page, as the sheet's own rule says.

## Differentiation matrix

Shared facts that are allowed to repeat everywhere, stated once per page and never reworded to look
unique: $95, 50+ markers, no referral or insurance, card or HSA, 8 to 12 hour fast, 4 to 5 business days,
CLIA-certified partner labs, licensed phlebotomists.

| Field | Texas hub | Plano | Colorado hub | Denver | Rahway | Lawrenceville |
|---|---|---|---|---|---|---|
| URL | `/texas/blood-testing` | `/texas/blood-testing-in-plano` (if SEO-sheet scheme) | `/colorado/blood-testing` | `/colorado/blood-testing-in-denver` | `/new-jersey/blood-testing-in-rahway` | `/georgia/blood-testing-in-lawrenceville` |
| Page type | State coverage hub | Evergreen city page | State coverage hub | Evergreen city page | City page doubling as state answer | City page doubling as state answer |
| Primary keyword | blood testing in Texas | blood testing in Plano TX | blood testing in Colorado | blood testing in Denver CO | blood testing in Rahway NJ | blood testing in Lawrenceville GA |
| Secondary | blood tests in Texas; blood testing appointments Texas | blood test Plano; kidney function test Plano; CBC test Plano | blood tests in Colorado; blood testing appointments Colorado | blood test Denver; kidney function test Denver; CBC test Denver | blood test Rahway; blood testing in New Jersey | blood test Lawrenceville; blood testing in Georgia |
| Main user question | "Can I get this anywhere in Texas, and which fair do I go to?" | "When is the next Plano fair and how do I get there before work?" | "North or south metro, Saturday or Sunday?" | "Where in Denver is it and can I get there from my side of town?" | "Can I get there by train, and where do I park?" | "Where is it in Gwinnett and when is the next one?" |
| Unique angle | Honest coverage: DFW only, not Houston, Austin or San Antonio. Compares the two DFW fairs, shows fair history as evidence they recur, routes everyone else to "request a fair". | Booking-first logistics for one venue: suite on the upper floor, parking, a fasting timeline for an 8 AM draw, nearby towns in miles, past Plano venues. | The only state with a weekend choice (Sat Denver, Sun Centennial). A picker by side of metro and day. | Berkeley venue specifics, west and north suburbs in miles, Centennial as the Sunday fallback. | Transit-first: walk from Rahway NJ Transit station, street parking and public lot, pharmacy venue. | Gwinnett County venue, nearby towns in miles (Grayson, Snellville). |
| Location-specific information (verified) | Two venues, dates, past Frisco and Plano Gurukul fairs | Venue, suite, floor, parking, ADA note, two past venues | Two venues, Sat vs Sun, Public Works venue | Address, neighborhood, parking | Address, station walk, parking, venue type | Address, county, parking |
| Distinct sections | DFW coverage map/list, "which fair" comparison, fair history, "not in DFW?" | Next-fair card first, getting there, morning timeline, nearby towns, past fairs | Weekend picker, two venue cards, side-of-metro guide | Getting there, nearby suburbs, Sunday fallback | Train and parking guide, nearby Union County towns | Getting there, nearby towns |
| Conversion goal | Choose a DFW fair, then book | Book the next Plano date | Choose a day, then book | Book Denver or switch to Centennial | Book Rahway | Book Lawrenceville |
| Overlap | Existing `/texas/blood-test` (to be replaced); `/fairs` | `/fairs/plano-tx` | `/fairs` | `/fairs/denver-co` | `/fairs/rahway-nj`; NJ hub | `/fairs/lawrenceville-ga`; GA hub |
| Differentiation strategy | Replace, don't duplicate. Hub links down to Plano page and fair pages. | City page = evergreen; fair page = this date. Canonical roles stated in tracker. | Hub links to Denver page and both fair pages | As Plano | As Plano; holds NJ terms until a 2nd NJ fair | As Plano; holds GA terms until a 2nd GA fair |
| Still needed | Your OK to replace the page; Arlington vs Grand Prairie label; is there a DFW cadence? | Next Plano date after Nov 14; verified miles | Venue name (Denver); recurrence | Venue name; recurrence | Recurrence; NY resident booking | Venue name; recurrence |

## Proposed section architecture

Each page gets its own order. None follows the Texas page's Hero > Pain points > Comparison > Process >
Benefits > Panel > Locations > FAQ > CTA sequence.

**Texas hub:** Hero (states coverage plainly) > DFW fairs, side by side > Which fair suits you (day,
area, venue, parking) > Fair history in DFW > Outside DFW? (request a fair) > One shared-facts strip >
Texas FAQ (Houston? either fair? "Arlington" fair address?) > CTA.

**Plano:** Next-fair card as the hero > Getting to the venue > Your morning (fast, arrive, draw, work) >
Coming from nearby (miles) > Past Plano fairs > If you miss it (next DFW fair) > Panel link for
test-specific searches > Short FAQ > CTA.

**Colorado hub:** Hero > Saturday or Sunday picker > Two venue cards > Side-of-metro guide > Shared-facts
strip > Colorado FAQ > CTA.

**Denver / Rahway / Lawrenceville:** follow the city-page principles (booking-first, getting there,
nearby in miles, fallback fair), but each leads with its own real constraint: Denver with the neighborhood
and the Sunday alternative, Rahway with the train, Lawrenceville with Gwinnett access.

## Missing information to verify

1. Which URL scheme is final: SEO sheet `/{state}/blood-testing-in-{city}` or fair sheet `/{city}/blood-testing`. Trailing slash or not (site convention: none).
2. Permission to replace `/texas/blood-test` with `/texas/blood-testing` (301 from the old path and from `/texas`).
3. Do fairs recur in each city, and is there a schedule after Nov 22, 2026? This decides items 4 to 6.
4. Venue names for Denver (3955 Irving St) and Lawrenceville (755 Longleaf Blvd).
5. Should the "Arlington, TX" fair be labelled Grand Prairie? The address is in Grand Prairie.
6. Can someone book any fair from out of state (Staten Island for Rahway)?
7. Does the booking flow let a user pick a specific fair, so a page can deep-link to it?
8. Verified driving miles for any nearby town we list.
9. Keyword volume data for location terms, if the SEO owner has it.

## Separate launch risk (not a location page)

The live site has URLs this repo does not: `/tests/cbc` and every other category, ~50 per-marker pages
such as `/tests/cbc/wbc`, ten `/blog/...` posts, `/faq`, `/download`, and the two past fair pages. Deploying
this repo as it stands would turn all of those into 404s. Needs a decision before launch: rebuild, or 301.

## Recommended order

0. Decisions 1 to 3 above.
1. **Texas hub** (rework of `/texas/blood-test`).
2. **Plano** city page.
3. **Colorado hub.**
4. Denver, then Rahway, then Lawrenceville, each only once its recurrence is confirmed.
5. New Jersey and Georgia hubs only when a second fair location exists.

## Page tracker

| Page | URL | Status | SEO | Responsive | Build checks |
|---|---|---|---|---|---|
| Texas hub | `/texas/blood-test` (URL change deferred by owner, 31 Oct) | Existing page kept as is | Done (earlier) | Done (earlier) | Pass |
| Plano | TBD (scheme) | Planned | — | — | — |
| Colorado hub | `/colorado/blood-testing` | **Built 31 Oct 2026** (Texas design, Colorado availability content, v4), not deployed | Done | 1440 and 390 checked, no overflow | tsc, build pass (23 pages, 158 kB first load, same as Texas) |
| Denver | TBD | Blocked: recurrence | — | — | — |
| Rahway | TBD | Blocked: recurrence | — | — | — |
| Lawrenceville | TBD | Blocked: recurrence | — | — | — |
| New Jersey hub | — | On hold | — | — | — |
| Georgia hub | — | On hold | — | — | — |
| Nearby-town pages | — | Not building (folded into city pages) | — | — | — |

## Completed: Colorado page (31 Oct 2026)

`/colorado/blood-testing`, keyword "blood testing in Colorado". Copy in
`src/lib/pages/colorado-blood-testing.ts`; route in `src/app/colorado/blood-testing/page.tsx`;
schema `coloradoGraph()` in `src/lib/schema.ts`. In the sitemap and llms.txt. URL can still change.

**Owner decisions, 31 Oct 2026, in order:**
1. Use the Texas page's design sections (overrides the brief's "do not follow the Texas structure").
   The components in `components/sections/` now take content as props and default to Texas;
   `/texas/blood-test` renders exactly as before. `StateLandingPage` is the shape a state page fills.
2. "No need to mention fairs on this page; it should be about Colorado blood testing." The fair-choice
   angle (Saturday Denver vs Sunday Centennial), the locations section, fair dates in the sticky bar and
   the fair Event markup were all removed. The Colorado file `satisfies Omit<StateLandingPage, "locations">`.

**What is on the page:** hero ("Blood testing in Colorado, no referral needed") with phone mockup > trust
strip > six hold-ups > five-factor comparison (Price, Ordering, Scope, Records, Payment) > four steps >
eight benefits > full panel with price card > seven-question Colorado FAQ > final CTA. Sticky bar on phones.

**Kept for accuracy:** one FAQ ("Where do I get my blood drawn in Colorado?") says the draw is at a
scheduled Healiam testing event in the Denver metro, chosen at booking, and that there is nothing yet in
Colorado Springs, Boulder or Fort Collins. Without it the page could read as a permanent lab or statewide
service. It is the only location statement on the page and sits in a collapsed FAQ item.

**Colorado-specific content:** the altitude FAQ (people living at higher elevation tend to have higher
hemoglobin and hematocrit; discuss those two markers with a doctor). General physiology, phrased without
a number or a diagnosis. Worth a quick check by the client's medical reviewer, per the SEO sheet's rule.

**Structured data:** WebPage, BreadcrumbList, Service + MedicalTest with the $95 offer, areaServed set to
the Denver metropolitan area (not the whole state), FAQPage. No Event, no LocalBusiness.

**Differentiation audit against `/texas/blood-test`** (1 to 5):

| Dimension | Score | Note |
|---|---|---|
| Search intent | 5 | Different state and keyword |
| Audience relevance | 3 | Without location detail the page is mostly the product pitch; altitude and the Denver-metro answer are the Colorado-specific parts |
| Content value | 3 | Accurate and useful, but much of it would apply in any state |
| Section structure | 1 | Identical to Texas by owner's instruction, minus locations |
| Local information | 2 | Altitude FAQ and one location answer only, by owner's instruction |
| FAQ differentiation | 5 | Seven questions, none repeated from Texas |
| Conversion journey | 4 | Straight to booking |

Low local-information and structure scores are the result of the two owner decisions above, not a
defect to pad out. Risk to note for the SEO owner: with little Colorado-specific substance, search engines
may treat this page and the Texas page as near-duplicates. If that shows up in Search Console, the
remedy is more verified Colorado detail, not reworded copy.

Repeated on purpose (shared facts): $95, 56 lab measurements, $100 to $800+ clinic-route figure, 8 to 12
hour fast, card or HSA, 4 to 5 business days, CLIA labs.

**Open items for this page**
- Nothing links to it yet except the sitemap.
- First load is 158 kB like Texas (comparison client component pulls the full icon set; known item).
- No page-specific share image yet; it uses the site default.

## Correction to the Texas content report PDF (31 Oct 2026)

The PDF quoted the Texas FAQ answer as "At our Plano and Arlington health fair". The page actually says
"At our Plano and Grand Prairie health fair" (it uses the venue's locality). Same root cause as the
"Arlington" label against a Grand Prairie address.

## Colorado content draft (31 Oct 2026)

`docs/colorado-content-draft.md`: a Colorado-specific structure (availability and booking first), written to
the owner's later brief. Not implemented. Conflicts with two earlier instructions (Texas sections; no fairs), so
it waits for an owner decision plus the client verification checklist inside it. Recommendation: needs client
verification. New findings from that check: the booking app (client.healiam.com) requires a login, and its login
page advertises at-home visits and 4-business-day results, contradicting the website.

## Colorado page, version 3 (31 Oct 2026, live in the repo)

Owner: "I don't need the draft hereafter, just make the changes in pages." The content of
`docs/colorado-content-draft.md` is now the page. That file is kept only as the record of sources and the
client verification checklist; future pages skip the draft step.

**Sections:** hero (white, Texas style, with a "Current Colorado dates" panel instead of the phone mockup) >
Locations (Texas component: two date cards plus "Elsewhere in Colorado?") > Picking between Denver and
Centennial (dark band, new) > Book in four steps (Texas Process component) > The night before and the morning
of (new checklist) > One draw, 56 lab measurements, with the altitude note (new) > Your numbers, 4 to 5
business days later (Texas Benefits component, four cards) > 9 Colorado FAQs > final CTA.

**Title** "Blood Testing in Colorado: Dates & Booking | Healiam" (52). **Description** 135 characters.
**H1** "Blood testing in Colorado: where we test and how to book". **Schema** WebPage, BreadcrumbList,
Service + MedicalTest (areaServed Denver metro), ItemList of the two dated Events, FAQPage.

**Still unverified on the page** (see the checklist in the draft file): that both Colorado dates are bookable
at client.healiam.com (login required), Colorado dates after 22 Nov, walk-ins at the Colorado dates, the
booking app's at-home and 4-day claims, and medical review of the altitude note.

## Colorado page, version 4 (31 Oct 2026, current)

Owner: "the design should follow Texas, only the content." Version 3's custom sections (date-panel hero,
dark date-choice band, checklist, panel/altitude block) were removed. The page now renders exactly the
Texas components in the Texas order. The v3 content was moved into them:

| Texas section | Colorado content |
|---|---|
| Hero + phone mockup | "Blood testing in Colorado: where we test and how to book"; Colorado sample mockup |
| Trust strip | CLIA labs, licensed phlebotomists, HIPAA, card or HSA |
| Challenges (6 numbered cards) | The night before and the morning of (fasting, water, workouts, Mountain Time, what to bring, the draw) |
| Comparison | Healiam or the clinic route: Day, Price, Ordering, Scope, Records, Payment |
| Process | Book a Colorado blood test in four steps, with the walk-in note |
| Benefits | Your numbers, 4 to 5 business days later (8 cards, incl. altitude) |
| Panel | One draw, 56 lab measurements, Colorado price card |
| Locations | Blood testing near Denver, on two mornings, plus "Elsewhere in Colorado?" |
| FAQ | 9 Colorado questions |
| Final CTA, sticky bar | Book your Colorado testing morning; both dates |

Rule for every future state page: same Texas components, same order, new copy only.
