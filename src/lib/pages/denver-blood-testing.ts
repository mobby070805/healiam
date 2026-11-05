// Content for /colorado/blood-testing-in-denver, keyword "blood testing in Denver CO" (SEO sheet, P1
// core city). A city page first and a fair page second (owner, 5 Nov 2026): it opens with blood
// testing in Denver, the west and north suburbs it serves and reading results at altitude, then the
// next fair (Sat, Nov 14 at 3955 Irving St, Berkeley) with Centennial on Sunday as the other option. Statewide coverage stays on
// /colorado/blood-testing. Replaces /fairs/denver-co, which redirects here.
//
// Facts: address, neighborhood, parking and date from lib/fairs.ts (matches healiam.com/fairs/denver-co,
// which does not mention walk-ins, so this page doesn't either); the venue has no published name;
// nearby towns and straight-line distances from the Healiam_Fair_City_Pages sheet.

import { site } from "@/lib/site";
import { fairs, fairHours, type Fair } from "@/lib/fairs";
import { home } from "@/lib/pages/home";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";

const price = site.price.display;
const book = site.bookingUrl;

function fairBySlug(slug: string): Fair {
  const fair = fairs.find((f) => f.slug === slug);
  if (!fair) throw new Error(`denver-blood-testing: no fair "${slug}" in lib/fairs.ts`);
  return fair;
}

export const denverFair = fairBySlug("denver-co");
const centennialFair = fairBySlug("centennial-co");

const short = (f: Fair) => f.dateLabel.replace(/,\s*\d{4}$/, ""); // "Sat, Nov 14"
const daysApart = Math.round((Date.parse(centennialFair.date) - Date.parse(denverFair.date)) / 86_400_000);
const kidneyCount = panelCategories.find((c) => c.slug === "kidney")?.markers.length ?? 0;
const cbcCount = panelCategories.find((c) => c.slug === "cbc")?.markers.length ?? 0;

