import type { Metadata } from "next";
import { site } from "@/lib/site";
import { dallas } from "@/lib/pages/dallas-blood-testing";
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

const url = `${site.url}${dallas.path}`;

export const metadata: Metadata = {
  title: dallas.meta.title,
  description: dallas.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: dallas.meta.title,
    description: dallas.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: dallas.meta.title, description: dallas.meta.description },
  robots: { index: true, follow: true },
};

// Nearby city page (owner, 6 Nov 2026): the city pages' design, with the closest DFW fairs and the
// distance to each in the locations section, soonest fair first.
export default function DallasBloodTestingPage() {
  return (
    <>
      <JsonLd data={nearbyCityGraph(dallas, "Dallas", "TX")} />
      <Header />
      <main>
        <Hero hero={dallas.hero} breadcrumb={dallas.breadcrumb} heroVisual={dallas.heroVisual} />
        <TrustStrip items={dallas.trust} />
        <Challenges challenges={dallas.challenges} />
        <Comparison comparison={dallas.comparison} />
        <Process process={dallas.process} />
        <Benefits benefits={dallas.benefits} />
        <Panel panel={dallas.panel} />
        <Locations locations={dallas.locations} currentPath={dallas.path} cityOnly distanceFrom={dallas.near.distanceFrom} />
        <AppDownload app={dallas.app} />
        <Faq faq={dallas.faq} />
        <FinalCta finalCta={dallas.finalCta} />
        <OtherStateFairs otherFairs={dallas.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={dallas.sticky} />
    </>
  );
}
