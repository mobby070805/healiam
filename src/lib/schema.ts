// JSON-LD builders. No self-published reviews or ratings, no HowTo.
import { site } from "@/lib/site";
import { plainText } from "@/lib/rich-text";
import { fairHours, type Fair } from "@/lib/fairs";
import { page as texas } from "@/lib/pages/texas-blood-test";
import { home } from "@/lib/pages/home";
import { tests } from "@/lib/pages/tests";
import { fairsPage } from "@/lib/pages/fairs";
import { about } from "@/lib/pages/about";
import { authorProfile, blog, posts, type AuthorProfile, type BlogPost } from "@/lib/pages/blog";
import type { Article } from "@/lib/blog/articles";
import { contact } from "@/lib/pages/contact";
import { demo } from "@/lib/pages/demo";
import { fairDetail } from "@/lib/pages/fair-detail";
import { employer } from "@/lib/pages/employer";
import { colorado, coloradoFairs } from "@/lib/pages/colorado-blood-testing";
import { newJersey, newJerseyFairs } from "@/lib/pages/new-jersey-blood-testing";
import { georgia, georgiaFairs } from "@/lib/pages/georgia-blood-testing";
import { newYork, newYorkFairs } from "@/lib/pages/new-york-blood-testing";
import { plano, planoFair } from "@/lib/pages/plano-blood-testing";
import { denver, denverFair } from "@/lib/pages/denver-blood-testing";
import { rahway, rahwayFair } from "@/lib/pages/rahway-blood-testing";
import { lawrenceville, lawrencevilleFair } from "@/lib/pages/lawrenceville-blood-testing";

import { fairs as allFairs } from "@/lib/fairs";
import { panelCategories, labMeasurementCount } from "@/lib/panel";

const orgId = `${site.url}/#organization`;
const siteId = `${site.url}/#website`;

export function organization() {
  return {
    "@type": "Organization",
    "@id": orgId,
    name: site.name,
    url: site.url,
    logo: site.logoMark,
    email: site.email,
    telephone: site.phone.replace(" ", "-"),
    slogan: site.tagline,
    sameAs: site.socials.map((s) => s.href),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: site.phone.replace(" ", "-"),
      email: site.email,
      contactType: "customer service",
      areaServed: "US",
      availableLanguage: "en",
    },
  };
}

export function website() {
  return { "@type": "WebSite", "@id": siteId, url: site.url, name: site.name, publisher: { "@id": orgId } };
}

function panelOffer() {
  return {
    "@type": "Offer",
    price: site.price.panel.toFixed(2),
    priceCurrency: site.price.currency,
    availability: "https://schema.org/InStock",
    url: site.bookingUrl,
  };
}

function fairEvent(fair: Fair) {
  return {
    "@type": "Event",
    name: `Healiam blood testing fair, ${fair.city}`,
    startDate: `${fair.date}T${fairHours.start}:00${fair.utcOffset}`,
    endDate: `${fair.date}T${fairHours.end}:00${fair.utcOffset}`,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    url: fair.detailsUrl,
    description: `${site.price.panelName}: one preventive blood panel with every test included, for ${site.price.display}. No referral or insurance needed.`,
    organizer: { "@id": orgId },
    location: {
      "@type": "Place",
      name: fair.venue ?? fair.street,
      address: {
        "@type": "PostalAddress",
        streetAddress: fair.street,
        addressLocality: fair.locality,
        addressRegion: fair.region,
        postalCode: fair.postalCode,
        addressCountry: "US",
      },
    },
    offers: { ...panelOffer(), validFrom: "2026-10-01" },
  };
}

function breadcrumbList(url: string, crumbs: readonly { readonly name: string; readonly href?: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: crumbs.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: crumb.href ? `${site.url}${crumb.href === "/" ? "/" : crumb.href}` : url,
    })),
  };
}

function faqPage(url: string, items: readonly { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: plainText(item.a) },
    })),
  };
}

export function homeGraph() {
  const url = `${site.url}/`;
  const service = {
    "@type": ["Service", "MedicalTest"],
    "@id": `${url}#service`,
    name: "Comprehensive preventive blood panel",
    serviceType: "Preventive blood test panel",
    description: home.meta.description,
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "United States" },
    url,
    offers: panelOffer(),
  };
  const webPage = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: home.meta.title,
    description: home.meta.description,
    isPartOf: { "@id": siteId },
    about: { "@id": `${url}#service` },
    inLanguage: "en-US",
  };
  return {
    "@context": "https://schema.org",
    "@graph": [organization(), website(), webPage, service, faqPage(url, home.faq.items), ...home.fairs.list.map(fairEvent)],
  };
}