export const denver = {
  path: "/colorado/blood-testing-in-denver",
  keyword: "blood testing in Denver CO",
  meta: {
    title: `Blood Testing in Denver, CO | Saturday Fairs, ${price} | Healiam`,
    description: `Blood testing in Denver, CO: a ${price} panel of ${labMeasurementCount} lab measurements, no referral. Next Denver fair ${short(denverFair)} on Irving St in Berkeley, free parking.`,
  },
  nav: [
    { label: "Suburbs", href: "#nearby" },
    { label: "What's tested", href: "#panel" },
    { label: "Next fair", href: "#day" },
    { label: "FAQ", href: "#faq" },
  ],
  breadcrumb: [
    { name: "Home", href: "/" },
    { name: "Blood testing in Colorado", href: "/colorado/blood-testing" },
    { name: "Denver" },
  ],

  hero: {
    eyebrow: "Denver, Colorado",
    title: "Blood testing in Denver, CO",
    sub: `Blood testing in Denver on a Saturday morning: one ${price} panel of ${labMeasurementCount} lab measurements with no doctor's order or insurance, drawn by a licensed phlebotomist and read in the Healiam app.`,
    primary: { label: `Book for ${price}`, short: "Book now", href: book },
    secondary: { label: "Next Denver fair", href: "#day" },
    glance: {
      title: "Blood testing in Denver at a glance",
      rows: [
        { icon: "CircleDollarSign", label: "Price", value: `${price} per person`, note: "No visit fee, no insurance claim" },
        { icon: "FlaskConical", label: "What's tested", value: `${labMeasurementCount} lab measurements`, note: `CBC, kidney, thyroid and ${labCategoryCount - 3} more categories` },
        { icon: "Mountain", label: "Good to know", value: "Altitude affects two markers", note: "Hemoglobin and hematocrit can read higher" },
      ],
      nextLabel: "Next Denver fair",
      nextNote: `${fairHours.label} MT · 3955 Irving St, Berkeley`,
      walkIn: "Book a slot online before you go. It takes a free Healiam account and a few minutes.",
      upcoming: "Upcoming",
      ended: "This Denver date has passed. New Colorado dates appear on the fairs page as they are scheduled.",
      endedCta: { label: "See upcoming fairs", href: site.links.fairs },
    },
  },

  trust: [
    { icon: "BadgeCheck", label: "CLIA-certified labs" },
    { icon: "CalendarDays", label: "Saturday morning" },
    { icon: "Car", label: "Free lot next door" },
    { icon: "CreditCard", label: "Card or HSA card" },
  ],

  // Denver's own section: the two Colorado mornings side by side.
  day: {
    eyebrow: "Next Denver fair",
    title: "The next Denver fair, and a Sunday option",
    sub: `Denver's next fair is on a Saturday. If the south metro suits you better, Centennial follows ${daysApart} days later on a Sunday.`,
    options: [
      {
        tag: "This page",
        name: "Denver",
        dateLabel: denverFair.dateLabel,
        place: `${denverFair.street}, ${denverFair.locality} ${denverFair.postalCode}`,
        line: "Free parking in the lot beside the building. The ADA-accessible spaces are nearest the main entrance.",
        cta: { label: `Book Denver for ${price}`, href: book },
        fair: denverFair,
        primary: true,
      },
      {
        tag: "South metro",
        name: "Centennial",
        dateLabel: centennialFair.dateLabel,
        place: `${centennialFair.venue}, ${centennialFair.street}`,
        line: "Free parking in the lot in front of the building. Same panel and price, a Sunday instead of a Saturday.",
        cta: { label: "See the Centennial fair", href: centennialFair.detailsUrl },
        fair: centennialFair,
        primary: false,
      },
    ],
  },

  process: {
    eyebrow: "How it works",
    title: "Preparing for blood testing in Denver",
    sub: "Four things between booking and leaving Irving Street with your draw done.",
    steps: [
      { title: `Book ${short(denverFair)}`, sub: "In the app or online" },
      { title: "Stop eating the night before", sub: "8 to 12 hours ahead" },
      { title: "Keep drinking water", sub: "Water is fine while fasting" },
      { title: "8 to 10 AM, Irving St", sub: "Two vials, about 7 min" },
    ],
    tip: "No hard workouts in the 24 hours before. Your report arrives in the Healiam app 4 to 5 business days after the draw.",
    cta: {
      primary: { label: "Book the Denver date", href: book },
      secondary: { label: "Next fair", href: "#day" },
    },
  },

  nearby: {
    eyebrow: "Denver and the suburbs",
    title: "Blood testing for Denver and its west and north suburbs",
    sub: "Healiam's Denver fair sits in northwest Denver, close to these suburbs. Straight-line miles from the Irving St venue, closest first; the drive will be a little longer.",
    // From the Healiam_Fair_City_Pages sheet (km, converted to miles).
    towns: [
      { name: "Edgewater", miles: 2.2 },
      { name: "Wheat Ridge", miles: 2.5 },
      { name: "Arvada", miles: 3.7 },
      { name: "Westminster (south)", miles: 4.1 },
      { name: "Lakewood", miles: 5.3 },
      { name: "Commerce City", miles: 5.7 },
      { name: "Federal Heights", miles: 5.8 },
    ],
    stateLink: { label: "Blood testing across Colorado", href: "/colorado/blood-testing" },
  },

  panel: {
    eyebrow: "The panel",
    title: "Inside a Denver blood test",
    sub: `${labMeasurementCount} lab measurements across ${labCategoryCount} categories, from ${kidneyCount} kidney function markers to a ${cbcCount}-measurement CBC. Living a mile up can push hemoglobin and hematocrit higher, so mention your elevation when you go over those two.`,
    categories: panelCategories,
    priceCard: {
      label: "Denver fair",
      line: "Every marker in one Saturday draw on Irving St.",
      compare: "Usual route: $100 to $800+ for a visit plus labs",
      fine: "Credit card or HSA card. No insurance card needed.",
      cta: { label: `Book for ${price}`, href: book },
    },
  },

  app: {
    eyebrow: "The Healiam app",
    title: "Denver results land in the Healiam app",
    sub: "Free on iPhone and Android. Your Denver report lands there 4 to 5 business days after the draw.",
    points: [],
    scanNote: home.app.scanNote,
    stores: home.app.stores,
  },

  // Six questions: three about blood testing in Denver, three about Healiam's Irving St fair.
  faq: {
    eyebrow: "Denver questions",
    title: "Denver blood testing questions, answered",
    sub: "Three questions about blood testing in Denver, and three about Healiam's Irving St fair.",
    items: [
      {
        q: "Where can I get blood testing in Denver, CO?",
        a: `At Healiam's Saturday fair at ${denverFair.street}, Denver ${denverFair.postalCode}, in the Berkeley neighborhood, on ${denverFair.dateLabel}, ${fairHours.label} Mountain Time. Healiam tests at scheduled fairs, not at a lab that is open every day.`,
      },
      {
        q: "What does blood testing in Denver cost with Healiam?",
        a: `${price} per person for all ${labMeasurementCount} lab measurements. Pay by credit card or HSA card; Healiam does not bill insurance, and there is no separate visit fee.`,
      },
      {
        q: "Does the Denver panel include a kidney function test and a CBC?",
        a: `Yes. Every Denver draw runs the full panel, which includes ${kidneyCount} kidney function markers and a ${cbcCount}-measurement complete blood count, so there is no add-on to choose.`,
      },
      {
        q: "Is there parking at the Denver fair?",
        a: "Yes, free parking in the lot next to the building at 3955 Irving St. The ADA-accessible spaces are the ones nearest the main entrance.",
      },
      {
        q: "I live in the south metro. Should I still come to Denver?",
        a: `You may find Centennial easier. Healiam's Centennial fair is at ${centennialFair.venue}, ${centennialFair.street}, on ${centennialFair.dateLabel}, with the same panel and price.`,
      },
      {
        q: "How do I book the Denver date?",
        a: `Sign up for a free Healiam account in the app or online, choose ${denverFair.dateLabel} in Denver, add anyone else being tested, and pay ${price} each by card or HSA card.`,
      },
    ],
    help: {
      title: "Still have a question?",
      secondary: { label: "Call us", href: site.phoneHref },
      email: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Book Saturday blood testing in Denver",
    sub: `Saturday morning on Irving St, a free lot next door, and all ${labMeasurementCount} results on your phone 4 to 5 business days later.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  sticky: {
    label: "Blood testing in Denver",
    sub: `Next fair ${short(denverFair)} · ${price}`,
    cta: { label: "Book now", href: book },
  },
} as const;
