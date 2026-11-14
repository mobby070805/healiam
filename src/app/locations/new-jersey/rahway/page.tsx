import type { Metadata } from "next";
import { site } from "@/lib/site";
import { rahway } from "@/lib/pages/rahway-blood-testing";
import { rahwayGraph } from "@/lib/schema";
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

const url = `${site.url}${rahway.path}`;

export const metadata: Metadata = {
  title: rahway.meta.title,
  description: rahway.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: rahway.meta.title,
    description: rahway.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: rahway.meta.title, description: rahway.meta.description },
  robots: { index: true, follow: true },
};

// Design: the state pages' sections, in the state-page order (owner, 5 Nov 2026). Only the content is
// Rahway's own, written city first and fair second.
export default function RahwayBloodTestingPage() {
  return (
    <>
      <JsonLd data={rahwayGraph()} />
      <Header />
      <main>
        <Hero hero={rahway.hero} breadcrumb={rahway.breadcrumb} heroVisual={rahway.heroVisual} />
        <TrustStrip items={rahway.trust} />
        <Challenges challenges={rahway.challenges} />
        <Comparison comparison={rahway.comparison} />
        <Process process={rahway.process} />
        <Benefits benefits={rahway.benefits} />
        <Panel panel={rahway.panel} />
        <Locations locations={rahway.locations} currentPath={rahway.path} cityOnly />
        <AppDownload app={rahway.app} />
        <Faq faq={rahway.faq} />
        <FinalCta finalCta={rahway.finalCta} />
        <OtherStateFairs otherFairs={rahway.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={rahway.sticky} />
    </>
  );
}