export function texasBloodTestGraph() {
  const url = `${site.url}${texas.path}`;

  const breadcrumb = {
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: texas.breadcrumb.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: "href" in crumb ? crumb.href : url,
    })),
  };

  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Blood testing in Texas",
    serviceType: "Preventive blood test panel",
    description: texas.meta.description,
    provider: { "@id": orgId },
    areaServed: { "@type": "State", name: "Texas" },
    url,
    offers: panelOffer(),
  };

  const webPage = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: texas.meta.title,
    description: texas.meta.description,
    isPartOf: { "@id": siteId },
    about: { "@id": `${url}#service` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: "en-US",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      website(),
      webPage,
      breadcrumb,
      service,
      faqPage(url, texas.faq.items),
      ...texas.locations.fairs.map(fairEvent),
    ],
  };
}

export function testsGraph() {
  const url = `${site.url}${tests.path}`;

  const test = {
    "@type": ["MedicalTest", "Service"],
    "@id": `${url}#panel`,
    name: "Healiam comprehensive blood panel",
    alternateName: `${labMeasurementCount}+ measurement preventive blood panel`,
    description: tests.meta.description,
    usedToDiagnose: "Preventive health screening",
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "United States" },
    url,
    offers: panelOffer(),
  };

  // The categories, so the marker list is machine readable as well as on the page.
  const categories = {
    "@type": "ItemList",
    "@id": `${url}#categories`,
    name: "Blood panel categories",
    numberOfItems: panelCategories.length,
    itemListElement: panelCategories.map((cat, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "MedicalTestPanel",
        name: cat.name,
        description: cat.line,
        subTest: cat.markers.map((marker) => ({ "@type": "MedicalTest", name: marker })),
      },
    })),
  };

  const webPage = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: tests.meta.title,
    description: tests.meta.description,
    isPartOf: { "@id": siteId },
    about: { "@id": `${url}#panel` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: "en-US",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization(), website(), webPage, breadcrumbList(url, tests.breadcrumb), test, categories],
  };
}

export function fairsGraph() {
  const url = `${site.url}${fairsPage.path}`;

  const webPage = {
    "@type": ["WebPage", "CollectionPage"],
    "@id": url,
    url,
    name: fairsPage.meta.title,
    description: fairsPage.meta.description,
    isPartOf: { "@id": siteId },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: "en-US",
  };

  const list = {
    "@type": "ItemList",
    "@id": `${url}#fairs`,
    name: "Upcoming Healiam blood testing fairs",
    numberOfItems: allFairs.length,
    itemListElement: allFairs.map((fair, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: fairEvent(fair),
    })),
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization(), website(), webPage, breadcrumbList(url, fairsPage.breadcrumb), list],
  };
}

export function aboutGraph() {
  const url = `${site.url}${about.path}`;

  const webPage = {
    "@type": ["WebPage", "AboutPage"],
    "@id": url,
    url,
    name: about.meta.title,
    description: about.meta.description,
    isPartOf: { "@id": siteId },
    about: { "@id": orgId },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: "en-US",
  };

  // The founders, attached to the Organization rather than invented as separate entities.
  const people = about.team.members.map((member) => ({
    "@type": "Person",
    "@id": `${url}#${member.name.toLowerCase().replace(/\s+/g, "-")}`,
    name: member.name,
    jobTitle: member.role,
    image: `${site.url}${member.photo}`,
    worksFor: { "@id": orgId },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...organization(), founder: people.map((p) => ({ "@id": p["@id"] })) },
      website(),
      webPage,
      breadcrumbList(url, about.breadcrumb),
      ...people,
    ],
  };
}

export function contactGraph() {
  const url = `${site.url}${contact.path}`;
  const webPage = {
    "@type": ["WebPage", "ContactPage"],
    "@id": url,
    url,
    name: contact.meta.title,
    description: contact.meta.description,
    isPartOf: { "@id": siteId },
    about: { "@id": orgId },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: "en-US",
  };
  return {
    "@context": "https://schema.org",
    "@graph": [organization(), website(), webPage, breadcrumbList(url, contact.breadcrumb)],
  };
}

