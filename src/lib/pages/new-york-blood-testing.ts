// Content for /new-york/blood-testing, keyword "blood testing in New York". State page (owner, 6 Nov
// 2026), in the state pages' design and order. New York has no Healiam fair of its own: the nearest is
// Rahway, New Jersey, so the page says so plainly and is about getting there. Rahway's station is on NJ
// Transit's lines from New York Penn Station, and the fair is a short walk from it (lib/fairs.ts);
// Staten Island is the closest borough, across the Arthur Kill.
// Distances: straight line from OpenStreetMap coordinates, checked 6 Nov 2026: New York City (lower
// Manhattan) to Rahway 16 miles, Staten Island to Rahway 7 miles.
// TO CONFIRM BEFORE PUBLISHING: that New York residents can book the Rahway fair (raised 31 Oct 2026).

import { site } from "@/lib/site";
import { fairs, fairHours } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;

/** The nearest fairs to New York: the New Jersey ones, soonest first. */
export const newYorkFairs = fairs.filter((f) => f.region === "NJ").toSorted((a, b) => a.date.localeCompare(b.date));

/** Straight-line miles from lower Manhattan to each fair's address (OpenStreetMap, 6 Nov 2026). */
const fromNyc = { "rahway-nj": 16 } as const;
const fromStatenIsland = 7;

