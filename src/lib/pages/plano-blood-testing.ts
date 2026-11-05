// Content for /texas/blood-testing-in-plano, keyword "blood testing in Plano TX" (SEO sheet, P1 core
// city). A city page first and a fair page second (owner, 5 Nov 2026): it opens with blood testing in
// Plano and the towns around it, then the next fair (Brightway Insurance, Coit Crossing, Sat Nov 14)
// and how to find it. Statewide coverage stays on /texas/blood-testing. Replaces /fairs/plano-tx,
// which redirects here.
//
// Facts: venue, suite, floor, parking, date and walk-ins from lib/fairs.ts (matches healiam.com/fairs/
// plano-tx); the 12 Jul 2026 Plano fair from healiam.com/fairs/plano-gurukul-tx; nearby towns and
// straight-line distances from the Healiam_Fair_City_Pages sheet. See docs/LOCATION-PAGES-AUDIT.md.

import { site } from "@/lib/site";
import { fairs, fairHours, type Fair } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";

const price = site.price.display;
const book = site.bookingUrl;

function fairBySlug(slug: string): Fair {
  const fair = fairs.find((f) => f.slug === slug);
  if (!fair) throw new Error(`plano-blood-testing: no fair "${slug}" in lib/fairs.ts`);
  return fair;
}

export const planoFair = fairBySlug("plano-tx");
const grandPrairieFair = fairBySlug("arlington-tx");

const cbcCount = panelCategories.find((c) => c.slug === "cbc")?.markers.length ?? 0;
const kidneyMarkers = panelCategories.find((c) => c.slug === "kidney")?.markers ?? [];

const dateShort = planoFair.dateLabel.replace(/,\s*\d{4}$/, ""); // "Sat, Nov 14"

