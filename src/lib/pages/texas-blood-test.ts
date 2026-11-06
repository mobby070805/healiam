// Content for /texas/blood-testing. Components only lay this out.
// (Was /texas/blood-test until 1 Nov 2026; the old path redirects here.)
// Every fact comes from healiam.com (home, tests, fairs, FAQ and about pages).

import { site } from "@/lib/site";
import { panelCategories, labCategoryCount } from "@/lib/panel";
import { fairHours, fairs } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import type { HeroVisualData, Widen } from "@/lib/types";

const texasFairs = fairs.filter((f) => f.region === "TX");
const texasCities = texasFairs.map((f) => f.locality).join(" and ");

export const page = {
  path: "/texas/blood-testing",
  // Client's SEO sheet: primary "blood testing in Texas"; secondary "blood tests in Texas",
  // "blood testing appointments Texas", "blood testing near Plano".
  keyword: "blood testing in Texas",
  meta: {
    title: `Blood Testing in Texas | ${site.price.display} Screening Panel | Healiam`,
    description:
      `Blood testing in Texas at Healiam health fairs near Plano and Grand Prairie. One ${site.price.display} screening panel with every test included, no referral or insurance.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Texas fairs", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: site.url },
    { name: "Blood testing in Texas" },
  ],

  hero: {
    titleLead: "Your complete blood test in Texas for",
    titleAccent: site.price.display,
    sub: "Blood testing in Texas with no doctor's referral, no insurance and no surprise bills. One draw at a Texas health fair checks 50+ markers, from thyroid and cholesterol to Vitamin D and HbA1c.",
    primary: { label: `Book for ${site.price.display}`, href: site.bookingUrl },
    secondary: { label: "What's tested", href: "#panel" },
    // The one place this page says no referral and walk-ins welcome (client, 6 Nov 2026).
    ticks: ["No referral", "Walk-ins welcome", "Results in 4-5 days"],
  },

  // Hero phone mockup. Illustrative sample only (clearly labelled "Sample"), not a real customer.
  // Values are plausible adult examples; pos = dot position on a low | normal | high bar (normal = 28% to 72%).
  heroVisual: {
    ariaLabel:
      "Sample Healiam results screen: Vitamin D flagged low, TSH, HbA1c, LDL and hemoglobin in range, with a results-ready alert and an HbA1c trend over three tests.",
    screen: {
      title: "Results",
      sub: "Sample · 50+ markers",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Thyroid", "Lipids", "CBC"],
      rows: [
        { name: "Vitamin D", value: "18", unit: "ng/mL", low: true, pos: 12 },
        { name: "TSH", value: "2.1", unit: "mIU/L", low: false, pos: 48 },
        { name: "HbA1c", value: "5.2", unit: "%", low: false, pos: 42 },
        { name: "LDL", value: "92", unit: "mg/dL", low: false, pos: 55 },
        { name: "Hemoglobin", value: "14.6", unit: "g/dL", low: false, pos: 52 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: "50+ markers" },
    trend: {
      name: "HbA1c",
      sub: "Over 3 tests",
      chip: "In range",
      points: [
        { label: "Test 1", value: "5.9%" },
        { label: "Test 2", value: "5.6%" },
        { label: "Test 3", value: "5.2%" },
      ],
    },
  },

  trust: [
    // Short enough to hold one line each in the two-up strip on a 375px phone.
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "ShieldCheck", label: "HIPAA compliant" },
    { icon: "Microscope", label: "FDA-approved equipment" },
    { icon: "Users", label: "3,000+ families served" },
  ],

  challenges: {
    eyebrow: "Sound familiar?",
    title: "Blood testing in Texas shouldn't be this hard",
    sub: "Most Texans put off blood work for one of these six reasons. One Healiam blood test in Texas fixes all of them.",
    items: [
      "Seeing a doctor just to get a lab order",
      "Surprise bills after the test",
      "Paying copays before you get answers",
      "Tests that check only one thing",
      "Feeling tired with no idea why",
      "Another visit just to hear your results",
    ],
    cta: {
      primary: { label: `Skip the hassle for ${site.price.display}`, href: site.bookingUrl },
      secondary: { label: "How it works", href: "#how-it-works" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Why choose Healiam in Texas",
    sub: "The usual route to blood tests in Texas, side by side with a Healiam health fair.",
    usualLabel: "The usual route",
    oursLabel: "Healiam",
    badge: "CLIA-certified",
    note: "The bars are a simple side by side guide. Usual-route prices are what a doctor visit plus lab fees typically cost in the US.",
    factors: [
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "Provider visit plus lab fees, before any treatment starts.", level: 100 },
        ours: { value: site.price.display, note: "One price for the complete screening panel.", level: 14 },
        cta: { label: `Book for ${site.price.display}`, href: site.bookingUrl },
      },
      {
        id: "referral",
        tab: "Referral",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "Doctor visit first", note: "An appointment just to get labs ordered.", level: 82 },
        ours: { value: "Not needed", note: "Book your own test online in minutes.", level: 18 },
        cta: { label: "Book without a referral", href: site.bookingUrl },
      },
      {
        id: "insurance",
        tab: "Insurance",
        icon: "CreditCard",
        bar: "Paperwork",
        usual: { value: "Copays and deductibles", note: "Plus coverage checks and claim forms.", level: 86 },
        ours: { value: "Not needed", note: "Pay by credit card or HSA card.", level: 12 },
        cta: { label: "Pay by card or HSA", href: site.bookingUrl },
      },
      {
        id: "coverage",
        tab: "Coverage",
        icon: "Layers",
        bar: "Markers covered",
        usual: { value: "A few ordered tests", note: "Narrow panels can miss the real cause.", level: 26 },
        ours: { value: "50+ markers", note: `${labCategoryCount} categories from one blood draw.`, level: 100 },
        cta: { label: "See all 50+ markers", href: "#panel" },
      },
      {
        id: "results",
        tab: "Results",
        icon: "Timer",
        bar: "Wait for answers",
        usual: { value: "Often at a follow-up", note: "Another visit to hear what the numbers mean.", level: 80 },
        ours: { value: "4 to 5 business days", note: "Clear results and graphs in the Healiam app.", level: 34 },
        cta: { label: "Book my test", href: site.bookingUrl },
      },
      {
        id: "access",
        tab: "Access",
        icon: "MapPin",
        bar: "Time away from work",
        usual: { value: "Clinic hours", note: "Time off work for a separate lab visit.", level: 76 },
        ours: { value: "Morning Texas fairs", note: "Fairs run 8:00 to 10:00 AM, so you test before work rather than taking a day off.", level: 24 },
        cta: { label: "Find a Texas fair", href: "#locations" },
      },
    ],
  },

  process: {
    eyebrow: "Simple process",
    title: "How blood testing in Texas works",
    sub: "Book a Texas fair online, fast overnight, and read your results in the app.",
    steps: [
      { title: "Book a nearby fair", sub: "Pick a Texas fair online" },
      { title: "Visit on your date", sub: "At your chosen fair" },
      { title: "Quick draw", sub: "2 vials, under 7 min" },
      { title: "Get results", sub: "In the Healiam app" },
    ],
    tip: "Before your visit: fast 8 to 12 hours (water is fine) and skip hard workouts for 24 hours.",
    cta: {
      primary: { label: "Book my test", href: site.bookingUrl },
      secondary: { label: "Find a Texas fair", href: "#locations" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "Benefits of blood testing with Healiam in Texas",
    sub: "What every Texas visit includes, from the draw to the report your doctor can use.",
    items: [
      { icon: "ScanSearch", title: "Catch issues early", line: "Screens for thyroid issues, anemia, diabetes risk and kidney function." },
      { icon: "FileCheck", title: "Doctor-ready results", line: "Lab reports your own doctor can use." },
      { icon: "Gauge", title: "See your ranges", line: "Each marker shown against its reference range." },
      { icon: "ChartLine", title: "Track trends", line: "Graphs for every marker as you retest." },
      { icon: "FileDown", title: "Download a PDF", line: "Keep your report or share it in one tap." },
      { icon: "Lock", title: "Your data stays yours", line: "Never shared with any third party." },
      { icon: "UserCheck", title: "Licensed phlebotomists", line: "Every draw done in a private setting." },
      { icon: "FileText", title: "Free sample report", line: "See exactly what you get before booking." },
    ],
    cta: {
      primary: { label: `Get all this for ${site.price.display}`, href: site.bookingUrl },
      secondary: { label: "View sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "What's included",
    title: `Everything in your ${site.price.display} Texas blood test`,
    sub: `One integrated panel across ${labCategoryCount} lab categories. Every test below is included, from one blood draw at a Texas fair.`,
    categories: panelCategories,
    priceCard: {
      label: "Complete panel",
      line: site.price.panelLine,
      compare: "Usual route: $100 to $800+ for a visit plus labs",
      fine: "Card or HSA accepted, with or without insurance.",
      cta: { label: `Book for ${site.price.display}`, href: site.bookingUrl },
    },
  },

  locations: {
    eyebrow: "Texas locations",
    title: "Texas fair locations",
    sub: "Book a morning slot at a Texas health fair. Fairs run 8:00 to 10:00 AM, so you can test while fasting and still make it to work.",
    fairs: texasFairs,
    hours: fairHours,
    noFair: {
      title: "Not near one of these?",
      line: "We add new Texas fairs regularly. Tell us where you need one and we will let you know.",
      cta: { label: "Request a fair near you", href: site.links.contact },
    },
    cta: {
      primary: { label: "Book a fair visit", href: site.bookingUrl },
      secondary: { label: "See all fairs", href: site.links.fairs },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Your Texas blood test results, in the Healiam app",
    sub: "Free on iPhone and Android. Scan a code to install it before your Texas fair.",
    // No bullet points: the codes sit centred under the heading (client, 2 Nov 2026).
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  // Six questions: three about blood testing in Texas, three about Healiam's own fairs in the state (client, 1 Nov 2026). Generic brand
  // questions (what is Healiam, labs, privacy) belong on the home page, not here (owner, 3 Nov 2026).
  faq: {
    eyebrow: "FAQ",
    title: "Blood testing in Texas: your questions",
    sub: "Three questions about blood tests in Texas, and three about Healiam's Plano and Arlington fairs.",
    items: [
      {
        q: "Where can I get blood testing in Texas?",
        a: `At Healiam's health fairs in ${texasCities}, North Texas. Each runs ${fairHours.label} local time. Check the ${link("fairs page", site.links.fairs)} for the latest Texas dates, and ${link("tell us if you need one closer to you", site.links.contact)}.`,
      },
      {
        q: "How much do blood tests in Texas cost with Healiam?",
        a: `${site.price.display} for the ${site.price.panelName}, at any Texas fair. It is one complete panel covering all included tests for a single, transparent price, with no visit fees, no copays and no surprise lab bills.`,
      },
      {
        q: "How do I book a blood testing appointment in Texas?",
        a: `${link("Book online", site.bookingUrl)} or in the ${link("Healiam app", "#app")} with a free account, pick a ${link("Texas fair", "#locations")} and a time, and pay by card or HSA card.`,
      },
      {
        q: "Where is Healiam's Plano fair, and how do I find it?",
        a: "At Brightway Insurance, 6832 Coit Rd, Suite 270A, in the Coit Crossing professional plaza. The suite is on the second floor. Park free in front of the building; the ADA spaces are nearest the main doors.",
      },
      {
        q: "Where is Healiam's Arlington-area fair?",
        a: "At Goldmine Enterprise, 1106 N Watson Rd, Suite 318, in Grand Prairie. Take the elevator from the main lobby to the third floor. Parking is free in the building's lot, with ADA spaces near the entrance.",
      },
      {
        q: "When are Healiam's next Texas fairs?",
        a: `${texasFairs.map((f) => `${f.city.replace(/,\s*TX$/, "")} on ${f.dateLabel.replace(/,\s*\d{4}$/, "")}`).join(" and ")}, both ${fairHours.label} local time. Later Texas dates are posted on the ${link("fairs page", site.links.fairs)} as they are scheduled.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: `Book your ${site.price.display} blood test in Texas`,
    sub: "Pick a Texas fair, fast overnight, and see your results in the app within 4 to 5 business days.",
    primary: { label: `Book for ${site.price.display}`, href: site.bookingUrl },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  // Texas city pages, listed just above the other-states section (owner, 6 Nov 2026).
  cityLinks: {
    eyebrow: "Texas cities",
    title: "Blood testing by Texas city",
    sub: "Directions, parking and the next date for each Texas city with a Healiam fair.",
    region: "TX",
  },

  // Last section: fairs in every other state (client, 2 Nov 2026). Links come from lib/fairs.ts.
  otherFairs: {
    eyebrow: "Other states",
    title: "Healiam fairs outside Texas",
    sub: "Testing for family in another state? These Healiam fairs are outside Texas, with the same panel and price.",
    linkLead: "Blood testing in",
    exclude: "Texas",
  },

  sticky: {
    label: `${site.price.display} health screening panel`,
    sub: "All tests in one panel",
    cta: { label: "Book now", href: site.bookingUrl },
  },
} as const;

export type TexasBloodTestPage = typeof page;

/**
 * Shape of a state landing page built from the Texas page's sections. Other state pages
 * (Colorado) fill the same shape with their own copy; the section components default to Texas.
 */
export type StateLandingPage = Omit<Widen<TexasBloodTestPage>, "heroVisual" | "cityLinks"> & {
  /** Links to the state's own city pages. State pages set it; city pages leave it out. */
  readonly cityLinks?: Widen<TexasBloodTestPage["cityLinks"]>;
  /** Any mockup the hero can draw: a trend card (state pages) or a booking card (city pages). */
  readonly heroVisual: HeroVisualData;
};
