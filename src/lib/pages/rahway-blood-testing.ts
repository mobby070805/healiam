// Content for /new-jersey/blood-testing-in-rahway, keyword "blood testing in Rahway NJ" (SEO sheet, P1
// core city). Design: the state pages' sections in the state-page order (owner, 5 Nov 2026). A city
// page first and a fair page second: blood testing in Rahway and the Union and Middlesex County towns
// near it, then the next fair (Sat Nov 14). Only the city is named, never the venue: it can change from
// fair to fair (owner, 5 Nov 2026). Each fact is stated once, in the section it belongs to. /fairs/rahway-nj stays as it is.
//
// Facts: date from lib/fairs.ts (healiam.com/fairs/rahway-nj does not mention walk-ins, so this page
// doesn't either); nearby towns from the Healiam_Fair_City_Pages sheet. Staten Island is left out: booking for
// New York residents is unverified.

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
  if (!fair) throw new Error(`rahway-blood-testing: no fair "${slug}" in lib/fairs.ts`);
  return fair;
}

export const rahwayFair = fairBySlug("rahway-nj");

const dayShort = rahwayFair.dateLabel.replace(/,\s*\d{4}$/, ""); // "Sat, Nov 14"
const monthDay = dayShort.replace(/^\w+,\s*/, ""); // "Nov 14"
const cbcCount = panelCategories.find((c) => c.slug === "cbc")?.markers.length ?? 0;
const kidneyCount = panelCategories.find((c) => c.slug === "kidney")?.markers.length ?? 0;

