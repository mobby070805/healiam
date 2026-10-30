// One source of truth for brand details. Change a value here and every page,
// link and schema block picks it up.

export const site = {
  name: "Healiam",
  tagline: "Health should be simple.",
  url: "https://healiam.com",
  phone: "720-761-7869",
  phoneHref: "tel:+17207617869",
  email: "heal@healiam.com",
  // White logo mark from healiam.com; tinted in the header with a CSS filter, like the live site.
  logoMark: "https://healiam.com/images/logo_white.png",
  bookingUrl: "https://client.healiam.com/booking",
  // Healiam's own smart link: it opens the installed app, or falls back to the right store
  // for the visitor's platform. Best for a single "get the app" button.
  appDownloadUrl: "https://cloud.healiam.com/api/client/download",
  app: {
    // Store listings, checked 29 Oct 2026.
    // The Apple link carries no country path on purpose, so Apple routes each
    // visitor to their own storefront.
    appStore: "https://apps.apple.com/app/id1601281502",
    playStore: "https://play.google.com/store/apps/details?id=com.servinq.blood_testing",
    // Published on the App Store listing. Re-check before each release; it moves.
    rating: { score: "4.9", count: 183, source: "App Store" },
    minIos: "iOS 16.4",
  },
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  // Where /contact posts its message form (Formspree, Basin, your own handler...).
  // Left empty, the page shows the email panel instead of a form that goes nowhere.
  contactFormEndpoint: process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT ?? "",
  price: {
    // Panel price (changed to $95 in Oct 2026). Every page reads it from here.
    panel: 95,
    display: "$95",
    currency: "USD",
  },
  links: {
    // Pages that live on this site use a path; the rest still point at healiam.com.
    tests: "/tests",
    fairs: "/fairs",
    faq: "https://healiam.com/faq",
    about: "/about",
    contact: "/contact",
    demo: "/demo",
    employer: "/employer",
    terms: "https://healiam.com/terms-and-conditions",
    privacy: "https://healiam.com/privacy-policy",
    blog: "https://healiam.com/blog",
    sampleReport: "https://healiam.com/faq/sample_results.pdf",
  },
  socials: [
    { name: "Facebook", href: "https://www.facebook.com/profile.php?id=100087373955181", logo: "/logos/facebook.svg" },
    { name: "Instagram", href: "https://www.instagram.com/healiamhealth/", logo: "/logos/instagram.svg" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/healiam", logo: "/logos/linkedin.svg" },
  ],
} as const;

export type Site = typeof site;
