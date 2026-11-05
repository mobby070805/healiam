// Content for /georgia/blood-testing-in-lawrenceville, keyword "blood testing in Lawrenceville GA" (SEO
// sheet, P1 core city). A city page first and a fair page second (owner, 5 Nov 2026): it opens with blood
// testing in Lawrenceville and the Gwinnett towns near it, then the next fair (755 Longleaf Blvd, Sat
// Nov 21), with free parking on site. The Georgia state page keeps the statewide view. Replaces
// /fairs/lawrenceville-ga, which redirects here.
//
// Facts: address, parking, ADA spaces, county and date from lib/fairs.ts (matches healiam.com/fairs/
// lawrenceville-ga, which names no venue and says nothing about walk-ins, so neither does this page);
// Grayson and Snellville distances from the Healiam_Fair_City_Pages sheet, Dacula from its notes
// ("10.8 km, just outside 10 km").

import { site } from "@/lib/site";
import { fairs, fairHours, type Fair } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";

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
    description: `Blood testing in Lawrenceville, GA for ${price}: ${labMeasurementCount} lab measurements, no referral or insurance. Next Gwinnett fair ${dayShort} on Longleaf Blvd, free parking.`,
  },
  nav: [
    { label: "Nearby towns", href: "#nearby" },
    { label: "What's tested", href: "#panel" },
    { label: "Next fair", href: "#next-fair" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Georgia", href: "/georgia/blood-testing" },
    { name: "Lawrenceville" },
  ],

  hero: {
    eyebrow: "Lawrenceville, Georgia",
    title: "Blood testing in Lawrenceville, GA",
    sub: `Preventive blood testing in the Gwinnett County seat, with no doctor's order and no insurance paperwork: a ${price} panel of ${labMeasurementCount} lab measurements, two vials, and results in the Healiam app.`,
    primary: { label: `Book for ${price}`, short: "Book now", href: book },
    secondary: { label: "Next Lawrenceville fair", href: "#next-fair" },
    glance: {
      title: "Blood testing in Lawrenceville at a glance",
      rows: [
        { icon: "CircleDollarSign", label: "Price", value: `${price} a person`, note: "Credit card or HSA card" },
        { icon: "FlaskConical", label: "What's tested", value: `${labMeasurementCount} lab measurements`, note: `${kidneyCount} kidney markers, a full CBC and more` },
        { icon: "Car", label: "Parking", value: "Free, on site", note: "ADA spaces closest to the entrance" },
      ],
      nextLabel: "Next Lawrenceville fair",
      nextNote: `${fairHours.label} ET · 755 Longleaf Blvd`,
      walkIn: "Reserve your time online first. You'll need a free Healiam account.",
      upcoming: "Upcoming",
      ended: "This Lawrenceville date has passed. Any later Georgia date will appear on the fairs page.",
      endedCta: { label: "See upcoming fairs", href: site.links.fairs },
    },
  },

  trust: [
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "MapPin", label: "In Gwinnett County" },
    { icon: "Car", label: "Free on-site parking" },
    { icon: "CreditCard", label: "Card or HSA card" },
  ],

  // Straight-line miles from the venue: Grayson and Snellville from the fair-city sheet (km converted),
  // Dacula from the sheet's notes.
  coverage: {
    eyebrow: "Lawrenceville and nearby",
    title: "Lawrenceville blood testing for nearby Gwinnett towns",
    sub: "Lawrenceville is the county seat, so the fair is a short drive for several neighboring towns. Distances are in a straight line from Longleaf Blvd.",
    listTitle: "Close to the fair",
    towns: [
      { name: "Grayson", miles: 3.7 },
      { name: "Snellville", miles: 5.0 },
      { name: "Dacula", miles: 6.7 },
    ],
    request: {
      title: "Further across Georgia?",
      line: "This is Healiam's only Georgia fair at the moment. Send us your town and we'll tell you if one is planned nearer.",
      cta: { label: "Ask for a fair", href: site.links.contact },
    },
    stateLink: { label: "Blood testing across Georgia", href: "/georgia/blood-testing" },
  },

  panel: {
    eyebrow: "The panel",
    title: "Everything measured in a Lawrenceville draw",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, kidney function and a ${cbcCount}-measurement CBC among them, plus biometrics you add in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "Lawrenceville fair",
      line: "One draw on Longleaf Blvd covers every marker listed here.",
      compare: "Usual route: $100 to $800+ for a visit plus labs",
      fine: "Credit card or HSA card. No insurance card needed.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  process: {
    eyebrow: "How it works",
    title: "Your Lawrenceville visit, start to finish",
    sub: "Most of it happens before you get in the car.",
    steps: [
      { title: "Pick your time online", sub: "In the app or on the web" },
      { title: "Skip breakfast", sub: "Fast 8 to 12 hours, water is fine" },
      { title: "Drive to Longleaf Blvd", sub: "Park free on site" },
      { title: "Two vials, then go", sub: "Results in 4 to 5 business days" },
    ],
    tip: "Avoid strenuous exercise the day before. Your phone with the Healiam app and a card or HSA card are all you need to bring.",
    cta: {
      primary: { label: "Pick a Lawrenceville time", href: book },
      secondary: { label: "Next fair", href: "#next-fair" },
    },
  },

  // Lawrenceville's own section: the next fair as one wide event card.
  event: {
    eyebrow: "Next Lawrenceville fair",
    title: "The next Lawrenceville fair on Longleaf Blvd",
    sub: "In the heart of Gwinnett County, with free parking on site and accessible spaces by the door.",
    rows: [
      { icon: "CalendarDays", label: "Date", value: lawrencevilleFair.dateLabel },
      { icon: "Clock", label: "Hours", value: `${fairHours.label} Eastern Time` },
      { icon: "MapPin", label: "Address", value: `${lawrencevilleFair.street}, ${lawrencevilleFair.locality}, ${lawrencevilleFair.region} ${lawrencevilleFair.postalCode}` },
      { icon: "Car", label: "Parking", value: "Free on site, with ADA-accessible spaces nearest the entrance" },
    ],
    mapsLabel: "Open in Google Maps",
    cta: { label: `Book ${monthDay} for ${price}`, href: book },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Lawrenceville results, straight to the Healiam app",
    sub: "Free on iPhone and Android. Book your Lawrenceville time in it, then find your report there afterwards.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  // Six questions: three about blood testing in Lawrenceville, three about Healiam's Longleaf Blvd fair.
  faq: {
    eyebrow: "Lawrenceville questions",
    title: "Lawrenceville blood testing: common questions",
    sub: "Three questions about blood testing in Lawrenceville, and three about Healiam's fair on Longleaf Blvd.",
    items: [
      {
        q: "Where can I get blood testing in Lawrenceville, GA?",
        a: `At Healiam's fair at 755 Longleaf Blvd, Lawrenceville 30046, on ${lawrencevilleFair.dateLabel}, ${fairHours.label} Eastern Time. Healiam runs scheduled fairs rather than a lab that opens every day.`,
      },
      {
        q: "How much is blood testing in Lawrenceville with Healiam?",
        a: `${price} per person for all ${labMeasurementCount} lab measurements, paid by credit card or HSA card. Healiam doesn't take insurance, so there is no copay or bill afterwards.`,
      },
      {
        q: "Are a kidney function test and a CBC included in Lawrenceville?",
        a: `Yes, the Lawrenceville panel has both, alongside thyroid, lipids, liver, iron and Vitamin D: ${kidneyCount} kidney markers and a ${cbcCount}-measurement CBC from the same draw.`,
      },
      {
        q: "Is the Lawrenceville fair a short trip from Grayson or Snellville?",
        a: "Yes. Grayson is about 3.7 miles and Snellville about 5 miles from the venue in a straight line, and parking is free when you arrive.",
      },
      {
        q: "Is there accessible parking at the Lawrenceville fair?",
        a: "Yes. The ADA-accessible spaces are the ones closest to the entrance, in the free on-site lot.",
      },
      {
        q: `What if I can't make ${monthDay}?`,
        a: "No other Georgia date is listed yet. New dates go up on the fairs page as soon as they are set, and you can ask us for one in your area.",
      },
    ],
    help: {
      title: "Still have a question?",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Reserve your Lawrenceville blood test",
    sub: `Drive to Longleaf Blvd, park for free, give two vials, and open all ${labMeasurementCount} results in the app 4 to 5 business days later.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  sticky: {
    label: "Blood testing in Lawrenceville",
    sub: `Next fair ${dayShort} · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const;
