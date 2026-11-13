import type { Metadata } from "next";
import { site } from "@/lib/site";
import { newYorkCity } from "@/lib/pages/new-york-city-blood-testing";
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

const url = `${site.url}${newYorkCity.path}`;

export const metadata: Metadata = {
  title: newYorkCity.meta.title,
  description: newYorkCity.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: newYorkCity.meta.title,
    description: newYorkCity.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: newYorkCity.meta.title, description: newYorkCity.meta.description },
  robots: { index: true, follow: true },
};

// Nearby city page (owner, 6 Nov 2026): the city pages' design, with the closest fairs and the
// distance to each in the locations section, soonest fair first.
export default function NewYorkCityBloodTestingPage() {
  return (
    <>
      <JsonLd data={nearbyCityGraph(newYorkCity, "New York City", "NY")} />
      <Header />
      <main>
        <Hero hero={newYorkCity.hero} breadcrumb={newYorkCity.breadcrumb} heroVisual={newYorkCity.heroVisual} />
        <TrustStrip items={newYorkCity.trust} />
        <Challenges challenges={newYorkCity.challenges} />
        <Comparison comparison={newYorkCity.comparison} />
        <Process process={newYorkCity.process} />
        <Benefits benefits={newYorkCity.benefits} />
        <Panel panel={newYorkCity.panel} />
        <Locations locations={newYorkCity.locations} currentPath={newYorkCity.path} cityOnly distanceFrom={newYorkCity.near.distanceFrom} />
        <AppDownload app={newYorkCity.app} />
        <Faq faq={newYorkCity.faq} />
        <FinalCta finalCta={newYorkCity.finalCta} />
        <OtherStateFairs otherFairs={newYorkCity.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={newYorkCity.sticky} />
    </>
  );
}