export function demoGraph() {
  const url = `${site.url}${demo.path}`;
  const webPage = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: demo.meta.title,
    description: demo.meta.description,
    isPartOf: { "@id": siteId },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: "en-US",
  };
  // The eight stages, so the walkthrough is readable without running the script.
  const steps = {
    "@type": "ItemList",
    "@id": `${url}#journey`,
    name: demo.journey.title,
    numberOfItems: demo.journey.stages.length,
    itemListElement: demo.journey.stages.map((stage, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: stage.title,
      description: stage.line,
    })),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [organization(), website(), webPage, breadcrumbList(url, demo.breadcrumb), steps],
  };
}

export function fairDetailGraph(fair: Fair) {
  const url = `${site.url}/fairs/${fair.slug}`;
  const meta = fairDetail.meta(fair);

  const webPage = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: meta.title,
    description: meta.description,
    isPartOf: { "@id": siteId },
    about: { "@id": `${url}#event` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: "en-US",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      website(),
      webPage,
      breadcrumbList(url, fairDetail.breadcrumb(fair)),
      {
        ...fairEvent(fair),
        "@id": `${url}#event`,
        url,
        // City only: the venue inside a city changes from fair to fair (owner, 5 Nov 2026).
        location: {
          "@type": "Place",
          name: `${fair.locality}, ${fair.region}`,
          address: { "@type": "PostalAddress", addressLocality: fair.locality, addressRegion: fair.region, addressCountry: "US" },
        },
      },
    ],
  };
}

export function employerGraph() {
  const url = `${site.url}${employer.path}`;

  const service = {
    "@type": "Service",
    "@id": `${url}#service`,
    name: "Workplace preventive blood testing",
    serviceType: "Employer health screening",
    description: employer.meta.description,
    provider: { "@id": orgId },
    areaServed: { "@type": "Country", name: "United States" },
    audience: { "@type": "BusinessAudience", name: "Employers" },
    url,
    offers: panelOffer(),
  };

  const webPage = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: employer.meta.title,
    description: employer.meta.description,
    isPartOf: { "@id": siteId },
    about: { "@id": `${url}#service` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: "en-US",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization(), website(), webPage, breadcrumbList(url, employer.breadcrumb), service],
  };
}

// State landing pages (Colorado, New Jersey): the panel as the Service, limited to the area where
// draws actually happen (never the whole state), plus the state's real dated fairs as Events.
// No LocalBusiness: Healiam has no permanent location in these states.
function statePageGraph(
  data: {
    readonly path: string;
    readonly meta: { readonly title: string; readonly description: string };
    readonly breadcrumb: readonly { readonly name: string; readonly href?: string }[];
    readonly faq: { readonly items: readonly { readonly q: string; readonly a: string }[] };
  },
  stateFairs: readonly Fair[],
  serviceName: string,
  areaServed: string,
  datesName: string,
) {
  const url = `${site.url}${data.path}`;

  const service = {
    "@type": ["Service", "MedicalTest"],
    "@id": `${url}#service`,
    name: serviceName,
    serviceType: "Preventive blood test panel",
    description: data.meta.description,
    provider: { "@id": orgId },
    areaServed: { "@type": "AdministrativeArea", name: areaServed },
    url,
    offers: panelOffer(),
  };

  const dates = {
    "@type": "ItemList",
    "@id": `${url}#dates`,
    name: datesName,
    numberOfItems: stateFairs.length,
    itemListElement: stateFairs.map((fair, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: { ...fairEvent(fair), url: `${site.url}${fair.detailsUrl}` },
    })),
  };

  const webPage = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: data.meta.title,
    description: data.meta.description,
    isPartOf: { "@id": siteId },
    about: { "@id": `${url}#service` },
    mainEntity: { "@id": `${url}#dates` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: "en-US",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization(), website(), webPage, breadcrumbList(url, data.breadcrumb), service, dates, faqPage(url, data.faq.items)],
  };
}

export function coloradoGraph() {
  return statePageGraph(
    colorado,
    coloradoFairs,
    "Comprehensive preventive blood panel in Colorado",
    "Denver metropolitan area, Colorado",
    "Healiam blood testing dates in Colorado",
  );
}

export function newJerseyGraph() {
  return statePageGraph(
    newJersey,
    newJerseyFairs,
    "Comprehensive preventive blood panel in New Jersey",
    "Rahway and Union County, New Jersey",
    "Healiam blood testing dates in New Jersey",
  );
}

export function georgiaGraph() {
  return statePageGraph(
    georgia,
    georgiaFairs,
    "Comprehensive preventive blood panel in Georgia",
    "Lawrenceville and Gwinnett County, Georgia",
    "Healiam blood testing dates in Georgia",
  );
}

