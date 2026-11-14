import type { Metadata } from "next";
import { site } from "@/lib/site";
import { plano } from "@/lib/pages/plano-blood-testing";
import { planoGraph } from "@/lib/schema";
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

const url = `${site.url}${plano.path}`;

export const metadata: Metadata = {
  title: plano.meta.title,
  description: plano.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: plano.meta.title,
    description: plano.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: plano.meta.title, description: plano.meta.description },
  robots: { index: true, follow: true },
};

// Design: the state pages' sections, in the state-page order (owner, 5 Nov 2026). Only the content is
// Plano's own, written city first and fair second.
export default function PlanoBloodTestingPage() {
  return (
    <>
      <JsonLd data={planoGraph()} />
      <Header />
      <main>
        <Hero hero={plano.hero} breadcrumb={plano.breadcrumb} heroVisual={plano.heroVisual} />
        <TrustStrip items={plano.trust} />
        <Challenges challenges={plano.challenges} />
        <Comparison comparison={plano.comparison} />
        <Process process={plano.process} />
        <Benefits benefits={plano.benefits} />
        <Panel panel={plano.panel} />
        <Locations locations={plano.locations} currentPath={plano.path} cityOnly />
        <AppDownload app={plano.app} />
        <Faq faq={plano.faq} />
        <FinalCta finalCta={plano.finalCta} />
        <OtherStateFairs otherFairs={plano.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={plano.sticky} />
    </>
  );
}
