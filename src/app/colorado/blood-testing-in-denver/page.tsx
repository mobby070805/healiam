import type { Metadata } from "next";
import { site } from "@/lib/site";
import { denver } from "@/lib/pages/denver-blood-testing";
import { denverGraph } from "@/lib/schema";
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

const url = `${site.url}${denver.path}`;

export const metadata: Metadata = {
  title: denver.meta.title,
  description: denver.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: denver.meta.title,
    description: denver.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: denver.meta.title, description: denver.meta.description },
  robots: { index: true, follow: true },
};

// Design: the state pages' sections, in the state-page order (owner, 5 Nov 2026). Only the content is
// Denver's own, written city first and fair second.
export default function DenverBloodTestingPage() {
  return (
    <>
      <JsonLd data={denverGraph()} />
      <Header nav={denver.nav} />
      <main>
        <Hero hero={denver.hero} breadcrumb={denver.breadcrumb} heroVisual={denver.heroVisual} />
        <TrustStrip items={denver.trust} />
        <Challenges challenges={denver.challenges} />
        <Comparison comparison={denver.comparison} />
        <Process process={denver.process} />
        <Benefits benefits={denver.benefits} />
        <Panel panel={denver.panel} />
        <Locations locations={denver.locations} currentPath={denver.path} cityOnly />
        <AppDownload app={denver.app} />
        <Faq faq={denver.faq} />
        <FinalCta finalCta={denver.finalCta} />
        <OtherStateFairs otherFairs={denver.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={denver.sticky} />
    </>
  );
}
