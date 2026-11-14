// Content for /locations/new-jersey/jersey-city, keyword "blood testing in Jersey City NJ". A nearby
// city page (owner, 6 Nov 2026): no Healiam fair in Jersey City; the nearest is Rahway. Angle: two ways
// down, by rail (PATH to Newark Penn, then NJ Transit south to Rahway) or by car down the Turnpike, and
// an iron-led sample. Jersey City is the Hudson County seat. Distances: lib/city-pages.ts (straight line,
// city center to the fair's address, OpenStreetMap).

import { site } from "@/lib/site";
import { fairHours } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import { datesIn, fairsIn, nearby } from "@/lib/pages/nearby-city";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;
const path = "/locations/new-jersey/jersey-city";
const near = nearby(path);
const miles = near.to("rahway-nj");
const iron = panelCategories.find((c) => c.slug === "iron")?.markers ?? [];

export const jerseyCity = {
  path,
  keyword: "blood testing in Jersey City NJ",
  near,
  meta: {
    title: `Blood Testing in Jersey City, NJ | ${price} Panel | Healiam`,
    description: `Blood testing for Jersey City, NJ: one ${price} panel with every test included. Healiam's Rahway fair is about ${miles} miles south, by PATH and NJ Transit or by car.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "Rail or road", href: "#how-it-works" },
    { label: "Nearest fair", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in New Jersey", href: "/locations/new-jersey" },
    { name: "Jersey City" },
  ],

  hero: {
    titleLead: "Blood testing in Jersey City, NJ for",
    titleAccent: price,
    sub: `From Journal Square or the waterfront, Healiam's Rahway fair is about ${miles} miles south: PATH and a train, or a short drive. You book it yourself, with no referral and no insurance card.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Rail or road?", href: "#how-it-works" },
    ticks: ["PATH, then NJ Transit", "Iron tests included", "Report on your phone"],
  },

  heroVisual: {
    place: "Jersey City",
    ariaLabel: `Sample Healiam results screen for Jersey City, NJ: iron flagged low, HDL, sodium, immature granulocytes and absolute lymphocytes in range, with a results-ready alert and a Jersey City card: ${price} for every test.`,
    screen: {
      title: "Results",
      sub: "Jersey City · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Iron", "Lipids", "CBC"],
      rows: [
        { name: "Iron", value: "52", unit: "µg/dL", low: true, pos: 14 },
        { name: "HDL", value: "58", unit: "mg/dL", low: false, pos: 55 },
        { name: "Sodium", value: "140", unit: "mmol/L", low: false, pos: 50 },
        { name: "Immature granulocytes", value: "0.3", unit: "%", low: false, pos: 35 },
        { name: "Lymphs (abs)", value: "2.1", unit: "K/µL", low: false, pos: 48 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    booking: {
      title: "Blood testing in New Jersey",
      chip: "Testing available",
      lines: [
        { icon: "CircleDollarSign", label: `${price}, every test` },
        { icon: "Layers", label: `${labMeasurementCount} lab measurements` },
        { icon: "Users", label: "Book for two or more" },
      ],
    },
  },

  trust: [
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "UserCheck", label: "Licensed phlebotomists" },
    { icon: "ShieldCheck", label: "HIPAA compliant" },
    { icon: "CreditCard", label: "Card or HSA card" },
  ],

  challenges: {
    eyebrow: "Sound familiar?",
    title: "Why Jersey City blood work gets put off",
    sub: "Six of the usual reasons. One visit to the Rahway fair takes care of them.",
    items: [
      "Fitting a lab visit around a commute",
      "A doctor's appointment just for the order",
      "No idea what it costs until it's billed",
      "Iron levels never checked",
      "Insurance questions before you can book",
      "A follow-up visit to go over results",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See the Rahway fair", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Jersey City options, side by side",
    sub: "A Jersey City doctor and lab, against a visit to Healiam's Rahway fair.",
    usualLabel: "Doctor and lab",
    oursLabel: "Rahway fair",
    badge: "CLIA-certified",
    note: "The bars are a rough guide, not measurements. Doctor-and-lab prices are typical US visit plus lab fees.",
    factors: [
      {
        id: "iron",
        tab: "Iron",
        icon: "Magnet",
        bar: "Included",
        usual: { value: "Ordered separately", note: "Iron studies aren't on a routine panel.", level: 34 },
        ours: { value: "Always", note: "Iron and UIBC in every draw.", level: 100 },
        cta: { label: "See the full panel", href: "#panel" },
      },
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "Doctor and lab often bill apart.", level: 100 },
        ours: { value: price, note: "Paid once, up front.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "route",
        tab: "Route",
        icon: "TrainFront",
        bar: "Distance",
        usual: { value: "Nearby", note: "A local lab is closer to home.", level: 20 },
        ours: { value: `About ${miles} miles`, note: "PATH and NJ Transit, or the Turnpike.", level: 50 },
        cta: { label: "Rail or road?", href: "#how-it-works" },
      },
      {
        id: "order",
        tab: "Order",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "Appointment first", note: "A doctor has to request the tests.", level: 80 },
        ours: { value: "Book directly", note: "The panel is already set.", level: 16 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "day",
        tab: "Scheduling",
        icon: "CalendarDays",
        bar: "Time off work",
        usual: { value: "Weekday hours", note: "Labs tend to follow office hours.", level: 74 },
        ours: { value: "Your choice of slot", note: "Reserve a time that fits.", level: 14 },
        cta: { label: "See the Rahway fair", href: "#locations" },
      },
      {
        id: "results",
        tab: "Results",
        icon: "Smartphone",
        bar: "Wait to see numbers",
        usual: { value: "At a follow-up", note: "Or a phone call later.", level: 72 },
        ours: { value: "On your phone", note: "Every marker with its range.", level: 30 },
        cta: { label: "Book my test", href: book },
      },
    ],
  },

  process: {
    eyebrow: "Rail or road",
    title: "Jersey City to Rahway, either way",
    sub: "Pick the route that suits you; the rest of the visit is the same.",
    steps: [
      { title: "Book your slot", sub: "Online or in the app" },
      { title: "Fast overnight", sub: "8 to 12 hours" },
      { title: "PATH, then NJ Transit", sub: "Or drive the Turnpike" },
      { title: "See your numbers", sub: "4 to 5 business days" },
    ],
    tip: "By rail, take PATH to Newark Penn Station and change to NJ Transit for Rahway.",
    cta: {
      primary: { label: "Book your slot", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "One draw, and what Jersey City gets back",
    sub: "Two vials in Rahway, and this comes back to you.",
    items: [
      { icon: "Magnet", title: "Iron, not just a CBC", line: "Iron and UIBC with every panel." },
      { icon: "Route", title: "Two ways to get there", line: "Rail or road, whichever suits you." },
      { icon: "Gauge", title: "Ranges spelled out", line: "Low, normal and high for each result." },
      { icon: "FileText", title: "Doctor-ready reports", line: "Lab work by CLIA-certified partners." },
      { icon: "ChartLine", title: "A record over time", line: "Watch each marker over time." },
      { icon: "FileDown", title: "Download anytime", line: "Your report as a PDF." },
      { icon: "Users", title: "Partner or family too", line: "Add them to the same booking." },
      { icon: "Lock", title: "Stays private", line: "Never shared with your employer." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "Every test in a Jersey City booking",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, iron studies included, plus biometrics you log in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "Jersey City",
      line: site.price.panelLine,
      compare: "Doctor and lab: $100 to $800+ for a visit plus labs",
      fine: "Pay by credit card or HSA card.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Nearest fair",
    title: "The fair closest to Jersey City",
    sub: "For Jersey City, Rahway is the closest Healiam fair. The mileage is a straight line from the middle of the city.",
    fairs: fairsIn("NJ"),
    hours: fairHours,
    noFair: {
      title: "A fair in Jersey City?",
      line: "If you'd like one closer to home, let us know where.",
      cta: { label: "Ask for a Jersey City fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Blood testing across New Jersey", href: "/locations/new-jersey" },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Jersey City results, delivered to the app",
    sub: "Free on iPhone and Android. Scan a code, then book from your phone.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  faq: {
    eyebrow: "Jersey City questions",
    title: "Blood testing in Jersey City: answers",
    sub: "Common questions from Jersey City before a Healiam blood test.",
    items: [
      {
        q: "Does Healiam come to Jersey City?",
        a: `No, not yet. The nearest is Rahway, about ${miles} miles south of central Jersey City. To ask for one closer, ${link("send us a request", site.links.contact)}.`,
      },
      {
        q: "What's the easiest way to get to Rahway?",
        a: "By rail, take PATH to Newark Penn Station and change to NJ Transit for Rahway. By car, head south on the Turnpike.",
      },
      {
        q: "Which iron tests are included?",
        a: `${iron.join(" and ")}, every time, alongside a full blood count.`,
      },
      {
        q: "What does it cost from Jersey City?",
        a: `${price} for the ${site.price.panelName}: one complete panel covering all included tests for a single, transparent price. Pay by credit card or HSA card.`,
      },
      {
        q: "Where do I find Rahway dates?",
        a: `They're in the fair card on this page, and the ${link("fairs page", site.links.fairs)} lists new dates as they're added.`,
      },
      {
        q: "How do I book?",
        a: `Reserve your time at the ${link("Rahway fair", "#locations")} through the ${link("booking page", book)} or the ${link("Healiam app", "#app")}. A free account is all you need.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book from Jersey City",
    sub: "Rail or road to Rahway, two vials, and your report the following week.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  otherFairs: {
    eyebrow: "Other states",
    title: "Family or friends in another state?",
    sub: "They can book the same Healiam panel at these fairs.",
    linkLead: "Blood testing in",
    exclude: "New Jersey",
  },

  sticky: {
    label: "Blood testing in Jersey City",
    sub: `Rahway fair about ${miles} mi · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage & { readonly near: unknown };
