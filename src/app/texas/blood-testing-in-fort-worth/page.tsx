import type { Metadata } from "next";
import { site } from "@/lib/site";
import { fortWorth } from "@/lib/pages/fort-worth-blood-testing";
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

const url = `${site.url}${fortWorth.path}`;

export const metadata: Metadata = {
  title: fortWorth.meta.title,
  description: fortWorth.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: fortWorth.meta.title,
    description: fortWorth.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: fortWorth.meta.title, description: fortWorth.meta.description },
  robots: { index: true, follow: true },
};

// Nearby city page (owner, 6 Nov 2026): the city pages' design, with the closest DFW fairs and the
// distance to each in the locations section, soonest fair first.
export default function FortWorthBloodTestingPage() {
  return (
    <>
      <JsonLd data={nearbyCityGraph(fortWorth, "Fort Worth", "TX")} />
      <Header />
      <main>
        <Hero hero={fortWorth.hero} breadcrumb={fortWorth.breadcrumb} heroVisual={fortWorth.heroVisual} />
        <TrustStrip items={fortWorth.trust} />
        <Challenges challenges={fortWorth.challenges} />
        <Comparison comparison={fortWorth.comparison} />
        <Process process={fortWorth.process} />
        <Benefits benefits={fortWorth.benefits} />
        <Panel panel={fortWorth.panel} />
        <Locations locations={fortWorth.locations} currentPath={fortWorth.path} cityOnly distanceFrom={fortWorth.near.distanceFrom} />
        <AppDownload app={fortWorth.app} />
        <Faq faq={fortWorth.faq} />
        <FinalCta finalCta={fortWorth.finalCta} />
        <OtherStateFairs otherFairs={fortWorth.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={fortWorth.sticky} />
    </>
  );
}
