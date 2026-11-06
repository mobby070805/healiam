// Content for /texas/blood-testing-in-dallas, keyword "blood testing in Dallas TX". A nearby city page
// (owner, 6 Nov 2026): no Healiam fair inside Dallas, so the page points to the two DFW fairs with the
// distance from downtown to each, soonest first. Angle: Dallas sits between the two fairs, so which side
// of the city you live on decides the trip (North Dallas toward Plano, Oak Cliff and the west toward Grand
// Prairie). Dallas County seat. Distances: lib/city-pages.ts (straight line from downtown, OpenStreetMap).

import { site } from "@/lib/site";
import { fairHours } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import { dfwDates, dfwFairs, nearby } from "@/lib/pages/nearby-city";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;
const path = "/texas/blood-testing-in-dallas";
const near = nearby(path);
const pancreas = panelCategories.find((c) => c.slug === "pancreas")?.markers ?? [];

export const dallas = {
  path,
  keyword: "blood testing in Dallas TX",
  near,
  meta: {
    title: `Blood Testing in Dallas, TX | ${price}, No Referral | Healiam`,
    description: `Blood testing for Dallas, TX: one ${price} panel with every test included. Healiam fairs run in Plano and Grand Prairie, both within about 20 miles of downtown.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Fairs near Dallas", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Texas", href: "/texas/blood-testing" },
    { name: "Dallas" },
  ],

  hero: {
    titleLead: "Blood testing in Dallas, TX for",
    titleAccent: price,
    sub: `Two Healiam fairs sit within easy reach of Dallas: Plano to the north and Grand Prairie to the west. Either one runs the full preventive panel, and you won't need a doctor's referral.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Which fair is closer?", href: "#locations" },
    ticks: ["Two fairs to choose from", "No insurance needed", "Report in 4 to 5 business days"],
  },

  heroVisual: {
    place: "Dallas",
    ariaLabel: `Sample Healiam results screen for Dallas, TX: total protein flagged low, lipase, amylase, total bilirubin and RDW in range, with a results-ready alert and a Dallas card: ${price} for every test.`,
    screen: {
      title: "Results",
      sub: "Dallas · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Pancreas", "Liver", "CBC"],
      rows: [
        { name: "Total protein", value: "6.0", unit: "g/dL", low: true, pos: 16 },
        { name: "Lipase", value: "28", unit: "U/L", low: false, pos: 40 },
        { name: "Amylase", value: "64", unit: "U/L", low: false, pos: 46 },
        { name: "Bilirubin total", value: "0.6", unit: "mg/dL", low: false, pos: 40 },
        { name: "RDW", value: "13.1", unit: "%", low: false, pos: 47 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    booking: {
      title: "Blood testing in Texas",
      chip: "Testing available",
      lines: [
        { icon: "CircleDollarSign", label: `${price}, every test` },
        { icon: "Layers", label: `${labCategoryCount} lab categories` },
        { icon: "FileDown", label: "PDF for your doctor" },
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
    title: "What gets in the way of blood work in Dallas",
    sub: "A big city with plenty of labs, and still these six things push a test back.",
    items: [
      "Picking a lab when there are dozens",
      "Getting an order before you can book",
      "Prices nobody quotes up front",
      "Weekday hours across town",
      "A short panel that misses things",
      "Results split across portals",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Which fair is closer?", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "How a Healiam fair stacks up against a Dallas lab visit",
    sub: "The usual Dallas route to blood work, side by side with a morning at a Healiam fair.",
    usualLabel: "Doctor and lab",
    oursLabel: "Healiam fair",
    badge: "CLIA-certified",
    note: "The bars are a rough guide, not measurements. Doctor-and-lab prices are typical US visit plus lab fees.",
    factors: [
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "And you often learn the total afterwards.", level: 100 },
        ours: { value: price, note: "Quoted before you book, paid once.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "choice",
        tab: "Where",
        icon: "MapPin",
        bar: "Hunting for a site",
        usual: { value: "Dozens of labs", note: "Each with its own hours and accepted plans.", level: 70 },
        ours: { value: "Two fairs", note: `Plano about ${near.toPlano} miles, Grand Prairie about ${near.toGrandPrairie}.`, level: 20 },
        cta: { label: "Which fair is closer?", href: "#locations" },
      },
      {
        id: "records",
        tab: "Records",
        icon: "FolderOpen",
        bar: "Places to check",
        usual: { value: "Several portals", note: "One for the clinic, another for the lab.", level: 66 },
        ours: { value: "One app", note: "Every result, range and PDF in one place.", level: 18 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "scope",
        tab: "Coverage",
        icon: "Layers",
        bar: "Tests run",
        usual: { value: "A short list", note: "Only what the order names.", level: 28 },
        ours: { value: `${labMeasurementCount} measurements`, note: "Including pancreas enzymes many routine panels leave out.", level: 100 },
        cta: { label: "See the full panel", href: "#panel" },
      },
      {
        id: "insurance",
        tab: "Insurance",
        icon: "CreditCard",
        bar: "Paperwork",
        usual: { value: "Copays and claims", note: "What you owe depends on the plan.", level: 74 },
        ours: { value: "Not involved", note: "Card or HSA card, nothing to file.", level: 12 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "weekend",
        tab: "Day",
        icon: "CalendarDays",
        bar: "Time off work",
        usual: { value: "Weekday hours", note: "Fitted around the working week.", level: 76 },
        ours: { value: "Weekend mornings", note: `${fairHours.label} local time.`, level: 14 },
        cta: { label: "Which fair is closer?", href: "#locations" },
      },
    ],
  },

  process: {
    eyebrow: "How it works",
    title: "From a Dallas address to your results",
    sub: "Four steps. Choosing the fair is the only real decision.",
    steps: [
      { title: "Choose a fair", sub: "North or west of Dallas" },
      { title: "Book a time", sub: "Online or in the app" },
      { title: "Give two vials", sub: "After an overnight fast" },
      { title: "Open your report", sub: "4 to 5 business days" },
    ],
    tip: "Measuring from downtown, Grand Prairie is the shorter trip. From North Dallas, Plano usually wins.",
    cta: {
      primary: { label: "Book a time", href: book },
      secondary: { label: "Which fair is closer?", href: "#locations" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "Your Dallas test, after the draw",
    sub: "What comes back to you once the vials reach the lab.",
    items: [
      { icon: "Map", title: "A fair on either side", line: "North in Plano, west in Grand Prairie." },
      { icon: "FlaskConical", title: "Pancreas enzymes included", line: "Amylase and lipase come with every draw." },
      { icon: "Gauge", title: "Every number in context", line: "Each marker plotted from low to high." },
      { icon: "FileDown", title: "A PDF for your doctor", line: "Download it or share it in a tap." },
      { icon: "ChartLine", title: "Trends over time", line: "Retest and every marker builds a line." },
      { icon: "Users", title: "One booking, whole family", line: "Add each person when you book." },
      { icon: "HeartPulse", title: "Vitals in the same place", line: "Log blood pressure and heart rate." },
      { icon: "Lock", title: "Kept private", line: "Not shared with an employer or a third party." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "Every marker in a Dallas booking",
    sub: `${labMeasurementCount} lab measurements in ${labCategoryCount} categories, pancreas enzymes, liver function and a full blood count among them, plus biometrics you log yourself.`,
    categories: panelCategories,
    priceCard: {
      label: "Dallas",
      line: site.price.panelLine,
      compare: "Doctor and lab: $100 to $800+ for a visit plus labs",
      fine: "Pay by credit card or HSA card.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Fairs near Dallas",
    title: "Plano or Grand Prairie: pick your side",
    sub: "Both fairs are within about 20 miles of downtown Dallas. Soonest fair first; distances are straight-line miles from downtown.",
    fairs: dfwFairs,
    hours: fairHours,
    noFair: {
      title: "Rather test inside Dallas?",
      line: "There's no Dallas fair yet. Tell us your neighborhood and we'll let you know if one is planned.",
      cta: { label: "Ask for a Dallas fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Blood testing across Texas", href: "/texas/blood-testing" },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Your Dallas numbers, on your phone",
    sub: "Free on iPhone and Android. Scan a code now so it's ready on fair day.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  faq: {
    eyebrow: "Dallas questions",
    title: "Dallas blood testing, your questions answered",
    sub: "The things Dallas residents most often want to know first.",
    items: [
      {
        q: "Does Healiam have a location inside Dallas?",
        a: `Not at the moment. Healiam tests at scheduled fairs, and the two closest to Dallas are in Plano and Grand Prairie. If you'd like one in the city, ${link("tell us your neighborhood", site.links.contact)}.`,
      },
      {
        q: "I live in North Dallas. Which fair should I go to?",
        a: `Plano is usually the easier drive from North Dallas. From downtown it's about ${near.toPlano} miles in a straight line, and the further north you live, the closer it gets.`,
      },
      {
        q: "What about Oak Cliff or west Dallas?",
        a: `Try Grand Prairie. It's about ${near.toGrandPrairie} miles from downtown and lies west of the city. The next dates are ${dfwDates()}; both are on the ${link("fairs page", site.links.fairs)}.`,
      },
      {
        q: "What do I pay for a blood test in Dallas?",
        a: `${price} for the ${site.price.panelName}: one complete panel covering all included tests for a single, transparent price. Healiam doesn't bill insurance, so there's no copay later.`,
      },
      {
        q: "Are pancreas tests part of it?",
        a: `Yes. ${pancreas.join(" and ")} are in every panel, along with liver, kidney, thyroid and lipid markers. You don't choose add-ons; it's all included.`,
      },
      {
        q: "How does booking work for Dallas residents?",
        a: `Pick ${link("Plano or Grand Prairie", "#locations")} first. Then ${link("book online", book)} or open the ${link("Healiam app", "#app")}, make a free account and choose your time.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book blood testing near Dallas",
    sub: "Choose north or west, give two vials one weekend morning, and read your report the next week.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  otherFairs: {
    eyebrow: "Other states",
    title: "Family outside Texas?",
    sub: "Healiam runs the same panel, at the same price, at these fairs too.",
    linkLead: "Blood testing in",
    exclude: "Texas",
  },

  sticky: {
    label: "Blood testing in Dallas",
    sub: `Fairs in Plano and Grand Prairie · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage & { readonly near: unknown };
