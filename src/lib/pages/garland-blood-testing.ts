// Content for /texas/blood-testing-in-garland, keyword "blood testing in Garland TX". A nearby city page
// (owner, 6 Nov 2026): Garland has no Healiam fair, so the page points to the closest fairs with the
// distance to each, soonest fair first. Same design as the other city pages; the words are Garland's own.
// Angle: the closest of the five nearby cities to Plano, so the Plano fair is the easy pick. Garland is in
// Dallas County, northeast of Dallas. Distances: lib/city-pages.ts (straight line, OpenStreetMap).

import { site } from "@/lib/site";
import { fairHours } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import { dfwDates, dfwFairs, nearby } from "@/lib/pages/nearby-city";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;
const path = "/texas/blood-testing-in-garland";
const near = nearby(path);
const thyroid = panelCategories.find((c) => c.slug === "thyroid")?.markers ?? [];

export const garland = {
  path,
  keyword: "blood testing in Garland TX",
  near,
  meta: {
    title: `Blood Testing in Garland, TX | ${price}, Near Plano | Healiam`,
    description: `Blood testing for Garland, TX: one ${price} screening panel with every test included, no referral. Healiam's Plano fair is about ${near.toPlano} miles to the north.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "Your visit", href: "#how-it-works" },
    { label: "Nearest fairs", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Texas", href: "/texas/blood-testing" },
    { name: "Garland" },
  ],

  hero: {
    titleLead: "Blood testing in Garland, TX for",
    titleAccent: price,
    sub: `Garland doesn't have a Healiam fair of its own, but Plano's is about ${near.toPlano} miles up the road. Book the full preventive panel there, no doctor's order needed.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "See the nearest fairs", href: "#locations" },
    ticks: [`About ${near.toPlano} miles to Plano`, `${labMeasurementCount} lab measurements`, "Results in the app"],
  },

  // Hero mockup: Garland's own sample (thyroid-led), and a card naming the city with no fair details.
  heroVisual: {
    place: "Garland",
    ariaLabel: `Sample Healiam results screen for Garland, TX: total T3 flagged low, urea nitrogen, AST, chloride and MCH in range, with a results-ready alert and a Garland card: ${price} for every test.`,
    screen: {
      title: "Results",
      sub: "Garland · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Thyroid", "Kidney", "Liver"],
      rows: [
        { name: "Total T3", value: "72", unit: "ng/dL", low: true, pos: 15 },
        { name: "Urea nitrogen", value: "14", unit: "mg/dL", low: false, pos: 48 },
        { name: "AST", value: "22", unit: "U/L", low: false, pos: 44 },
        { name: "Chloride", value: "102", unit: "mmol/L", low: false, pos: 52 },
        { name: "MCH", value: "30", unit: "pg", low: false, pos: 50 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    booking: {
      title: "Blood testing in Texas",
      chip: "Testing available",
      lines: [
        { icon: "CircleDollarSign", label: `${price}, every test` },
        { icon: "CreditCard", label: "Card or HSA card" },
        { icon: "Users", label: "Add family members" },
      ],
    },
  },

  trust: [
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "UserCheck", label: "Licensed phlebotomists" },
    { icon: "Microscope", label: "FDA-approved equipment" },
    { icon: "ShieldCheck", label: "HIPAA compliant" },
  ],

  challenges: {
    eyebrow: "Sound familiar?",
    title: "Why Garland blood work keeps slipping",
    sub: "Six reasons a blood test drops down the list in Garland. A visit to the Plano fair sorts out every one.",
    items: [
      "Not knowing there's a fair nearby",
      "Booking a doctor just to order labs",
      "Lab hours that only fit a weekday",
      "A bill that lands weeks after the draw",
      "A panel limited to what was ordered",
      "A follow-up visit to hear the numbers",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See the nearest fairs", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "A Garland clinic or a Healiam fair",
    sub: "Six ways a short drive to a Healiam fair compares with arranging blood work through a practice in Garland.",
    usualLabel: "Clinic and lab",
    oursLabel: "Healiam fair",
    badge: "CLIA-certified",
    note: "The bars are a rough guide, not measurements. Clinic-and-lab prices are typical US visit plus lab fees.",
    factors: [
      {
        id: "distance",
        tab: "Distance",
        icon: "MapPin",
        bar: "Trips needed",
        usual: { value: "Two stops", note: "A visit for the order, then a separate trip to the lab.", level: 74 },
        ours: { value: `About ${near.toPlano} miles`, note: "One drive north to Plano, one draw, done.", level: 22 },
        cta: { label: "See the nearest fairs", href: "#locations" },
      },
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "Visit fees and lab charges, often billed separately.", level: 100 },
        ours: { value: price, note: "Paid once, when you book.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "order",
        tab: "Lab order",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "Doctor first", note: "Someone has to request the tests for you.", level: 82 },
        ours: { value: "You book it", note: "Pick a time online and the panel is set.", level: 16 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "day",
        tab: "Scheduling",
        icon: "CalendarDays",
        bar: "Time off work",
        usual: { value: "A weekday", note: "Most draw sites keep office hours.", level: 78 },
        ours: { value: "A slot you choose", note: "Booked around your week, not office hours.", level: 14 },
        cta: { label: "See the nearest fairs", href: "#locations" },
      },
      {
        id: "scope",
        tab: "Scope",
        icon: "Layers",
        bar: "Tests run",
        usual: { value: "What was ordered", note: "Anything not on the request is skipped.", level: 28 },
        ours: { value: `${labCategoryCount} categories`, note: "Thyroid, kidney, liver, lipids, iron and more.", level: 100 },
        cta: { label: "See the full panel", href: "#panel" },
      },
      {
        id: "results",
        tab: "Results",
        icon: "Smartphone",
        bar: "Wait to see numbers",
        usual: { value: "A callback", note: "Often explained at a later appointment.", level: 72 },
        ours: { value: "In the app", note: "Every marker with its range, 4 to 5 business days later.", level: 30 },
        cta: { label: "Book my test", href: book },
      },
    ],
  },

  process: {
    eyebrow: "Your visit",
    title: "Getting tested from Garland, step by step",
    sub: "Most of it happens at home. The drive to Plano is the short part.",
    steps: [
      { title: "Pick a time", sub: "Online or in the app" },
      { title: "Fast overnight", sub: "8 to 12 hours, water's fine" },
      { title: "Drive to Plano", sub: `About ${near.toPlano} miles` },
      { title: "Read your report", sub: "4 to 5 business days" },
    ],
    tip: "Have a glass of water before you leave Garland. You can drink water while fasting, and it makes the draw easier.",
    cta: {
      primary: { label: "Pick a time", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "What a Garland resident takes home",
    sub: "Two vials drawn in Plano turn into all of this.",
    items: [
      { icon: "MapPin", title: "A fair close to home", line: `Plano is about ${near.toPlano} miles from Garland.` },
      { icon: "Gauge", title: "Every range, plotted", line: "Every result marked against its normal range." },
      { icon: "FileText", title: "A report your doctor can read", line: "Processed by CLIA-certified labs." },
      { icon: "ChartLine", title: "A starting point", line: "Test again later and each marker gets a trend line." },
      { icon: "FileDown", title: "Your own PDF", line: "Save it, print it or send it on." },
      { icon: "Users", title: "The household in one booking", line: "Add each person as you reserve." },
      { icon: "HeartPulse", title: "Vitals beside labs", line: "Log blood pressure and weight in the app." },
      { icon: "Lock", title: "Your results stay yours", line: "Never handed to an employer or anyone else." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "The tests behind a Garland booking",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, from blood counts and thyroid to liver, kidney and iron, plus biometrics you add in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "Garland",
      line: site.price.panelLine,
      compare: "Clinic and lab: $100 to $800+ for a visit plus labs",
      fine: "Pay by credit card or HSA card.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Nearest fairs",
    title: "Healiam fairs closest to Garland",
    sub: "Plano is the short trip north; Grand Prairie is the other DFW option. Listed soonest first, with straight-line miles from the center of Garland.",
    fairs: dfwFairs,
    hours: fairHours,
    noFair: {
      title: "Want a fair in Garland?",
      line: "Tell us, and we'll let you know if one is planned.",
      cta: { label: "Ask for a Garland fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Blood testing across Texas", href: "/texas/blood-testing" },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Garland results show up in the app",
    sub: "Free on iPhone and Android. Install it before your trip to Plano.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  faq: {
    eyebrow: "Garland questions",
    title: "Blood testing in Garland, TX, answered",
    sub: "What people in Garland ask before they book a Healiam blood test.",
    items: [
      {
        q: "Is there a Healiam fair in Garland?",
        a: `Not yet. The closest is Healiam's Plano fair, about ${near.toPlano} miles from Garland in a straight line. If you'd like one in Garland, ${link("ask us for a Garland fair", site.links.contact)}.`,
      },
      {
        q: "Which fair is easier from Garland, Plano or Grand Prairie?",
        a: `Plano, for most of the city: about ${near.toPlano} miles against about ${near.toGrandPrairie}. Both run the same panel at the same price, and upcoming dates are on the ${link("fairs page", site.links.fairs)}.`,
      },
      {
        q: "What does a blood test cost for someone in Garland?",
        a: `${price} for the ${site.price.panelName}: one complete panel covering all included tests for a single, transparent price. You pay by credit card or HSA card, with no visit fee on top.`,
      },
      {
        q: "Does the panel check my thyroid?",
        a: `Yes. Every draw includes ${thyroid.join(", ").replace(/, ([^,]*)$/, " and $1")}, alongside kidney, liver, lipid and iron markers. There's nothing extra to add.`,
      },
      {
        q: "How do I book from Garland?",
        a: `${link("Book online", book)} or in the ${link("Healiam app", "#app")} with a free account, then choose a time at one of the ${link("nearest fairs", "#locations")}.`,
      },
      {
        q: "What should I do the night before?",
        a: "Stop eating 8 to 12 hours before your draw and keep drinking water. Skip a hard workout that day, since it can nudge a few markers. The draw itself is two vials and takes a few minutes.",
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book the Plano fair from Garland",
    sub: `About ${near.toPlano} miles to the fair, then your full report on your phone the week after.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  otherFairs: {
    eyebrow: "Other states",
    title: "Booking for someone outside Texas?",
    sub: "Every fair listed runs the same panel at the same price.",
    linkLead: "Blood testing in",
    exclude: "Texas",
  },

  sticky: {
    label: "Blood testing in Garland",
    sub: `Plano fair about ${near.toPlano} mi · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage & { readonly near: unknown };
