import type { Metadata } from "next";
import { site } from "@/lib/site";
import { atlanta } from "@/lib/pages/atlanta-blood-testing";
import { nearbyCityGraph } from "@/lib/schema";
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

const url = `${site.url}${atlanta.path}`;

export const metadata: Metadata = {
  title: atlanta.meta.title,
  description: atlanta.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: atlanta.meta.title,
    description: atlanta.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: atlanta.meta.title, description: atlanta.meta.description },
  robots: { index: true, follow: true },
};

// Nearby city page (owner, 6 Nov 2026): the city pages' design, with the closest fairs and the
// distance to each in the locations section, soonest fair first.
export default function AtlantaBloodTestingPage() {
  return (
    <>
      <JsonLd data={nearbyCityGraph(atlanta, "Atlanta", "GA")} />
      <Header />
      <main>
        <Hero hero={atlanta.hero} breadcrumb={atlanta.breadcrumb} heroVisual={atlanta.heroVisual} />
        <TrustStrip items={atlanta.trust} />
        <Challenges challenges={atlanta.challenges} />
        <Comparison comparison={atlanta.comparison} />
        <Process process={atlanta.process} />
        <Benefits benefits={atlanta.benefits} />
        <Panel panel={atlanta.panel} />
        <Locations locations={atlanta.locations} currentPath={atlanta.path} cityOnly distanceFrom={atlanta.near.distanceFrom} />
        <AppDownload app={atlanta.app} />
        <Faq faq={atlanta.faq} />
        <FinalCta finalCta={atlanta.finalCta} />
        <OtherStateFairs otherFairs={atlanta.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={atlanta.sticky} />
    </>
  );
}
