// Content for /new-jersey/blood-testing, keyword "blood testing in New Jersey".
// Design: the Texas page's sections, in the Texas order (owner, 31 Oct 2026). Content: New Jersey's
// own, built around getting to Healiam's one New Jersey fair, Rahway Pharmacy on Irving Street, which
// is a short walk from the Rahway NJ Transit station. Venue, date, parking and access come from
// lib/fairs.ts; nearby towns from the Healiam_Fair_City_Pages sheet (straight-line distances).
// See docs/LOCATION-PAGES-AUDIT.md.

import { site } from "@/lib/site";
import { fairs, fairHours, stateCityLinks } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;

export const newJerseyFairs = fairs.filter((f) => f.region === "NJ");

// "Rahway Sat, Nov 14" for the sticky bar.
const shortDates = newJerseyFairs.map((f) => `${f.locality} ${f.dateLabel.replace(/,\s*\d{4}$/, "")}`).join(" · ");

export const newJersey = {
  path: "/new-jersey/blood-testing",
  // Client's SEO sheet: primary "blood testing in New Jersey"; secondary "blood tests in New Jersey",
  // "blood testing appointments New Jersey", "blood testing near Rahway".
  keyword: "blood testing in New Jersey",
  meta: {
    title: `Blood Testing in New Jersey for ${price} | Rahway | Healiam`,
    description: `Blood testing in New Jersey for ${price} at Healiam's Rahway fair, a walk from NJ Transit. Book online: ${labMeasurementCount} lab measurements, no referral.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "Your visit", href: "#how-it-works" },
    { label: "Rahway date", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in New Jersey" },
  ],

  hero: {
    titleLead: "Your complete blood test in New Jersey for",
    titleAccent: price,
    sub: `Healiam's New Jersey testing morning is at Rahway Pharmacy on Irving Street, a short walk from the NJ Transit station. One ${price} panel, two vials, and no doctor's order or insurance card.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "See the Rahway date", href: "#locations" },
    ticks: ["Walk from the train", "8 to 10 AM Eastern", "No referral or insurance"],
  },

  // Hero phone mockup: same design as every state page, a different illustrative sample on each
  // (Texas: HbA1c, Colorado: iron and Vitamin D, New Jersey: lipids and glucose). Labelled "Sample",
  // not a real customer. pos = dot on a low | normal | high bar (normal is roughly 28% to 72%).
  heroVisual: {
    ariaLabel:
      "Sample Healiam results screen: HDL flagged low, total cholesterol, LDL, TSH and glucose in range, with a results-ready alert and a glucose trend over three tests.",
    screen: {
      title: "Results",
      sub: "Sample · 50+ markers",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Lipids", "Thyroid", "Iron"],
      rows: [
        { name: "HDL", value: "36", unit: "mg/dL", low: true, pos: 16 },
        { name: "Total cholesterol", value: "182", unit: "mg/dL", low: false, pos: 58 },
        { name: "LDL", value: "96", unit: "mg/dL", low: false, pos: 54 },
        { name: "TSH", value: "2.4", unit: "mIU/L", low: false, pos: 50 },
        { name: "Glucose", value: "91", unit: "mg/dL", low: false, pos: 46 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    trend: {
      name: "Glucose",
      sub: "Over 3 tests",
      chip: "In range",
      points: [
        { label: "Test 1", value: "102" },
        { label: "Test 2", value: "97" },
        { label: "Test 3", value: "91" },
      ],
    },
  },

  trust: [
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "ShieldCheck", label: "HIPAA compliant" },
    { icon: "TrainFront", label: "Near NJ Transit" },
    { icon: "Accessibility", label: "Step-free entrance" },
  ],

  // Texas uses this section for pain points; New Jersey uses it for getting to the venue.
  challenges: {
    eyebrow: "Getting there",
    title: "Getting to your New Jersey blood test",
    sub: "Six things to know before you head to Irving Street in Rahway, New Jersey.",
    items: [
      "Take NJ Transit to Rahway station",
      "Walk to 1421 Irving Street",
      "Or park free on Irving Street",
      "Public lot one block east",
      "Street-level, step-free entrance",
      "Arrive between 8 and 10 AM",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See the Rahway date", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Why choose Healiam in New Jersey",
    sub: "Six practical differences between the Rahway fair and getting blood tests in New Jersey through a doctor's office.",
    usualLabel: "Clinic visit",
    oursLabel: "Rahway fair",
    badge: "CLIA-certified",
    note: "The bars are an approximate side by side guide, not measured values. Clinic prices are what a US doctor visit plus lab fees typically cost.",
    factors: [
      {
        id: "travel",
        tab: "Getting there",
        icon: "MapPin",
        bar: "Effort to get there",
        usual: { value: "Drive and park", note: "A trip to a medical office or lab, often with paid parking.", level: 74 },
        ours: { value: "Train or a short walk", note: "Rahway Pharmacy is a short walk from the NJ Transit station.", level: 20 },
        cta: { label: "See the Rahway date", href: "#locations" },
      },
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "Office visit and lab charges, billed separately.", level: 100 },
        ours: { value: price, note: "Paid once for the whole panel, nothing billed later.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "referral",
        tab: "Referral",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "A lab order first", note: "A doctor has to request the tests before any draw.", level: 80 },
        ours: { value: "No order needed", note: "Book the panel yourself in a few minutes.", level: 16 },
        cta: { label: "Book without an order", href: book },
      },
      {
        id: "coverage",
        tab: "Coverage",
        icon: "Layers",
        bar: "Markers covered",
        usual: { value: "A few chosen tests", note: "Whatever was ordered, and nothing else.", level: 26 },
        ours: { value: `${labMeasurementCount} measurements`, note: `${labCategoryCount} lab categories in one draw.`, level: 100 },
        cta: { label: "See every marker", href: "#panel" },
      },
      {
        id: "results",
        tab: "Results",
        icon: "Timer",
        bar: "Wait for answers",
        usual: { value: "Often a follow-up visit", note: "A second appointment to go over the numbers.", level: 78 },
        ours: { value: "4 to 5 business days", note: "Every marker, with its range, in the Healiam app.", level: 32 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "payment",
        tab: "Payment",
        icon: "CreditCard",
        bar: "Paperwork",
        usual: { value: "Insurance forms", note: "Coverage checks, copays and a statement afterwards.", level: 84 },
        ours: { value: "Card or HSA card", note: "No insurance card, so nothing to claim.", level: 12 },
        cta: { label: "Pay by card or HSA", href: book },
      },
    ],
  },

  process: {
    eyebrow: "Your visit",
    title: "How blood testing in New Jersey works",
    sub: "Book the New Jersey date online, fast overnight, and read your results in the app.",
    steps: [
      { title: "Book online", sub: "No doctor's order" },
      { title: "Fast overnight", sub: "8 to 12 hours" },
      { title: "Draw in Rahway", sub: "Two vials, under 7 min" },
      { title: "Results in the app", sub: "4 to 5 business days" },
    ],
    tip: "Water is fine while you fast. Rahway station is a short walk away, so leave the car at home if you like.",
    cta: {
      primary: { label: "Book my visit", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "What your New Jersey blood test includes",
    sub: "Everything that comes with one visit to Healiam's Rahway fair in New Jersey.",
    items: [
      { icon: "FileCheck", title: "Reports a doctor can use", line: "From CLIA-certified partner labs." },
      { icon: "Gauge", title: "Every range shown", line: "Each marker plotted against its reference range." },
      { icon: "ChartLine", title: "Change over time", line: "Test again and each marker builds a trend." },
      { icon: "FileDown", title: "Share in one tap", line: "Download the full report as a PDF." },
      { icon: "Lock", title: "Yours alone", line: "Never shared with an employer or any third party." },
      { icon: "Users", title: "Bring the household", line: "Add each person who is getting tested when you book." },
      { icon: "HeartPulse", title: "Vitals next to labs", line: "Log blood pressure and heart rate in the app." },
      { icon: "Store", title: "A pharmacy setting", line: "A licensed phlebotomist, in a private space." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: `${labMeasurementCount} measurements from one New Jersey draw`,
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories at the Rahway fair in New Jersey, plus biometrics you log in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "Rahway fair",
      line: "One price for the whole panel, every marker included.",
      compare: "Clinic visit: $100 to $800+ for a visit plus labs",
      fine: "Credit card or HSA card. No insurance card needed.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "New Jersey date",
    title: "Blood testing appointments in New Jersey",
    sub: `Book a slot at Rahway Pharmacy on Irving Street, Rahway, New Jersey, ${fairHours.label} Eastern Time. Linden, Clark, Carteret, Roselle and Woodbridge are all within about 3.5 miles in a straight line.`,
    fairs: newJerseyFairs,
    hours: fairHours,
    noFair: {
      title: "Elsewhere in New Jersey?",
      line: "Rahway is our only New Jersey location right now. Tell us your town and we will let you know if a fair is planned.",
      cta: { label: "Ask for a fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "All upcoming fairs", href: site.links.fairs },
    },
  },

  // Links to New Jersey fair cities only, with the towns near each.
  cities: {
    eyebrow: "New Jersey cities",
    title: "Blood testing in New Jersey cities",
    sub: "Rahway is Healiam's New Jersey city. These Union and Middlesex County towns are within about 4 miles of the venue.",
    linkLead: "Blood testing in",
    nearLabel: "Also close to:",
    items: stateCityLinks("NJ"),
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Your New Jersey blood test results, in the Healiam app",
    sub: "Free on iPhone and Android. Install it before your New Jersey testing morning.",
    // No bullet points: the codes sit centred under the heading (client, 2 Nov 2026).
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  // Six questions: three about blood testing in New Jersey, three about Healiam (client, 1 Nov 2026).
  faq: {
    eyebrow: "New Jersey questions",
    title: "Blood testing in New Jersey, answered",
    sub: "Three questions about blood tests in New Jersey, and three about Healiam.",
    items: [
      {
        q: "Is Rahway the only place for blood testing in New Jersey?",
        a: "Yes, for now. Healiam's New Jersey fair is at Rahway Pharmacy, 1421 Irving Street. Send us your town if you need one closer, and we will let you know if a fair is planned.",
      },
      {
        q: "How do I book a blood testing appointment in New Jersey?",
        a: `Book online or in the Healiam app with a free account, then pick a time at the Rahway fair. You can also walk in any time between ${fairHours.label} Eastern; booking just means a shorter wait.`,
      },
      {
        q: "Can I get to the Rahway fair by train or car?",
        a: "Both. The fair is a short walk from the Rahway NJ Transit station. Drivers can use free street parking on Irving Street or the public lot one block east.",
      },
      {
        q: "Who draws my blood at Healiam's New Jersey fair?",
        a: "A licensed phlebotomist, in a private space. It takes two vials and usually under seven minutes, and the entrance is step-free at street level.",
      },
      {
        q: "Can my New Jersey doctor use Healiam results?",
        a: "Yes. Healiam's partner labs are CLIA certified and use FDA-approved equipment. Download the report as a PDF and share it with any doctor.",
      },
      {
        q: "Does Healiam bill insurance in New Jersey?",
        a: `No. Healiam charges one price, ${price} for all ${labMeasurementCount} lab measurements, paid by credit card or HSA card, with nothing billed afterwards.`,
      },
    ],
    help: {
      title: "Still have a question?",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book your New Jersey blood test",
    sub: `Take NJ Transit or park on Irving Street in Rahway, New Jersey, give two vials, and read all ${labMeasurementCount} results in the app 4 to 5 business days later.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  // Last section: fairs in every other state (client, 2 Nov 2026). Links come from lib/fairs.ts.
  otherFairs: {
    eyebrow: "Other states",
    title: "Healiam fairs outside New Jersey",
    sub: "Not in New Jersey on the day? These Healiam fairs in other states run the same 8 to 10 AM mornings.",
    linkLead: "Blood testing in",
    exclude: "New Jersey",
  },

  sticky: {
    label: "New Jersey testing date",
    sub: shortDates,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage;
