// Content for /georgia/blood-testing, keyword "blood testing in Georgia".
// Design: the Texas page's sections, in the Texas order (owner, 31 Oct 2026); the H1 follows the Texas
// pattern with no city in it (owner, 1 Nov 2026). Content: Georgia's own, built around Healiam's one
// Georgia fair, 755 Longleaf Blvd in Lawrenceville, Gwinnett County, with free parking on site. Venue,
// date and parking come from lib/fairs.ts; nearby towns from the Healiam_Fair_City_Pages sheet
// (straight-line distances: Grayson 5.9 km, Snellville 8.1 km). See docs/LOCATION-PAGES-AUDIT.md.

import { site } from "@/lib/site";
import { fairs, fairHours } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;

export const georgiaFairs = fairs.filter((f) => f.region === "GA");

// "Lawrenceville Sat, Nov 21" for the sticky bar.
const shortDates = georgiaFairs.map((f) => `${f.locality} ${f.dateLabel.replace(/,\s*\d{4}$/, "")}`).join(" · ");

export const georgia = {
  path: "/georgia/blood-testing",
  // Client's SEO sheet: primary "blood testing in Georgia"; secondary "blood tests in Georgia",
  // "blood testing appointments Georgia", "blood testing near Lawrenceville".
  keyword: "blood testing in Georgia",
  meta: {
    title: `Blood Testing in Georgia for ${price} | Lawrenceville | Healiam`,
    description: `Blood testing in Georgia for ${price} at Healiam's Lawrenceville fair in Gwinnett County, free parking. One ${price} screening panel with every test included.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "Your visit", href: "#how-it-works" },
    { label: "Georgia date", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Georgia" },
  ],

  hero: {
    titleLead: "Your complete blood test in Georgia for",
    titleAccent: price,
    sub: `Healiam's Georgia testing morning is on Longleaf Blvd in Lawrenceville, Gwinnett County, with free parking on site. One ${price} panel, two vials, and no doctor's order or insurance card.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "See the Georgia date", href: "#locations" },
    ticks: ["Free parking on site", "8 to 10 AM local time", "No referral or insurance"],
  },

  // Hero phone mockup: same design as every state page, a different illustrative sample on each
  // (Texas: HbA1c, Colorado: iron and Vitamin D, New Jersey: lipids and glucose, Georgia: kidney and
  // liver). Labelled "Sample", not a real customer. pos = dot on a low | normal | high bar (normal is
  // roughly 28% to 72%). The trend card always draws a line falling into the normal band, so pick a
  // marker whose sample values fall.
  heroVisual: {
    // The state in bold on the trend card, as on the city pages (owner, 6 Nov 2026).
    place: "Georgia",
    ariaLabel:
      "Sample Healiam results screen: calcium flagged low, creatinine, ALT, potassium and triglycerides in range, with a results-ready alert and an ALT trend falling into range over three tests.",
    screen: {
      title: "Results",
      sub: "Georgia · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Kidney", "Liver", "Lipids"],
      rows: [
        { name: "Calcium", value: "8.3", unit: "mg/dL", low: true, pos: 18 },
        { name: "Creatinine", value: "0.9", unit: "mg/dL", low: false, pos: 48 },
        { name: "ALT", value: "22", unit: "U/L", low: false, pos: 42 },
        { name: "Potassium", value: "4.2", unit: "mmol/L", low: false, pos: 52 },
        { name: "Triglycerides", value: "118", unit: "mg/dL", low: false, pos: 56 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    trend: {
      name: "ALT",
      sub: "Over 3 tests",
      chip: "In range",
      points: [
        { label: "Test 1", value: "48" },
        { label: "Test 2", value: "34" },
        { label: "Test 3", value: "22" },
      ],
    },
  },

  trust: [
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "ShieldCheck", label: "HIPAA compliant" },
    { icon: "Car", label: "Free parking on site" },
    { icon: "Accessibility", label: "ADA parking at the door" },
  ],

  // Texas uses this section for pain points; Georgia uses it for planning the visit.
  challenges: {
    eyebrow: "Getting there",
    title: "Getting to your Georgia blood test",
    sub: "Six things to know before you drive to Longleaf Blvd in Lawrenceville, Georgia.",
    items: [
      "Head to 755 Longleaf Blvd",
      "In Lawrenceville, Gwinnett County",
      "Park free on site",
      "ADA parking nearest the entrance",
      "Saturday, November 21",
      "Arrive between 8 and 10 AM",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See the Georgia date", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Why choose Healiam in Georgia",
    sub: "Six practical differences between the Lawrenceville fair and getting blood tests in Georgia through a doctor's office.",
    usualLabel: "Clinic visit",
    oursLabel: "Lawrenceville fair",
    badge: "CLIA-certified",
    note: "The bars are an approximate side by side guide, not measured values. Clinic prices are what a US doctor visit plus lab fees typically cost.",
    factors: [
      {
        id: "travel",
        tab: "Parking",
        icon: "MapPin",
        bar: "Effort to get there",
        usual: { value: "Find a spot", note: "A medical office or lab, sometimes with paid or garage parking.", level: 70 },
        ours: { value: "Free on site", note: "Park at the venue, with ADA spaces nearest the entrance.", level: 18 },
        cta: { label: "See the Georgia date", href: "#locations" },
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
    title: "How blood testing in Georgia works",
    sub: "Book the Georgia date online, fast overnight, and read your results in the app.",
    steps: [
      { title: "Book online", sub: "Or in the app" },
      { title: "Fast overnight", sub: "8 to 12 hours" },
      { title: "Draw in Lawrenceville", sub: "Two vials, under 7 min" },
      { title: "Results in the app", sub: "4 to 5 business days" },
    ],
    tip: "Water is fine while you fast. Parking is free on site, so there is no meter to watch while you wait.",
    cta: {
      primary: { label: "Book my visit", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "What your Georgia blood test includes",
    sub: "Everything that comes with one visit to Healiam's Lawrenceville fair in Gwinnett County, Georgia.",
    items: [
      { icon: "FileCheck", title: "Reports a doctor can use", line: "From CLIA-certified partner labs." },
      { icon: "Gauge", title: "Every range shown", line: "Each marker plotted against its reference range." },
      { icon: "ChartLine", title: "Change over time", line: "Test again and each marker builds a trend." },
      { icon: "FileDown", title: "Share in one tap", line: "Download the full report as a PDF." },
      { icon: "Lock", title: "Yours alone", line: "Never shared with an employer or any third party." },
      { icon: "Users", title: "Bring the household", line: "Add each person who is getting tested when you book." },
      { icon: "HeartPulse", title: "Vitals next to labs", line: "Log blood pressure and heart rate in the app." },
      { icon: "Car", title: "Park and walk in", line: "Free parking on site, ADA spaces by the door." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: `${labMeasurementCount} measurements from one Georgia draw`,
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories at the Lawrenceville fair in Georgia, plus biometrics you log in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "Lawrenceville fair",
      line: site.price.panelLine,
      compare: "Clinic visit: $100 to $800+ for a visit plus labs",
      fine: "Credit card or HSA card. No insurance card needed.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Georgia date",
    title: "Georgia fair locations",
    sub: `Book a slot at 755 Longleaf Blvd, Lawrenceville, Georgia, ${fairHours.label} local time. Grayson and Snellville are both within about 5 miles in a straight line.`,
    fairs: georgiaFairs,
    hours: fairHours,
    noFair: {
      title: "Elsewhere in Georgia?",
      line: "Lawrenceville is our only Georgia location right now. Tell us your town and we will let you know if a fair is planned.",
      cta: { label: "Ask for a fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "All upcoming fairs", href: site.links.fairs },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Your Georgia blood test results, in the Healiam app",
    sub: "Free on iPhone and Android. Install it before your Georgia testing morning.",
    // No bullet points: the codes sit centred under the heading (client, 2 Nov 2026).
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  // Six questions: three about blood testing in Georgia, three about Healiam's own fairs in the state (client, 1 Nov 2026). Generic brand
  // questions (what is Healiam, labs, privacy) belong on the home page, not here (owner, 3 Nov 2026).
  faq: {
    eyebrow: "Georgia questions",
    title: "Blood testing in Georgia, answered",
    sub: "Three questions about blood tests in Georgia, and three about Healiam's Lawrenceville fair.",
    items: [
      {
        q: "Is Lawrenceville the only place for blood testing in Georgia?",
        a: `Yes, for now. Healiam's Georgia fair is at 755 Longleaf Blvd, Lawrenceville, in Gwinnett County. ${link("Send us your town", site.links.contact)} if you need one closer, and we will let you know if a fair is planned.`,
      },
      {
        q: "How do I book a blood testing appointment in Georgia?",
        a: `${link("Book online", book)} or in the ${link("Healiam app", "#app")} with a free account, then pick a time at the ${link("Lawrenceville fair", "#locations")}.`,
      },
      {
        q: "Where do I park at the Lawrenceville fair?",
        a: "Parking is free on site, and the ADA-accessible spaces are the ones nearest the entrance.",
      },
      {
        q: "When is Healiam's Georgia fair?",
        a: `Saturday, November 21, ${fairHours.label} local time, at 755 Longleaf Blvd in Lawrenceville. Later Georgia dates are posted on the ${link("fairs page", site.links.fairs)} as they are scheduled.`,
      },
      {
        q: "Which towns is Healiam's Lawrenceville fair close to?",
        a: "Grayson and Snellville are both within about 5 miles of the venue in a straight line, and the fair sits in the heart of Gwinnett County.",
      },
      {
        q: "What should I bring to Healiam's Lawrenceville fair?",
        a: "Your phone with the Healiam app and a credit card or HSA card. No insurance card is needed. Fast for 8 to 12 hours before you arrive; water is fine.",
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book your Georgia blood test",
    sub: `Park free on Longleaf Blvd in Lawrenceville, Georgia, give two vials, and read all ${labMeasurementCount} results in the app 4 to 5 business days later.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  // Georgia city pages, listed just above the other-states section (owner, 6 Nov 2026). Every city
  // page in the state shows here automatically, from lib/fairs.ts and lib/city-pages.ts.
  cityLinks: {
    eyebrow: "Georgia cities",
    title: "Blood testing by Georgia city",
    sub: "Directions, parking and the next date for each Georgia city with a Healiam fair.",
    region: "GA",
  },

  // Last section: fairs in every other state (client, 2 Nov 2026). Links come from lib/fairs.ts.
  otherFairs: {
    eyebrow: "Other states",
    title: "Healiam fairs outside Georgia",
    sub: "Family outside Georgia? Point them to one of these Healiam fairs, with the same panel and price.",
    linkLead: "Blood testing in",
    exclude: "Georgia",
  },

  sticky: {
    label: "Georgia testing date",
    sub: shortDates,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage;
