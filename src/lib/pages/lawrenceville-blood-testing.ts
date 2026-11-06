// Content for /georgia/blood-testing-in-lawrenceville, keyword "blood testing in Lawrenceville GA" (SEO
// sheet, P1 core city). Design: the state pages' sections in the state-page order (owner, 5 Nov 2026). A
// city page first and a fair page second: blood testing in Lawrenceville and nearby Gwinnett towns, then
// the next fair (Sat Nov 21). Only the city is named, never the venue: it can change from fair to fair
// (owner, 5 Nov 2026). Each fact is stated once, in the section it belongs to,
// and the wording differs from the Georgia state page. /fairs/lawrenceville-ga stays as it is.
//
// Facts: county and date from lib/fairs.ts (healiam.com/fairs/lawrenceville-ga says nothing about
// walk-ins, so neither does this page); Grayson, Snellville and Dacula from the Healiam_Fair_City_Pages
// sheet.

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
  if (!fair) throw new Error(`lawrenceville-blood-testing: no fair "${slug}" in lib/fairs.ts`);
  return fair;
}

export const lawrencevilleFair = fairBySlug("lawrenceville-ga");

const dayShort = lawrencevilleFair.dateLabel.replace(/,\s*\d{4}$/, ""); // "Sat, Nov 21"
const monthDay = dayShort.replace(/^\w+,\s*/, ""); // "Nov 21"
const cbcCount = panelCategories.find((c) => c.slug === "cbc")?.markers.length ?? 0;
const kidneyCount = panelCategories.find((c) => c.slug === "kidney")?.markers.length ?? 0;