export const rahway = {
  path: "/new-jersey/blood-testing-in-rahway",
  keyword: "blood testing in Rahway NJ",
  meta: {
    title: `Blood Testing in Rahway, NJ | ${price}, No Insurance | Healiam`,
    description: `Blood testing in Rahway, NJ: one ${price} screening panel with every test included, no referral, at Healiam's Rahway fair in Union County.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "Your visit", href: "#how-it-works" },
    { label: "Rahway fair", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in New Jersey", href: "/new-jersey/blood-testing" },
    { name: "Rahway" },
  ],

  hero: {
    titleLead: "Blood testing in Rahway, NJ for",
    titleAccent: price,
    sub: "For Rahway and the Union and Middlesex County towns around it: a preventive blood panel you book yourself, with no lab order from a doctor and no insurance card to show.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Check the Rahway fair", href: "#locations" },
    ticks: ["Free Healiam account", `${labCategoryCount} lab categories`, "Results on your phone"],
  },

  // Hero phone mockup: the state pages' design with Rahway's own sample, and a booking card for the Rahway
  // fair in place of the state pages' trend card, so the hero names the city (owner, 5 Nov 2026).
  // Labelled "Sample"; not a real customer.
  heroVisual: {
    place: "Rahway",
    ariaLabel: `Sample Healiam results screen for Rahway, NJ: albumin flagged low, triglycerides, free T4, sodium and platelets in range, with a results-ready alert and a Rahway card: ${price} for every test.`,
    screen: {
      title: "Results",
      sub: "Rahway · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Liver", "Lipids", "Thyroid"],
      rows: [
        { name: "Albumin", value: "3.3", unit: "g/dL", low: true, pos: 18 },
        { name: "Triglycerides", value: "128", unit: "mg/dL", low: false, pos: 54 },
        { name: "Free T4", value: "1.2", unit: "ng/dL", low: false, pos: 50 },
        { name: "Sodium", value: "139", unit: "mmol/L", low: false, pos: 49 },
        { name: "Platelets", value: "245", unit: "K/µL", low: false, pos: 46 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    // No fair details on the card: dates and venues change from fair to fair (owner, 6 Nov 2026).
    booking: {
      title: "Blood testing in New Jersey",
      chip: "Testing available",
      lines: [
        { icon: "CircleDollarSign", label: `${price}, every test` },
        { icon: "Timer", label: "Results in 4-5 days" },
        { icon: "Droplet", label: "Two vials, one draw" },
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
    title: "What keeps Rahway from getting blood work done",
    sub: "Six reasons people in and around Rahway put a blood test off. The Healiam fair answers each one.",
    items: [
      "Waiting on a doctor to request tests",
      "Not knowing the price until afterwards",
      "Insurance checks before you can book",
      "A narrow set of tests at a time",
      "A callback just to hear the numbers",
      "No spare hour in the working week",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Check the Rahway fair", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "How the Rahway fair compares with a clinic",
    sub: "Six practical ways a visit to the Rahway fair differs from blood work through a medical office.",
    usualLabel: "Medical office",
    oursLabel: "Rahway fair",
    badge: "CLIA-certified",
    note: "The bars are a rough side by side guide, not measurements. Medical-office prices are typical US visit plus lab fees.",
    factors: [
      {
        id: "day",
        tab: "Day",
        icon: "CalendarDays",
        bar: "Time off work",
        usual: { value: "Weekday office hours", note: "Draws are usually fitted around the working week.", level: 78 },
        ours: { value: "A slot that suits", note: "Book whatever time fits your week.", level: 14 },
        cta: { label: "Check the Rahway fair", href: "#locations" },
      },
      {
        id: "fees",
        tab: "Fees",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "Consultation and lab work, billed apart.", level: 100 },
        ours: { value: price, note: "Known up front, with nothing added after the draw.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "request",
        tab: "Request",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "A doctor's request", note: "The tests have to be ordered for you first.", level: 80 },
        ours: { value: "Your own booking", note: "Pick the panel yourself, in minutes.", level: 16 },
        cta: { label: "Book without an order", href: book },
      },
      {
        id: "range",
        tab: "Range",
        icon: "Layers",
        bar: "Markers covered",
        usual: { value: "Only what's asked", note: "A narrow set chosen at the appointment.", level: 26 },
        ours: { value: `${labCategoryCount} categories`, note: "Blood count to Vitamin D, in one sitting.", level: 100 },
        cta: { label: "See the full panel", href: "#panel" },
      },
      {
        id: "answers",
        tab: "Answers",
        icon: "Timer",
        bar: "Wait for answers",
        usual: { value: "A callback or visit", note: "Numbers are often shared at a follow-up.", level: 76 },
        ours: { value: "In the app", note: "4 to 5 business days, every range shown.", level: 30 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "paying",
        tab: "Paying",
        icon: "CreditCard",
        bar: "Paperwork",
        usual: { value: "Claims and copays", note: "Insurance checks before, statements after.", level: 84 },
        ours: { value: "Card or HSA", note: "Pay once; there is no claim to file.", level: 12 },
        cta: { label: "Pay by card or HSA", href: book },
      },
    ],
  },

  process: {
    eyebrow: "Your visit",
    title: "Booking blood testing in Rahway, step by step",
    sub: "Planned the evening before, done before lunch.",
    steps: [
      { title: "Reserve your slot", sub: "Free Healiam account" },
      { title: "Fast from the evening", sub: "8 to 12 hours, water allowed" },
      { title: "Draw in Rahway", sub: "Two vials, a few minutes" },
      { title: "Report in the app", sub: "4 to 5 business days later" },
    ],
    tip: "Bring your phone with the Healiam app and a card or HSA card. You won't need an insurance card.",
    cta: {
      primary: { label: "Reserve a Rahway slot", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "After your Rahway draw",
    sub: "What comes back to you once the vials are on their way to the lab.",
    items: [
      { icon: "Bell", title: "A ping when it's ready", line: "The app alerts you as soon as results land." },
      { icon: "Smartphone", title: "Results that travel", line: "Your report stays on your phone, wherever you go." },
      { icon: "Gauge", title: "Plain ranges", line: "Every marker placed against its reference range." },
      { icon: "FileCheck", title: "Results to review", line: "From CLIA-certified labs, ready for your doctor." },
      { icon: "ChartLine", title: "Progress over time", line: "Each retest extends your trend lines." },
      { icon: "FileDown", title: "Saved as a PDF", line: "Download the full report in one tap." },
      { icon: "Users", title: "Everyone in one booking", line: "Add household members as you reserve." },
      { icon: "Lock", title: "Confidential", line: "Never passed to employers or third parties." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "The tests in every Rahway draw",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, among them a ${cbcCount}-measurement complete blood count and ${kidneyCount} kidney function markers, plus biometrics you log yourself.`,
    categories: panelCategories,
    priceCard: {
      label: "Rahway fair",
      line: site.price.panelLine,
      compare: "Medical office: $100 to $800+ for a visit plus labs",
      fine: "Credit card or HSA card.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Rahway date",
    title: "Reserve a Rahway blood test date",
    sub: "Close enough for Linden, Clark, Roselle and Cranford in Union County, and Avenel, Colonia, Carteret and Woodbridge in Middlesex County.",
    fairs: [rahwayFair],
    hours: fairHours,
    noFair: {
      title: "Need a date nearer home?",
      line: "Rahway is Healiam's only New Jersey fair for now. Send us your town and we'll say if another is planned.",
      cta: { label: "Request a fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Blood testing across New Jersey", href: "/new-jersey/blood-testing" },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Read your Rahway results in the Healiam app",
    sub: "Free on iPhone and Android. Scan a code now and reserve your Rahway slot from the same app.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  // Six questions: three about blood testing in Rahway, three about Healiam's Rahway fair.
  faq: {
    eyebrow: "Rahway questions",
    title: "Questions about blood testing in Rahway",
    sub: "Short answers for Rahway and the Union County towns around it.",
    items: [
      {
        q: "When does blood testing in Rahway, NJ happen?",
        a: `On fair days only; between fairs, Healiam has no lab of its own in Rahway. The fair card on this page shows the next date.`,
      },
      {
        q: "What does a blood test in Rahway cost with Healiam?",
        a: `${price} for the ${site.price.panelName}: one complete panel covering all included tests for a single, transparent price. You pay by credit card or HSA card, so there is no insurance claim to file.`,
      },
      {
        q: "Is a CBC or a kidney function test part of the Rahway panel?",
        a: `Both come with every Rahway draw: the CBC's ${cbcCount} measurements of blood cells and platelets, and ${kidneyCount} kidney markers including creatinine and urea nitrogen.`,
      },
      {
        q: "Do I need to fast before the Rahway blood test?",
        a: "Yes, for 8 to 12 hours beforehand. Water is fine, and you can eat again as soon as the two vials are drawn.",
      },
      {
        q: "Can I book for my family at the Rahway fair?",
        a: `Yes. Add each person when you reserve; everyone gets the full panel for ${price} and a report of their own.`,
      },
      {
        q: "Will Healiam keep coming back to Rahway?",
        a: `New dates go up on the ${link("fairs page", site.links.fairs)} when they are scheduled. ${link("Send us a request", site.links.contact)} if you would like another Rahway date.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book blood testing in Rahway",
    sub: "Reserve your slot tonight and read your report the week after the fair.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  otherFairs: {
    eyebrow: "Other states",
    title: "Other Healiam fairs, away from Rahway",
    sub: "Booking for someone outside New Jersey? These fairs run the same panel and price.",
    linkLead: "Blood testing in",
    exclude: "New Jersey",
  },

  sticky: {
    label: "Blood testing in Rahway",
    sub: `${price} · two vials`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage;
