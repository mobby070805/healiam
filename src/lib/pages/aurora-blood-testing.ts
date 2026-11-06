// Content for /colorado/blood-testing-in-aurora, keyword "blood testing in Aurora CO". A nearby city page
// (owner, 6 Nov 2026): no Healiam fair in Aurora. Two Colorado fairs are within reach, Denver (northwest
// Denver) and Centennial (south metro), on different days, soonest first. Angle: which one suits which
// side of Aurora. Aurora spans Adams, Arapahoe and Douglas counties. Distances: lib/city-pages.ts
// (straight line, city center to each fair's address, OpenStreetMap).

import { site } from "@/lib/site";
import { fairHours, type Fair } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import { datesIn, fairsIn, nearby } from "@/lib/pages/nearby-city";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;
const path = "/colorado/blood-testing-in-aurora";
const near = nearby(path);
const toDenver = near.to("denver-co");
const toCentennial = near.to("centennial-co");
const coloradoFairs = fairsIn("CO");
/** "Saturday" from "Sat, Nov 14, 2026". */
const weekday = (f: Fair) =>
  ({ Mon: "Monday", Tue: "Tuesday", Wed: "Wednesday", Thu: "Thursday", Fri: "Friday", Sat: "Saturday", Sun: "Sunday" })[f.dateLabel.slice(0, 3)] ?? "";
const denverDay = weekday(coloradoFairs.find((f) => f.slug === "denver-co")!);
const centennialDay = weekday(coloradoFairs.find((f) => f.slug === "centennial-co")!);
const thyroid = panelCategories.find((c) => c.slug === "thyroid")?.markers ?? [];