export const newYork = {
  path: "/new-york/blood-testing",
  keyword: "blood testing in New York",
  meta: {
    title: `Blood Testing for New York | ${price} Panel, Rahway NJ | Healiam`,
    description: `Blood testing for New Yorkers: one ${price} panel with every test included, at Healiam's Rahway, NJ fair, about ${fromNyc["rahway-nj"]} miles from Manhattan by NJ Transit.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "Getting there", href: "#how-it-works" },
    { label: "Nearest fair", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: site.url },
    { name: "Blood testing in New York" },
  ],

  hero: {
    titleLead: "Your complete blood test near New York for",
    titleAccent: price,
    sub: `Healiam doesn't hold fairs in New York yet. The nearest is in Rahway, New Jersey, about ${fromNyc["rahway-nj"]} miles from lower Manhattan and reachable by NJ Transit, with no referral or insurance needed.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "See the nearest fair", href: "#locations" },
    ticks: ["By train from Penn Station", `${labMeasurementCount} lab measurements`, "Results in 4-5 days"],
  },

  heroVisual: {
    place: "New York",
    ariaLabel:
      "Sample Healiam results screen for New York: potassium flagged low, total cholesterol, free T4, ALT and platelet count in range, with a results-ready alert and a fasting glucose trend over three tests.",
    screen: {
      title: "Results",
      sub: "New York · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Electrolytes", "Lipids", "Thyroid"],
      rows: [
        { name: "Potassium", value: "3.4", unit: "mmol/L", low: true, pos: 16 },
        { name: "Total cholesterol", value: "184", unit: "mg/dL", low: false, pos: 52 },
        { name: "Free T4", value: "1.2", unit: "ng/dL", low: false, pos: 47 },
        { name: "ALT", value: "24", unit: "U/L", low: false, pos: 42 },
        { name: "Platelet count", value: "260", unit: "K/µL", low: false, pos: 50 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    trend: {
      name: "Glucose",
      sub: "Over 3 tests",
      chip: "In range",
      points: [
        { label: "Test 1", value: "108" },
        { label: "Test 2", value: "99" },
        { label: "Test 3", value: "92" },
      ],
    },
  },

  trust: [
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "ShieldCheck", label: "HIPAA compliant" },
    { icon: "UserCheck", label: "Licensed phlebotomists" },
    { icon: "CreditCard", label: "Card or HSA card" },
  ],

  challenges: {
    eyebrow: "Sound familiar?",
    title: "Why New Yorkers put off blood work",
    sub: "Six things that keep a blood test on the to-do list in New York. One trip to Rahway clears them.",
    items: [
      "Waiting on a doctor's appointment first",
      "An order needed before any lab will draw",
      "City prices nobody tells you up front",
      "Insurance rules for every single test",
      "A narrow panel that leaves questions open",
      "Results explained only at a follow-up",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Getting there", href: "#how-it-works" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "A New York lab visit or a trip to Rahway",
    sub: "Staying in the city is closer. Here's what the short trip to New Jersey gets you instead.",
    usualLabel: "In the city",
    oursLabel: "Rahway fair",
    badge: "CLIA-certified",
    note: "The bars are a rough guide, not measurements. In-the-city prices are typical US visit plus lab fees.",
    factors: [
      {
        id: "trip",
        tab: "The trip",
        icon: "TrainFront",
        bar: "Distance",
        usual: { value: "Around the corner", note: "A city lab is the shorter trip.", level: 18 },
        ours: { value: `About ${fromNyc["rahway-nj"]} miles`, note: "NJ Transit from Penn Station to Rahway.", level: 52 },
        cta: { label: "See the nearest fair", href: "#locations" },
      },
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "Visit and lab fees, often billed apart.", level: 100 },
        ours: { value: price, note: "One payment when you book.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "wait",
        tab: "Wait",
        icon: "Hourglass",
        bar: "Time to a draw",
        usual: { value: "An appointment first", note: "Then the order, then the lab.", level: 80 },
        ours: { value: "Pick a date", note: "Book the fair directly; no order needed.", level: 18 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "scope",
        tab: "Scope",
        icon: "Layers",
        bar: "Tests run",
        usual: { value: "What's ordered", note: "Anything else needs another request.", level: 28 },
        ours: { value: `${labCategoryCount} categories`, note: "Electrolytes, lipids, thyroid, liver and more.", level: 100 },
        cta: { label: "See the full panel", href: "#panel" },
      },
      {
        id: "insurance",
        tab: "Insurance",
        icon: "CreditCard",
        bar: "Paperwork",
        usual: { value: "Per-test rules", note: "Coverage checks and claims.", level: 74 },
        ours: { value: "Not needed", note: "Card or HSA card.", level: 12 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "results",
        tab: "Results",
        icon: "Smartphone",
        bar: "Wait to see numbers",
        usual: { value: "A call or a portal", note: "Sometimes a follow-up visit too.", level: 70 },
        ours: { value: "In the app", note: "Ranges included, 4 to 5 business days on.", level: 30 },
        cta: { label: "Book my test", href: book },
      },
    ],
  },

  process: {
    eyebrow: "Getting there",
    title: "From New York to the Rahway fair",
    sub: "Book from home, ride out early, and you're back in the city before lunch.",
    steps: [
      { title: "Book a time", sub: "Online or in the app" },
      { title: "Fast overnight", sub: "8 to 12 hours" },
      { title: "Train to Rahway", sub: "From Penn Station" },
      { title: "Read your results", sub: "4 to 5 business days" },
    ],
    tip: `Coming from Staten Island? Rahway is about ${fromStatenIsland} miles away, across the Arthur Kill. Check the NJ Transit timetable against your booked slot before you set off.`,
    cta: {
      primary: { label: "Book a time", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "What New Yorkers get from one trip",
    sub: "Two vials in New Jersey, and all of this back on your phone.",
    items: [
      { icon: "TrainFront", title: "No car needed", line: "Rahway is on NJ Transit from Penn Station." },
      { icon: "Zap", title: "Electrolytes in the mix", line: "Potassium, sodium and chloride, every time." },
      { icon: "Gauge", title: "Readable ranges", line: "Each result placed between low and high." },
      { icon: "FileText", title: "Reports for your doctor", line: "From CLIA-certified labs." },
      { icon: "ChartLine", title: "Trends on retest", line: "Watch each marker change over time." },
      { icon: "FileDown", title: "A PDF to keep", line: "Download or share it in one tap." },
      { icon: "Users", title: "Bring someone along", line: "Add each person to one booking." },
      { icon: "Lock", title: "Private", line: "Not shared with an employer or any third party." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "What a New Yorker's blood test covers",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, drawn at the Rahway fair, plus biometrics you log in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "Rahway, NJ",
      line: site.price.panelLine,
      compare: "In the city: $100 to $800+ for a visit plus labs",
      fine: "Pay by credit card or HSA card.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Nearest fair",
    title: "Fair locations near New York",
    sub: `There's no Healiam fair in New York yet. Rahway, New Jersey is the closest: about ${fromNyc["rahway-nj"]} miles from lower Manhattan and ${fromStatenIsland} from Staten Island, in straight-line miles.`,
    fairs: newYorkFairs,
    hours: fairHours,
    noFair: {
      title: "Want a fair in New York?",
      line: "Tell us your borough or town, and we'll let you know if one is planned.",
      cta: { label: "Ask for a New York fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "All upcoming fairs", href: site.links.fairs },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "New York results, in the Healiam app",
    sub: "Free on iPhone and Android. Install it before your trip to Rahway.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  faq: {
    eyebrow: "FAQ",
    title: "Blood testing for New York: questions",
    sub: "Three questions about blood tests for New Yorkers, and three about getting to Healiam's Rahway fair.",
    items: [
      {
        q: "Can I get a Healiam blood test in New York?",
        a: `Not in the state yet. Healiam's nearest fair is in Rahway, New Jersey, and that's where the draw happens. To request one in New York, ${link("tell us where", site.links.contact)}.`,
      },
      {
        q: "How much is a blood test for New Yorkers?",
        a: `${price} for the ${site.price.panelName}: one complete panel covering all included tests for a single, transparent price. Paid by card or HSA card, with no bill later.`,
      },
      {
        q: "Can my New York doctor use the results?",
        a: "Yes. The samples go to CLIA-certified labs, and you can download the report as a PDF and share it with your doctor whenever you like.",
      },
      {
        q: "How do I get to Rahway from Manhattan?",
        a: "Take NJ Transit from New York Penn Station to Rahway, so there's no need to drive. Check the fair card for the venue address.",
      },
      {
        q: "Is Staten Island closer?",
        a: `Yes. Rahway is about ${fromStatenIsland} miles from the middle of Staten Island in a straight line, just across the Arthur Kill.`,
      },
      {
        q: "How do I book?",
        a: `Use the ${link("booking page", book)} or the ${link("Healiam app", "#app")}: open a free account and choose a slot at the ${link("Rahway fair", "#locations")}.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book your blood test near New York",
    sub: "A train ride to Rahway, two vials, and your full report on your phone the week after.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  cityLinks: {
    eyebrow: "New York cities",
    title: "Blood testing across New York",
    sub: "City pages for New Yorkers, each with the distance to the nearest Healiam fair.",
    region: "NY",
  },

  otherFairs: {
    eyebrow: "Other states",
    title: "Healiam fairs in other states",
    sub: "Booking for family elsewhere? These fairs run the same panel at the same price.",
    linkLead: "Blood testing in",
    exclude: "New York",
  },

  sticky: {
    label: "Blood testing for New York",
    sub: `Nearest fair: Rahway, NJ · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage;

export const newYorkDistances = { city: "New York City", miles: fromNyc } as const;
