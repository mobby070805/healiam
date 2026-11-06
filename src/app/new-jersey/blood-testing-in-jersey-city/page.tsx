import type { Metadata } from "next";
import { site } from "@/lib/site";
import { jerseyCity } from "@/lib/pages/jersey-city-blood-testing";
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

const url = `${site.url}${jerseyCity.path}`;

export const metadata: Metadata = {
  title: jerseyCity.meta.title,
  description: jerseyCity.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: jerseyCity.meta.title,
    description: jerseyCity.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: jerseyCity.meta.title, description: jerseyCity.meta.description },
  robots: { index: true, follow: true },
};

// Nearby city page (owner, 6 Nov 2026): the city pages' design, with the closest fairs and the
// distance to each in the locations section, soonest fair first.
export default function JerseyCityBloodTestingPage() {
  return (
    <>
      <JsonLd data={nearbyCityGraph(jerseyCity, "Jersey City", "NJ")} />
      <Header nav={jerseyCity.nav} />
      <main>
        <Hero hero={jerseyCity.hero} breadcrumb={jerseyCity.breadcrumb} heroVisual={jerseyCity.heroVisual} />
        <TrustStrip items={jerseyCity.trust} />
        <Challenges challenges={jerseyCity.challenges} />
        <Comparison comparison={jerseyCity.comparison} />
        <Process process={jerseyCity.process} />
        <Benefits benefits={jerseyCity.benefits} />
        <Panel panel={jerseyCity.panel} />
        <Locations locations={jerseyCity.locations} currentPath={jerseyCity.path} cityOnly distanceFrom={jerseyCity.near.distanceFrom} />
        <AppDownload app={jerseyCity.app} />
        <Faq faq={jerseyCity.faq} />
        <FinalCta finalCta={jerseyCity.finalCta} />
        <OtherStateFairs otherFairs={jerseyCity.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={jerseyCity.sticky} />
    </>
  );
}