export const plano = {
  path: "/texas/blood-testing-in-plano",
  keyword: "blood testing in Plano TX",
  meta: {
    title: `Blood Testing in Plano, TX | ${price}, No Referral | Healiam`,
    description: `Blood testing in Plano, TX for ${price}: ${labMeasurementCount} lab measurements, no referral or insurance. Next Plano fair ${dateShort} on Coit Rd. Walk-ins welcome.`,
  },
  nav: [
    { label: "Nearby towns", href: "#nearby" },
    { label: "What's tested", href: "#panel" },
    { label: "Next fair", href: "#arrival" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Texas", href: "/texas/blood-testing" },
    { name: "Plano" },
  ],

  hero: {
    eyebrow: "Plano, Texas",
    title: "Blood testing in Plano, TX",
    sub: `Preventive blood work in Plano without a doctor's order or an insurance claim: one ${price} panel of ${labMeasurementCount} lab measurements, drawn at a Healiam morning fair and read in the Healiam app.`,
    primary: { label: `Book for ${price}`, short: "Book now", href: book },
    secondary: { label: "Next Plano fair", href: "#arrival" },
    glance: {
      title: "Blood testing in Plano at a glance",
      rows: [
        { icon: "CircleDollarSign", label: "Price", value: `${price} for the full panel`, note: "Card or HSA card, no insurance" },
        { icon: "FlaskConical", label: "What's tested", value: `${labMeasurementCount} lab measurements`, note: `${labCategoryCount} categories from one draw` },
        { icon: "Timer", label: "Results", value: "4 to 5 business days", note: "Every marker in the Healiam app" },
      ],
      nextLabel: "Next Plano fair",
      nextNote: `${fairHours.label} CT · Brightway Insurance, Coit Rd`,
      walkIn: "Walk-ins welcome. Booking a slot online just means less waiting.",
      upcoming: "Upcoming",
      ended: "This date has passed. New Plano dates appear on the fairs page as they are scheduled.",
      endedCta: { label: "See upcoming fairs", href: site.links.fairs },
    },
  },

  trust: [
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "Footprints", label: "Walk-ins welcome" },
    { icon: "Car", label: "Free parking out front" },
    { icon: "CreditCard", label: "Card or HSA card" },
  ],

  arrival: {
    eyebrow: "Next Plano fair",
    title: "The next Plano fair, upstairs at Coit Crossing",
    sub: `${planoFair.dateLabel}, ${fairHours.label} Central Time, at Brightway Insurance. The fair is on the second floor of a professional plaza, so here is how to find it.`,
    steps: [
      { title: "Head for 6832 Coit Rd", line: "The Coit Crossing professional plaza, Plano 75023." },
      { title: "Park in front of the building", line: "Surface parking is free. The ADA-accessible spots are nearest the main doors." },
      { title: "Go up to the second floor", line: "Look for Brightway Insurance, Suite 270A, on the upper level." },
      { title: "Check in and sit down", line: "A licensed phlebotomist draws two vials in a private setting, usually in under seven minutes." },
    ],
    mapsLabel: "Open in Google Maps",
    cta: { label: `Book for ${price}`, href: book },
  },

  // The shared Process component, used here for a fasting plan around an 8 AM draw.
  process: {
    eyebrow: "How it works",
    title: "How blood testing works in Plano",
    sub: "Fairs open at 8 AM. A simple plan keeps the fast short and gets you to work on time.",
    steps: [
      { title: "The night before", sub: "Last meal 8 to 12 hours ahead" },
      { title: "When you wake up", sub: "Water only, no coffee or gum" },
      { title: "8 to 10 AM on Coit Rd", sub: "Two vials, under 7 min" },
      { title: "Straight after", sub: "Eat breakfast, then on with your day" },
    ],
    tip: "Skip hard workouts for 24 hours before the draw. Results reach the Healiam app in 4 to 5 business days.",
    cta: {
      primary: { label: "Book my Plano slot", href: book },
      secondary: { label: "Next Plano fair", href: "#arrival" },
    },
  },

  panel: {
    eyebrow: "The panel",
    title: "What a Plano blood test covers",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, including the kidney function tests and the complete blood count (CBC), plus biometrics you log in the app.`,
    categories: panelCategories,
    priceCard: {
      label: "Plano fair",
      line: "The whole panel at the Coit Rd fair, one draw, one price.",
      compare: "Usual route: $100 to $800+ for a visit plus labs",
      fine: "Credit card or HSA card. No insurance card needed.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  nearby: {
    eyebrow: "Plano and nearby",
    title: "Blood testing for Plano and nearby towns",
    sub: "Healiam's Plano fairs also suit people in nearby towns. Distances are in a straight line from the Coit Rd venue, so the drive will be a little longer.",
    townsTitle: "Nearby towns",
    towns: [
      { name: "East Frisco", distance: "about 4.8 miles" },
      { name: "Far North Dallas", distance: "about 5.2 miles" },
      { name: "Allen", distance: "about 6.2 miles" },
    ],
    backup: {
      title: `Can't make ${dateShort}?`,
      line: `Healiam's other North Texas fair is a week later, ${grandPrairieFair.dateLabel.replace(/,\s*\d{4}$/, "")}, at ${grandPrairieFair.venue} in ${grandPrairieFair.locality}. Same panel, same price.`,
      cta: { label: "See the Grand Prairie fair", href: grandPrairieFair.detailsUrl },
    },
    history: {
      title: "Healiam has tested in Plano before",
      line: "Healiam held a Plano fair on 12 July 2026 at Shree Swaminarayan Gurukul on Park Vista Rd, and is back in Plano on Coit Rd in November.",
    },
    stateLink: { label: "Blood testing across Texas", href: "/texas/blood-testing" },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Your Plano results, in the Healiam app",
    sub: "Install it before November 14 so check-in at Coit Rd is quick. Free on iPhone and Android.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  // Six questions: three about blood testing in Plano, three about Healiam's Coit Rd fair.
  faq: {
    eyebrow: "Plano questions",
    title: "Blood testing in Plano, TX: your questions",
    sub: "Three questions about blood testing in Plano, and three about Healiam's Coit Rd fair.",
    items: [
      {
        q: "Where can I get blood testing in Plano, TX?",
        a: `At Healiam's fair at Brightway Insurance, 6832 Coit Rd, Suite 270A, on ${planoFair.dateLabel}, ${fairHours.label} Central Time. Healiam tests at scheduled morning fairs rather than a lab that is open every day.`,
      },
      {
        q: "How much does a blood test cost in Plano with Healiam?",
        a: `${price} for all ${labMeasurementCount} lab measurements, paid by credit card or HSA card. There is no visit fee, no copay and no bill afterwards, and no insurance is needed.`,
      },
      {
        q: "Can I get a kidney function test or a CBC in Plano?",
        a: `Yes, both are part of the one panel. The kidney measurements are ${kidneyMarkers.join(", ").toLowerCase().replace(/, ([^,]*)$/, " and $1")}, and the CBC covers ${cbcCount} measurements of red cells, white cells and platelets. There is nothing extra to order.`,
      },
      {
        q: "Do I need to book, or can I walk in at the Plano fair?",
        a: `Walk-ins are welcome any time between ${fairHours.label}. Booking a slot online, which needs a free Healiam account, just means less waiting.`,
      },
      {
        q: "How do I find suite 270A?",
        a: "Park free in front of the Coit Crossing professional plaza at 6832 Coit Rd, then go up to the second floor and look for Brightway Insurance, Suite 270A. The ADA-accessible parking spots are nearest the main doors.",
      },
      {
        q: "What if I can't make the Plano date?",
        a: `Healiam's Grand Prairie fair runs a week later, on ${grandPrairieFair.dateLabel}, at ${grandPrairieFair.venue}, ${grandPrairieFair.street}. New Plano dates are posted on the fairs page as they are scheduled.`,
      },
    ],
    help: {
      title: "Still have a question?",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book your Plano blood test",
    sub: `Park in front of Coit Crossing, head up to suite 270A, and read all ${labMeasurementCount} results in the app 4 to 5 business days later.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  sticky: {
    label: "Blood testing in Plano",
    sub: `Next fair ${dateShort} · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const;

export type CityFairPage = typeof plano;
