// Fairs that have a city page, keyed by fair slug. The state pages link to these from the fair's date
// card (owner, 5 Nov 2026). The fair's own /fairs/<slug> page is unchanged and keeps its links.
// Paths only, so this file can be imported anywhere without pulling in the page data.

export const cityPages: Readonly<Record<string, { readonly label: string; readonly href: string }>> = {
  "plano-tx": { label: "Blood testing in Plano", href: "/texas/blood-testing-in-plano" },
  "denver-co": { label: "Blood testing in Denver", href: "/colorado/blood-testing-in-denver" },
  "rahway-nj": { label: "Blood testing in Rahway", href: "/new-jersey/blood-testing-in-rahway" },
  "lawrenceville-ga": { label: "Blood testing in Lawrenceville", href: "/georgia/blood-testing-in-lawrenceville" },
};
