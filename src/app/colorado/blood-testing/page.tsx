import type { Metadata } from "next";
import { site } from "@/lib/site";
import { colorado } from "@/lib/pages/colorado-blood-testing";
import { coloradoGraph } from "@/lib/schema";
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

const url = `${site.url}${colorado.path}`;

export const metadata: Metadata = {
  title: colorado.meta.title,
  description: colorado.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: colorado.meta.title,
    description: colorado.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: colorado.meta.title, description: colorado.meta.description },
  robots: { index: true, follow: true },
};

// Design: exactly the Texas page's sections, in the Texas order (owner, 31 Oct 2026).
// Only the content is Colorado's own.
export default function ColoradoBloodTestingPage() {
  return (
    <>
      <JsonLd data={coloradoGraph()} />
      <Header nav={colorado.nav} />
      <main>
        <Hero hero={colorado.hero} breadcrumb={colorado.breadcrumb} heroVisual={colorado.heroVisual} />
        <TrustStrip items={colorado.trust} />
        <Challenges challenges={colorado.challenges} />
        <Comparison comparison={colorado.comparison} />
        <Process process={colorado.process} />
        <Benefits benefits={colorado.benefits} />
        <Panel panel={colorado.panel} />
        <Locations locations={colorado.locations} />
        <AppDownload app={colorado.app} />
        <Faq faq={colorado.faq} />
        <FinalCta finalCta={colorado.finalCta} />
        <OtherStateFairs otherFairs={colorado.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={colorado.sticky} />
    </>
  );
}
