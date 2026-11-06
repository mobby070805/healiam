// Content for /texas/blood-testing-in-fort-worth, keyword "blood testing in Fort Worth TX". A nearby city
// page (owner, 6 Nov 2026): no Healiam fair in Fort Worth. It is the farthest of the five nearby cities,
// so the page is honest about the drive: Grand Prairie is the shorter trip east, Plano the long one, and
// asking for a Fort Worth fair is offered plainly. Fort Worth is the Tarrant County seat, at the west end
// of DFW. Distances: lib/city-pages.ts (straight line, OpenStreetMap).

import { site } from "@/lib/site";
import { fairHours } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import { dfwDates, dfwFairs, nearby } from "@/lib/pages/nearby-city";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;
const path = "/texas/blood-testing-in-fort-worth";
const near = nearby(path);
const lipids = panelCategories.find((c) => c.slug === "lipids")?.markers ?? [];

export const fortWorth = {
  path,
  keyword: "blood testing in Fort Worth TX",
  near,
  meta: {
    title: `Blood Testing in Fort Worth, TX | ${price} Full Panel | Healiam`,
    description: `Blood testing for Fort Worth, TX: one ${price} panel with every test included, no referral. The nearest Healiam fair is in Grand Prairie, about ${near.toGrandPrairie} miles east.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "Planning the trip", href: "#how-it-works" },
    { label: "Nearest fairs", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Texas", href: "/texas/blood-testing" },
    { name: "Fort Worth" },
  ],

  hero: {
    titleLead: "Blood testing in Fort Worth, TX for",
    titleAccent: price,
    sub: `Fort Worth doesn't have a Healiam fair yet. The closest is in Grand Prairie, about ${near.toGrandPrairie} miles east, where you can get the full panel without a referral or an insurance claim.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Nearest fairs", href: "#locations" },
    ticks: [`Grand Prairie about ${near.toGrandPrairie} miles`, "Lipids and kidney included", "Results in the app"],
  },

  heroVisual: {
    place: "Fort Worth",
    ariaLabel: `Sample Healiam results screen for Fort Worth, TX: lymphocytes flagged low, monocytes, MPV, platelet count and RBC in range, with a results-ready alert and a Fort Worth card: ${price} for every test.`,
    screen: {
      title: "Results",
      sub: "Fort Worth · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "CBC", "Lipids", "Kidney"],
      rows: [
        { name: "Lymphs", value: "18", unit: "%", low: true, pos: 15 },
        { name: "Monocytes", value: "7", unit: "%", low: false, pos: 46 },
        { name: "MPV", value: "10.2", unit: "fL", low: false, pos: 50 },
        { name: "Platelet count", value: "245", unit: "K/µL", low: false, pos: 48 },
        { name: "RBC", value: "4.9", unit: "M/µL", low: false, pos: 50 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    booking: {
      title: "Blood testing in Texas",
      chip: "Testing available",
      lines: [
        { icon: "CircleDollarSign", label: `${price}, every test` },
        { icon: "CreditCard", label: "Card or HSA card" },
        { icon: "Smartphone", label: "No follow-up visit" },
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
    title: "Why Fort Worth blood tests get pushed back",
    sub: "Six reasons that come up again and again. One drive to Grand Prairie takes care of most of them.",
    items: [
      "Assuming every option is a doctor's office",
      "A referral before you can even book",
      "Paying without knowing the price",
      "Cholesterol checked, everything else skipped",
      "A weekday off for one lab visit",
      "Hearing back only at the next appointment",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Nearest fairs", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Weighing the drive from Fort Worth",
    sub: "A Healiam fair is a longer trip than a local clinic. Here's what you get in exchange.",
    usualLabel: "Local clinic",
    oursLabel: "Healiam fair",
    badge: "CLIA-certified",
    note: "The bars are a rough guide, not measurements. Clinic prices are typical US visit plus lab fees.",
    factors: [
      {
        id: "distance",
        tab: "Distance",
        icon: "Car",
        bar: "Drive",
        usual: { value: "Close by", note: "A Fort Worth clinic is the shorter trip.", level: 20 },
        ours: { value: `About ${near.toGrandPrairie} miles`, note: "Grand Prairie, east toward Dallas.", level: 56 },
        cta: { label: "Nearest fairs", href: "#locations" },
      },
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "Visit fee plus lab charges.", level: 100 },
        ours: { value: price, note: "One price, paid when you book.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "visits",
        tab: "Visits",
        icon: "Repeat",
        bar: "Trips in total",
        usual: { value: "Two or three", note: "Order, draw and results, often separately.", level: 78 },
        ours: { value: "One", note: "Results come to your phone, not a follow-up.", level: 20 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "lipids",
        tab: "Coverage",
        icon: "Layers",
        bar: "Tests run",
        usual: { value: "What's ordered", note: "Often a cholesterol check and little else.", level: 30 },
        ours: { value: `${labCategoryCount} categories`, note: "Lipids, kidney, liver, thyroid, blood count and more.", level: 100 },
        cta: { label: "See the full panel", href: "#panel" },
      },
      {
        id: "insurance",
        tab: "Insurance",
        icon: "CreditCard",
        bar: "Paperwork",
        usual: { value: "Plan rules", note: "Coverage checks, copays and claims.", level: 72 },
        ours: { value: "None", note: "Card or HSA card.", level: 12 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "time",
        tab: "Time off",
        icon: "CalendarDays",
        bar: "Work missed",
        usual: { value: "Often a weekday", note: "Clinic and lab hours follow the workweek.", level: 74 },
        ours: { value: "A slot you pick", note: "Booked around your week.", level: 16 },
        cta: { label: "Nearest fairs", href: "#locations" },
      },
    ],
  },

  process: {
    eyebrow: "Planning the trip",
    title: "Planning a test trip from Fort Worth",
    sub: "Give yourself time for the drive; everything else is quick.",
    steps: [
      { title: "Book a time", sub: "Online or in the app" },
      { title: "Fast from dinner", sub: "8 to 12 hours, water only" },
      { title: "Drive east", sub: `About ${near.toGrandPrairie} miles` },
      { title: "Results arrive", sub: "4 to 5 business days" },
    ],
    tip: "Choose a slot that gives you time for the drive east, and keep sipping water while you fast.",
    cta: {
      primary: { label: "Book a time", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "Worth the drive from Fort Worth",
    sub: "One trip out, and this is what comes back to you.",
    items: [
      { icon: "Layers", title: "A wide panel in one go", line: "Lipids, kidney, liver, thyroid and more." },
      { icon: "Smartphone", title: "No second trip", line: "Results come to the app, not a follow-up visit." },
      { icon: "Gauge", title: "Easy-to-read ranges", line: "Low, normal and high, for each marker." },
      { icon: "FileText", title: "Reports your doctor can use", line: "Every sample goes to a CLIA-certified lab." },
      { icon: "ChartLine", title: "A baseline to build on", line: "Every retest adds to the trend." },
      { icon: "FileDown", title: "PDF copy", line: "Keep it or share it with your doctor." },
      { icon: "Users", title: "Bring the family", line: "One booking, everyone added." },
      { icon: "Lock", title: "Just for you", line: "Your employer never sees it." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "What Fort Worth residents get tested for",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, a full lipid profile and kidney function among them, plus biometrics you add yourself.`,
    categories: panelCategories,
    priceCard: {
      label: "Fort Worth",
      line: site.price.panelLine,
      compare: "Local clinic: $100 to $800+ for a visit plus labs",
      fine: "Pay by credit card or HSA card.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Nearest fairs",
    title: "The closest Healiam fairs to Fort Worth",
    sub: "Grand Prairie is the shorter drive; Plano is a long way across the metro. Soonest fair first; miles run straight from downtown Fort Worth to each fair.",
    fairs: dfwFairs,
    hours: fairHours,
    noFair: {
      title: "Want a Fort Worth fair?",
      line: "Tell us where in Fort Worth, and we'll let you know if one is planned.",
      cta: { label: "Ask for a Fort Worth fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Blood testing across Texas", href: "/texas/blood-testing" },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Fort Worth results, on your phone",
    sub: "Free on iPhone and Android. Scan to install, then book your time in the app.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  faq: {
    eyebrow: "Fort Worth questions",
    title: "Blood testing for Fort Worth: your questions",
    sub: "Answers for Fort Worth residents weighing up a Healiam blood test.",
    items: [
      {
        q: "Does Healiam hold fairs in Fort Worth?",
        a: `Not yet. The nearest is in Grand Prairie, about ${near.toGrandPrairie} miles east in a straight line. If you'd use one in Fort Worth, ${link("let us know where", site.links.contact)}.`,
      },
      {
        q: "Is the drive worth it?",
        a: `It's one trip instead of two or three. You get a full panel for ${price}, with no visit fee, and the results come to your phone, so there's no follow-up appointment.`,
      },
      {
        q: "What if the Grand Prairie date doesn't suit me?",
        a: `Plano is the other option, though it's about ${near.toPlano} miles away. Check the ${link("fairs page", site.links.fairs)} for upcoming dates as they're added.`,
      },
      {
        q: "How much is the test?",
        a: `${price} for the ${site.price.panelName}: one complete panel covering all included tests for a single, transparent price. Pay by credit card or HSA card.`,
      },
      {
        q: "Is cholesterol part of the panel?",
        a: `Yes. The lipid section covers ${lipids.join(", ").replace(/, ([^,]*)$/, " and $1")}, and it comes with kidney, liver, thyroid and blood count markers in the same draw.`,
      },
      {
        q: "How do I book?",
        a: `The ${link("Healiam app", "#app")} or the ${link("booking page", book)} both work. Sign up free, then reserve a slot at the ${link("nearest fair", "#locations")}.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Make the trip from Fort Worth",
    sub: "One drive east, and your full report on your phone the week after.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  otherFairs: {
    eyebrow: "Other states",
    title: "Testing for someone out of state?",
    sub: "These Healiam fairs outside Texas run the same panel at the same price.",
    linkLead: "Blood testing in",
    exclude: "Texas",
  },

  sticky: {
    label: "Blood testing in Fort Worth",
    sub: `Nearest fair about ${near.toGrandPrairie} mi · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage & { readonly near: unknown };
