// The header's links, in the live healiam.com header's order (owner, 13 Nov 2026). Pages built on this
// site use their path here; FAQs and Download still open on healiam.com (see site.links).

import { site } from "@/lib/site";

export type HeaderLink = { readonly label: string; readonly href: string };
export type { LocationsMenuGroup } from "@/lib/locations";

/** Home, Our Tests, Fairs, FAQs, Contact. Locations and More sit between them as menus. */
export const headerLinks = {
  home: { label: "Home", href: "/" },
  tests: { label: "Our Tests", href: site.links.tests },
  fairs: { label: "Fairs", href: site.links.fairs },
  faq: { label: "FAQs", href: site.links.faq },
  contact: { label: "Contact", href: site.links.contact },
} as const;

/** The "More" menu. */
export const moreLinks: readonly HeaderLink[] = [
  { label: "Demo", href: site.links.demo },
  { label: "Download", href: site.links.download },
  { label: "Employer", href: site.links.employer },
  { label: "Blogs", href: site.links.blog },
  { label: "About", href: site.links.about },
];

/** Footer link of the Locations menu. */
export const requestFairLink: HeaderLink = { label: "Request a fair near you", href: site.links.contact };