export function newYorkGraph() {
  // Healiam has no fair in New York; the draws happen at the nearest fairs in New Jersey.
  return statePageGraph(
    newYork,
    newYorkFairs,
    "Comprehensive preventive blood panel for New York residents",
    "New York City and Staten Island, New York",
    "Healiam blood testing dates near New York",
  );
}

// City fair page: one city and its fair. Service for the city, the fair as the page's main Event,
// breadcrumb through the state page, and the page FAQ.
function cityFairGraph(
  data: {
    readonly path: string;
    readonly meta: { readonly title: string; readonly description: string };
    readonly breadcrumb: readonly { readonly name: string; readonly href?: string }[];
    readonly faq: { readonly items: readonly { readonly q: string; readonly a: string }[] };
  },
  fair: Fair,
  serviceName: string,
  areaServed: string,
) {
  const url = `${site.url}${data.path}`;

  const service = {
    "@type": ["Service", "MedicalTest"],
    "@id": `${url}#service`,
    name: serviceName,
    serviceType: "Preventive blood test panel",
    description: data.meta.description,
    provider: { "@id": orgId },
    areaServed: { "@type": "City", name: areaServed },
    url,
    offers: panelOffer(),
  };

  const webPage = {
    "@type": "WebPage",
    "@id": url,
    url,
    name: data.meta.title,
    description: data.meta.description,
    isPartOf: { "@id": siteId },
    about: { "@id": `${url}#service` },
    mainEntity: { "@id": `${url}#event` },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    inLanguage: "en-US",
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      website(),
      webPage,
      breadcrumbList(url, data.breadcrumb),
      service,
      {
        ...fairEvent(fair),
        "@id": `${url}#event`,
        url,
        // City only: the venue inside a city changes from fair to fair (owner, 5 Nov 2026).
        location: {
          "@type": "Place",
          name: `${fair.locality}, ${fair.region}`,
          address: { "@type": "PostalAddress", addressLocality: fair.locality, addressRegion: fair.region, addressCountry: "US" },
        },
      },
      faqPage(url, data.faq.items),
    ],
  };
}

export function planoGraph() {
  return cityFairGraph(plano, planoFair, "Preventive blood testing in Plano, Texas", "Plano, Texas");
}

export function denverGraph() {
  return cityFairGraph(denver, denverFair, "Preventive blood testing in Denver, Colorado", "Denver, Colorado");
}

export function rahwayGraph() {
  return cityFairGraph(rahway, rahwayFair, "Preventive blood testing in Rahway, New Jersey", "Rahway, New Jersey");
}

export function lawrencevilleGraph() {
  return cityFairGraph(
    lawrenceville,
    lawrencevilleFair,
    "Preventive blood testing in Lawrenceville, Georgia",
    "Lawrenceville, Georgia",
  );
}

// Nearby city page: a city with no fair of its own (owner, 6 Nov 2026). Service for the city, the
// closest fairs as Events (city only, never the venue), breadcrumb through the state page, and the FAQ.
export function nearbyCityGraph(
  data: {
    readonly path: string;
    readonly meta: { readonly title: string; readonly description: string };
    readonly breadcrumb: readonly { readonly name: string; readonly href?: string }[];
    readonly faq: { readonly items: readonly { readonly q: string; readonly a: string }[] };
    readonly locations: { readonly fairs: readonly Fair[] };
  },
  city: string,
  state: string,
) {
  const url = `${site.url}${data.path}`;
  return {
    "@context": "https://schema.org",
    "@graph": [
      organization(),
      website(),
      {
        "@type": "WebPage",
        "@id": url,
        url,
        name: data.meta.title,
        description: data.meta.description,
        isPartOf: { "@id": siteId },
        about: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        inLanguage: "en-US",
      },
      breadcrumbList(url, data.breadcrumb),
      {
        "@type": ["Service", "MedicalTest"],
        "@id": `${url}#service`,
        name: `Preventive blood testing for ${city}, ${state}`,
        serviceType: "Preventive blood test panel",
        description: data.meta.description,
        provider: { "@id": orgId },
        areaServed: { "@type": "City", name: `${city}, ${state}` },
        url,
        offers: panelOffer(),
      },
      ...data.locations.fairs.map((fair) => ({
        ...fairEvent(fair),
        location: {
          "@type": "Place",
          name: `${fair.locality}, ${fair.region}`,
          address: { "@type": "PostalAddress", addressLocality: fair.locality, addressRegion: fair.region, addressCountry: "US" },
        },
      })),
      faqPage(url, data.faq.items),
    ],
  };
}

