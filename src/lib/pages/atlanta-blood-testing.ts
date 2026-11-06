// Content for /georgia/blood-testing-in-atlanta, keyword "blood testing in Atlanta GA". A nearby city page
// (owner, 6 Nov 2026): no Healiam fair in Atlanta; the nearest is Lawrenceville, northeast of the city in
// Gwinnett County. Angle: honest about the distance (about 26 miles from downtown), worth it for a full
// panel in one trip, and an easy way to ask for an Atlanta fair. Atlanta is Georgia's capital. Distances:
// lib/city-pages.ts (straight line, city center to the fair's address, OpenStreetMap).

import { site } from "@/lib/site";
import { fairHours } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import { datesIn, fairsIn, nearby } from "@/lib/pages/nearby-city";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;
const path = "/georgia/blood-testing-in-atlanta";
const near = nearby(path);
const miles = near.to("lawrenceville-ga");
const liver = panelCategories.find((c) => c.slug === "liver")?.markers.length ?? 0;

export const atlanta = {
  path,
  keyword: "blood testing in Atlanta GA",
  near,
  meta: {
    title: `Blood Testing in Atlanta, GA | ${price} Full Panel | Healiam`,
    description: `Blood testing for Atlanta, GA: one ${price} panel with every test included, no referral. Healiam's nearest fair is in Lawrenceville, about ${miles} miles northeast.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "The drive", href: "#how-it-works" },
    { label: "Nearest fair", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Georgia", href: "/georgia/blood-testing" },
    { name: "Atlanta" },
  ],

  hero: {
    titleLead: "Blood testing in Atlanta, GA for",
    titleAccent: price,
    sub: `Healiam's Georgia fair is in Lawrenceville, about ${miles} miles northeast of downtown Atlanta. One morning out there gets you the full preventive panel, with no doctor's order and no insurance claim.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "See the Lawrenceville fair", href: "#locations" },
    ticks: [`About ${miles} miles northeast`, `${labMeasurementCount} lab measurements`, "Report sent to your phone"],
  },

  heroVisual: {
    place: "Atlanta",
    ariaLabel: `Sample Healiam results screen for Atlanta, GA: Vitamin D flagged low, glucose, albumin, potassium and hemoglobin in range, with a results-ready alert and an Atlanta card: ${price} for every test.`,
    screen: {
      title: "Results",
      sub: "Atlanta · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Liver", "Diabetes", "CBC"],
      rows: [
        { name: "Vitamin D", value: "24", unit: "ng/mL", low: true, pos: 18 },
        { name: "Glucose", value: "91", unit: "mg/dL", low: false, pos: 44 },
        { name: "Albumin", value: "4.4", unit: "g/dL", low: false, pos: 52 },
        { name: "Potassium", value: "4.1", unit: "mmol/L", low: false, pos: 48 },
        { name: "Hemoglobin", value: "14.1", unit: "g/dL", low: false, pos: 50 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    booking: {
      title: "Blood testing in Georgia",
      chip: "Testing available",
      lines: [
        { icon: "CircleDollarSign", label: `${price}, every test` },
        { icon: "CreditCard", label: "Card or HSA card" },
        { icon: "Users", label: "Bring the family" },
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
    title: "Why blood work waits in Atlanta",
    sub: "Six familiar reasons. A single morning in Lawrenceville takes care of them.",
    items: [
      "A primary care visit just to get an order",
      "Several appointments for one set of results",
      "Costs that change with every plan",
      "Vitamin D left off the usual check",
      "Weekday lab hours and a busy week",
      "Hearing results only at a follow-up",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See the Lawrenceville fair", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Is the drive from Atlanta worth it?",
    sub: "A local practice is closer. Here's how one morning in Lawrenceville compares.",
    usualLabel: "Atlanta practice",
    oursLabel: "Lawrenceville fair",
    badge: "CLIA-certified",
    note: "The bars are a rough guide, not measurements. Practice prices are typical US visit plus lab fees.",
    factors: [
      {
        id: "distance",
        tab: "Distance",
        icon: "Car",
        bar: "Drive",
        usual: { value: "Close to home", note: "An Atlanta practice is nearer.", level: 20 },
        ours: { value: `About ${miles} miles`, note: "Northeast, in Gwinnett County.", level: 62 },
        cta: { label: "See the Lawrenceville fair", href: "#locations" },
      },
      {
        id: "trips",
        tab: "Trips",
        icon: "Repeat",
        bar: "Visits in total",
        usual: { value: "Two or more", note: "For the order, the draw and the results.", level: 76 },
        ours: { value: "Just one", note: "Results arrive in the app.", level: 20 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "Separate visit and lab bills.", level: 100 },
        ours: { value: price, note: "Set in advance, paid once.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "vitamin-d",
        tab: "Vitamin D",
        icon: "Sun",
        bar: "Included",
        usual: { value: "On request", note: "Not part of a routine panel.", level: 32 },
        ours: { value: "Every draw", note: "Alongside liver, kidney and lipids.", level: 100 },
        cta: { label: "See the full panel", href: "#panel" },
      },
      {
        id: "insurance",
        tab: "Insurance",
        icon: "CreditCard",
        bar: "Paperwork",
        usual: { value: "Plan rules", note: "Copays and deductibles.", level: 72 },
        ours: { value: "None", note: "Pay by card or HSA card.", level: 12 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "time",
        tab: "Time off",
        icon: "CalendarDays",
        bar: "Work missed",
        usual: { value: "Weekday hours", note: "Practices and labs keep office hours.", level: 74 },
        ours: { value: "A weekend morning", note: `${fairHours.label} local time.`, level: 16 },
        cta: { label: "See the Lawrenceville fair", href: "#locations" },
      },
    ],
  },

  process: {
    eyebrow: "The drive",
    title: "Planning the trip from Atlanta",
    sub: "Most of it is done the night before. Leave a little time for the drive.",
    steps: [
      { title: "Book online", sub: "Or in the app" },
      { title: "Last meal at dinner", sub: "Fast 8 to 12 hours" },
      { title: "Head northeast", sub: `About ${miles} miles` },
      { title: "Results in the app", sub: "4 to 5 business days" },
    ],
    tip: `Fair hours are ${fairHours.label} local time. A later slot in that window means you won't have to leave Atlanta at first light.`,
    cta: {
      primary: { label: "Book online", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "What one morning in Lawrenceville gets Atlanta",
    sub: "A single draw, and all of this follows.",
    items: [
      { icon: "Sun", title: "Vitamin D measured", line: "In every panel, no add-on." },
      { icon: "Funnel", title: "Liver function in detail", line: `${liver} liver markers in each draw.` },
      { icon: "Repeat", title: "No return visit", line: "Results come to your phone." },
      { icon: "Gauge", title: "Clear ranges", line: "Low, normal or high, at a glance." },
      { icon: "FileText", title: "Lab reports to share", line: "CLIA-certified labs do the testing." },
      { icon: "FileDown", title: "Your PDF", line: "Keep it or share it." },
      { icon: "Users", title: "The household together", line: "One booking for everyone." },
      { icon: "Lock", title: "Kept between you and us", line: "Your employer is never told." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "What an Atlanta blood test covers",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, Vitamin D and liver function among them, plus biometrics you log in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "Atlanta",
      line: site.price.panelLine,
      compare: "Atlanta doctor and lab: $100 to $800+ for a visit plus labs",
      fine: "Pay by credit card or HSA card.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Nearest fair",
    title: "Atlanta's nearest Healiam fair",
    sub: "Lawrenceville, in Gwinnett County. Distance is in straight-line miles from downtown Atlanta.",
    fairs: fairsIn("GA"),
    hours: fairHours,
    noFair: {
      title: "Want a fair in Atlanta?",
      line: "Tell us your part of the city, and we'll let you know if one is planned.",
      cta: { label: "Ask for an Atlanta fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Blood testing across Georgia", href: "/georgia/blood-testing" },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Atlanta results, on your phone",
    sub: "Free on iPhone and Android. Install it and book Lawrenceville from the app.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  faq: {
    eyebrow: "Atlanta questions",
    title: "Blood testing for Atlanta: what to know",
    sub: "Answers for Atlanta residents before they book.",
    items: [
      {
        q: "Does Healiam test inside Atlanta?",
        a: `Not yet. The nearest fair is in Lawrenceville, about ${miles} miles northeast of downtown in a straight line. To ask for one in Atlanta, ${link("tell us where", site.links.contact)}.`,
      },
      {
        q: "Why go out to Lawrenceville rather than a lab in town?",
        a: `Because it's one trip for the whole panel at ${price}, with nothing to come back for afterwards: the results arrive on your phone.`,
      },
      {
        q: "Is Vitamin D part of the test?",
        a: "Yes. Vitamin D is in every panel, along with liver, kidney, lipid, thyroid and blood count markers.",
      },
      {
        q: "How much will it cost me?",
        a: `${price} for the ${site.price.panelName}: one complete panel covering all included tests for a single, transparent price. Pay by credit card or HSA card.`,
      },
      {
        q: "What's the next Lawrenceville date?",
        a: `${datesIn("GA").replace(/^Lawrenceville on /, "")}, ${fairHours.label} local time. New dates are added to the ${link("fairs page", site.links.fairs)}.`,
      },
      {
        q: "How do I book?",
        a: `Sign up free ${link("online", book)} or in the ${link("Healiam app", "#app")}, then reserve a time at the ${link("Lawrenceville fair", "#locations")}.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book your Atlanta blood test",
    sub: "One morning in Lawrenceville, and your full report on your phone the week after.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  otherFairs: {
    eyebrow: "Other states",
    title: "Have family outside Georgia?",
    sub: "The same panel runs at each fair below.",
    linkLead: "Blood testing in",
    exclude: "Georgia",
  },

  sticky: {
    label: "Blood testing in Atlanta",
    sub: `Lawrenceville fair about ${miles} mi · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage & { readonly near: unknown };
