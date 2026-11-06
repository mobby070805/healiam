import type { Metadata } from "next";
import { site } from "@/lib/site";
import { garland } from "@/lib/pages/garland-blood-testing";
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

const url = `${site.url}${garland.path}`;

export const metadata: Metadata = {
  title: garland.meta.title,
  description: garland.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: garland.meta.title,
    description: garland.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: garland.meta.title, description: garland.meta.description },
  robots: { index: true, follow: true },
};

// Nearby city page (owner, 6 Nov 2026): the city pages' design, with the closest DFW fairs and the
// distance to each in the locations section, soonest fair first.
export default function GarlandBloodTestingPage() {
  return (
    <>
      <JsonLd data={nearbyCityGraph(garland, "Garland", "TX")} />
      <Header nav={garland.nav} />
      <main>
        <Hero hero={garland.hero} breadcrumb={garland.breadcrumb} heroVisual={garland.heroVisual} />
        <TrustStrip items={garland.trust} />
        <Challenges challenges={garland.challenges} />
        <Comparison comparison={garland.comparison} />
        <Process process={garland.process} />
        <Benefits benefits={garland.benefits} />
        <Panel panel={garland.panel} />
        <Locations locations={garland.locations} currentPath={garland.path} cityOnly distanceFrom={garland.near.distanceFrom} />
        <AppDownload app={garland.app} />
        <Faq faq={garland.faq} />
        <FinalCta finalCta={garland.finalCta} />
        <OtherStateFairs otherFairs={garland.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={garland.sticky} />
    </>
  );
}
