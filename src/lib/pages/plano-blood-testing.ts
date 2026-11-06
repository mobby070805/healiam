// Content for /texas/blood-testing-in-plano, keyword "blood testing in Plano TX" (SEO sheet, P1 core
// city). Design: the state pages' sections in the state-page order (owner, 5 Nov 2026: "design should be
// like the state pages"). A city page first and a fair page second: blood testing in Plano, then the
// next Plano fair (Sat Nov 14). Only the city is named, never the venue: it can change from fair to
// fair (owner, 5 Nov 2026). Each fact is stated once, in the
// section it belongs to, so the hero, bullets and cards don't repeat each other (owner, 5 Nov 2026).
// /fairs/plano-tx stays as it is; this page is separate.
//
// Facts: date and walk-ins from lib/fairs.ts (matches healiam.com/fairs/
// plano-tx); the 12 Jul 2026 Plano fair from healiam.com/fairs/plano-gurukul-tx; nearby towns
// from the Healiam_Fair_City_Pages sheet.

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
  if (!fair) throw new Error(`plano-blood-testing: no fair "${slug}" in lib/fairs.ts`);
  return fair;
}

export const planoFair = fairBySlug("plano-tx");
const grandPrairieFair = fairBySlug("arlington-tx");

const short = (f: Fair) => f.dateLabel.replace(/,\s*\d{4}$/, ""); // "Sat, Nov 14"
const kidneyCount = panelCategories.find((c) => c.slug === "kidney")?.markers.length ?? 0;
const cbcCount = panelCategories.find((c) => c.slug === "cbc")?.markers.length ?? 0;

