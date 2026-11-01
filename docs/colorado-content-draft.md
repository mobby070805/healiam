# Colorado blood testing page: content draft

Draft only. Nothing here is built. Prepared 31 Oct 2026 for `/colorado/blood-testing`.

**How to read the tags**

- **[VERIFIED: source]** checked against a named source on 31 Oct 2026.
- **[RECOMMENDATION]** our proposal, not a fact.
- **[CLIENT VERIFICATION REQUIRED]** cannot be confirmed from anything we have. Do not publish until answered.
- **[MEDICAL REVIEW]** health information that a qualified reviewer should approve (the SEO sheet's own rule).

**Two earlier instructions this draft conflicts with.** Decide before implementation:

1. On 31 Oct the page was rebuilt with the Texas page's sections, as instructed. This brief asks for a
   Colorado-specific structure instead. The draft below follows this brief.
2. On 31 Oct the instruction was "no need to mention fairs on this page". The SEO sheet's publishing rule for
   this URL is "publish only if the page adds useful statewide coverage information and links to genuine
   event/booking options". The only verified way to get tested in Colorado is two scheduled health fairs. The
   draft therefore names them, once, as "scheduled testing mornings", in a single availability section. Without
   that section the page has nothing Colorado-specific to say and fails the sheet's own test.

---

## 1. Colorado page opportunity assessment

### What we can verify about Healiam in Colorado

| Fact | Status |
|---|---|
| Two scheduled Colorado testing dates, both in the Denver metro | [VERIFIED: healiam.com/fairs, /fairs/denver-co, /fairs/centennial-co] |
| Denver: 3955 Irving St, Denver, CO 80211, Berkeley neighborhood. Sat, Nov 14, 2026, 8:00 to 10:00 AM. Free parking in the adjacent lot. No venue name published. | [VERIFIED: healiam.com/fairs/denver-co] |
| Centennial: Centennial Public Works, 7272 S Eagle Street, Centennial, CO 80112. Sun, Nov 22, 2026, 8:00 to 10:00 AM. Free parking in the front lot. | [VERIFIED: healiam.com/fairs/centennial-co] |
| Both: no doctor's referral or insurance; licensed phlebotomists; results in the Healiam portal in 4 to 5 business days; bring the app, a credit or HSA card, and fast 8 to 12 hours | [VERIFIED: both Colorado fair pages] |
| "No appointment, referral or insurance required" | [VERIFIED: healiam.com/fairs, stated for fairs in general, not Colorado specifically] |
| Booking flow: create account, add who is being tested, pick a time and place, pay by card or HSA, two-vial draw in about 7 minutes | [VERIFIED: healiam.com/demo, general] |
| Panel: 56 lab measurements across 10 lab categories, plus 6 self-logged biometrics | [VERIFIED: healiam.com/tests via `lib/panel.ts`] |
| Price $95 | [VERIFIED: owner, 30 Oct 2026, sitewide] Nothing suggests regional pricing, but nothing confirms Colorado specifically. [CLIENT VERIFICATION REQUIRED] |

### What we cannot verify

- That `client.healiam.com/booking` lists the Colorado dates. It redirects to a login screen; we did not sign in. [CLIENT VERIFICATION REQUIRED]
- Any Colorado date after Nov 22, 2026. Both known dates pass in three weeks. [CLIENT VERIFICATION REQUIRED]
- Any testing outside the Denver metro.
- The Denver venue's name.
- Whether Healiam is based in Colorado. Its phone number (720) is a Denver-area code, but no published page says where the company is located. [CLIENT VERIFICATION REQUIRED] If it is, that is a genuine Colorado trust point.

### Conflicts found while checking

- **The booking app's login page advertises "At-home visits or nearby blood drives" and "Lab-accurate results in 4 business days".** The website's position (owner, 29 Oct) is fairs only, and every fair page says 4 to 5 business days. The draft follows the website. [CLIENT VERIFICATION REQUIRED]
- **The Centennial fair page says the venue is "near the Streets of SouthGlenn".** That shopping center is on the west side of Centennial; 7272 S Eagle St is on the east side. Not repeated in this draft. [CLIENT VERIFICATION REQUIRED]

### Verdict on the opportunity

A Colorado page earns its place only as an honest availability and booking guide: where Healiam tests in Colorado
right now (Denver metro only), when, how to book, and what to do outside the metro. It has real, verified
Colorado-specific content. It does **not** support statewide claims. Its value depends on the dates being kept
current; a Colorado page with only past dates would mislead.

---

## 2. Comparison with the Texas page

| | Texas page (`/texas/blood-test`) | This Colorado draft |
|---|---|---|
| Job | Sell the $95 panel to Texans | Answer "can I get tested in Colorado, where, when, and how do I book?" |
| Opening | Price-led H1, pain points | Availability-led H1, the two dates first |
| Structure | Hero > trust > 6 pain points > 6-tab comparison > process > 8 benefits > full panel list > locations > 12 FAQs > CTA | Hero with dates > availability > choosing a date > booking steps > the night before and morning of > altitude note > panel summary > after the draw > outside the metro > FAQs > CTA |
| Locations | One section near the bottom | The core of the page, near the top |
| Panel | Full marker list on the page | A short summary that links to `/tests`, so the list is not duplicated |
| Colorado-only content | n/a | Weekend dates, Denver vs south-metro choice, Mountain Time, altitude and hemoglobin, out-of-metro path |
| FAQ overlap | 12 questions | 9 questions; none reworded from Texas. Shared facts (price, HSA) appear inside Colorado-framed answers only |

**Shared facts kept identical on purpose** (true everywhere, so they must not be reworded to differ):
$95, 56 lab measurements, no referral or insurance, card or HSA, 8 to 12 hour fast, 4 to 5 business days,
licensed phlebotomists, two vials.

---

## 3. Proposed unique content strategy

- **Purpose:** the place a Colorado searcher learns whether Healiam can test them, and books if it can.
- **Primary audience:** adults in the Denver metro without a referral or insurance who want a full preventive panel.
- **Secondary audience:** Coloradans outside the metro, who need a straight "not yet" and a way to ask for a date.
- **Main user question:** "Is there a Healiam testing date near me in Colorado, and how do I book it?"
- **Unique value proposition:** the current Colorado dates, honestly scoped, with everything needed to book and
  prepare in one place, plus the one health point that is genuinely about Colorado: altitude.
- **Booking journey:** see dates > choose one > book (account required) or walk in > prepare > draw > results in the app.
- **Statewide vs Denver:** the hub covers Colorado as a whole and states the Denver-metro limit. "Blood testing
  near Denver" is used once, in the availability section, because that is where testing happens. Event detail stays
  on `/fairs/denver-co` and `/fairs/centennial-co`; the hub links to them rather than repeating them. [RECOMMENDATION]

---

## 4. Recommended page outline

| # | Section | Purpose | Data source |
|---|---|---|---|
| 1 | Hero | Say what Healiam offers in Colorado and show the two dates at once | `lib/fairs.ts` |
| 2 | Where Healiam tests in Colorado | Coverage, honestly scoped; links to both fair pages | `lib/fairs.ts` |
| 3 | Choosing a date | Saturday vs Sunday, northwest Denver vs south metro | Fair pages, fair-city sheet |
| 4 | How booking works | The real booking steps, including the account requirement | healiam.com/demo, booking login |
| 5 | Your testing morning | Night-before and morning-of checklist, Mountain Time | Fair pages |
| 6 | Testing at altitude | The one Colorado-specific health point | [MEDICAL REVIEW] |
| 7 | What the panel covers | Category summary, links to `/tests` | `lib/panel.ts` |
| 8 | After your draw | Results timing and what to do with them | Fair pages, homepage |
| 9 | Outside the Denver metro | Request a date, or host one at work | `/contact`, `/employer` |
| 10 | FAQs | Colorado questions only | Mixed, tagged |
| 11 | Final CTA | Book the next Colorado date | Booking URL |

Not included, on purpose: a pain-points grid, a clinic comparison, a benefits grid and the full marker list.
Each one would repeat the Texas page or the homepage without adding anything for Colorado.

---

## 5. Complete page content draft

Copy follows the site's house style: American English, no em or en dashes.

### Section 1: Hero

**Eyebrow:** Colorado

**H1:** Blood testing in Colorado: where we test and how to book

**Supporting copy:**
Healiam runs scheduled testing mornings in the Denver metro, not a walk-in lab. Below are the current Colorado
dates, what the $95 panel covers, and how to book a draw without a doctor's order or insurance.
[$95 for Colorado: CLIENT VERIFICATION REQUIRED]

**Date panel** (generated from `lib/fairs.ts`):

- **Saturday, Nov 14** · Denver
- **Sunday, Nov 22** · Centennial
- 8:00 to 10:00 AM Mountain Time

**Primary CTA:** See Colorado dates (scrolls to section 2)
**Secondary CTA:** Book for $95 (links to `https://client.healiam.com/booking`) [CLIENT VERIFICATION REQUIRED: that Colorado dates appear there]

**Image:** none in the hero. The date panel is the visual. [RECOMMENDATION]

### Section 2: Where Healiam tests in Colorado

**Eyebrow:** Current Colorado dates
**H2:** Blood testing near Denver, on two mornings

**Copy:**
Healiam's Colorado testing happens at scheduled mornings in the Denver metro. Each one is staffed by licensed
phlebotomists for two hours, and the panel, price and process are the same at both.

**Card: Denver** · Saturday, Nov 14, 2026 · 8:00 to 10:00 AM
3955 Irving St, Denver, CO 80211 (Berkeley, northwest Denver)
Parking: free, in the lot next to the building, with accessible spaces nearest the main entrance.
Links: Denver details (`/fairs/denver-co`) · Directions (Google Maps)

**Card: Centennial** · Sunday, Nov 22, 2026 · 8:00 to 10:00 AM
Centennial Public Works, 7272 S Eagle Street, Centennial, CO 80112
Parking: free, in the lot in front of the building, with accessible spaces nearest the entrance.
Links: Centennial details (`/fairs/centennial-co`) · Directions (Google Maps)

**Coverage note:**
These are the only Colorado dates on the schedule right now. Healiam does not currently test in Colorado
Springs, Boulder, Fort Collins, Pueblo or the Western Slope.

**Freshness line:** "Dates last checked [date]. See all upcoming fairs for the latest." (links to `/fairs`) [RECOMMENDATION]

### Section 3: Choosing a date

**Eyebrow:** Which morning
**H2:** Picking between Denver and Centennial

**Copy:**
Nothing about the test changes between the two. Choose by day and by drive.

- **Saturday suits you, or you live north or west of downtown:** Denver. Edgewater, Wheat Ridge, Arvada,
  Westminster, Lakewood, Federal Heights and Commerce City are all within about 6 miles of the Irving Street
  venue in a straight line. [VERIFIED: Healiam_Fair_City_Pages sheet, straight-line distances]
- **Sunday suits you, or you live in the south metro:** Centennial, in Arapahoe County. Compare the drive to both
  before you book; straight-line distance and driving time are not the same.
- **Miss one, catch the other:** the two dates are eight days apart.

**CTA:** Check the drive (opens Maps for each venue)

### Section 4: How booking works

**Eyebrow:** Booking
**H2:** Book a Colorado blood test in four steps

1. **Create a Healiam account.** In the app or at client.healiam.com. Booking needs a login.
   [VERIFIED: booking URL redirects to login]
2. **Add who is being tested.** Yourself, or people you look after, in one checkout. [VERIFIED: healiam.com/demo]
3. **Choose Denver or Centennial and a time.** [CLIENT VERIFICATION REQUIRED: that both Colorado dates are listed and bookable]
4. **Pay by card or HSA card.** You see the full $95 before you confirm. [VERIFIED: healiam.com/demo]

**Walk-ins:** Healiam's fairs page says no appointment is needed, so you can also arrive during the two hours.
Booking ahead means less waiting. [CLIENT VERIFICATION REQUIRED: walk-ins at the Colorado dates specifically]

**Primary CTA:** Book for $95
**Secondary CTA:** See the booking walkthrough (`/demo`)

### Section 5: Your testing morning

**Eyebrow:** Before you go
**H2:** The night before and the morning of

**The night before**
- Stop eating 8 to 12 hours before your draw. For an 8:00 AM arrival, that means finishing dinner between 8:00 PM and midnight.
- Water is fine. Skip coffee, tea, juice and gum until after the draw.
- Avoid hard workouts in the 24 hours before.

**The morning of**
- Hours are 8:00 to 10:00 AM Mountain Time.
- Bring your phone with the Healiam app installed and a credit card or HSA card. No insurance card.
- The draw is two vials and takes about seven minutes.

[VERIFIED: fasting, bring list and hours from the Colorado fair pages; coffee, gum and exercise guidance from the "Before your visit" steps on healiam.com/tests]

### Section 6: Testing at altitude

**Eyebrow:** Living at altitude
**H2:** Why Colorado results can read a little differently

**Copy:**
People who live at higher elevations tend to have higher hemoglobin and hematocrit, because the body makes more
red blood cells when there is less oxygen in the air. Both markers are in the Healiam panel. If either comes back
near the top of its range, mention where you live when you go over the results with your doctor. Healiam does not
diagnose; this is context for that conversation. [MEDICAL REVIEW]

[RECOMMENDATION] Keep this to one short section. It is the one genuinely Colorado-specific health point, and it
should not be stretched with figures or advice we cannot source.

### Section 7: What the panel covers

**Eyebrow:** The panel
**H2:** One draw, 56 lab measurements

**Copy:**
The same panel runs at every Colorado date: 56 lab measurements across 10 categories, plus six biometrics you log
yourself in the app.

**Category chips:** Complete blood count · Thyroid · Lipids · Kidney · Liver · Electrolytes · Iron · Diabetes (glucose, HbA1c) · Pancreas · Vitamin D and more · Biometrics

**CTA:** See every marker (`/tests`)

### Section 8: After your draw

**Eyebrow:** Results
**H2:** Your numbers, 4 to 5 business days later

- Results arrive in the Healiam app, each marker shown against its reference range.
- Download the report as a PDF to share with your doctor.
- Retest later and each marker builds a trend.
- Your results are not shared with any third party.

[VERIFIED: Colorado fair pages for timing; homepage and healiam.com FAQ for the rest]
Note: Thanksgiving (Thursday, Nov 26) falls inside the business-day window after the Centennial date.
[CLIENT VERIFICATION REQUIRED: whether results for Nov 22 draws are delayed]

**CTA:** See a sample report (healiam.com sample results PDF, new tab)

### Section 9: Outside the Denver metro

**Eyebrow:** Elsewhere in Colorado
**H2:** Not near Denver or Centennial?

- **Ask for a date in your town.** Tell us where you are. Requests help decide where testing goes next. (`/contact`)
- **Bring testing to your workplace.** A workplace fair brings the same panel to your team. (`/employer`)

[RECOMMENDATION] Do not promise that a request leads to a date.

### Section 10: FAQs

See section 8 of this document.

### Section 11: Final CTA

**H2:** Book your Colorado testing morning
**Copy:** Pick Denver or Centennial, fast overnight, and see all 56 lab results in the app 4 to 5 business days later.
**Primary CTA:** Book for $95
**Secondary CTA:** Get the app

**Sticky bar (phones):** "Colorado testing dates" · "Denver Nov 14 · Centennial Nov 22" · Book now

### Image recommendations

| Image | Where | Alt text |
|---|---|---|
| Code-drawn schematic of the Denver metro with two labelled pins, marked "not to scale" | Section 2 | "Schematic map of the Denver metro showing Healiam's two Colorado testing locations, in northwest Denver and in Centennial" |
| Existing app mockup (results screen, labelled "Sample") | Section 8 | "Sample Healiam results screen showing markers against their reference ranges" |
| Simple icon checklist (moon, water drop, phone, card) | Section 5 | Decorative; the text carries the meaning |

Avoid stock photos of labs or Colorado landmarks, and any photo implying a Healiam venue we do not have.

---

## 6. SEO metadata

| Field | Value |
|---|---|
| URL | `https://healiam.com/colorado/blood-testing`. The sheet shows a trailing slash; the site uses none and redirects the slashed form. [RECOMMENDATION] |
| Canonical | `https://healiam.com/colorado/blood-testing` |
| Title tag | Blood Testing in Colorado: Dates & Booking \| Healiam (52 characters) |
| Meta description | Where Healiam offers blood testing in Colorado: scheduled Denver-metro mornings, a $95 panel with 56 lab measurements, and how to book. (135 characters) |
| H1 | Blood testing in Colorado: where we test and how to book |
| Primary keyword | blood testing in Colorado (title, H1, opening copy) |
| Secondary | blood tests in Colorado (FAQ 1); blood testing appointments Colorado (section 4 and FAQ 3); blood testing near Denver (section 2 H2) |
| Robots | index, follow, once the client verification items are cleared |
| Structured data | WebPage, BreadcrumbList, FAQPage, and an ItemList of the two real Event dates. Service with the $95 offer, areaServed "Denver metropolitan area". No LocalBusiness. [RECOMMENDATION] |
| Breadcrumb | Home > Blood testing in Colorado |

---

## 7. Internal linking recommendations

| Link to | From | Why |
|---|---|---|
| `/fairs/denver-co` | Section 2 Denver card | Full event detail lives there; avoids duplicating it |
| `/fairs/centennial-co` | Section 2 Centennial card | Same |
| `/fairs` | Section 2 freshness line | The live schedule across all states |
| `/tests` | Section 7 | Full marker list, so this page stays short |
| `/demo` | Section 4 | Walkthrough of the booking flow |
| `/contact` | Section 9, FAQ 2 | Request a date outside the metro |
| `/employer` | Section 9 | Workplace testing |
| `https://client.healiam.com/booking` | Hero, section 4, final CTA | The only booking destination [CLIENT VERIFICATION REQUIRED] |

**Inbound links to add** (these change completed pages, so they need approval): from the Colorado group on
`/fairs`, and from `/fairs/denver-co` and `/fairs/centennial-co` ("Testing in Colorado"). Do not link to
`/texas/blood-test` from the body; the two pages serve different states.

---

## 8. FAQ section

**Eyebrow:** Colorado questions
**H2:** Blood testing in Colorado, answered

1. **Can I get blood tests in Colorado outside the Denver metro?**
   Not at the moment. Healiam's current Colorado dates are in Denver and Centennial. Send us your town and we will
   let you know if a date is planned nearby.

2. **Is the price the same in Colorado?**
   Yes, $95 for the full panel of 56 lab measurements, with no separate visit fee.
   [CLIENT VERIFICATION REQUIRED]

3. **Do I need an appointment, or can I walk in?**
   You can book a time online, which needs a free Healiam account. You can also walk in during the 8:00 to 10:00 AM
   window; booking just means less waiting. [CLIENT VERIFICATION REQUIRED: walk-ins at Colorado dates]

4. **Which date should I choose if I live in Arvada, Lakewood or Westminster?**
   Usually Denver. Those suburbs are within about 6 miles of the Irving Street venue in a straight line. If you live
   in the south metro, compare the drive to Centennial.

5. **What time zone are the hours in?**
   Mountain Time. Both dates run 8:00 to 10:00 AM, so plan your fast from the night before.

6. **Does living at altitude change my results?**
   It can raise hemoglobin and hematocrit. Mention where you live when you review those two markers with your
   doctor. [MEDICAL REVIEW]

7. **Can I use my HSA card in Colorado?**
   Yes. Pay with an HSA card or any regular credit card. Insurance is not used, so there is no claim to file.

8. **What happens when these dates pass?**
   New dates appear on the fairs page when they are scheduled. If none is listed, request one for your area.
   [CLIENT VERIFICATION REQUIRED: whether Colorado dates recur]

9. **Is the Sunday date in Centennial any different?**
   No. Same panel, same price, same licensed phlebotomists. Only the day and place change.

---

## 9. Client verification checklist

| # | Question | Blocks |
|---|---|---|
| 1 | Do both Colorado dates appear and book correctly at `client.healiam.com/booking`? | Hero, section 4, all CTAs |
| 2 | Are there Colorado dates after Nov 22, 2026, and is there a regular schedule? | Whether to publish at all |
| 3 | Is $95 the price in Colorado? | Hero, FAQ 2 |
| 4 | Are walk-ins accepted at the Colorado dates? | Section 4, FAQ 3 |
| 5 | The booking app advertises at-home visits and 4-business-day results. Which is current? | Every service claim |
| 6 | Name of the Denver venue at 3955 Irving St? | Section 2 |
| 7 | Is "near the Streets of SouthGlenn" correct for 7272 S Eagle St? | Not used; fix on the fair page |
| 8 | Will Thanksgiving delay results for Nov 22 draws? | Section 8 |
| 9 | Is Healiam headquartered in Colorado? If yes, can we say so? | Optional trust point |
| 10 | Medical review of the altitude section and FAQ 6 | Section 6, FAQ 6 |
| 11 | Owner decision: this structure, or keep the Texas sections as built? Name the fairs, or not? | Implementation |

---

## 10. Duplicate-content and keyword-cannibalization audit

### Against the Texas page

| Dimension | Similarity | Note |
|---|---|---|
| Search intent | Low | Different state; Colorado is availability and booking, Texas is a sales page |
| Unique value proposition | Low | Dates and booking guidance vs price-led pitch |
| Opening content | Low | Availability-led H1 and copy |
| Heading structure | Low | No H2 shared or reworded |
| Section sequence | Low | Different order and different sections |
| Main explanatory content | Low to medium | Prep and results facts overlap because they are the same service; written as a Colorado checklist, not reused copy |
| FAQs | Low | 9 Colorado questions; price and HSA appear as shared facts only |
| Local information | n/a | Texas has two cards; Colorado is built around its dates, day choice, distances and altitude |
| Conversion journey | Medium | Same booking URL, as it must be |

No section was reworded to look different. Where the content overlaps, it is a shared fact stated once.

### Against the version currently built

The live build at `/colorado/blood-testing` (Texas sections, no fair content) scores low on local information
(2 of 5) and high on structural similarity to Texas. This draft replaces it if approved.

### Keyword cannibalization

| Overlap | Risk | Recommendation |
|---|---|---|
| `/fairs/denver-co`, `/fairs/centennial-co` | Low | Event pages own "blood testing fair Denver" and the date; the hub links to them and does not repeat parking, directions or venue notes in full |
| `/fairs` | Low | All states, all dates; the hub covers Colorado only |
| Planned `/colorado/blood-testing-in-denver` (SEO sheet, P1) | **High** for "blood testing near Denver" and "blood test Denver" | With one Denver date and no evidence of recurrence, a Denver page would repeat this hub and `/fairs/denver-co`. Hold the Denver page; let the hub hold "near Denver" until Denver has its own recurring schedule |
| Planned Colorado suburb pages (Arvada, Westminster, Lakewood and others) | High | Do not build; the hub's section 3 and FAQ 4 cover them |
| `/texas/blood-test` | Low | Different state; shared facts only |

---

## 11. Final recommendation

**Needs client verification.**

The draft is complete and Colorado-specific, but items 1 to 5 in the checklist decide whether it is true. Item 2
decides whether the page should be published at all: if there are no Colorado dates after Nov 22, a page built
around Colorado availability would point people at events that have passed. In that case, hold the page, or
publish it with the "Outside the Denver metro" request path as its main action until new dates are confirmed.

Implementation should wait for: answers to items 1 to 5, the medical review (item 10), and your decision on item 11.
