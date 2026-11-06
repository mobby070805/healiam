// Content for /texas/blood-testing-in-arlington, keyword "blood testing in Arlington TX". A nearby city
// page (owner, 6 Nov 2026): Arlington has no fair inside its city limits. Healiam's fair list calls the
// Grand Prairie fair "Arlington" (/fairs/arlington-tx), and it sits just east of Arlington in Grand
// Prairie, so this page says so plainly. Arlington is in Tarrant County, between Dallas and Fort Worth.
// Fair cards show the real locality (Grand Prairie). Distances: lib/city-pages.ts (straight line, OSM).

import { site } from "@/lib/site";
import { fairHours } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import { dfwDates, dfwFairs, nearby } from "@/lib/pages/nearby-city";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;
const path = "/texas/blood-testing-in-arlington";
const near = nearby(path);
const electrolytes = panelCategories.find((c) => c.slug === "electrolytes")?.markers ?? [];

export const arlington = {
  path,
  keyword: "blood testing in Arlington TX",
  near,
  meta: {
    title: `Blood Testing in Arlington, TX | ${price}, No Insurance | Healiam`,
    description: `Blood testing for Arlington, TX: one ${price} panel with every test included. Healiam's nearest fair is in Grand Prairie, about ${near.toGrandPrairie} miles from central Arlington.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "Your visit", href: "#how-it-works" },
    { label: "Nearby fairs", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Texas", href: "/texas/blood-testing" },
    { name: "Arlington" },
  ],

  hero: {
    titleLead: "Blood testing in Arlington, TX for",
    titleAccent: price,
    sub: `The Healiam fair people in Arlington use is just over the city line in Grand Prairie, about ${near.toGrandPrairie} miles from the center of town. You book it yourself; no referral, no insurance card.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Nearby fairs", href: "#locations" },
    ticks: [`About ${near.toGrandPrairie} miles away`, `${labMeasurementCount} lab measurements`, "Report on your phone"],
  },

  heroVisual: {
    place: "Arlington",
    ariaLabel: `Sample Healiam results screen for Arlington, TX: carbon dioxide flagged low, LDH, UIBC, direct bilirubin and eosinophils in range, with a results-ready alert and an Arlington card: ${price} for every test.`,
    screen: {
      title: "Results",
      sub: "Arlington · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Electrolytes", "Iron", "Liver"],
      rows: [
        { name: "Carbon dioxide", value: "21", unit: "mmol/L", low: true, pos: 15 },
        { name: "LDH", value: "165", unit: "U/L", low: false, pos: 45 },
        { name: "UIBC", value: "220", unit: "µg/dL", low: false, pos: 50 },
        { name: "Bilirubin direct", value: "0.1", unit: "mg/dL", low: false, pos: 36 },
        { name: "Eos", value: "3", unit: "%", low: false, pos: 44 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    booking: {
      title: "Blood testing in Texas",
      chip: "Testing available",
      lines: [
        { icon: "CircleDollarSign", label: `${price}, every test` },
        { icon: "CreditCard", label: "Card or HSA card" },
        { icon: "Users", label: "Book for the family" },
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
    title: "The usual reasons Arlington puts off blood work",
    sub: "Six of them. A visit to the fair next door in Grand Prairie deals with each.",
    items: [
      "Thinking the nearest option is a hospital lab",
      "Seeing a doctor just to get tests ordered",
      "Prices that only show up on the bill",
      "Iron left off a routine panel",
      "Lab hours that clash with work",
      "Another appointment to go over results",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Nearby fairs", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Arlington: doctor's office or Healiam fair?",
    sub: "Six ways a visit to Grand Prairie compares with getting blood work through a practice in Arlington.",
    usualLabel: "Doctor's office",
    oursLabel: "Healiam fair",
    badge: "CLIA-certified",
    note: "The bars are a rough guide, not measurements. Office-and-lab prices are typical US visit plus lab fees.",
    factors: [
      {
        id: "nearby",
        tab: "Nearby",
        icon: "MapPin",
        bar: "Distance",
        usual: { value: "Office, then lab", note: "Two addresses, two trips.", level: 62 },
        ours: { value: `About ${near.toGrandPrairie} miles`, note: "Just east, over the line in Grand Prairie.", level: 16 },
        cta: { label: "Nearby fairs", href: "#locations" },
      },
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "The visit and the lab, priced separately.", level: 100 },
        ours: { value: price, note: "Known up front, paid at booking.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "iron",
        tab: "Iron",
        icon: "Magnet",
        bar: "Included",
        usual: { value: "Ordered separately", note: "Iron studies aren't part of a routine panel.", level: 36 },
        ours: { value: "Always", note: "Iron and UIBC come with every draw.", level: 100 },
        cta: { label: "See the full panel", href: "#panel" },
      },
      {
        id: "order",
        tab: "Order",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "Appointment first", note: "So the tests can be requested.", level: 80 },
        ours: { value: "Book it yourself", note: "No order needed.", level: 16 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "insurance",
        tab: "Insurance",
        icon: "CreditCard",
        bar: "Paperwork",
        usual: { value: "Copays, claims", note: "What you pay depends on the plan.", level: 72 },
        ours: { value: "Not needed", note: "Credit card or HSA card.", level: 12 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "results",
        tab: "Results",
        icon: "Smartphone",
        bar: "Wait to see numbers",
        usual: { value: "A second visit", note: "Results explained at a follow-up.", level: 74 },
        ours: { value: "In the app", note: "Every marker, 4 to 5 business days later.", level: 30 },
        cta: { label: "Book my test", href: book },
      },
    ],
  },

  process: {
    eyebrow: "Your visit",
    title: "An Arlington test day, planned",
    sub: "Book tonight, fast overnight, and the draw itself takes minutes.",
    steps: [
      { title: "Book tonight", sub: "Online or in the app" },
      { title: "Fast overnight", sub: "8 to 12 hours" },
      { title: "Drive east", sub: `About ${near.toGrandPrairie} miles` },
      { title: "Get the alert", sub: "4 to 5 business days" },
    ],
    tip: "Eat a normal dinner, then nothing but water until your draw. You can eat again as soon as it's done.",
    cta: {
      primary: { label: "Book tonight", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "What comes with an Arlington booking",
    sub: "One draw, and these stay yours.",
    items: [
      { icon: "MapPin", title: "A fair on your doorstep", line: `About ${near.toGrandPrairie} miles from central Arlington.` },
      { icon: "Zap", title: "Electrolytes covered", line: "Sodium, potassium, chloride and more." },
      { icon: "Gauge", title: "Results with context", line: "Each marker against its reference range." },
      { icon: "FileText", title: "Lab-grade reports", line: "Tested at CLIA-certified labs." },
      { icon: "ChartLine", title: "Change over time", line: "Each retest adds to the trend." },
      { icon: "FileDown", title: "Share in one tap", line: "Send the PDF to your doctor." },
      { icon: "Users", title: "Everyone at once", line: "Book the whole household together." },
      { icon: "Lock", title: "Private", line: "Never passed to an employer or third party." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "What an Arlington blood test measures",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, electrolytes, iron and liver function included, plus biometrics you log in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "Arlington",
      line: site.price.panelLine,
      compare: "Office and lab: $100 to $800+ for a visit plus labs",
      fine: "Pay by credit card or HSA card.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Nearby fairs",
    title: "Fairs within reach of Arlington",
    sub: "Grand Prairie is next door; Plano is the longer drive. Ordered by date. Each distance is a straight line from central Arlington to the fair.",
    fairs: dfwFairs,
    hours: fairHours,
    noFair: {
      title: "A fair inside Arlington?",
      line: "If you'd like one, tell us and we'll let you know if it's planned.",
      cta: { label: "Ask for an Arlington fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Blood testing across Texas", href: "/texas/blood-testing" },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Your Arlington results, in one app",
    sub: "Free on iPhone and Android. Install it now and book from your phone.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  faq: {
    eyebrow: "Arlington questions",
    title: "Arlington blood testing questions",
    sub: "Straight answers for people in Arlington before they book.",
    items: [
      {
        q: "Healiam lists an \"Arlington\" fair. Is it in Arlington?",
        a: `It's just outside, in Grand Prairie, about ${near.toGrandPrairie} miles from central Arlington. The ${link("fairs page", site.links.fairs)} lists it as the Arlington fair, but the address is in Grand Prairie.`,
      },
      {
        q: "Is there another fair if that date doesn't work?",
        a: `Yes, Plano, about ${near.toPlano} miles away, with the same panel and price. Both fairs' upcoming dates are on the ${link("fairs page", site.links.fairs)}.`,
      },
      {
        q: "How much will I pay?",
        a: `${price} for the ${site.price.panelName}: one complete panel covering all included tests for a single, transparent price. Paid by card or HSA card, with no bill afterwards.`,
      },
      {
        q: "Which electrolytes are tested?",
        a: `${electrolytes.join(", ").replace(/, ([^,]*)$/, " and $1")}, every time. They sit alongside kidney, liver, thyroid and iron markers in the same draw.`,
      },
      {
        q: "How do I book?",
        a: `Make a free account and ${link("book online", book)}, or use the ${link("Healiam app", "#app")}. The ${link("nearby fairs", "#locations")} are listed above with their dates.`,
      },
      {
        q: "Can I eat before the test?",
        a: "Not for 8 to 12 hours beforehand, but water is fine and helps. Eat as soon as the two vials are drawn.",
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book blood testing next to Arlington",
    sub: "A few miles east, two vials, and your report in the app the following week.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  otherFairs: {
    eyebrow: "Other states",
    title: "Outside Texas, too",
    sub: "Friends or family elsewhere can book the same panel at these Healiam fairs.",
    linkLead: "Blood testing in",
    exclude: "Texas",
  },

  sticky: {
    label: "Blood testing in Arlington",
    sub: `Fair about ${near.toGrandPrairie} mi away · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage & { readonly near: unknown };
