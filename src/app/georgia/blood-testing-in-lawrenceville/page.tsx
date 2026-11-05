import type { Metadata } from "next";
import { site } from "@/lib/site";
import { lawrenceville } from "@/lib/pages/lawrenceville-blood-testing";
import { lawrencevilleGraph } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Challenges } from "@/components/sections/Challenges";
import { Comparison } from "@/components/sections/Comparison";
import { Process } from "@/components/sections/Process";
import { Benefits } from "@/components/sections/Benefits";
import { Panel } from "@/components/sections/Panel";
import { Locations } from "@/components/sections/Locations";
import { AppDownload } from "@/components/home/AppDownload";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { OtherStateFairs } from "@/components/sections/OtherStateFairs";

const url = `${site.url}${lawrenceville.path}`;

export const metadata: Metadata = {
  title: lawrenceville.meta.title,
  description: lawrenceville.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: lawrenceville.meta.title,
    description: lawrenceville.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: lawrenceville.meta.title, description: lawrenceville.meta.description },
  robots: { index: true, follow: true },
};

// Design: the state pages' sections, in the state-page order (owner, 5 Nov 2026). Only the content is
// Lawrenceville's own, written city first and fair second.
export default function LawrencevilleBloodTestingPage() {
  return (
    <>
      <JsonLd data={lawrencevilleGraph()} />
      <Header nav={lawrenceville.nav} />
      <main>
        <Hero hero={lawrenceville.hero} breadcrumb={lawrenceville.breadcrumb} heroVisual={lawrenceville.heroVisual} />
        <TrustStrip items={lawrenceville.trust} />
        <Challenges challenges={lawrenceville.challenges} />
        <Comparison comparison={lawrenceville.comparison} />
        <Process process={lawrenceville.process} />
        <Benefits benefits={lawrenceville.benefits} />
        <Panel panel={lawrenceville.panel} />
        <Locations locations={lawrenceville.locations} currentPath={lawrenceville.path} cityOnly />
        <AppDownload app={lawrenceville.app} />
        <Faq faq={lawrenceville.faq} />
        <FinalCta finalCta={lawrenceville.finalCta} />
        <OtherStateFairs otherFairs={lawrenceville.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={lawrenceville.sticky} />
    </>
  );
}
