// Content for /locations/new-york/new-york-city, keyword "blood testing in New York City". A nearby
// city page (owner, 6 Nov 2026): no Healiam fair in New York; the nearest is Rahway, NJ. Kept distinct
// from the New York state page (which covers the train from Penn Station and Staten Island in general):
// this page goes borough by borough. Distances: straight line from each borough's center to the fair's
// address (OpenStreetMap, 6 Nov 2026). New York City's own figure in lib/city-pages.ts is from City Hall.
// TO CONFIRM BEFORE PUBLISHING: that New York residents can book the Rahway fair.

import { site } from "@/lib/site";
import { fairHours } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { link } from "@/lib/rich-text";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import { datesIn, fairsIn, nearby } from "@/lib/pages/nearby-city";
import type { StateLandingPage } from "@/lib/pages/texas-blood-test";

const price = site.price.display;
const book = site.bookingUrl;
const path = "/locations/new-york/new-york-city";
const near = nearby(path);
const miles = near.to("rahway-nj");

/** Straight-line miles from each borough's center to the Rahway fair (OpenStreetMap, 6 Nov 2026). */
const boroughs = { "Staten Island": 7, Brooklyn: 17, Manhattan: 18, Queens: 25, Bronx: 27 } as const;

export const newYorkCity = {
  path,
  keyword: "blood testing in New York City",
  near,
  meta: {
    title: `Blood Testing in New York City | ${price} Panel | Healiam`,
    description: `Blood testing for New York City, borough by borough: one ${price} panel with every test included, at Healiam's Rahway, NJ fair, ${boroughs["Staten Island"]} to ${boroughs.Bronx} miles away.`,
  },
  nav: [
    { label: "What's tested", href: "#panel" },
    { label: "By borough", href: "#how-it-works" },
    { label: "Nearest fair", href: "#locations" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in New York", href: "/locations/new-york" },
    { name: "New York City" },
  ],

  hero: {
    titleLead: "Blood testing in New York City for",
    titleAccent: price,
    sub: `Whichever borough you're in, the nearest Healiam fair is over the state line in Rahway, New Jersey. Staten Island is closest; the Bronx is farthest. No referral, no insurance card.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Your borough's trip", href: "#how-it-works" },
    ticks: [`${boroughs["Staten Island"]} to ${boroughs.Bronx} miles by borough`, `${labCategoryCount} lab categories`, "Results in the app"],
  },

  heroVisual: {
    place: "New York City",
    ariaLabel: `Sample Healiam results screen for New York City: HDL flagged low, triglycerides, HbA1c, TSH and creatinine in range, with a results-ready alert and a New York City card: ${price} for every test.`,
    screen: {
      title: "Results",
      sub: "New York City · Sample",
      summary: { inRange: 4, total: 5, label: "4 of 5 in range", review: "1 to review" },
      filters: ["All", "Lipids", "Diabetes", "Thyroid"],
      rows: [
        { name: "HDL", value: "36", unit: "mg/dL", low: true, pos: 15 },
        { name: "Triglycerides", value: "120", unit: "mg/dL", low: false, pos: 46 },
        { name: "HbA1c", value: "5.3", unit: "%", low: false, pos: 40 },
        { name: "TSH", value: "2.4", unit: "mIU/L", low: false, pos: 50 },
        { name: "Creatinine", value: "0.9", unit: "mg/dL", low: false, pos: 46 },
      ],
    },
    notification: { app: "Healiam", time: "now", title: "Results ready", line: `${labMeasurementCount} measurements` },
    booking: {
      title: "Blood testing for New York",
      chip: "Testing available",
      lines: [
        { icon: "CircleDollarSign", label: `${price}, every test` },
        { icon: "CreditCard", label: "Card or HSA card" },
        { icon: "FileDown", label: "PDF to share" },
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
    title: "What gets between New Yorkers and a blood test",
    sub: "Six reasons blood work slides in the city. One trip out to the Rahway fair handles them.",
    items: [
      "Finding a doctor with an open slot",
      "Needing an order before a lab will draw",
      "Prices that differ by lab and by plan",
      "Blood sugar markers never checked",
      "Lab hours that eat into the workday",
      "Chasing results through a portal",
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Your borough's trip", href: "#how-it-works" },
    },
  },

  comparison: {
    eyebrow: "Compare",
    title: "A city lab, or a trip to Rahway?",
    sub: "Six ways a trip to Rahway compares with getting blood work done in New York City.",
    usualLabel: "City lab",
    oursLabel: "Rahway fair",
    badge: "CLIA-certified",
    note: "The bars are a rough guide, not measurements. City-lab prices are typical US visit plus lab fees.",
    factors: [
      {
        id: "distance",
        tab: "Distance",
        icon: "MapPin",
        bar: "Travel",
        usual: { value: "In your borough", note: "Closer to home, no question.", level: 18 },
        ours: { value: `${boroughs["Staten Island"]} to ${boroughs.Bronx} miles`, note: "Depending on your borough.", level: 56 },
        cta: { label: "Your borough's trip", href: "#how-it-works" },
      },
      {
        id: "price",
        tab: "Price",
        icon: "CircleDollarSign",
        bar: "Cost",
        usual: { value: "$100 to $800+", note: "Varies by lab, doctor and plan.", level: 100 },
        ours: { value: price, note: "The same for everyone, paid once.", level: 14 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "diabetes",
        tab: "Blood sugar",
        icon: "Gauge",
        bar: "Included",
        usual: { value: "If ordered", note: "HbA1c usually isn't part of routine blood work.", level: 36 },
        ours: { value: "Every draw", note: "Glucose and HbA1c, alongside a full lipid profile.", level: 100 },
        cta: { label: "See the full panel", href: "#panel" },
      },
      {
        id: "order",
        tab: "Order",
        icon: "Stethoscope",
        bar: "Steps before a draw",
        usual: { value: "Doctor first", note: "An appointment to request the tests.", level: 82 },
        ours: { value: "You book it", note: "No order needed.", level: 16 },
        cta: { label: "Book my test", href: book },
      },
      {
        id: "insurance",
        tab: "Insurance",
        icon: "CreditCard",
        bar: "Paperwork",
        usual: { value: "Network rules", note: "In-network checks and claims.", level: 74 },
        ours: { value: "None", note: "Card or HSA card.", level: 12 },
        cta: { label: `Book for ${price}`, href: book },
      },
      {
        id: "results",
        tab: "Results",
        icon: "Smartphone",
        bar: "Wait to see numbers",
        usual: { value: "Portal or callback", note: "Depending on the practice.", level: 66 },
        ours: { value: "In the app", note: "Each marker with its range.", level: 30 },
        cta: { label: "Book my test", href: book },
      },
    ],
  },

  process: {
    eyebrow: "By borough",
    title: "Getting to Rahway from your borough",
    sub: "From Staten Island you can drive straight over. From the other boroughs, start at Penn Station.",
    steps: [
      { title: "Book a time", sub: "Online or in the app" },
      { title: "Fast overnight", sub: "8 to 12 hours" },
      { title: "Penn Station or a bridge", sub: "To Rahway, NJ" },
      { title: "Open the app", sub: "4 to 5 business days" },
    ],
    tip: `Rough distances to the fair: Staten Island ${boroughs["Staten Island"]} miles, Brooklyn ${boroughs.Brooklyn}, Manhattan ${boroughs.Manhattan}, Queens ${boroughs.Queens}, the Bronx ${boroughs.Bronx}, in straight lines from each borough's center.`,
    cta: {
      primary: { label: "Book a time", href: book },
      secondary: { label: "See every marker", href: "#panel" },
    },
  },

  benefits: {
    eyebrow: "What you get",
    title: "What New York City residents get back",
    sub: "Two vials in New Jersey. Here's what returns to you.",
    items: [
      { icon: "Gauge", title: "Blood sugar covered", line: "Glucose and HbA1c in every panel." },
      { icon: "Map", title: "Reachable from every borough", line: "By train via Penn Station, or by car." },
      { icon: "Gauge", title: "Results in context", line: "Each marker against its range." },
      { icon: "FileText", title: "Doctor-friendly reports", line: "Analyzed by CLIA-certified labs." },
      { icon: "ChartLine", title: "Compare each year", line: "Retest and every marker trends." },
      { icon: "FileDown", title: "A shareable PDF", line: "Send it to your doctor in a tap." },
      { icon: "Users", title: "Roommates and family", line: "Add everyone to one booking." },
      { icon: "Lock", title: "Your data, kept private", line: "Private to you, always." },
    ],
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "See a sample report", href: site.links.sampleReport, newTab: true },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "What's tested for New York City residents",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, a full lipid profile and HbA1c among them, plus biometrics you log in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "New York City",
      line: site.price.panelLine,
      compare: "City lab: $100 to $800+ for a visit plus labs",
      fine: "Pay by credit card or HSA card.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  locations: {
    eyebrow: "Nearest fair",
    title: "The closest fair to New York City",
    sub: "Healiam's nearest fair is in Rahway, New Jersey. Distance is in straight-line miles from City Hall.",
    fairs: fairsIn("NJ"),
    hours: fairHours,
    noFair: {
      title: "A fair in your borough?",
      line: "Tell us which borough, and we'll let you know if one is planned.",
      cta: { label: "Ask for a New York City fair", href: site.links.contact },
    },
    cta: {
      primary: { label: `Book for ${price}`, href: book },
      secondary: { label: "Blood testing for New York", href: "/locations/new-york" },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "New York City results, in your pocket",
    sub: "Free on iPhone and Android. Scan to install, then pick your Rahway time.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  faq: {
    eyebrow: "New York City questions",
    title: "New York City blood testing, answered",
    sub: "Questions from all five boroughs, answered.",
    items: [
      {
        q: "Can I get a Healiam test inside the five boroughs?",
        a: `Not yet. The nearest is in Rahway, New Jersey, about ${miles} miles from City Hall. If you'd like one in your borough, ${link("let us know which", site.links.contact)}.`,
      },
      {
        q: "I'm in Brooklyn or Queens. How do I get there?",
        a: "Get to Penn Station in Manhattan, then take NJ Transit to Rahway. The fair card above has the venue address.",
      },
      {
        q: "And from the Bronx?",
        a: `Same route through Penn Station. It's the longest trip, about ${boroughs.Bronx} miles in a straight line, so leave a little earlier.`,
      },
      {
        q: "How much is it?",
        a: `${price} for the ${site.price.panelName}: one complete panel covering all included tests for a single, transparent price. The same in every borough.`,
      },
      {
        q: "How do I see upcoming Rahway dates?",
        a: `Check the fair card on this page, or the ${link("fairs page", site.links.fairs)} for new dates as they're scheduled.`,
      },
      {
        q: "How do I book?",
        a: `Create a free account in the ${link("Healiam app", "#app")} or ${link("online", book)}, then pick a ${link("Rahway", "#locations")} time that suits your trip in.`,
      },
    ],
    help: {
      title: "Ready when you are",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Plan your New York City blood test",
    sub: "Over to Rahway, two vials, and your results on your phone the week after.",
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  otherFairs: {
    eyebrow: "Other states",
    title: "Healiam fairs beyond New York",
    sub: "For family or friends elsewhere: the same panel, the same price.",
    linkLead: "Blood testing in",
    exclude: "New York",
  },

  sticky: {
    label: "Blood testing in New York City",
    sub: `Rahway fair about ${miles} mi · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const satisfies StateLandingPage & { readonly near: unknown };