// /blog: a CollectionPage holding the Blog, with each article as a BlogPosting. Article URLs are the
// canonical healiam.com/blog/<slug> addresses, which stay the same when posts move to this site.
export function blogGraph() {
  const url = `${site.url}${blog.path}`;
  const webPage = {
    "@type": "CollectionPage",
    "@id": url,
    url,
    name: blog.meta.title,
    description: blog.meta.description,
    isPartOf: { "@id": siteId },
    about: { "@id": orgId },
    breadcrumb: { "@id": `${url}#breadcrumb` },
    mainEntity: { "@id": `${url}#blog` },
    inLanguage: "en-US",
  };
  const blogEntity = {
    "@type": "Blog",
    "@id": `${url}#blog`,
    name: `${site.name} Blog`,
    url,
    publisher: { "@id": orgId },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${site.url}/blog/${post.slug}`,
      url: `${site.url}/blog/${post.slug}`,
      headline: post.title,
      description: post.excerpt,
      datePublished: post.date,
      articleSection: post.topic,
      author: postAuthor(post),
      publisher: { "@id": orgId },
    })),
  };
  return {
    "@context": "https://schema.org",
    "@graph": [organization(), website(), webPage, blogEntity, ...authorNodes(posts), breadcrumbList(url, blog.breadcrumb)],
  };
}

// A post's author (owner, 13 Nov 2026: author schema): a writer with a profile is a Person node with its
// own @id, shared by every post they write; posts signed "Healiam" point at the Organization.
const personId = (p: AuthorProfile) => `${p.website}#person`;

function personNode(p: AuthorProfile) {
  return {
    "@type": "Person",
    "@id": personId(p),
    name: p.name,
    jobTitle: p.role,
    description: p.bio,
    url: p.website,
    sameAs: [p.linkedin, p.website],
    ...(p.photo ? { image: { "@type": "ImageObject", url: `${site.url}${p.photo}`, width: 320, height: 320 } } : {}),
  };
}

function postAuthor(post: BlogPost) {
  const p = authorProfile(post);
  return { "@id": p ? personId(p) : orgId };
}

/** Person nodes for the writers of these posts, once each. */
function authorNodes(list: readonly BlogPost[]) {
  const seen = new Map<string, AuthorProfile>();
  for (const post of list) {
    const p = authorProfile(post);
    if (p) seen.set(p.name, p);
  }
  return [...seen.values()].map(personNode);
}

/** Words in the article body and FAQ, for wordCount. */
function wordCount(article: Article) {
  const text = [
    ...article.blocks.flatMap((b) => {
      if (b.type === "p" || b.type === "h2" || b.type === "callout") return [b.text];
      if (b.type === "ul" || b.type === "ol") return b.items.map((i) => `${i.lead ?? ""} ${i.text}`);
      if (b.type === "table") return [b.caption, ...b.head, ...b.rows.flat()];
      return [];
    }),
    ...article.faq.flatMap((f) => [f.q, f.a]),
  ]
    .join(" ")
    .replace(/\]\([^)]*\)/g, " ")
    .replace(/[*[\]]/g, " ");
  return text.split(/\s+/).filter(Boolean).length;
}

// /blog/<slug> (owner, 13 Nov 2026: article schema): the post as an Article (BlogPosting, its more
// specific type, too), its author as a Person, its FAQ and breadcrumb.
export function articleGraph(article: Article, post: BlogPost) {
  const url = `${site.url}/blog/${article.slug}`;
  const posting = {
    "@type": ["Article", "BlogPosting"],
    "@id": `${url}#article`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    headline: article.h1,
    description: article.meta.description,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.topic,
    wordCount: wordCount(article),
    timeRequired: `PT${post.readMinutes}M`,
    inLanguage: "en-US",
    author: postAuthor(post),
    publisher: { "@id": orgId },
    isPartOf: { "@id": `${site.url}${blog.path}#blog` },
    ...(post.banner
      ? { image: { "@type": "ImageObject", url: `${site.url}${post.banner.src}`, width: 1600, height: 900, caption: post.banner.alt } }
      : {}),
  };
  const crumbs = [{ name: "Home", href: "/" }, { name: "Blog", href: blog.path }, { name: article.h1 }];
  return {
    "@context": "https://schema.org",
    "@graph": [organization(), website(), posting, ...authorNodes([post]), faqPage(url, article.faq), breadcrumbList(url, crumbs)],
  };
}
