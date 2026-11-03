import type { Metadata } from "next";
import { site } from "@/lib/site";
import { georgia } from "@/lib/pages/georgia-blood-testing";
import { georgiaGraph } from "@/lib/schema";
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

const url = `${site.url}${georgia.path}`;

export const metadata: Metadata = {
  title: georgia.meta.title,
  description: georgia.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: georgia.meta.title,
    description: georgia.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: georgia.meta.title, description: georgia.meta.description },
  robots: { index: true, follow: true },
};

// Design: exactly the Texas page's sections, in the Texas order (owner, 31 Oct 2026).
// Only the content is Georgia's own.
export default function GeorgiaBloodTestingPage() {
  return (
    <>
      <JsonLd data={georgiaGraph()} />
      <Header nav={georgia.nav} />
      <main>
        <Hero hero={georgia.hero} breadcrumb={georgia.breadcrumb} heroVisual={georgia.heroVisual} />
        <TrustStrip items={georgia.trust} />
        <Challenges challenges={georgia.challenges} />
        <Comparison comparison={georgia.comparison} />
        <Process process={georgia.process} />
        <Benefits benefits={georgia.benefits} />
        <Panel panel={georgia.panel} />
        <Locations locations={georgia.locations} />
        <AppDownload app={georgia.app} />
        <Faq faq={georgia.faq} />
        <FinalCta finalCta={georgia.finalCta} />
        <OtherStateFairs otherFairs={georgia.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={georgia.sticky} />
    </>
  );
}
