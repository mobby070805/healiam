// Content for /locations/new-jersey, keyword "blood testing in New Jersey".
// Design: the Texas page's sections, in the Texas order (owner, 31 Oct 2026). Content: New Jersey's
// own, built around getting to Healiam's one New Jersey fair, Rahway Pharmacy on Irving Street, which
// is a short walk from the Rahway NJ Transit station. Venue, date, parking and access come from
// lib/fairs.ts; nearby towns from the Healiam_Fair_City_Pages sheet (straight-line distances).
// See docs/LOCATION-PAGES-AUDIT.md.

import { site } from "@/lib/site";
import { fairs, fairHours } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;

export const newJerseyFairs = fairs.filter((f) => f.region === "NJ");

// "Rahway Sat, Nov 14" for the sticky bar.
const shortDates = newJerseyFairs.map((f) => `${f.locality} ${f.dateLabel.replace(/,\s*\d{4}$/, "")}`).join(" · ");

export const newJersey = {
  path: "/locations/new-jersey",
  // Client's SEO sheet: primary "blood testing in New Jersey"; secondary "blood tests in New Jersey",
  // "blood testing appointments New Jersey", "blood testing near Rahway".
  keyword: "blood testing in New Jersey",
  meta: {
    title: `Blood Testing in New Jersey for ${price} | Rahway | Healiam`,
    description: `Blood testing in New Jersey for ${price} at Healiam's Rahway fair in Union County. One ${price} screening panel with every test included.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "Your visit", href: "#how-it-works" },
    { label: "Rahway fair", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in New Jersey" },
  ],

  hero: {
    titleLead: "Your complete blood test in New Jersey for",
    titleAccent: price,
    sub: `Healiam tests New Jersey residents at its Rahway fair in Union County. One ${price} panel, two vials, and you won't need a doctor's order or an insurance card.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "See the Rahway fair", href: "#locations" },
    ticks: ["Rahway, Union County", "Two vials, one panel", "No referral or insurance"],
  },

  // Hero phone mockup: same design as every state page, a different illustrative sample on each
  // (Texas: HbA1c, Colorado: iron and Vitamin D, New Jersey: lipids and glucose). Labelled "Sample",
  // not a real customer. pos = dot on a low | normal | high bar (normal is roughly 28% to 72%).
  heroVisual: {
    // The state in bold on the trend card, as on the city pages (owner, 6 Nov 2026).
    place: "New Jersey",
    ariaLabel:
      "Sample Healiam results screen: HDL flagged low, total cholesterol, LDL, TSH and glucose in range, with a results-ready alert and a glucose trend over three tests.",
    screen: {
      title: "Results",
      sub: "New Jersey · Sample",
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
    { icon: "UserCheck", label: "Licensed phlebotomists" },
    { icon: "CreditCard", label: "Card or HSA card" },
  ],

  // Texas uses this section for pain points; New Jersey uses it for getting ready (no venue or timing: they change).
  challenges: {
    eyebrow: "Before you go",
    title: "Getting ready for a New Jersey blood test",
    sub: "Six things to know before your visit to the Rahway fair.",
    items: [
      "Book a time online or in the app",
      "Stop eating 8 to 12 hours before",
      "Keep drinking water while you fast",
      "Skip hard exercise the day before",
      "Bring your phone and a card or HSA card",
      "Add family members to one booking",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See the Rahway fair", href: "#locations" },
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
        id: "booking",
        tab: "Booking",
        icon: "MapPin",
        bar: "Steps to book",
        usual: { value: "Call around", note: "Phoning offices to find a lab appointment.", level: 74 },
        ours: { value: "A few taps", note: "Reserve online or in the Healiam app.", level: 20 },
        cta: { label: "See the Rahway fair", href: "#locations" },
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
    title: "A New Jersey blood test, start to finish",
    sub: "Reserve Rahway online, take the train or drive down, and read every marker in the app.",
    steps: [
      { title: "Book online", sub: "Or in the app" },
      { title: "Fast overnight", sub: "8 to 12 hours" },
      { title: "Draw in Rahway", sub: "Two vials, under 7 min" },
      { title: "Results in the app", sub: "4 to 5 business days" },
    ],
    tip: "Water is fine while you fast, and it makes the draw easier.",
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
      { icon: "UserCheck", title: "A licensed phlebotomist", line: "Every draw in a private space." },
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
      line: site.price.panelLine,
      compare: "Clinic visit: $100 to $800+ for a visit plus labs",
      fine: "Credit card or HSA card. No insurance card needed.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Where to test",
    title: "New Jersey fair locations",
    sub: "Healiam's New Jersey fair is in Rahway, close to Linden, Clark, Carteret, Roselle and Woodbridge.",
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

  app: {
    eyebrow: "The Healiam app",
    title: "Where your New Jersey results arrive",
    sub: "Free on iPhone and Android. Download it before you head to Rahway.",
    // No bullet points: the codes sit centred under the heading (client, 2 Nov 2026).
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  // Six questions: three about blood testing in New Jersey, three about Healiam's own fairs in the state (client, 1 Nov 2026). Generic brand
  // questions (what is Healiam, labs, privacy) belong on the home page, not here (owner, 3 Nov 2026).
  faq: {
    eyebrow: "New Jersey questions",
    title: "Blood testing in New Jersey, answered",
    sub: "New Jersey questions on booking, getting to Rahway and what the visit is like.",
    items: [
      {
        q: "Is Rahway the only place for blood testing in New Jersey?",
        a: `Yes, for now: Rahway is Healiam's only New Jersey fair city. ${link("Send us your town", site.links.contact)} if you need one closer, and we will let you know if a fair is planned.`,
      },
      {
        q: "How do blood testing appointments in New Jersey work with Healiam?",
        a: `You reserve a time at the ${link("Rahway fair", "#locations")} yourself, ${link("online", book)} or in the ${link("Healiam app", "#app")}, using a free account. Then you just turn up.`,
      },
      {
        q: "Do I need to fast before a New Jersey blood test?",
        a: "Yes, for 8 to 12 hours. Water is fine, and you can eat as soon as the draw is done.",
      },
      {
        q: "Who takes my blood?",
        a: "A licensed phlebotomist, in a private space. It's two vials and usually takes under seven minutes.",
      },
      {
        q: "Where can I see upcoming New Jersey dates?",
        a: `In the fair card above and on the ${link("fairs page", site.links.fairs)}. If none is listed, ${link("send us your town", site.links.contact)} and we will let you know.`,
      },
      {
        q: "Can I bring my family to Healiam's Rahway fair?",
        a: `Yes. Add each person who is getting tested when you book, and each pays the same ${price} for the full panel. Everyone needs to fast for 8 to 12 hours first.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book your New Jersey blood test",
    sub: `Book the Rahway fair, give two vials, and read all ${labMeasurementCount} results in the app 4 to 5 business days later.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  // New Jersey city pages, listed just above the other-states section (owner, 6 Nov 2026). Every city
  // page in the state shows here automatically, from lib/fairs.ts and lib/city-pages.ts.
  cityLinks: {
    eyebrow: "New Jersey cities",
    title: "Blood testing by New Jersey city",
    sub: "Rahway, plus Newark and Jersey City, each with how far it is to the fair.",
    region: "NJ",
  },

  // Last section: fairs in every other state (client, 2 Nov 2026). Links come from lib/fairs.ts.
  otherFairs: {
    eyebrow: "Other states",
    title: "Healiam fairs outside New Jersey",
    sub: "Not in New Jersey? These Healiam fairs in other states run the same panel.",
    linkLead: "Blood testing in",
    exclude: "New Jersey",
  },

  sticky: {
    label: "Blood testing in New Jersey",
    sub: `${price} · every test included`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage;
