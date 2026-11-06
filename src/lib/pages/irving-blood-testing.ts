// Content for /texas/blood-testing-in-irving, keyword "blood testing in Irving TX". A nearby city page
// (owner, 6 Nov 2026): no Healiam fair in Irving, so the page points to the two DFW fairs with the
// distance to each, soonest fair first. Angle: Grand Prairie, Irving's neighbor to the south, is the
// short trip; Plano is the alternative date. Irving is in Dallas County, between Dallas and Fort Worth,
// and includes Las Colinas. Distances: lib/city-pages.ts (straight line, OpenStreetMap).

import { site } from "@/lib/site";
import { fairHours } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import { dfwDates, dfwFairs, nearby } from "@/lib/pages/nearby-city";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;
const path = "/texas/blood-testing-in-irving";
const near = nearby(path);
const cbcCount = panelCategories.find((c) => c.slug === "cbc")?.markers.length ?? 0;

export const irving = {
  path,
  keyword: "blood testing in Irving TX",
  near,
  meta: {
    title: `Blood Testing in Irving, TX | ${price} Health Panel | Healiam`,
    description: `Blood testing for Irving, TX, from Las Colinas to South Irving: one ${price} panel with every test included. Healiam's Grand Prairie fair is about ${near.toGrandPrairie} miles away.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "The visit", href: "#how-it-works" },
    { label: "Closest fairs", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Texas", href: "/texas/blood-testing" },
    { name: "Irving" },
  ],

  hero: {
    titleLead: "Blood testing in Irving, TX for",
    titleAccent: price,
    sub: `From Las Colinas or South Irving, Healiam's Grand Prairie fair is about ${near.toGrandPrairie} miles away. One preventive panel, booked by you, with no referral to chase.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Closest fairs", href: "#locations" },
    ticks: [`About ${near.toGrandPrairie} miles to Grand Prairie`, `${labCategoryCount} lab categories`, "Card or HSA card"],
  },

  heroVisual: {
    place: "Irving",
    ariaLabel: `Sample Healiam results screen for Irving, TX: MCV flagged low, neutrophils, MCHC, alkaline phosphatase and creatine kinase in range, with a results-ready alert and an Irving card: ${price} for every test.`,
    screen: {
      title: "Results",
      sub: "Irving · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "CBC", "Liver", "Kidney"],
      rows: [
        { name: "MCV", value: "78", unit: "fL", low: true, pos: 16 },
        { name: "Neutrophils", value: "55", unit: "%", low: false, pos: 50 },
        { name: "MCHC", value: "33.4", unit: "g/dL", low: false, pos: 48 },
        { name: "Alkaline phosphatase", value: "70", unit: "U/L", low: false, pos: 42 },
        { name: "Creatine kinase", value: "118", unit: "U/L", low: false, pos: 45 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    booking: {
      title: "Blood testing in Texas",
      chip: "Testing available",
      lines: [
        { icon: "CircleDollarSign", label: `${price}, every test` },
        { icon: "Timer", label: "Results in 4-5 days" },
        { icon: "ChartLine", label: "Trends as you retest" },
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
    title: "What stops Irving residents booking a blood test",
    sub: "Six common hold-ups, from Las Colinas offices to South Irving homes. Each one goes away at a Healiam fair.",
    items: [
      "A workweek with no gap for a lab visit",
      "A referral before anything can happen",
      "No price until the bill arrives",
      "Insurance questions you can't answer yet",
      "Basic tests that skip the blood count detail",
      "Waiting on a call about the results",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Closest fairs", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Irving blood work, two ways",
    sub: "Going through a practice in Irving, against booking a Healiam fair yourself.",
    usualLabel: "Practice and lab",
    oursLabel: "Healiam fair",
    badge: "CLIA-certified",
    note: "The bars are a rough guide, not measurements. Practice-and-lab prices are typical US visit plus lab fees.",
    factors: [
      {
        id: "steps",
        tab: "Steps",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "Visit, then order", note: "An appointment so the tests can be requested.", level: 82 },
        ours: { value: "Book and go", note: "Choose a time; the panel is already set.", level: 16 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "trip",
        tab: "Trip",
        icon: "Car",
        bar: "Distance",
        usual: { value: "Clinic, then lab", note: "Sometimes two separate drives.", level: 64 },
        ours: { value: `About ${near.toGrandPrairie} miles`, note: "Grand Prairie is just south of Irving.", level: 18 },
        cta: { label: "Closest fairs", href: "#locations" },
      },
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "Visit and lab can bill separately.", level: 100 },
        ours: { value: price, note: "One payment covers the whole panel.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "cbc",
        tab: "Blood count",
        icon: "Droplet",
        bar: "Detail",
        usual: { value: "If ordered", note: "A full differential isn't always on the request.", level: 34 },
        ours: { value: `${cbcCount} measurements`, note: "Every CBC index, every time.", level: 100 },
        cta: { label: "See the full panel", href: "#panel" },
      },
      {
        id: "payment",
        tab: "Payment",
        icon: "CreditCard",
        bar: "Paperwork",
        usual: { value: "Plan-dependent", note: "Copays, deductibles and claims.", level: 72 },
        ours: { value: "Card or HSA card", note: "No claim, nothing to check first.", level: 12 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "results",
        tab: "Results",
        icon: "Smartphone",
        bar: "Wait to see numbers",
        usual: { value: "At a follow-up", note: "Another appointment to go through them.", level: 74 },
        ours: { value: "On your phone", note: "4 to 5 business days, ranges included.", level: 30 },
        cta: { label: "Book my test", href: book },
      },
    ],
  },

  process: {
    eyebrow: "The visit",
    title: "Booking from Irving, start to finish",
    sub: "A few minutes online, one early morning, then you wait for the app to ping.",
    steps: [
      { title: "Reserve a slot", sub: "Online or in the app" },
      { title: "Skip breakfast", sub: "Fast 8 to 12 hours" },
      { title: "Head to the fair", sub: "Grand Prairie or Plano" },
      { title: "Check your phone", sub: "4 to 5 business days" },
    ],
    tip: "Keep sipping water while you fast. Being well hydrated makes the draw quicker and easier.",
    cta: {
      primary: { label: "Reserve a slot", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "What Irving residents get from one draw",
    sub: "The draw takes minutes. This is what stays with you.",
    items: [
      { icon: "MapPin", title: "A fair next door", line: `Only about ${near.toGrandPrairie} miles to the Grand Prairie fair.` },
      { icon: "Droplet", title: "The full blood count", line: "Red cells, white cells and platelets, in detail." },
      { icon: "Gauge", title: "Clear ranges", line: "Low, normal and high, marked for every result." },
      { icon: "FileText", title: "Lab reports a doctor can use", line: "Run by CLIA-certified partner labs." },
      { icon: "ChartLine", title: "Progress you can see", line: "Retest and watch each marker move." },
      { icon: "FileDown", title: "Yours to keep", line: "Download the PDF whenever you need it." },
      { icon: "Users", title: "Family, same morning", line: "Add each person to the booking." },
      { icon: "Lock", title: "Nobody else sees it", line: "Never shared with an employer." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "Inside an Irving blood test",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, including a ${cbcCount}-measurement blood count and liver function, plus biometrics you add in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "Irving",
      line: site.price.panelLine,
      compare: "Practice and lab: $100 to $800+ for a visit plus labs",
      fine: "Pay by credit card or HSA card.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Closest fairs",
    title: "Where Irving residents get tested",
    sub: "Grand Prairie is the short hop south; Plano is the other DFW date. Earliest date first; distances are straight-line miles from the heart of Irving.",
    fairs: dfwFairs,
    hours: fairHours,
    noFair: {
      title: "A fair in Irving?",
      line: "We'd like to hear if you want one. Send us your part of town.",
      cta: { label: "Ask for an Irving fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Blood testing across Texas", href: "/texas/blood-testing" },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Where your Irving results show up",
    sub: "Free on iPhone and Android. Scan a code and book your slot from the same app.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  faq: {
    eyebrow: "Irving questions",
    title: "Irving blood testing: what people ask",
    sub: "Answers for anyone in Irving thinking about a Healiam blood test.",
    items: [
      {
        q: "Where's the nearest Healiam fair to Irving?",
        a: `Grand Prairie, about ${near.toGrandPrairie} miles from the center of Irving in a straight line. Plano is the other option, about ${near.toPlano} miles away. Coming up: ${dfwDates()}.`,
      },
      {
        q: "I work in Las Colinas. Can I fit this in?",
        a: `The DFW fairs are on weekend mornings, ${fairHours.label} local time, so there's no need to take time off. Pick whichever date suits you on the ${link("fairs page", site.links.fairs)}.`,
      },
      {
        q: "What does it cost?",
        a: `${price} for the ${site.price.panelName}: one complete panel covering all included tests for a single, transparent price. There's no visit fee and nothing billed later.`,
      },
      {
        q: "Is a complete blood count included?",
        a: `Yes. The CBC alone is ${cbcCount} measurements, from red and white cells to platelets and their sizes, and it comes with every draw.`,
      },
      {
        q: "How do I book?",
        a: `With a free account, ${link("book online", book)} or through the ${link("Healiam app", "#app")}. You can pick ${link("Grand Prairie or Plano", "#locations")}, whichever date fits.`,
      },
      {
        q: "Could Healiam hold a fair in Irving?",
        a: `Possibly. Fairs go where people ask for them, so ${link("send us a request", site.links.contact)} and we'll let you know if one is planned.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book your blood test from Irving",
    sub: "A short drive south one weekend morning, and a full report on your phone the week after.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  otherFairs: {
    eyebrow: "Other states",
    title: "Know someone in another state?",
    sub: "They can book the same panel, at the same price, at these Healiam fairs.",
    linkLead: "Blood testing in",
    exclude: "Texas",
  },

  sticky: {
    label: "Blood testing in Irving",
    sub: `Grand Prairie fair about ${near.toGrandPrairie} mi · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage & { readonly near: unknown };