export const lawrenceville = {
  path: "/georgia/blood-testing-in-lawrenceville",
  keyword: "blood testing in Lawrenceville GA",
  meta: {
    title: `Blood Testing in Lawrenceville, GA | ${price}, Gwinnett | Healiam`,
    description: `Blood testing in Lawrenceville, GA: one ${price} screening panel with every test included, no referral or insurance. Next fair ${dayShort}, ${fairHours.label} local time.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "Your visit", href: "#how-it-works" },
    { label: "Lawrenceville date", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Georgia", href: "/georgia/blood-testing" },
    { name: "Lawrenceville" },
  ],

  hero: {
    titleLead: "Blood testing in Lawrenceville, GA for",
    titleAccent: price,
    sub: "In the Gwinnett County seat, at a Healiam Saturday morning fair: a preventive panel with no doctor's order to get and no insurer to involve.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "See the Lawrenceville date", href: "#locations" },
    ticks: [`${labMeasurementCount} lab measurements`, "HSA cards accepted", "Report sent to your phone"],
  },

  // Hero phone mockup: the state pages' design with Lawrenceville's own sample, and a booking card for the Lawrenceville
  // fair in place of the state pages' trend card, so the hero names the city (owner, 5 Nov 2026).
  // Labelled "Sample"; not a real customer.
  heroVisual: {
    place: "Lawrenceville",
    ariaLabel: `Sample Healiam results screen for Lawrenceville, GA: ferritin flagged low, cholesterol, Vitamin D, ALT and white cell count in range, with a results-ready alert and a Lawrenceville card: ${price} for every test.`,
    screen: {
      title: "Results",
      sub: "Lawrenceville · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Iron", "Lipids", "Liver"],
      rows: [
        { name: "Ferritin", value: "14", unit: "ng/mL", low: true, pos: 13 },
        { name: "Cholesterol", value: "188", unit: "mg/dL", low: false, pos: 58 },
        { name: "Vitamin D", value: "34", unit: "ng/mL", low: false, pos: 44 },
        { name: "ALT", value: "24", unit: "U/L", low: false, pos: 40 },
        { name: "WBC", value: "6.1", unit: "K/µL", low: false, pos: 47 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    // No fair details on the card: dates and venues change from fair to fair (owner, 6 Nov 2026).
    booking: {
      title: "Blood testing in Georgia",
      chip: "Testing available",
      lines: [
        { icon: "CircleDollarSign", label: `${price}, every test` },
        { icon: "CreditCard", label: "No insurance needed" },
        { icon: "Users", label: "Family bookings" },
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
    title: "Blood work in Lawrenceville, minus the usual hurdles",
    sub: "Six common reasons Gwinnett residents delay a blood test, each one handled by the Healiam fair.",
    items: [
      "A practice visit before any lab work",
      "Two bills: the visit and the lab",
      "Copays that change with your plan",
      "Routine sets that skip thyroid or iron",
      "Hearing back only at the next visit",
      "Labs that close on the weekend",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See the Lawrenceville date", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Lawrenceville fair versus the usual lab route",
    sub: "Six differences between a Saturday at the Lawrenceville fair and having blood work ordered through a practice.",
    usualLabel: "Usual lab route",
    oursLabel: "Lawrenceville fair",
    badge: "CLIA-certified",
    note: "The bars are a rough side by side guide, not measurements. Usual-route prices are typical US visit plus lab fees.",
    factors: [
      {
        id: "payment",
        tab: "Payment",
        icon: "CreditCard",
        bar: "Coverage questions",
        usual: { value: "Insurance first", note: "Coverage and copays get checked before the draw.", level: 70 },
        ours: { value: "Card or HSA card", note: "No claim or explanation of benefits to follow.", level: 12 },
        cta: { label: "See the Lawrenceville date", href: "#locations" },
      },
      {
        id: "spend",
        tab: "Spend",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "A practice visit plus the lab's own bill.", level: 100 },
        ours: { value: price, note: "Fixed per person and paid when you book.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "paperwork",
        tab: "Order",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "Get it ordered", note: "A provider has to send the lab request.", level: 80 },
        ours: { value: "Book it yourself", note: "No request or referral to wait for.", level: 16 },
        cta: { label: "Book without an order", href: book },
      },
      {
        id: "panel",
        tab: "Panel",
        icon: "Layers",
        bar: "Markers covered",
        usual: { value: "What was requested", note: "Often a narrow routine set.", level: 26 },
        ours: { value: `${labMeasurementCount} measurements`, note: "Thyroid, iron, Vitamin D and more, together.", level: 100 },
        cta: { label: "See the full panel", href: "#panel" },
      },
      {
        id: "turnaround",
        tab: "Turnaround",
        icon: "Timer",
        bar: "Wait for answers",
        usual: { value: "Wait for a call", note: "Results may come at the next appointment.", level: 76 },
        ours: { value: "4 to 5 business days", note: "Sent to the app with every range marked.", level: 30 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "weekend",
        tab: "Weekend",
        icon: "CalendarDays",
        bar: "Time off work",
        usual: { value: "Weekday hours", note: "Draw sites often close at weekends.", level: 78 },
        ours: { value: "Saturday, 8 to 10 AM", note: "Testing done before the weekend gets busy.", level: 14 },
        cta: { label: "See the Lawrenceville date", href: "#locations" },
      },
    ],
  },

  process: {
    eyebrow: "Your visit",
    title: "Your Lawrenceville visit, start to finish",
    sub: "Most of it happens before you get in the car.",
    steps: [
      { title: "Pick your time online", sub: "In the app or on the web" },
      { title: "Skip breakfast", sub: "Fast 8 to 12 hours, water is fine" },
      { title: "Come to the fair", sub: "Check in, two vials" },
      { title: "Check the app", sub: "Results in 4 to 5 business days" },
    ],
    tip: "Avoid strenuous exercise the day before your Lawrenceville draw; it can nudge a few markers.",
    cta: {
      primary: { label: "Pick a Lawrenceville time", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "What comes with a Lawrenceville test",
    sub: "The pieces that stay useful long after Saturday.",
    items: [
      { icon: "Share2", title: "Simple to share", line: "Forward the report to your Gwinnett doctor." },
      { icon: "Gauge", title: "Ranges you can read", line: "Each marker against low, normal and high." },
      { icon: "FileCheck", title: "Certified results", line: "Handled by CLIA-certified partner labs." },
      { icon: "ChartLine", title: "Trends on retest", line: "Every new draw adds a point to the chart." },
      { icon: "FileDown", title: "Report on file", line: "Download a PDF whenever you need it." },
      { icon: "Users", title: "Book the family", line: "Add each person in a single booking." },
      { icon: "HeartPulse", title: "Your vitals too", line: "Log blood pressure and temperature in the app." },
      { icon: "Lock", title: "Results stay private", line: "Not shared with employers or third parties." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "Everything measured in a Lawrenceville draw",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, kidney function and a ${cbcCount}-measurement CBC among them, plus biometrics you add in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "Lawrenceville fair",
      line: site.price.panelLine,
      compare: "Usual lab route: $100 to $800+ for a visit plus labs",
      fine: "Credit card or HSA card.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Lawrenceville date",
    title: "The Lawrenceville date and booking",
    sub: "The Lawrenceville date is also a short drive from Grayson, Snellville and Dacula.",
    fairs: [lawrencevilleFair],
    hours: fairHours,
    noFair: {
      title: "Further across Georgia?",
      line: "This is Healiam's only Georgia fair at the moment. Send us your town and we'll tell you if one is planned nearer.",
      cta: { label: "Ask for a fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Blood testing across Georgia", href: "/georgia/blood-testing" },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Lawrenceville results, straight to the Healiam app",
    sub: "Free on iPhone and Android. Book your Lawrenceville time in it, then find your report there afterwards.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  // Six questions: three about blood testing in Lawrenceville, three about Healiam's Lawrenceville fair.
  faq: {
    eyebrow: "Lawrenceville questions",
    title: "Lawrenceville blood testing: common questions",
    sub: "Three questions about blood testing in Lawrenceville, and three about Healiam's Lawrenceville fair.",
    items: [
      {
        q: "Where can I get blood testing in Lawrenceville, GA?",
        a: `At Healiam's Lawrenceville fair on ${lawrencevilleFair.dateLabel}, ${fairHours.label} local time. Healiam runs scheduled fairs rather than a lab that opens every day.`,
      },
      {
        q: "How much is blood testing in Lawrenceville with Healiam?",
        a: `${price} for the ${site.price.panelName}: one complete panel covering all included tests for a single, transparent price. Pay by credit card or HSA card. Healiam doesn't take insurance, so there is no copay or bill afterwards.`,
      },
      {
        q: "Are a kidney function test and a CBC included in Lawrenceville?",
        a: `Yes, the Lawrenceville panel has both, alongside thyroid, lipids, liver, iron and Vitamin D: ${kidneyCount} kidney markers and a ${cbcCount}-measurement CBC from the same draw.`,
      },
      {
        q: "Do I need to fast for the Lawrenceville blood test?",
        a: "Yes, for 8 to 12 hours. Plain water is fine, and you can eat again right after the draw.",
      },
      {
        q: "How long does the Lawrenceville draw take?",
        a: "Usually under seven minutes. A licensed phlebotomist takes two vials, and you can leave straight afterwards.",
      },
      {
        q: `What if I can't make ${monthDay}?`,
        a: `No other Georgia date is listed yet. New dates go up on the ${link("fairs page", site.links.fairs)} as soon as they are set, and you can ${link("ask us for one in your area", site.links.contact)}.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Reserve your Lawrenceville blood test",
    sub: "Choose a Saturday time now and read your report the following week.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  otherFairs: {
    eyebrow: "Other states",
    title: "Outside Lawrenceville? Healiam's other fairs",
    sub: "Family in another state can use these Healiam fairs, with the same panel and price.",
    linkLead: "Blood testing in",
    exclude: "Georgia",
  },

  sticky: {
    label: "Blood testing in Lawrenceville",
    sub: `Next fair ${dayShort} · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage;
