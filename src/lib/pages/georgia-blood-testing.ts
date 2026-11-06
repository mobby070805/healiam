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
    sub: `Healiam's Georgia testing morning is on Longleaf Blvd in Lawrenceville, Gwinnett County, with free parking on site. A single ${price} panel covers every test, with no doctor's order to get and no insurance card to bring.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "See the Georgia date", href: "#locations" },
    ticks: ["Free parking on site", "Mornings, 8 to 10 local time", "No referral, no insurance card"],
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
    title: "Before you drive to Lawrenceville",
    sub: "Six things to know before you drive to Longleaf Blvd in Lawrenceville, Georgia.",
    items: [
      "Head to 755 Longleaf Blvd",
      "In Lawrenceville, Gwinnett County",
      "Park free on site",
      "ADA parking nearest the entrance",
      "Saturday, November 21",
      "Your slot falls between 8 and 10 AM",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See the Georgia date", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Why choose Healiam in Georgia",
    sub: "How a morning at the Gwinnett County fair stacks up against blood work ordered through a Georgia doctor.",
    usualLabel: "Doctor's office",
    oursLabel: "Lawrenceville fair",
    badge: "CLIA-certified",
    note: "These bars are a simple visual, not measured data. Office figures reflect what a US doctor visit plus lab work usually costs.",
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
    title: "Four steps to a Georgia blood test",
    sub: "Reserve the Lawrenceville date, stop eating the night before, and check the app later that week.",
    steps: [
      { title: "Book online", sub: "Or in the app" },
      { title: "Fast overnight", sub: "8 to 12 hours" },
      { title: "Draw in Lawrenceville", sub: "Two vials, under 7 min" },
      { title: "Results in the app", sub: "4 to 5 business days" },
    ],
    tip: "Plain water is fine during the fast. Parking is free on site, so there's no meter to feed while you wait.",
    cta: {
      primary: { label: "Book my visit", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "Everything a Gwinnett visit gives you",
    sub: "Everything that comes with one visit to Healiam's Lawrenceville fair in Gwinnett County, Georgia.",
    items: [
      { icon: "FileCheck", title: "Reports to take to your doctor", line: "Tested by CLIA-certified partner labs." },
      { icon: "Gauge", title: "Every range shown", line: "Results set against the normal range for each marker." },
      { icon: "ChartLine", title: "Change over time", line: "Your next test adds to each marker's history." },
      { icon: "FileDown", title: "Share in one tap", line: "Save the PDF or send it to your doctor." },
      { icon: "Lock", title: "Yours alone", line: "Kept from employers and third parties." },
      { icon: "Users", title: "Bring the household", line: "Put everyone on the same booking." },
      { icon: "HeartPulse", title: "Vitals next to labs", line: "Track blood pressure and pulse beside your results." },
      { icon: "Car", title: "Park and walk in", line: "Free parking on site, ADA spaces by the door." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "The full panel, drawn in Gwinnett County",
    sub: `Every test below comes from the same two vials: ${labMeasurementCount} lab measurements in ${labCategoryCount} categories, plus biometrics you add yourself.`,
    categories: panelCategories,
    priceCard: {
      label: "Lawrenceville fair",
      line: site.price.panelLine,
      compare: "Doctor's office: $100 to $800+ for a visit plus labs",
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
      line: "Lawrenceville is Healiam's one Georgia fair so far. Let us know where you live and we'll tell you if another is coming.",
      cta: { label: "Ask for a fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "All upcoming fairs", href: site.links.fairs },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Georgia results, delivered to your phone",
    sub: "Free on iPhone and Android. Set it up before your Lawrenceville morning.",
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
    sub: "What Georgia residents ask most, from booking a slot to parking at the fair.",
    items: [
      {
        q: "Does Healiam do blood testing anywhere else in Georgia?",
        a: `Not yet. Lawrenceville, in Gwinnett County, is the only Georgia fair for now. ${link("Tell us your town", site.links.contact)} and we'll say if one is planned nearer to you.`,
      },
      {
        q: "Can I book a Georgia blood testing appointment online?",
        a: `Yes. Set up a free account ${link("online", book)} or in the ${link("Healiam app", "#app")}, choose the ${link("Lawrenceville date", "#locations")} and a time, and you're done.`,
      },
      {
        q: "Where do I park at the Lawrenceville fair?",
        a: "Parking is free on site, and the ADA-accessible spaces are the ones nearest the entrance.",
      },
      {
        q: "When is Healiam's Georgia fair?",
        a: `Saturday, November 21, ${fairHours.label} local time, at 755 Longleaf Blvd in Lawrenceville. New Georgia dates appear on the ${link("fairs page", site.links.fairs)} once they're set.`,
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
    sub: "Pages for Lawrenceville and the Georgia cities around it, with the drive to the fair from each.",
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
