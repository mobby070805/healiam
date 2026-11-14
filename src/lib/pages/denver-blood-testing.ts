// Content for /locations/colorado/denver, keyword "blood testing in Denver CO" (SEO sheet, P1
// core city). Design: the state pages' sections in the state-page order (owner, 5 Nov 2026). A city
// page first and a fair page second: blood testing in Denver and its west and north suburbs, then the
// next fair (Sat, Nov 14), with Centennial on Sunday for the south metro. Only the city is named, never
// the venue: it can change from fair to fair (owner, 5 Nov 2026).
// Each fact is stated once, in the section it belongs to. /fairs/denver-co stays as it is.
//
// Facts: date from lib/fairs.ts (healiam.com/fairs/denver-co does not mention walk-ins, so neither does
// this page); nearby towns from the Healiam_Fair_City_Pages sheet.

import { site } from "@/lib/site";
import { fairs, fairHours, type Fair } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;

function fairBySlug(slug: string): Fair {
  const fair = fairs.find((f) => f.slug === slug);
  if (!fair) throw new Error(`denver-blood-testing: no fair "${slug}" in lib/fairs.ts`);
  return fair;
}

export const denverFair = fairBySlug("denver-co");
const centennialFair = fairBySlug("centennial-co");

const short = (f: Fair) => f.dateLabel.replace(/,\s*\d{4}$/, ""); // "Sat, Nov 14"
const kidneyCount = panelCategories.find((c) => c.slug === "kidney")?.markers.length ?? 0;
const cbcCount = panelCategories.find((c) => c.slug === "cbc")?.markers.length ?? 0;