export const plano = {
  path: "/texas/blood-testing-in-plano",
  keyword: "blood testing in Plano TX",
  meta: {
    title: `Blood Testing in Plano, TX | ${price}, No Referral | Healiam`,
    description: `Blood testing in Plano, TX: one ${price} screening panel with every test included, no referral or insurance. Next Plano fair ${short(planoFair)}. Walk-ins welcome.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "Your visit", href: "#how-it-works" },
    { label: "Plano date", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Texas", href: "/texas/blood-testing" },
    { name: "Plano" },
  ],

  hero: {
    titleLead: "Blood testing in Plano, TX for",
    titleAccent: price,
    sub: "For Plano and southern Collin County: a full preventive panel drawn at a Healiam Saturday morning fair in Plano, with no doctor's order to arrange first.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "See the Plano date", href: "#locations" },
    ticks: ["Walk-ins welcome", `${labMeasurementCount} lab measurements`, "Results in the app"],
  },

  // Hero phone mockup: the state pages' design with Plano's own sample, and a booking card for the Plano
  // fair in place of the state pages' trend card, so the hero names the city (owner, 5 Nov 2026).
  // Labelled "Sample"; not a real customer.
  heroVisual: {
    place: "Plano",
    ariaLabel: `Sample Healiam results screen for Plano, TX: magnesium flagged low, LDL, TSH, creatinine and hemoglobin in range, with a results-ready alert and a Plano card: ${price} for every test.`,
    screen: {
      title: "Results",
      sub: "Plano · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Lipids", "Kidney", "CBC"],
      rows: [
        { name: "Magnesium", value: "1.6", unit: "mg/dL", low: true, pos: 17 },
        { name: "LDL", value: "99", unit: "mg/dL", low: false, pos: 55 },
        { name: "TSH", value: "1.9", unit: "mIU/L", low: false, pos: 45 },
        { name: "Creatinine", value: "1.0", unit: "mg/dL", low: false, pos: 50 },
        { name: "Hemoglobin", value: "13.8", unit: "g/dL", low: false, pos: 47 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    // No fair details on the card: dates and venues change from fair to fair (owner, 6 Nov 2026).
    booking: {
      title: "Blood testing in Texas",
      chip: "Testing available",
      lines: [
        { icon: "CircleDollarSign", label: `${price}, every test` },
        { icon: "Timer", label: "Results in 4-5 days" },
        { icon: "Users", label: "Family bookings" },
      ],
    },
  },

  trust: [
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "UserCheck", label: "Licensed phlebotomists" },
    { icon: "ShieldCheck", label: "HIPAA compliant" },
    { icon: "CreditCard", label: "HSA cards accepted" },
  ],

  challenges: {
    eyebrow: "Sound familiar?",
    title: "Why blood work in Plano gets put off",
    sub: "Six things that keep Plano residents from booking a blood test. The Saturday fair takes each one away.",
    items: [
      "A doctor's visit just to get the order",
      "Lab hours that clash with the workweek",
      "A bill that turns up weeks later",
      "Only a few markers checked at a time",
      "Unsure what insurance will cover",
      "A second visit to hear the numbers",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See the Plano date", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Why Plano residents test with Healiam",
    sub: "How a Saturday morning at the Plano fair compares with arranging blood work through a doctor and a separate lab.",
    usualLabel: "Doctor and lab",
    oursLabel: "Plano fair",
    badge: "CLIA-certified",
    note: "The bars are a rough side by side guide, not measurements. Doctor-and-lab prices are typical US visit plus lab fees.",
    factors: [
      {
        id: "schedule",
        tab: "Schedule",
        icon: "CalendarDays",
        bar: "Time off work",
        usual: { value: "Weekday hours", note: "Lab draws are often fitted around the working week.", level: 80 },
        ours: { value: "Saturday morning", note: `${fairHours.label}, then the rest of the weekend is yours.`, level: 14 },
        cta: { label: "See the Plano date", href: "#locations" },
      },
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "Visit, draw and lab charges can arrive as separate bills.", level: 100 },
        ours: { value: price, note: "One payment at booking covers everything below.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "order",
        tab: "Order",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "Appointment, then order", note: "You see a doctor so the labs can be requested.", level: 82 },
        ours: { value: "Straight to booking", note: "Choose the panel yourself; no order is needed.", level: 16 },
        cta: { label: "Book without an order", href: book },
      },
      {
        id: "scope",
        tab: "Scope",
        icon: "Layers",
        bar: "Markers covered",
        usual: { value: "A short list", note: "Only the tests that were requested get run.", level: 26 },
        ours: { value: `${labCategoryCount} lab categories`, note: "Thyroid, lipids, kidney, liver, iron and more, together.", level: 100 },
        cta: { label: "See the full panel", href: "#panel" },
      },
      {
        id: "follow-up",
        tab: "Follow-up",
        icon: "Timer",
        bar: "Wait to see numbers",
        usual: { value: "Another visit", note: "Results are often explained at a second appointment.", level: 76 },
        ours: { value: "On your phone", note: "Every marker, with its range, in 4 to 5 business days.", level: 30 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "payment",
        tab: "Payment",
        icon: "CreditCard",
        bar: "Coverage questions",
        usual: { value: "Copays, deductibles", note: "What you owe depends on your plan and the codes billed.", level: 70 },
        ours: { value: "Card or HSA card", note: "No insurance claim, so there is nothing to check first.", level: 14 },
        cta: { label: "See the Plano date", href: "#locations" },
      },
    ],
  },

  process: {
    eyebrow: "Your visit",
    title: "How a Plano blood test works",
    sub: "From reserving a time to reading every marker on your phone.",
    steps: [
      { title: "Reserve a time", sub: "Online or in the app" },
      { title: "Stop eating overnight", sub: "8 to 12 hours, water allowed" },
      { title: "Two vials in Plano", sub: "About seven minutes" },
      { title: "Read your report", sub: "4 to 5 business days" },
    ],
    tip: "Skip hard workouts in the 24 hours before your Plano draw; they can shift a few markers.",
    cta: {
      primary: { label: "Reserve a Plano time", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "What you leave the Plano fair with",
    sub: "The draw takes minutes; this is what follows from it.",
    items: [
      { icon: "Gauge", title: "Ranges at a glance", line: "Each result sits on a low, normal and high bar." },
      { icon: "FileText", title: "A report for your doctor", line: "Lab results from CLIA-certified partners." },
      { icon: "ChartLine", title: "A baseline for next time", line: "Retest later and every marker gets a trend line." },
      { icon: "FileDown", title: "A PDF copy", line: "Keep it, print it, or send it on." },
      { icon: "Users", title: "One booking for the family", line: "Add each person when you reserve." },
      { icon: "HeartPulse", title: "Room for vitals", line: "Log blood pressure and weight beside your labs." },
      { icon: "Lock", title: "Private by default", line: "Not shared with an employer or anyone else." },
      { icon: "CalendarCheck", title: "A fair that returns", line: "Healiam tested in Plano in July 2026 too." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "What a Plano blood test covers",
    sub: `${labMeasurementCount} lab measurements in ${labCategoryCount} categories, including a kidney function test (${kidneyCount} markers) and a CBC (${cbcCount} measurements), plus biometrics you add in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "Plano fair",
      line: site.price.panelLine,
      compare: "Doctor and lab: $100 to $800+ for a visit plus labs",
      fine: "Pay by credit card or HSA card.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Plano date",
    title: "Pick a Plano blood testing appointment",
    sub: "The Plano date also suits East Frisco, Far North Dallas and Allen.",
    fairs: [planoFair],
    hours: fairHours,
    noFair: {
      title: `Can't make ${short(planoFair).replace(/^\w+,\s*/, "")}?`,
      line: `Healiam's Grand Prairie fair is a week later, ${short(grandPrairieFair)}.`,
      cta: { label: "See the Grand Prairie fair", href: grandPrairieFair.detailsUrl },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Blood testing across Texas", href: "/texas/blood-testing" },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Plano results arrive in the Healiam app",
    sub: "Free on iPhone and Android. Scan a code to install it before Saturday.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  // Six questions: three about blood testing in Plano, three about Healiam's Plano fair.
  faq: {
    eyebrow: "Plano questions",
    title: "Blood testing in Plano, TX: your questions",
    sub: "Three questions about blood testing in Plano, and three about Healiam's Plano fair.",
    items: [
      {
        q: "Where can I get blood testing in Plano, TX?",
        a: `At Healiam's Plano fair on ${planoFair.dateLabel}, ${fairHours.label} local time. Healiam tests at scheduled morning fairs rather than a lab that is open every day.`,
      },
      {
        q: "How much does a blood test cost in Plano with Healiam?",
        a: `${price} for the ${site.price.panelName}: one complete panel covering all included tests for a single, transparent price. Pay by credit card or HSA card. There is no visit fee, no copay and no bill afterwards, and no insurance is needed.`,
      },
      {
        q: "Can I get a kidney function test or a CBC in Plano?",
        a: `Yes, both are part of the one panel: ${kidneyCount} kidney markers, including creatinine and urea nitrogen, and a CBC of ${cbcCount} measurements of red cells, white cells and platelets. There is nothing extra to order.`,
      },
      {
        q: "How do I book the Plano fair?",
        a: `${link("Book online", book)} or in the ${link("Healiam app", "#app")} with a free account, then pick a time at the ${link("Plano fair", "#locations")}.`,
      },
      {
        q: "What should I do before the Plano fair?",
        a: "Stop eating 8 to 12 hours before your draw; water is fine. Skip hard workouts the day before, as they can shift a few markers. The draw itself is two vials and takes about seven minutes.",
      },
      {
        q: "Has Healiam held fairs in Plano before?",
        a: `Yes. Healiam ran a Plano fair on 12 July 2026. New Plano dates are posted on the ${link("fairs page", site.links.fairs)} as they are scheduled.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book a Saturday blood test in Plano",
    sub: "One Saturday morning in Plano, then your report on your phone the following week.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  otherFairs: {
    eyebrow: "Other states",
    title: "Healiam fairs beyond Plano and Texas",
    sub: "Know someone outside Texas? These Healiam fairs run the same panel at the same price.",
    linkLead: "Blood testing in",
    exclude: "Texas",
  },

  sticky: {
    label: "Blood testing in Plano",
    sub: `Next fair ${short(planoFair)} · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage;
