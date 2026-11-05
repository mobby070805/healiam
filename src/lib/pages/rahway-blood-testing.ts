// Content for /new-jersey/blood-testing-in-rahway, keyword "blood testing in Rahway NJ" (SEO sheet, P1
// core city). A city page first and a fair page second (owner, 5 Nov 2026): it opens with blood testing
// in Rahway and the Union and Middlesex County towns nearby, then the next fair (Rahway Pharmacy,
// 1421 Irving St, Sat Nov 14) and the ways to reach it. The New Jersey state page keeps the statewide view. Replaces /fairs/rahway-nj, which
// redirects here.
//
// Facts: venue, parking, station walk, entrance and date from lib/fairs.ts (matches healiam.com/fairs/
// rahway-nj, which does not mention walk-ins, so this page doesn't either); nearby towns and
// straight-line distances from the Healiam_Fair_City_Pages sheet. Staten Island is left out: booking for
// New York residents is unverified.

import { site } from "@/lib/site";
import { fairs, fairHours, type Fair } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";

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
    title: `Blood Testing in Rahway, NJ | Near the Train, ${price} | Healiam`,
    description: `Blood testing in Rahway, NJ near the NJ Transit station: a ${price} panel of ${labMeasurementCount} lab measurements, no referral. Next fair ${dayShort} at Rahway Pharmacy.`,
  },
  nav: [
    { label: "Nearby towns", href: "#nearby" },
    { label: "What's tested", href: "#panel" },
    { label: "Next fair", href: "#getting-there" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in New Jersey", href: "/new-jersey/blood-testing" },
    { name: "Rahway" },
  ],

  hero: {
    eyebrow: "Rahway, New Jersey",
    title: "Blood testing in Rahway, NJ",
    sub: `Blood testing in Rahway that you can reach by train: one ${price} panel of ${labMeasurementCount} lab measurements, no doctor's order or insurance, at a Healiam fair in a street-level pharmacy on Irving Street.`,
    primary: { label: `Book for ${price}`, short: "Book now", href: book },
    secondary: { label: "Next Rahway fair", href: "#getting-there" },
    glance: {
      title: "Blood testing in Rahway at a glance",
      rows: [
        { icon: "CircleDollarSign", label: "Price", value: `${price}, nothing billed later`, note: "Pay by card or HSA card" },
        { icon: "FlaskConical", label: "What's tested", value: `${labMeasurementCount} lab measurements`, note: `From ${cbcCount}-measurement CBC to Vitamin D` },
        { icon: "TrainFront", label: "Getting there", value: "Near Rahway station", note: "Or free street parking on Irving St" },
      ],
      nextLabel: "Next Rahway fair",
      nextNote: `${fairHours.label} ET · Rahway Pharmacy, 1421 Irving St`,
      walkIn: "Reserve a slot online before you go. It needs a free Healiam account.",
      upcoming: "Upcoming",
      ended: "This Rahway date has passed. Later New Jersey dates appear on the fairs page as they are scheduled.",
      endedCta: { label: "See upcoming fairs", href: site.links.fairs },
    },
  },

  trust: [
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "TrainFront", label: "Near Rahway station" },
    { icon: "Accessibility", label: "Street-level entrance" },
    { icon: "CreditCard", label: "Card or HSA card" },
  ],

  ways: {
    eyebrow: "Next Rahway fair",
    title: "The next Rahway fair, at Rahway Pharmacy",
    sub: `${rahwayFair.dateLabel}, ${fairHours.label} Eastern Time, on Irving Street. The pharmacy is easy to reach without a car, and simple to park near if you drive.`,
    items: [
      {
        icon: "TrainFront",
        title: "By train",
        line: "Ride NJ Transit to Rahway station. The pharmacy is a short walk away, so there is nothing to park.",
      },
      {
        icon: "Car",
        title: "By car",
        line: "Free street parking runs along Irving Street. If it is full, there is a public lot one block east of the pharmacy.",
      },
      {
        icon: "Accessibility",
        title: "Step-free",
        line: "The entrance is at street level and ADA-accessible, with no stairs or upper floor to find.",
      },
    ],
    mapsLabel: "Open in Google Maps",
  },

  process: {
    eyebrow: "How it works",
    title: "Booking blood testing in Rahway, step by step",
    sub: "A Saturday morning appointment, planned from the evening before.",
    steps: [
      { title: "Reserve your slot", sub: "Free Healiam account" },
      { title: "Fast from the evening", sub: "8 to 12 hours, water allowed" },
      { title: "Irving St, 8 to 10 AM", sub: "Two vials, under 7 min" },
      { title: "Read your report", sub: "4 to 5 business days later" },
    ],
    tip: "Bring your phone with the Healiam app and a credit card or HSA card. You won't need an insurance card.",
    cta: {
      primary: { label: "Reserve a Rahway slot", href: book },
      secondary: { label: "Next fair", href: "#getting-there" },
    },
  },

  // Straight-line miles from the venue (Healiam_Fair_City_Pages sheet, km converted), grouped by county.
  nearby: {
    eyebrow: "Rahway and nearby",
    title: "Rahway blood testing for Union and Middlesex towns",
    sub: "Rahway sits between Union and Middlesex counties, so these towns are close by. Straight-line miles from Rahway Pharmacy; the trip itself will be a little longer.",
    groups: [
      {
        name: "Union County",
        towns: [
          { name: "Linden", miles: 1.9 },
          { name: "Clark", miles: 2.1 },
          { name: "Roselle", miles: 3.3 },
          { name: "Cranford", miles: 3.7 },
          { name: "Garwood", miles: 4.0 },
          { name: "Roselle Park", miles: 4.0 },
        ],
      },
      {
        name: "Middlesex County",
        towns: [
          { name: "Avenel", miles: 1.6 },
          { name: "Colonia", miles: 2.3 },
          { name: "Carteret", miles: 2.9 },
          { name: "Port Reading", miles: 2.9 },
          { name: "Iselin", miles: 3.2 },
          { name: "Woodbridge", miles: 3.4 },
        ],
      },
    ],
    stateLink: { label: "Blood testing across New Jersey", href: "/new-jersey/blood-testing" },
  },

  panel: {
    eyebrow: "The panel",
    title: "The tests in every Rahway draw",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, among them a ${cbcCount}-measurement complete blood count and ${kidneyCount} kidney function markers, plus biometrics you log yourself.`,
    categories: panelCategories,
    priceCard: {
      label: "Rahway fair",
      line: "Everything below from one draw at Rahway Pharmacy.",
      compare: "Usual route: $100 to $800+ for a visit plus labs",
      fine: "Credit card or HSA card. No insurance card needed.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Read your Rahway results in the Healiam app",
    sub: "Free on iPhone and Android. Scan a code now and you can reserve your Rahway slot from the same app.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  // Six questions: three about blood testing in Rahway, three about Healiam's Irving St fair.
  faq: {
    eyebrow: "Rahway questions",
    title: "Questions about blood testing in Rahway",
    sub: "Three questions about blood testing in Rahway, and three about Healiam's fair at Rahway Pharmacy.",
    items: [
      {
        q: "Where can I get blood testing in Rahway, NJ?",
        a: `At Rahway Pharmacy, 1421 Irving St, during Healiam's fair on ${rahwayFair.dateLabel}, ${fairHours.label} Eastern Time. Outside fair dates Healiam has no lab of its own in Rahway.`,
      },
      {
        q: "What does a blood test in Rahway cost with Healiam?",
        a: `${price} a person for the full panel of ${labMeasurementCount} lab measurements. You pay by credit card or HSA card, so there is no insurance claim to file.`,
      },
      {
        q: "Is a CBC or a kidney function test part of the Rahway panel?",
        a: `Both come with every Rahway draw: the CBC's ${cbcCount} measurements of blood cells and platelets, and ${kidneyCount} kidney markers including creatinine and urea nitrogen.`,
      },
      {
        q: "How close is the Rahway fair to the train station?",
        a: "Close enough to walk. Rahway Pharmacy is on Irving Street, a short walk from the Rahway NJ Transit station.",
      },
      {
        q: "Is there parking near Rahway Pharmacy?",
        a: "Yes. Street parking along Irving Street is free, and a public lot sits one block east of the pharmacy.",
      },
      {
        q: `Will Healiam come back to Rahway after ${monthDay}?`,
        a: "New dates go up on the fairs page when they are scheduled, and none after this one is listed yet. Send us a request if you would like another Rahway morning.",
      },
    ],
    help: {
      title: "Still have a question?",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book blood testing in Rahway",
    sub: `Walk over from the station or park on Irving Street, give two vials, and open all ${labMeasurementCount} results in the app 4 to 5 business days later.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  sticky: {
    label: "Blood testing in Rahway",
    sub: `Next fair ${dayShort} · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const;
