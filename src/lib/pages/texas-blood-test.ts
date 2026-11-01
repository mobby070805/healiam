// Content for /texas/blood-testing. Components only lay this out.
// (Was /texas/blood-test until 1 Nov 2026; the old path redirects here.)
// Every fact comes from healiam.com (home, tests, fairs, FAQ and about pages).

import { site } from "@/lib/site";
import { panelCategories, labCategoryCount } from "@/lib/panel";
import { fairHours, fairs } from "@/lib/fairs";
import type { Widen } from "@/lib/types";

const texasFairs = fairs.filter((f) => f.region === "TX");
const texasCities = texasFairs.map((f) => f.locality).join(" and ");

export const page = {
  path: "/texas/blood-testing",
  keyword: "Blood Test in Texas",
  meta: {
    title: `Blood Test in Texas for ${site.price.display} | 50+ Markers | Healiam`,
    description:
      `Get a full blood test in Texas for ${site.price.display}. 50+ markers including thyroid, cholesterol, Vitamin D and HbA1c. No referral or insurance. Results in 4 to 5 days.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Locations", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: site.url },
    { name: "Blood test in Texas" },
  ],

  hero: {
    titleLead: "Your complete blood test in Texas for",
    titleAccent: site.price.display,
    sub: "No doctor's referral, no insurance, no surprise bills. One draw checks 50+ markers, from thyroid and cholesterol to Vitamin D and HbA1c.",
    primary: { label: `Book for ${site.price.display}`, href: site.bookingUrl },
    secondary: { label: "What's tested", href: "#panel" },
    ticks: ["No referral", "No insurance", "Results in 4-5 days"],
  },

  // Hero phone mockup. Illustrative sample only (clearly labelled "Sample"), not a real customer.
  // Values are plausible adult examples; pos = dot position on a low | normal | high bar (normal = 28% to 72%).
  heroVisual: {
    ariaLabel:
      "Sample Healiam results screen: Vitamin D flagged low, TSH, HbA1c, LDL and hemoglobin in range, with a results-ready alert and an HbA1c trend over three tests.",
    screen: {
      title: "Results",
      sub: "Sample · 50+ markers",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Thyroid", "Lipids", "CBC"],
      rows: [
        { name: "Vitamin D", value: "18", unit: "ng/mL", low: true, pos: 12 },
        { name: "TSH", value: "2.1", unit: "mIU/L", low: false, pos: 48 },
        { name: "HbA1c", value: "5.2", unit: "%", low: false, pos: 42 },
        { name: "LDL", value: "92", unit: "mg/dL", low: false, pos: 55 },
        { name: "Hemoglobin", value: "14.6", unit: "g/dL", low: false, pos: 52 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: "50+ markers" },
    trend: {
      name: "HbA1c",
      sub: "Over 3 tests",
      chip: "In range",
      points: [
        { label: "Test 1", value: "5.9%" },
        { label: "Test 2", value: "5.6%" },
        { label: "Test 3", value: "5.2%" },
      ],
    },
  },

  trust: [
    // Short enough to hold one line each in the two-up strip on a 375px phone.
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "ShieldCheck", label: "HIPAA compliant" },
    { icon: "Microscope", label: "FDA-approved equipment" },
    { icon: "Users", label: "3,000+ families served" },
  ],

  challenges: {
    eyebrow: "Sound familiar?",
    title: "A simple blood test shouldn't be this hard",
    sub: "Most people put off blood work for these reasons. One Healiam test fixes all six.",
    items: [
      "Seeing a doctor just to get a lab order",
      "Surprise bills after the test",
      "Paying copays before you get answers",
      "Tests that check only one thing",
      "Feeling tired with no idea why",
      "Another visit just to hear your results",
    ],
    cta: {
      primary: { label: `Skip the hassle for ${site.price.display}`, href: site.bookingUrl },
      secondary: { label: "How it works", href: "#how-it-works" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "Why choose Healiam",
    sub: "The usual route to blood work, next to ours.",
    usualLabel: "The usual route",
    oursLabel: "Healiam",
    badge: "CLIA-certified",
    note: "The bars are a simple side by side guide. Usual-route prices are what a doctor visit plus lab fees typically cost in the US.",
    factors: [
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "Provider visit plus lab fees, before any treatment starts.", level: 100 },
        ours: { value: site.price.display, note: "One flat price for the full 50+ marker panel.", level: 14 },
        cta: { label: `Book for ${site.price.display}`, href: site.bookingUrl },
      },
      {
        id: "referral",
        tab: "Referral",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "Doctor visit first", note: "An appointment just to get labs ordered.", level: 82 },
        ours: { value: "Not needed", note: "Book your own test online in minutes.", level: 18 },
        cta: { label: "Book without a referral", href: site.bookingUrl },
      },
      {
        id: "insurance",
        tab: "Insurance",
        icon: "CreditCard",
        bar: "Paperwork",
        usual: { value: "Copays and deductibles", note: "Plus coverage checks and claim forms.", level: 86 },
        ours: { value: "Not needed", note: "Pay by credit card or HSA card.", level: 12 },
        cta: { label: "Pay by card or HSA", href: site.bookingUrl },
      },
      {
        id: "coverage",
        tab: "Coverage",
        icon: "Layers",
        bar: "Markers covered",
        usual: { value: "A few ordered tests", note: "Narrow panels can miss the real cause.", level: 26 },
        ours: { value: "50+ markers", note: `${labCategoryCount} categories from one blood draw.`, level: 100 },
        cta: { label: "See all 50+ markers", href: "#panel" },
      },
      {
        id: "results",
        tab: "Results",
        icon: "Timer",
        bar: "Wait for answers",
        usual: { value: "Often at a follow-up", note: "Another visit to hear what the numbers mean.", level: 80 },
        ours: { value: "4 to 5 business days", note: "Clear results and graphs in the Healiam app.", level: 34 },
        cta: { label: "Book my test", href: site.bookingUrl },
      },
      {
        id: "access",
        tab: "Access",
        icon: "MapPin",
        bar: "Time away from work",
        usual: { value: "Clinic hours", note: "Time off work for a separate lab visit.", level: 76 },
        ours: { value: "Morning Texas fairs", note: "Fairs run 8:00 to 10:00 AM, so you test before work rather than taking a day off.", level: 24 },
        cta: { label: "Find a Texas fair", href: "#locations" },
      },
    ],
  },

  process: {
    eyebrow: "Simple process",
    title: "How it works",
    steps: [
      { title: "Book a nearby fair", sub: "Pick a Texas fair online" },
      { title: "Visit on your date", sub: "At your chosen fair" },
      { title: "Quick draw", sub: "2 vials, under 7 min" },
      { title: "Get results", sub: "In the Healiam app" },
    ],
    tip: "Before your visit: fast 8 to 12 hours (water is fine) and skip hard workouts for 24 hours.",
    cta: {
      primary: { label: "Book my test", href: site.bookingUrl },
      secondary: { label: "Find a Texas fair", href: "#locations" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "Benefits of testing with Healiam",
    items: [
      { icon: "ScanSearch", title: "Catch issues early", line: "Screens for thyroid issues, anemia, diabetes risk and kidney function." },
      { icon: "FileCheck", title: "Doctor-ready results", line: "Lab reports your own doctor can use." },
      { icon: "Gauge", title: "See your ranges", line: "Each marker shown against its reference range." },
      { icon: "ChartLine", title: "Track trends", line: "Graphs for every marker as you retest." },
      { icon: "FileDown", title: "Download a PDF", line: "Keep your report or share it in one tap." },
      { icon: "Lock", title: "Your data stays yours", line: "Never shared with any third party." },
      { icon: "UserCheck", title: "Licensed phlebotomists", line: "Every draw done in a private setting." },
      { icon: "FileText", title: "Free sample report", line: "See exactly what you get before booking." },
    ],
    cta: {
      primary: { label: `Get all this for ${site.price.display}`, href: site.bookingUrl },
      secondary: { label: "View sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "What's included",
    title: `Everything in your ${site.price.display} panel`,
    sub: `50+ lab measurements across ${labCategoryCount} categories, all from one blood draw.`,
    categories: panelCategories,
    priceCard: {
      label: "Complete panel",
      line: "Every marker in the panel, one draw, one price.",
      compare: "Usual route: $100 to $800+ for a visit plus labs",
      fine: "Card or HSA accepted, with or without insurance.",
      cta: { label: `Book for ${site.price.display}`, href: site.bookingUrl },
    },
  },

  locations: {
    eyebrow: "Texas locations",
    title: "Get tested at a Texas health fair",
    sub: "Fairs run 8:00 to 10:00 AM, so you can test while fasting and still make it to work. Walk-ins welcome.",
    fairs: texasFairs,
    hours: fairHours,
    noFair: {
      title: "Not near one of these?",
      line: "We add new Texas fairs regularly. Tell us where you need one and we will let you know.",
      cta: { label: "Request a fair near you", href: site.links.contact },
    },
    cta: {
      primary: { label: "Book a fair visit", href: site.bookingUrl },
      secondary: { label: "See all fairs", href: site.links.fairs },
    },
  },

  faq: {
    eyebrow: "FAQ",
    title: "Questions about your Texas blood test",
    items: [
      {
        q: "How much does a blood test in Texas cost with Healiam?",
        a: `${site.price.display} for the full panel of 50+ markers, at any Texas health fair. There are no visit fees or surprise lab bills.`,
      },
      {
        q: "Do I need a doctor's referral?",
        a: "No. You book the test yourself online. No doctor's order or prescription is needed.",
      },
      {
        q: "Do you accept insurance?",
        a: "No. We accept regular credit cards and HSA cards. For many people the panel costs less than an insurance copay on a hospital panel.",
      },
      {
        q: "What does the panel test for?",
        a: "50+ measurements across CBC, thyroid (TSH, Free T4, Total T3), lipids, diabetes (glucose and HbA1c), kidney, liver, electrolytes, iron, pancreas, Vitamin D, LDH and carbon dioxide.",
      },
      {
        q: "Can my doctor use these results?",
        a: "Yes. Our partner labs are CLIA certified, so your doctor can use the results. You can download your report as a PDF to share.",
      },
      {
        q: "Which labs process my sample?",
        a: "Samples go to Rocky Mountain Labs and Bhoomi Ventures. Both are CLIA certified and use FDA-approved equipment.",
      },
      {
        q: "Do I need to fast before the test?",
        a: "Yes, for 8 to 12 hours. Water is fine, but skip coffee, tea, juice and gum. Drink plenty of water and avoid hard exercise for 24 hours before.",
      },
      {
        q: "How long do results take?",
        a: "Results are ready in 4 to 5 business days. You see them in the Healiam app with ranges and graphs for each marker.",
      },
      {
        q: "Where can I get tested in Texas?",
        a: `At our ${texasCities} health fair. Check the fairs page for the latest dates, and tell us if you need one closer to you.`,
      },
      {
        q: "How long does the blood draw take?",
        a: "Two vials, usually less than seven minutes. A licensed phlebotomist does the draw in a private setting.",
      },
      {
        q: "Is my health data private?",
        a: "Yes. We and our partner labs follow HIPAA standards, and your data is protected in transit and at rest. We do not share your information or results with any third party.",
      },
      {
        q: "What should I bring to the fair?",
        a: "Your phone with the Healiam app installed and a credit card or HSA card. No insurance card is needed.",
      },
    ],
    help: {
      title: "Still have a question?",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: `Book your ${site.price.display} blood test in Texas`,
    sub: "Pick a fair, fast overnight, and see your results in the app within 4 to 5 business days.",
    primary: { label: `Book for ${site.price.display}`, href: site.bookingUrl },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  sticky: {
    label: `${site.price.display} full blood panel`,
    sub: "50+ markers, no referral",
    cta: { label: "Book now", href: site.bookingUrl },
  },
} as const;

export type TexasBloodTestPage = typeof page;

/**
 * Shape of a state landing page built from the Texas page's sections. Other state pages
 * (Colorado) fill the same shape with their own copy; the section components default to Texas.
 */
export type StateLandingPage = Widen<TexasBloodTestPage>;