export const aurora = {
  path,
  keyword: "blood testing in Aurora CO",
  near,
  meta: {
    title: `Blood Testing in Aurora, CO | ${price} Panel, 2 Fairs | Healiam`,
    description: `Blood testing for Aurora, CO: one ${price} panel with every test included. Healiam fairs in Denver and Centennial are about ${toDenver} and ${toCentennial} miles from central Aurora.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "Which fair", href: "#how-it-works" },
    { label: "Colorado fairs", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Colorado", href: "/colorado/blood-testing" },
    { name: "Aurora" },
  ],

  hero: {
    titleLead: "Blood testing in Aurora, CO for",
    titleAccent: price,
    sub: `Aurora sits between two Healiam fairs: Denver to the west and Centennial to the south, on different days. Choose the one that fits, and book without a doctor's order.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Denver or Centennial?", href: "#locations" },
    ticks: ["Two fairs to pick from", "Thyroid panel included", "Card or HSA card"],
  },

  heroVisual: {
    place: "Aurora",
    ariaLabel: `Sample Healiam results screen for Aurora, CO: sodium flagged low, hematocrit, RBC, total cholesterol and free T4 in range, with a results-ready alert and an Aurora card: ${price} for every test.`,
    screen: {
      title: "Results",
      sub: "Aurora · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Electrolytes", "CBC", "Thyroid"],
      rows: [
        { name: "Sodium", value: "134", unit: "mmol/L", low: true, pos: 15 },
        { name: "Hematocrit", value: "45", unit: "%", low: false, pos: 54 },
        { name: "RBC", value: "5.0", unit: "M/µL", low: false, pos: 52 },
        { name: "Total cholesterol", value: "176", unit: "mg/dL", low: false, pos: 48 },
        { name: "Free T4", value: "1.1", unit: "ng/dL", low: false, pos: 44 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    booking: {
      title: "Blood testing in Colorado",
      chip: "Testing available",
      lines: [
        { icon: "CircleDollarSign", label: `${price}, every test` },
        { icon: "Timer", label: "Results in 4-5 days" },
        { icon: "Users", label: "Whole-family booking" },
      ],
    },
  },

  trust: [
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "UserCheck", label: "Licensed phlebotomists" },
    { icon: "ShieldCheck", label: "HIPAA compliant" },
    { icon: "Microscope", label: "FDA-approved equipment" },
  ],

  challenges: {
    eyebrow: "Sound familiar?",
    title: "Why Aurora residents delay blood work",
    sub: "Six reasons it keeps getting moved. With two fairs nearby, at least one date usually fits.",
    items: [
      "Only one day a week that's free",
      "A doctor's visit needed for the order",
      "A surprise bill after the lab",
      "Thyroid left off a routine check",
      "Insurance to sort out first",
      "Waiting on a call about results",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Denver or Centennial?", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Aurora: a clinic visit or a Healiam fair",
    sub: "How a morning at the Denver or Centennial fair compares with blood work through an Aurora clinic.",
    usualLabel: "Aurora clinic",
    oursLabel: "Healiam fair",
    badge: "CLIA-certified",
    note: "The bars are a rough guide, not measurements. Clinic prices are typical US visit plus lab fees.",
    factors: [
      {
        id: "choice",
        tab: "Dates",
        icon: "CalendarDays",
        bar: "Flexibility",
        usual: { value: "Clinic hours", note: "Usually weekdays.", level: 70 },
        ours: { value: "Two fairs", note: `Denver on a ${denverDay}, Centennial on a ${centennialDay}.`, level: 22 },
        cta: { label: "Denver or Centennial?", href: "#locations" },
      },
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "Visit and lab fees.", level: 100 },
        ours: { value: price, note: "Fixed, and paid at booking.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "thyroid",
        tab: "Thyroid",
        icon: "Activity",
        bar: "Included",
        usual: { value: "TSH, maybe", note: "Free T4 and T3 often need a separate request.", level: 34 },
        ours: { value: "Three markers", note: "TSH, Free T4 and Total T3 every time.", level: 100 },
        cta: { label: "See the full panel", href: "#panel" },
      },
      {
        id: "order",
        tab: "Order",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "Appointment first", note: "So a doctor can order the labs.", level: 80 },
        ours: { value: "Book it yourself", note: "Online, in minutes.", level: 16 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "insurance",
        tab: "Insurance",
        icon: "CreditCard",
        bar: "Paperwork",
        usual: { value: "Coverage checks", note: "Copays and claims.", level: 72 },
        ours: { value: "Not needed", note: "Card or HSA card.", level: 12 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "results",
        tab: "Results",
        icon: "Smartphone",
        bar: "Wait to see numbers",
        usual: { value: "Another visit", note: "To go through the numbers.", level: 72 },
        ours: { value: "In the app", note: "4 to 5 business days, with ranges.", level: 30 },
        cta: { label: "Book my test", href: book },
      },
    ],
  },

  process: {
    eyebrow: "Which fair",
    title: "Choosing your fair from Aurora",
    sub: "Pick the day that works, then the rest is the same either way.",
    steps: [
      { title: "Choose Denver or Centennial", sub: "Whichever day suits" },
      { title: "Book a time", sub: "Online or in the app" },
      { title: "Fast overnight", sub: "8 to 12 hours, water's fine" },
      { title: "Results in the app", sub: "4 to 5 business days" },
    ],
    tip: `From central Aurora, the Denver fair is about ${toDenver} miles and Centennial about ${toCentennial}. If you live in south Aurora, Centennial is usually the shorter drive.`,
    cta: {
      primary: { label: "Book a time", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "What an Aurora booking includes",
    sub: "The draw is two vials. Here's the rest.",
    items: [
      { icon: "CalendarDays", title: "Two dates to choose from", line: "Denver and Centennial, on different days." },
      { icon: "Activity", title: "Three thyroid markers", line: "TSH, Free T4 and Total T3." },
      { icon: "Gauge", title: "Normal ranges shown", line: "Low, normal and high, for every result." },
      { icon: "FileText", title: "Something to show your doctor", line: "Checked by CLIA-certified labs." },
      { icon: "ChartLine", title: "Track changes", line: "Each retest adds a point to the trend." },
      { icon: "FileDown", title: "A copy to keep", line: "Download the PDF any time." },
      { icon: "Users", title: "Everyone in one go", line: "Add the household to the booking." },
      { icon: "Lock", title: "Private by design", line: "No one else gets access." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "What's in an Aurora blood test",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, three thyroid markers and electrolytes among them, plus biometrics you add in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "Aurora",
      line: site.price.panelLine,
      compare: "Aurora clinic: $100 to $800+ for a visit plus labs",
      fine: "Pay by credit card or HSA card.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Colorado fairs",
    title: "Healiam fairs within reach of Aurora",
    sub: "Denver to the west, Centennial to the south, soonest first. Miles are measured in a straight line from the middle of Aurora.",
    fairs: coloradoFairs,
    hours: fairHours,
    noFair: {
      title: "A fair in Aurora?",
      line: "If you'd like one in Aurora itself, tell us where.",
      cta: { label: "Ask for an Aurora fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Blood testing across Colorado", href: "/colorado/blood-testing" },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Aurora results, right in the app",
    sub: "Free on iPhone and Android. Install it and choose your fair from your phone.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  faq: {
    eyebrow: "Aurora questions",
    title: "Aurora blood testing: common questions",
    sub: "What Aurora residents usually want to know.",
    items: [
      {
        q: "Can I get tested in Aurora itself?",
        a: `Not in Aurora itself. The closest are in Denver, about ${toDenver} miles away, and Centennial, about ${toCentennial} miles. Want one in Aurora? ${link("Let us know", site.links.contact)}.`,
      },
      {
        q: "Denver or Centennial: which should I pick?",
        a: `Go by the day and by where you live. Denver is on a ${denverDay}, Centennial on a ${centennialDay}, and south Aurora is usually closer to Centennial. Both run the same panel at the same price.`,
      },
      {
        q: "When are the next dates?",
        a: `${datesIn("CO")}, each ${fairHours.label} local time. Later dates appear on the ${link("fairs page", site.links.fairs)}.`,
      },
      {
        q: "Is the price the same at both fairs?",
        a: `Yes. ${price} for the ${site.price.panelName} at Denver or Centennial: one complete panel covering all included tests for a single, transparent price.`,
      },
      {
        q: "Which thyroid tests do I get?",
        a: `${thyroid.join(", ").replace(/, ([^,]*)$/, " and $1")}, in every draw, with lipids, liver, kidney and iron in the same panel.`,
      },
      {
        q: "How do I book?",
        a: `Decide on ${link("Denver or Centennial", "#locations")}, then ${link("book online", book)} or in the ${link("Healiam app", "#app")}. You'll need a free account.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book blood testing from Aurora",
    sub: "Choose Denver or Centennial, give two vials, and read your report the following week.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  otherFairs: {
    eyebrow: "Other states",
    title: "Booking for someone outside Colorado?",
    sub: "The panel and the price are the same at each of these.",
    linkLead: "Blood testing in",
    exclude: "Colorado",
  },

  sticky: {
    label: "Blood testing in Aurora",
    sub: `Fairs in Denver and Centennial · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage & { readonly near: unknown };