export const denver = {
  path: "/locations/colorado/denver",
  keyword: "blood testing in Denver CO",
  meta: {
    title: `Blood Testing in Denver, CO | ${price} Panel, No Referral | Healiam`,
    description: `Blood testing in Denver, CO: one ${price} screening panel with every test included, no referral, at Healiam's Denver fair. Book online in minutes.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "Your visit", href: "#how-it-works" },
    { label: "Denver fair", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Colorado", href: "/locations/colorado" },
    { name: "Denver" },
  ],

  hero: {
    titleLead: "Blood testing in Denver, CO for",
    titleAccent: price,
    sub: "One visit to Healiam's Denver fair: two vials, a licensed phlebotomist, and nothing to clear with a doctor or an insurer beforehand.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "See the Denver fair", href: "#locations" },
    ticks: [`${labCategoryCount} lab categories`, "Book online or in the app", "Report in 4 to 5 business days"],
  },

  // Hero phone mockup: the state pages' design with Denver's own sample, and a booking card for the Denver
  // fair in place of the state pages' trend card, so the hero names the city (owner, 5 Nov 2026).
  // Labelled "Sample"; not a real customer.
  heroVisual: {
    place: "Denver",
    ariaLabel: `Sample Healiam results screen for Denver, CO: phosphorus flagged low, hemoglobin, hematocrit, TSH and uric acid in range, with a results-ready alert and a Denver card: ${price} for every test.`,
    screen: {
      title: "Results",
      sub: "Denver · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "CBC", "Kidney", "Thyroid"],
      rows: [
        { name: "Phosphorus", value: "2.3", unit: "mg/dL", low: true, pos: 16 },
        { name: "Hemoglobin", value: "16.2", unit: "g/dL", low: false, pos: 64 },
        { name: "Hematocrit", value: "47", unit: "%", low: false, pos: 62 },
        { name: "TSH", value: "2.2", unit: "mIU/L", low: false, pos: 48 },
        { name: "Uric acid", value: "5.8", unit: "mg/dL", low: false, pos: 52 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    // No fair details on the card: dates and venues change from fair to fair (owner, 6 Nov 2026).
    booking: {
      title: "Blood testing in Colorado",
      chip: "Testing available",
      lines: [
        { icon: "CircleDollarSign", label: `${price}, every test` },
        { icon: "Layers", label: `${labMeasurementCount} lab measurements` },
        { icon: "Users", label: "Family bookings" },
      ],
    },
  },

  trust: [
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "Microscope", label: "FDA-approved equipment" },
    { icon: "ShieldCheck", label: "HIPAA compliant" },
    { icon: "CreditCard", label: "Card or HSA card" },
  ],

  challenges: {
    eyebrow: "Sound familiar?",
    title: "What makes blood work in Denver a chore",
    sub: "Six familiar hurdles for Denver residents. A Healiam fair in the city clears every one.",
    items: [
      "Draw sites that keep weekday hours",
      "An office visit before any labs",
      "Prices you only learn afterwards",
      "A basic panel that misses a lot",
      "Results scattered across portals",
      "Nobody mentioning the altitude",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See the Denver fair", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Healiam or a Denver clinic: the differences",
    sub: "Six ways the Denver fair differs from getting blood work ordered through a clinic in town.",
    usualLabel: "Clinic in town",
    oursLabel: "Denver fair",
    badge: "CLIA-certified",
    note: "The bars are a rough side by side guide, not measurements. Clinic prices are typical US visit plus lab fees.",
    factors: [
      {
        id: "day",
        tab: "Day",
        icon: "CalendarDays",
        bar: "Time off work",
        usual: { value: "A weekday slot", note: "Many draw sites keep office hours only.", level: 80 },
        ours: { value: "Your pick of slot", note: "Reserve a time that fits around work.", level: 14 },
        cta: { label: "See the Denver fair", href: "#locations" },
      },
      {
        id: "cost",
        tab: "Cost",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "An office visit first, lab fees on top.", level: 100 },
        ours: { value: price, note: "A single price per person, set before you arrive.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "ordering",
        tab: "Ordering",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "Order from a provider", note: "Labs are requested on your behalf after a visit.", level: 80 },
        ours: { value: "You choose", note: "Book the panel directly, online or in the app.", level: 16 },
        cta: { label: "Book without an order", href: book },
      },
      {
        id: "breadth",
        tab: "Breadth",
        icon: "Layers",
        bar: "Markers covered",
        usual: { value: "A handful", note: "Usually a basic metabolic or lipid set.", level: 26 },
        ours: { value: `${labMeasurementCount} measurements`, note: "From CBC and thyroid to Vitamin D and iron.", level: 100 },
        cta: { label: "See the full panel", href: "#panel" },
      },
      {
        id: "tracking",
        tab: "Tracking",
        icon: "ChartLine",
        bar: "Effort to follow changes",
        usual: { value: "Separate portals", note: "Each provider keeps its own copy of your numbers.", level: 74 },
        ours: { value: "One timeline", note: "Every retest adds to the same chart in the app.", level: 20 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "results",
        tab: "Results",
        icon: "Timer",
        bar: "Wait to see numbers",
        usual: { value: "A follow-up call", note: "Numbers are often read out at a later appointment.", level: 72 },
        ours: { value: "Straight to the app", note: "Each marker arrives with its own range beside it.", level: 22 },
        cta: { label: "See the Denver fair", href: "#locations" },
      },
    ],
  },

  process: {
    eyebrow: "Your visit",
    title: "From booking to results in Denver",
    sub: "Four steps, most of them done from home.",
    steps: [
      { title: "Pick your slot", sub: "Online or in the app" },
      { title: "No food from the evening", sub: "8 to 12 hours" },
      { title: "Draw in Denver", sub: "Two vials, about 7 min" },
      { title: "Open your results", sub: "4 to 5 business days" },
    ],
    tip: "Keep drinking water while you fast, and skip hard exercise the day before your Denver draw.",
    cta: {
      primary: { label: "Book the Denver date", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "What a Denver draw gives you",
    sub: "Beyond the two vials, here is what you get to keep.",
    items: [
      { icon: "Mountain", title: "Altitude-aware reading", line: "Hemoglobin and hematocrit can run higher a mile up." },
      { icon: "Gauge", title: "Colour-coded ranges", line: "Low, normal or high, marker by marker." },
      { icon: "FileCheck", title: "Lab-grade results", line: "Processed by CLIA-certified partner labs." },
      { icon: "ChartLine", title: "Movement over time", line: "Retest and watch each marker change." },
      { icon: "Share2", title: "Easy to pass on", line: "Send the PDF to whichever doctor you see." },
      { icon: "Users", title: "Household booking", line: "Reserve for everyone in one go." },
      { icon: "HeartPulse", title: "Vitals alongside", line: "Add heart rate and blood pressure yourself." },
      { icon: "Lock", title: "Kept to you", line: "No employer or third party sees your results." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "Inside a Denver blood test",
    sub: `${labCategoryCount} lab categories from one draw, with a ${kidneyCount}-marker kidney function test and a ${cbcCount}-measurement CBC among them, plus biometrics you log in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "Denver fair",
      line: site.price.panelLine,
      compare: "Clinic in town: $100 to $800+ for a visit plus labs",
      fine: "Credit card or HSA card accepted.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Denver date",
    title: "Book a Denver blood testing slot",
    sub: "The Denver date also suits Edgewater, Wheat Ridge, Arvada, Westminster, Lakewood, Commerce City and Federal Heights.",
    fairs: [denverFair],
    hours: fairHours,
    noFair: {
      title: "In the south metro?",
      line: "Healiam's south-metro fair in Centennial runs the same panel at the same price.",
      cta: { label: "See the Centennial fair", href: centennialFair.detailsUrl },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Blood testing across Colorado", href: "/locations/colorado" },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Denver results land in the Healiam app",
    sub: "Free on iPhone and Android. Scan a code and book the Denver date from your phone.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  // Six questions: three about blood testing in Denver, three about Healiam's Denver fair.
  faq: {
    eyebrow: "Denver questions",
    title: "Denver blood testing questions, answered",
    sub: "From altitude to the south-metro option, what Denver people want to know before booking.",
    items: [
      {
        q: "Is there a lab for blood testing in Denver, CO, or is it a fair?",
        a: `It's a fair. Healiam has no lab that opens every day; the fair card on this page shows the next Denver date.`,
      },
      {
        q: "What does blood testing in Denver cost with Healiam?",
        a: `${price} for the ${site.price.panelName}: one complete panel covering all included tests for a single, transparent price. Pay by credit card or HSA card; Healiam does not bill insurance, and there is no separate visit fee.`,
      },
      {
        q: "Does the Denver panel include a kidney function test and a CBC?",
        a: `Yes. Every Denver draw runs the full panel, which includes ${kidneyCount} kidney function markers and a ${cbcCount}-measurement complete blood count, so there is no add-on to choose.`,
      },
      {
        q: "Does living in Denver affect my hemoglobin result?",
        a: "It can. People who live at altitude often have higher hemoglobin and hematocrit, so mention that you live in Denver when you go over those two markers with your doctor.",
      },
      {
        q: "I live in the south metro. Should I still come to Denver?",
        a: `You may find Centennial easier. Healiam's Centennial fair runs the same panel at the same price.`,
      },
      {
        q: "How do I book the Denver date?",
        a: `Sign up for a free Healiam account in the ${link("app", "#app")} or ${link("online", book)}, choose the ${link("Denver date", "#locations")}, add anyone else being tested, and pay ${price} each by card or HSA card.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book blood testing in Denver",
    sub: "A few minutes at the Denver fair, and your report the following week.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  otherFairs: {
    eyebrow: "Other states",
    title: "Fairs for family outside Denver and Colorado",
    sub: "Healiam runs fairs in these states too, with the same panel and price.",
    linkLead: "Blood testing in",
    exclude: "Colorado",
  },

  sticky: {
    label: "Blood testing in Denver",
    sub: `${price} · results in the app`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage;
