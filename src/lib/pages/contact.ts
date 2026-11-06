// Content for /contact, from https://healiam.com/contact.

import { site } from "@/lib/site";

const price = site.price.display;

export const contact = {
  path: "/contact",
  meta: {
    title: "Contact Healiam | Questions, Bookings and Health Fairs",
    description:
      "Call 720-761-7869 or email heal@healiam.com. Ask about the panel, book a blood test, or request a Healiam health fair at your location.",
  },
  nav: [
    { label: "Get in touch", href: "#reach" },
    { label: "Send a message", href: "#message" },
  ],
  breadcrumb: [{ name: "Home", href: "/" }, { name: "Contact" }],

  hero: {
    eyebrow: "Contact us",
    titleParts: [
      { text: "We'd love to ", accent: false },
      { text: "hear from you", accent: true },
    ],
    sub: "Questions about the panel, help with a booking, or a health fair at your workplace or community. A person answers.",
  },

  reach: {
    eyebrow: "Get in touch",
    title: "Three ways to reach us",
    sub: "Phone and email are answered during business hours, Mountain Time.",
    methods: [
      {
        icon: "Phone",
        label: "Phone",
        value: site.phone,
        href: site.phoneHref,
        line: "Fastest for booking questions and day-of-fair help.",
      },
      {
        icon: "Mail",
        label: "Email",
        value: site.email,
        href: `mailto:${site.email}`,
        line: "Best for results questions, invoices and anything you need in writing.",
      },
      {
        icon: "Building",
        label: "Host a fair",
        value: "Bring Healiam to your location",
        href: `mailto:${site.email}?subject=${encodeURIComponent("Hosting a Healiam health fair")}`,
        line: "Employers, pharmacies, clinics and community groups. Tell us roughly how many people.",
      },
    ],
    socialsLabel: "Or find us on",
  },

  form: {
    eyebrow: "Send a message",
    title: "Send us a message",
    sub: "We reply to everything, usually within one business day.",
    fields: {
      name: { label: "Name", placeholder: "Your name", autoComplete: "name" },
      email: { label: "Email", placeholder: "you@example.com", autoComplete: "email" },
      phone: { label: "Phone", hint: "optional", placeholder: site.phone, autoComplete: "tel" },
      message: { label: "Message", placeholder: "How can we help?" },
    },
    submit: "Send message",
    privacy: "We use your details to answer you and nothing else. We do not share them with any third party.",
    // Shown instead of the form until a form endpoint is configured, so no one
    // types a message into a form that cannot deliver it.
    noEndpoint: {
      title: "Email is the quickest route",
      line: "Our message form is not connected yet, so email reaches us fastest. We reply within one business day.",
      cta: { label: "Email us", href: `mailto:${site.email}` },
    },
  },

  finalCta: {
    title: "Blood testing made easy",
    sub: `One ${price} panel with every test included. Book a slot at a fair near you.`,
    primary: { label: `Book for ${price}`, href: site.bookingUrl },
    secondary: { label: "Get the app", href: site.appDownloadUrl },
  },
} as const;
