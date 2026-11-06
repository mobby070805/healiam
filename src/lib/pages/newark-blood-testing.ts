// Content for /new-jersey/blood-testing-in-newark, keyword "blood testing in Newark NJ". A nearby city page
// (owner, 6 Nov 2026): no Healiam fair in Newark; the nearest is Rahway. Angle: Newark is New Jersey's
// largest city and the Essex County seat, and Rahway is a few stops south of Newark Penn Station on NJ
// Transit's Northeast Corridor line; the fair is a short walk from Rahway station (lib/fairs.ts).
// Distances: lib/city-pages.ts (straight line, city center to the fair's address, OpenStreetMap).

import { site } from "@/lib/site";
import { fairHours } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import { datesIn, fairsIn, nearby } from "@/lib/pages/nearby-city";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;
const path = "/new-jersey/blood-testing-in-newark";
const near = nearby(path);
const miles = near.to("rahway-nj");
const kidney = panelCategories.find((c) => c.slug === "kidney")?.markers ?? [];

export const newark = {
  path,
  keyword: "blood testing in Newark NJ",
  near,
  meta: {
    title: `Blood Testing in Newark, NJ | ${price}, Fair by Train | Healiam`,
    description: `Blood testing for Newark, NJ: one ${price} panel with every test included. Healiam's Rahway fair is about ${miles} miles away, a few stops south by NJ Transit.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "By train", href: "#how-it-works" },
    { label: "Nearest fair", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in New Jersey", href: "/new-jersey/blood-testing" },
    { name: "Newark" },
  ],

  hero: {
    titleLead: "Blood testing in Newark, NJ for",
    titleAccent: price,
    sub: `Newark's nearest Healiam fair is in Rahway, a few stops down the line from Newark Penn Station. Book the full preventive panel yourself; there's no doctor's order to get first.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "See the Rahway fair", href: "#locations" },
    ticks: [`About ${miles} miles away`, "No car needed", `${labMeasurementCount} lab measurements`],
  },

  heroVisual: {
    place: "Newark",
    ariaLabel: `Sample Healiam results screen for Newark, NJ: calcium flagged low, RDW-SD, basophils, absolute neutrophils and uric acid in range, with a results-ready alert and a Newark card: ${price} for every test.`,
    screen: {
      title: "Results",
      sub: "Newark · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Kidney", "CBC", "Iron"],
      rows: [
        { name: "Calcium", value: "8.4", unit: "mg/dL", low: true, pos: 15 },
        { name: "RDW-SD", value: "42", unit: "fL", low: false, pos: 50 },
        { name: "Basos", value: "0.5", unit: "%", low: false, pos: 40 },
        { name: "Neutrophils (abs)", value: "3.8", unit: "K/µL", low: false, pos: 48 },
        { name: "Uric acid", value: "5.2", unit: "mg/dL", low: false, pos: 45 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    booking: {
      title: "Blood testing in New Jersey",
      chip: "Testing available",
      lines: [
        { icon: "CircleDollarSign", label: `${price}, every test` },
        { icon: "CreditCard", label: "Card or HSA card" },
        { icon: "Timer", label: "Results in 4-5 days" },
      ],
    },
  },

  trust: [
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "UserCheck", label: "Licensed phlebotomists" },
    { icon: "ShieldCheck", label: "HIPAA compliant" },
    { icon: "Users", label: "Family bookings" },
  ],

  challenges: {
    eyebrow: "Sound familiar?",
    title: "Why Newark residents skip blood work",
    sub: "Six reasons a test gets pushed back in Newark. A short train ride to Rahway handles all of them.",
    items: [
      "Getting to a lab without a car",
      "A doctor's visit before any draw",
      "Finding out the price from the bill",
      "Insurance checks that hold everything up",
      "Uric acid left off a routine panel",
      "Calling around just to hear the results",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See the Rahway fair", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Newark blood work: the usual route or Rahway",
    sub: "Six ways a morning at the Rahway fair compares with sorting out blood work through a Newark practice.",
    usualLabel: "Newark practice",
    oursLabel: "Rahway fair",
    badge: "CLIA-certified",
    note: "The bars are a rough guide, not measurements. Practice prices are typical US visit plus lab fees.",
    factors: [
      {
        id: "getting-there",
        tab: "Getting there",
        icon: "TrainFront",
        bar: "Effort",
        usual: { value: "Two appointments", note: "One to get the order, one for the draw.", level: 72 },
        ours: { value: "One train ride", note: "NJ Transit from Newark Penn, then a short walk.", level: 24 },
        cta: { label: "See the Rahway fair", href: "#locations" },
      },
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "Visit and lab charges, usually separate.", level: 100 },
        ours: { value: price, note: "One payment at booking.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "kidney",
        tab: "Kidney",
        icon: "Bean",
        bar: "Included",
        usual: { value: "Partly", note: "Uric acid usually isn't on a routine panel.", level: 38 },
        ours: { value: "Every draw", note: "Creatinine, urea nitrogen, uric acid and more.", level: 100 },
        cta: { label: "See the full panel", href: "#panel" },
      },
      {
        id: "order",
        tab: "Order",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "Doctor's order", note: "Required before the lab will draw.", level: 80 },
        ours: { value: "None", note: "Book online in a few minutes.", level: 14 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "insurance",
        tab: "Insurance",
        icon: "CreditCard",
        bar: "Paperwork",
        usual: { value: "Plan checks", note: "Copays and claim forms.", level: 72 },
        ours: { value: "Not needed", note: "Credit card or HSA card.", level: 12 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "results",
        tab: "Results",
        icon: "Smartphone",
        bar: "Wait to see numbers",
        usual: { value: "A callback", note: "Or a second appointment.", level: 72 },
        ours: { value: "In the app", note: "Usually 4 to 5 business days after the draw.", level: 30 },
        cta: { label: "Book my test", href: book },
      },
    ],
  },

  process: {
    eyebrow: "By train",
    title: "Newark Penn to Rahway, step by step",
    sub: "Book tonight, catch an early train, and be back in Newark by mid-morning.",
    steps: [
      { title: "Reserve your time", sub: "Online or in the app" },
      { title: "Nothing but water", sub: "8 to 12 hours before" },
      { title: "Newark Penn to Rahway", sub: "NJ Transit, a few stops" },
      { title: "Results in the app", sub: "4 to 5 business days" },
    ],
    tip: `The fair runs ${fairHours.label} local time. Check the NJ Transit timetable the night before so you catch a train that gets you there while you're still fasting.`,
    cta: {
      primary: { label: "Reserve your time", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "What Newark residents take home",
    sub: "The draw is quick. Here's what follows it.",
    items: [
      { icon: "TrainFront", title: "A fair you can reach by train", line: "Rahway station is a short walk away." },
      { icon: "Bean", title: "Kidney function covered", line: "Creatinine, urea nitrogen and more." },
      { icon: "Gauge", title: "Each range marked", line: "See where every result sits." },
      { icon: "FileText", title: "Reports your doctor can trust", line: "Run by CLIA-certified labs." },
      { icon: "ChartLine", title: "Trends on retest", line: "Each marker builds its own line." },
      { icon: "FileDown", title: "PDF on demand", line: "Download or share it any time." },
      { icon: "Users", title: "The family, in one booking", line: "One booking, a report for each person." },
      { icon: "Lock", title: "Kept confidential", line: "Not shared with an employer." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "What's measured for Newark residents",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, kidney function and a full blood count among them, plus biometrics you add in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "Newark",
      line: site.price.panelLine,
      compare: "Newark practice: $100 to $800+ for a visit plus labs",
      fine: "Pay by credit card or HSA card.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Nearest fair",
    title: "Newark's closest Healiam fair",
    sub: "Rahway is the nearest fair to Newark. Distance is in straight-line miles from central Newark.",
    fairs: fairsIn("NJ"),
    hours: fairHours,
    noFair: {
      title: "Want a fair in Newark?",
      line: "Tell us which part of Newark, and we'll let you know if one is planned.",
      cta: { label: "Ask for a Newark fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Blood testing across New Jersey", href: "/new-jersey/blood-testing" },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Your Newark results, in the app",
    sub: "Free on iPhone and Android. Install it now, and book your Rahway time from it.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  faq: {
    eyebrow: "Newark questions",
    title: "Newark blood testing questions",
    sub: "What Newark residents ask before booking a Healiam blood test.",
    items: [
      {
        q: "Does Healiam test in Newark itself?",
        a: `Not yet. The nearest fair is in Rahway, about ${miles} miles from central Newark in a straight line. Want one closer? ${link("Request a Newark fair", site.links.contact)}.`,
      },
      {
        q: "How do I get there without a car?",
        a: "Take NJ Transit's Northeast Corridor line south from Newark Penn Station to Rahway. The fair is a short walk from Rahway station.",
      },
      {
        q: "When is the next Rahway fair?",
        a: `Next up: ${datesIn("NJ")}, ${fairHours.label} local time. New dates go on the ${link("fairs page", site.links.fairs)} as they're scheduled.`,
      },
      {
        q: "What's the price?",
        a: `${price} for the ${site.price.panelName}: one complete panel covering all included tests for a single, transparent price. No insurance claim, no visit fee.`,
      },
      {
        q: "Are kidney tests included?",
        a: `Yes: ${kidney.join(", ").replace(/, ([^,]*)$/, " and $1")}, in every panel, with liver, thyroid and blood count markers in the same draw.`,
      },
      {
        q: "How do I book?",
        a: `It takes a few minutes: ${link("book online", book)} or in the ${link("Healiam app", "#app")} with a free account, and choose your slot at the ${link("Rahway fair", "#locations")}.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book a blood test from Newark",
    sub: "A few stops on NJ Transit, two vials, and your report on your phone the week after.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  otherFairs: {
    eyebrow: "Other states",
    title: "Someone you know outside New Jersey?",
    sub: "Same panel and price at every one of these fairs.",
    linkLead: "Blood testing in",
    exclude: "New Jersey",
  },

  sticky: {
    label: "Blood testing in Newark",
    sub: `Rahway fair about ${miles} mi · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage & { readonly near: unknown };
