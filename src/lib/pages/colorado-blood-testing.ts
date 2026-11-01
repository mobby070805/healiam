// Content for /colorado/blood-testing, keyword "blood testing in Colorado".
// Design: the Texas page's sections, in the Texas order, unchanged (owner, 31 Oct 2026).
// Content: Colorado's own, written as an availability and booking guide: where Healiam tests in
// Colorado right now (Denver metro only), how to book, how to prepare, and the altitude note.
// Dates, venues and parking come from lib/fairs.ts. See docs/LOCATION-PAGES-AUDIT.md.

import { site } from "@/lib/site";
import { fairs, fairHours } from "@/lib/fairs";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;

export const coloradoFairs = fairs.filter((f) => f.region === "CO");

const [firstFair, lastFair] = [coloradoFairs[0], coloradoFairs[coloradoFairs.length - 1]];
const daysApart =
  firstFair && lastFair ? Math.round((Date.parse(lastFair.date) - Date.parse(firstFair.date)) / 86_400_000) : 0;

// "Denver Nov 14 · Centennial Nov 22"
const shortDates = coloradoFairs.map((f) => `${f.locality} ${f.dateLabel.replace(/^\w+,\s*|,\s*\d{4}$/g, "")}`).join(" · ");

export const colorado = {
  path: "/colorado/blood-testing",
  keyword: "blood testing in Colorado",
  meta: {
    title: "Blood Testing in Colorado: Dates & Booking | Healiam",
    description: `Where Healiam offers blood testing in Colorado: scheduled Denver-metro mornings, a ${price} panel with ${labMeasurementCount} lab measurements, and how to book.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "Booking", href: "#how-it-works" },
    { label: "Colorado dates", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Colorado" },
  ],

  hero: {
    titleLead: "Your complete blood test in Colorado for",
    titleAccent: price,
    sub: `Healiam runs scheduled testing mornings in the Denver metro, not a walk-in lab. Here are the current Colorado dates, what the ${price} panel covers, and how to book a draw without a doctor's order or insurance.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "See Colorado dates", href: "#locations" },
    ticks: ["Denver metro dates", "8 to 10 AM Mountain Time", "No referral or insurance"],
  },

  // Hero phone mockup. Illustrative sample only (labelled "Sample"), not a real customer, and
  // deliberately different markers from the Texas mockup. pos = dot on a low | normal | high bar.
  heroVisual: {
    ariaLabel:
      "Sample Healiam results screen: iron flagged low, hemoglobin, TSH, HDL and Vitamin D in range, with a results-ready alert and a TSH trend falling into range over three tests.",
    screen: {
      title: "Results",
      sub: "Sample · 50+ markers",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Iron", "CBC", "Lipids"],
      rows: [
        { name: "Iron", value: "48", unit: "µg/dL", low: true, pos: 14 },
        { name: "Hemoglobin", value: "15.1", unit: "g/dL", low: false, pos: 56 },
        { name: "TSH", value: "1.8", unit: "mIU/L", low: false, pos: 44 },
        { name: "HDL", value: "58", unit: "mg/dL", low: false, pos: 52 },
        { name: "Vitamin D", value: "32", unit: "ng/mL", low: false, pos: 40 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    trend: {
      name: "TSH",
      sub: "Over 3 tests",
      chip: "In range",
      points: [
        { label: "Test 1", value: "4.8" },
        { label: "Test 2", value: "3.1" },
        { label: "Test 3", value: "1.8" },
      ],
    },
  },

  trust: [
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "UserCheck", label: "Licensed phlebotomists" },
    { icon: "ShieldCheck", label: "HIPAA compliant" },
    { icon: "CreditCard", label: "Card or HSA accepted" },
  ],

  // Texas uses this section for pain points; Colorado uses it for the before-you-go checklist.
  challenges: {
    eyebrow: "Before you go",
    title: "The night before and the morning of",
    sub: "Six things that make a Colorado testing morning go smoothly.",
    items: [
      "Stop eating 8 to 12 hours before your draw",
      "Water is fine; skip coffee, juice and gum",
      "No hard workouts in the 24 hours before",
      "Arrive 8 to 10 AM, Mountain Time",
      "Bring the app and a card or HSA card",
      "Two vials, about seven minutes",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See Colorado dates", href: "#locations" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Healiam or the clinic route",
    sub: "Six ways a Healiam testing morning in Colorado differs from going through a clinic.",
    usualLabel: "Clinic route",
    oursLabel: "Healiam",
    badge: "CLIA-certified",
    note: "The bars are a rough side by side guide, not measurements. Clinic-route prices are what a US doctor visit plus lab fees typically cost.",
    factors: [
      {
        id: "day",
        tab: "Day",
        icon: "CalendarDays",
        bar: "Time off work",
        usual: { value: "A weekday visit", note: "Many draw sites keep weekday hours, which can mean missing work.", level: 82 },
        ours: { value: "Weekend mornings", note: `Denver on a Saturday, Centennial on a Sunday, both ${fairHours.label}.`, level: 14 },
        cta: { label: "See Colorado dates", href: "#locations" },
      },
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "A provider visit plus lab fees, before any treatment.", level: 100 },
        ours: { value: price, note: "One flat price, the same at both Colorado dates.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "ordering",
        tab: "Ordering",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "An order from a doctor", note: "An appointment first, so the labs can be requested.", level: 80 },
        ours: { value: "Book it yourself", note: "Online in minutes. No order or prescription.", level: 16 },
        cta: { label: "Book without an order", href: book },
      },
      {
        id: "scope",
        tab: "Scope",
        icon: "Layers",
        bar: "Markers covered",
        usual: { value: "Only what's ordered", note: "A short panel can leave questions open.", level: 26 },
        ours: { value: `${labMeasurementCount} measurements`, note: "CBC through Vitamin D, from two vials.", level: 100 },
        cta: { label: "See the full list", href: "#panel" },
      },
      {
        id: "records",
        tab: "Records",
        icon: "ChartLine",
        bar: "Effort to track changes",
        usual: { value: "Scattered reports", note: "Each clinic or lab keeps its own copy of your results.", level: 78 },
        ours: { value: "One app, with trends", note: "A graph for every marker each time you retest, plus a PDF.", level: 20 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "payment",
        tab: "Payment",
        icon: "CreditCard",
        bar: "Paperwork",
        usual: { value: "Claims and deductibles", note: "Coverage checks before, statements after.", level: 84 },
        ours: { value: "Card or HSA card", note: "No insurance claim to file.", level: 12 },
        cta: { label: "Book with card or HSA", href: book },
      },
    ],
  },

  process: {
    eyebrow: "Booking",
    title: "Book a Colorado blood test in four steps",
    steps: [
      { title: "Create an account", sub: "In the app or online" },
      { title: "Add who's tested", sub: "You or your family" },
      { title: "Choose a date", sub: "Denver or Centennial" },
      { title: "Pay by card or HSA", sub: `${price}, nothing added later` },
    ],
    tip: "No appointment needed: you can also walk in during the two hours. Booking ahead just means less waiting.",
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See the walkthrough", href: site.links.demo },
    },
  },

  benefits: {
    eyebrow: "After your draw",
    title: "Your numbers, 4 to 5 business days later",
    items: [
      { icon: "Smartphone", title: "Results in the app", line: "Each marker shown against its reference range." },
      { icon: "FileDown", title: "A PDF for your doctor", line: "Download the report and share it in one tap." },
      { icon: "ChartLine", title: "Trends when you retest", line: "Every marker builds its own graph over time." },
      { icon: "Lock", title: "Kept private", line: "Never shared with an employer or any third party." },
      { icon: "Gauge", title: "Flags at a glance", line: "Out-of-range markers are easy to spot." },
      { icon: "Users", title: "Family in one booking", line: "Add who's getting tested when you book." },
      { icon: "HeartPulse", title: "Biometrics alongside", line: "Log blood pressure and heart rate next to your labs." },
      { icon: "Mountain", title: "Read with altitude in mind", line: "Living high can raise hemoglobin; tell your doctor where you live." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: `One draw, ${labMeasurementCount} lab measurements`,
    sub: `The same panel runs at every Colorado date: ${labMeasurementCount} lab measurements across ${labCategoryCount} categories, plus biometrics you log yourself.`,
    categories: panelCategories,
    priceCard: {
      label: "Colorado dates",
      line: "Same price in Denver and Centennial, with every marker included.",
      compare: "Clinic route: $100 to $800+ for a visit plus labs",
      fine: "Pay by card or HSA card. No insurance card needed.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Current Colorado dates",
    title: "Blood testing near Denver, on two mornings",
    sub: `Denver suits the north and west suburbs, Centennial the south metro, and the two are ${daysApart} days apart. These are the only Colorado dates on the schedule right now.`,
    fairs: coloradoFairs,
    hours: fairHours,
    noFair: {
      title: "Elsewhere in Colorado?",
      line: "Nothing yet in Colorado Springs, Boulder, Fort Collins, Pueblo or the Western Slope. Tell us your town.",
      cta: { label: "Ask for a date", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "All upcoming fairs", href: site.links.fairs },
    },
  },

  faq: {
    eyebrow: "Colorado questions",
    title: "Blood testing in Colorado, answered",
    items: [
      {
        q: "Can I get blood tests in Colorado outside the Denver metro?",
        a: "Not at the moment. Healiam's current Colorado dates are in Denver and Centennial. Send us your town and we will let you know if a date is planned nearby.",
      },
      {
        q: "Is the price the same in Colorado?",
        a: `Yes, ${price} for the full panel of ${labMeasurementCount} lab measurements, with no separate visit fee.`,
      },
      {
        q: "Do I need an appointment, or can I walk in?",
        a: `You can book a time online, which needs a free Healiam account. You can also walk in during the ${fairHours.label} window; booking just means less waiting.`,
      },
      {
        q: "Which date should I choose if I live in Arvada, Lakewood or Westminster?",
        a: "Usually Denver. Edgewater, Wheat Ridge, Arvada, Westminster, Lakewood, Federal Heights and Commerce City are all within about 6 miles of the Irving Street venue in a straight line. In the south metro, compare the drive to Centennial.",
      },
      {
        q: "What time zone are the hours in?",
        a: `Mountain Time. Both dates run ${fairHours.label}, so plan your fast from the night before.`,
      },
      {
        q: "Does living at altitude change my results?",
        a: "It can. People who live at higher elevations tend to have higher hemoglobin and hematocrit, because the body makes more red blood cells when there is less oxygen. Mention where you live when you review those two markers with your doctor.",
      },
      {
        q: "Can I use my HSA card in Colorado?",
        a: "Yes. Pay with an HSA card or any regular credit card. Insurance is not used, so there is no claim to file.",
      },
      {
        q: "What happens when these dates pass?",
        a: "New dates appear on the fairs page when they are scheduled. If none is listed for Colorado, request one for your area.",
      },
      {
        q: "Is the Sunday date in Centennial any different?",
        a: "No. Same panel, same price, same licensed phlebotomists. Only the day and place change.",
      },
    ],
    help: {
      title: "Still have a question?",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book your Colorado testing morning",
    sub: `Pick Denver or Centennial, fast overnight, and see all ${labMeasurementCount} lab results in the app 4 to 5 business days later.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  sticky: {
    label: "Colorado testing dates",
    sub: shortDates,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage;
