// Content for /tests, from https://healiam.com/tests.
// House style: US English, no em or en dashes, no invented numbers.

import { site } from "@/lib/site";
import { labCategoryCount, labMeasurementCount } from "@/lib/panel";

const price = site.price.display;
const book = site.bookingUrl;

export const tests = {
  path: "/tests",
  meta: {
    title: `What's in the ${price} Health Screening Panel | Healiam`,
    description: `Every marker in the Healiam panel: CBC, thyroid, electrolytes, lipids, kidney, liver, iron, pancreas, Vitamin D and HbA1c. One ${price} draw, CLIA-certified results in 4 to 5 business days.`,
  },
  nav: [
    { label: "What's included", href: "#included" },
    { label: "Before your visit", href: "#prep" },
  ],
  breadcrumb: [{ name: "Home", href: "/" }, { name: "Our tests" }],

  hero: {
    eyebrow: "Our tests",
    titleParts: [
      { text: "One comprehensive ", accent: false },
      { text: "panel", accent: true },
      { text: " for a full picture of ", accent: false },
      { text: "your health", accent: true },
    ],
    sub: `${labMeasurementCount} measurements across blood counts, thyroid, electrolytes, lipids, kidney, liver and diabetes, from a single draw.`,
    primary: { label: "Book an appointment", short: "Book now", href: book },
    secondary: { label: "See what's included", href: "#included" },
    card: {
      title: "What's inside the panel",
      // Six of the eleven categories, as on healiam.com. The full list is below.
      tiles: ["cbc", "thyroid", "electrolytes", "lipids", "kidney", "diabetes"],
    },
  },

  included: {
    eyebrow: "Comprehensive panel",
    title: "What's included",
    sub: "A clear breakdown of categories and measurements.",
    stats: [
      { value: `${labMeasurementCount}`, label: "measurements" },
      { value: `${labCategoryCount}`, label: "lab categories" },
      { value: "1", label: "simple panel" },
    ],
    browseLabel: "Browse a category",
    selfLoggedNote: "You log these in the app. They are not measured by the lab.",
    cta: { label: `Book for ${price}`, href: book },
  },

  prep: {
    eyebrow: "Before your visit",
    title: "How to prepare",
    sub: "Four things that keep your results accurate and your visit quick.",
    steps: [
      {
        icon: "Utensils",
        title: "Fast 8 to 12 hours",
        line: "Water only. No coffee, tea, juice or chewing gum in the hours before your draw.",
      },
      {
        icon: "Dumbbell",
        title: "Skip hard exercise",
        line: "Strenuous exercise shifts several markers, so leave 24 hours between your last hard session and the test.",
      },
      {
        icon: "GlassWater",
        title: "Drink plenty of water",
        line: "Hydrate before the fast starts and keep sipping water through it. It prevents dehydration and makes the draw easier.",
      },
      {
        icon: "Clock",
        title: "Arrive on time",
        line: "Turn up at your slot to keep the wait short, and bring the Healiam app with you.",
      },
    ],
  },

  finalCta: {
    title: "Blood testing made easy",
    sub: `One ${price} panel with every test included, and results in the app in 4 to 5 business days.`,
    primary: { label: `Book for ${price}`, href: book },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },

  sticky: {
    label: `${price} health screening panel`,
    sub: "All tests in one panel",
    cta: { label: "Book now", href: book },
  },
} as const;
