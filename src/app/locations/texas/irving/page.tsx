import type { Metadata } from "next";
import { site } from "@/lib/site";
import { irving } from "@/lib/pages/irving-blood-testing";
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

const url = `${site.url}${irving.path}`;

export const metadata: Metadata = {
  title: irving.meta.title,
  description: irving.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: irving.meta.title,
    description: irving.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: irving.meta.title, description: irving.meta.description },
  robots: { index: true, follow: true },
};

// Nearby city page (owner, 6 Nov 2026): the city pages' design, with the closest DFW fairs and the
// distance to each in the locations section, soonest fair first.
export default function IrvingBloodTestingPage() {
  return (
    <>
      <JsonLd data={nearbyCityGraph(irving, "Irving", "TX")} />
      <Header />
      <main>
        <Hero hero={irving.hero} breadcrumb={irving.breadcrumb} heroVisual={irving.heroVisual} />
        <TrustStrip items={irving.trust} />
        <Challenges challenges={irving.challenges} />
        <Comparison comparison={irving.comparison} />
        <Process process={irving.process} />
        <Benefits benefits={irving.benefits} />
        <Panel panel={irving.panel} />
        <Locations locations={irving.locations} currentPath={irving.path} cityOnly distanceFrom={irving.near.distanceFrom} />
        <AppDownload app={irving.app} />
        <Faq faq={irving.faq} />
        <FinalCta finalCta={irving.finalCta} />
        <OtherStateFairs otherFairs={irving.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={irving.sticky} />
    </>
  );
}
