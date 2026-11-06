// Per-fair copy for /fairs/<slug> (client approved a rewrite, 6 Nov 2026). Every fair page used to share
// one template; each now has its own headings, notes and closing lines, so no two read alike. Facts come
// from lib/fairs.ts (venue, address, parking, access, nearby towns) and lib/panel.ts (counts). Only Plano
// mentions walk-ins: healiam.com confirms them for Plano and says nothing about the other fairs.

import { site } from "@/lib/site";
import { labCategoryCount, labMeasurementCount } from "@/lib/panel";

const price = site.price.display;
const n = labMeasurementCount;
const c = labCategoryCount;

export type FairPageCopy = {
  /** One sentence for the meta description, after the shared opening. */
  readonly metaLine: string;
  /** Under the date and hours in the hero card. */
  readonly whenNote: string;
  readonly directionsTitle: string;
  readonly expectTitle: string;
  readonly bring: readonly [string, string, string];
  readonly panelLine: string;
  /** Label above the nearby-town chips, when the fair has nearby towns. */
  readonly nearbyLabel: string;
  readonly finalCta: { readonly title: string; readonly sub: string };
};

const copy: Record<string, FairPageCopy> = {
  "plano-tx": {
    metaLine: "Upstairs at Brightway Insurance in the Coit Crossing plaza, west Plano; walk-ins welcome.",
    whenNote: "Walk-ins are welcome, though a booked slot means less waiting.",
    directionsTitle: "Finding suite 270A",
    expectTitle: "Your Plano morning",
    bring: [
      "The Healiam app on your phone, signed in",
      `A card or HSA card for the ${price} panel`,
      "Nothing to eat for 8 to 12 hours before; water is fine",
    ],
    panelLine: `Thyroid, lipids, kidney and liver function, iron and Vitamin D: ${n} lab measurements across ${c} categories, all from the same two vials.`,
    nearbyLabel: "Also close to",
    finalCta: {
      title: "Save your spot in Plano",
      sub: "Book a time at the Plano fair and read every result in the app the following week.",
    },
  },
  "arlington-tx": {
    metaLine: "Third floor of the Watson Road professional building in Grand Prairie, close to Arlington.",
    whenNote: "Book ahead to choose your time within the two-hour window.",
    directionsTitle: "Getting to suite 318",
    expectTitle: "What happens upstairs",
    bring: [
      "Your phone, with the Healiam app ready to go",
      "A credit card or HSA card; there's no insurance step",
      "An empty stomach: 8 to 12 hours without food, water allowed",
    ],
    panelLine: `From a complete blood count to HbA1c and a full lipid profile, the panel reports ${n} lab measurements in ${c} categories.`,
    nearbyLabel: "Also close to",
    finalCta: {
      title: "Book the Grand Prairie fair",
      sub: "Pick a slot on Watson Road, and your full report arrives in the app a few days later.",
    },
  },
  "rahway-nj": {
    metaLine: "At Rahway Pharmacy on Irving Street, a short walk from the NJ Transit station.",
    whenNote: "Reserve a time online so you're seen promptly.",
    directionsTitle: "By train or by car",
    expectTitle: "At the pharmacy",
    bring: [
      "Your phone with the Healiam app installed",
      "Any credit card, or your HSA card",
      "A fasted stomach, 8 to 12 hours, sipping water as you like",
    ],
    panelLine: `Lipids, glucose and HbA1c sit alongside kidney, liver and thyroid markers: ${n} lab measurements in ${c} categories from two vials.`,
    nearbyLabel: "Handy for",
    finalCta: {
      title: "Reserve your Rahway slot",
      sub: "Take the train or park on Irving Street, and see every result in the app within the week.",
    },
  },
  "denver-co": {
    metaLine: "On Irving Street in Denver's Berkeley neighborhood, with a free lot next door.",
    whenNote: "Booking holds your place in the morning window.",
    directionsTitle: "Getting to Berkeley",
    expectTitle: "How the morning goes",
    bring: [
      "A phone with the Healiam app set up",
      "Payment by card or HSA card",
      "No breakfast: fast 8 to 12 hours, with water",
    ],
    panelLine: `Hemoglobin and hematocrit, worth a look at altitude, are part of a ${n}-measurement panel across ${c} categories.`,
    nearbyLabel: "Close to",
    finalCta: {
      title: "Book the Denver fair",
      sub: "It's one of two Healiam fairs in the metro, with Centennial in the south. Your report follows in the app.",
    },
  },
  "centennial-co": {
    metaLine: "At the Centennial Public Works building on South Eagle Street, south metro Denver.",
    whenNote: "A booked time keeps the wait short.",
    directionsTitle: "Finding Public Works",
    expectTitle: "On a Centennial morning",
    bring: [
      "The Healiam app, installed on your phone",
      "Credit or HSA card; insurance isn't involved",
      "An overnight fast of 8 to 12 hours; plain water is fine",
    ],
    panelLine: `Iron, UIBC, Vitamin D, lipids and liver enzymes are among the ${n} lab measurements in ${c} categories.`,
    nearbyLabel: "Close to",
    finalCta: {
      title: "Book the Centennial fair",
      sub: "A weekend morning in the south metro, and your results on your phone the following week.",
    },
  },
  "lawrenceville-ga": {
    metaLine: "On Longleaf Blvd in Lawrenceville, the Gwinnett County seat, with free parking on site.",
    whenNote: "Booking ahead lets you pick the time that suits you.",
    directionsTitle: "Getting to Longleaf Blvd",
    expectTitle: "Your visit in Lawrenceville",
    bring: [
      "Your phone, signed in to the Healiam app",
      "A card or HSA card to pay",
      "An 8 to 12 hour fast; drinking water is fine",
    ],
    panelLine: `Kidney and liver function lead a panel of ${n} lab measurements across ${c} categories, all from one draw.`,
    nearbyLabel: "Close to",
    finalCta: {
      title: "Book your Gwinnett appointment",
      sub: "Choose a time on Longleaf Blvd, and your report arrives in the app the following week.",
    },
  },
};

/** Copy for one fair page. Throws for a fair with no copy, so a new fair can't ship a blank page. */
export function fairPageCopy(slug: string): FairPageCopy {
  const page = copy[slug];
  if (!page) throw new Error(`fair-pages: no copy for "${slug}". Add it to lib/pages/fair-pages.ts.`);
  return page;
}
