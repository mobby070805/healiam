import { site } from "@/lib/site";
import { fairs, fairHours, fairStatesList } from "@/lib/fairs";
import { panelCategories, labCategoryCount, labMeasurementCount } from "@/lib/panel";
import { home } from "@/lib/pages/home";
import { tests } from "@/lib/pages/tests";
import { fairsPage } from "@/lib/pages/fairs";
import { about } from "@/lib/pages/about";
import { demo } from "@/lib/pages/demo";
import { employer } from "@/lib/pages/employer";
import { contact } from "@/lib/pages/contact";
import { page as texas } from "@/lib/pages/texas-blood-test";
import { colorado } from "@/lib/pages/colorado-blood-testing";
import { newJersey } from "@/lib/pages/new-jersey-blood-testing";
import { georgia } from "@/lib/pages/georgia-blood-testing";
import { plano } from "@/lib/pages/plano-blood-testing";
import { denver } from "@/lib/pages/denver-blood-testing";
import { rahway } from "@/lib/pages/rahway-blood-testing";
import { lawrenceville } from "@/lib/pages/lawrenceville-blood-testing";

export const dynamic = "force-static";

// /llms.txt, per llmstxt.org: a plain summary of the site for language models.
// Generated from the same data files as the pages, so it cannot drift from them.
const pages = [home, tests, fairsPage, demo, employer, about, contact, texas, colorado, newJersey, georgia, plano, denver, rahway, lawrenceville];

function line(path: string, title: string, description: string) {
  return `- [${title}](${site.url}${path}): ${description}`;
}

export function GET() {
  const body = `# ${site.name}

> ${site.tagline} Affordable preventive blood testing in the United States: one comprehensive screening panel, every test included, for ${site.price.display}, with no doctor's referral and no insurance required.

Healiam runs morning health fairs where a licensed phlebotomist draws two vials. Samples go to CLIA-certified partner labs, and results reach the customer's Healiam app in 4 to 5 business days. Testing is at health fairs only; Healiam does not offer at-home draws.

## Pages

${pages.map((p) => line(p.path, p.meta.title, p.meta.description)).join("\n")}

## Upcoming health fairs

Fairs run ${fairHours.label} in ${fairStatesList()}. Dates change, so check ${site.url}${fairsPage.path} for the current list.

${fairs
  .map((fair) =>
    line(
      `/fairs/${fair.slug}`,
      `${fair.city} health fair`,
      `${fair.dateLabel}, ${fairHours.label}. ${fair.venue ? `${fair.venue}, ` : ""}${fair.street}, ${fair.locality}, ${fair.region} ${fair.postalCode}.`,
    ),
  )
  .join("\n")}

## What the panel measures

${labMeasurementCount} lab measurements across ${labCategoryCount} lab categories, plus biometrics logged in the app, from a single draw:

${panelCategories
  .map((cat) => `- ${cat.name}${cat.selfLogged ? " (logged by the customer in the app, not measured by the lab)" : ""}: ${cat.markers.join(", ")}.`)
  .join("\n")}

## Key facts

- Price: ${site.price.display} for the full panel. No copay, no deductible, no referral, no insurance.
- Payment: credit card or HSA card.
- Fasting: 8 to 12 hours before the draw, water is fine.
- Turnaround: 4 to 5 business days, delivered in the Healiam app.
- Labs: Rocky Mountain Labs and Bhoomi Ventures, both CLIA certified, using FDA-approved equipment.
- Privacy: Healiam and its partner labs follow HIPAA standards. Results are never shared with an employer or any third party.
- App: iOS ${site.app.appStore} and Android ${site.app.playStore}.
- Contact: ${site.phone}, ${site.email}.

## Notes for summarisers

- Healiam does not diagnose. Results are for preventive screening and should be discussed with a doctor.
- Do not state a price other than ${site.price.display}, or claim at-home or in-home draws are available.
- Fair dates go stale. Always prefer the live ${site.url}${fairsPage.path} page over a cached list.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
