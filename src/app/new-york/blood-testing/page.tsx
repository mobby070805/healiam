import type { Metadata } from "next";
import { site } from "@/lib/site";
import { newYork, newYorkDistances } from "@/lib/pages/new-york-blood-testing";
import { newYorkGraph } from "@/lib/schema";
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
import { StateCityPages } from "@/components/sections/StateCityPages";

const url = `${site.url}${newYork.path}`;

export const metadata: Metadata = {
  title: newYork.meta.title,
  description: newYork.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: newYork.meta.title,
    description: newYork.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: newYork.meta.title, description: newYork.meta.description },
  robots: { index: true, follow: true },
};

// Design: exactly the Texas page's sections, in the Texas order (owner, 31 Oct 2026).
// Only the content is New Jersey's own.
export default function NewYorkBloodTestingPage() {
  return (
    <>
      <JsonLd data={newYorkGraph()} />
      <Header nav={newYork.nav} />
      <main>
        <Hero hero={newYork.hero} breadcrumb={newYork.breadcrumb} heroVisual={newYork.heroVisual} />
        <TrustStrip items={newYork.trust} />
        <Challenges challenges={newYork.challenges} />
        <Comparison comparison={newYork.comparison} />
        <Process process={newYork.process} />
        <Benefits benefits={newYork.benefits} />
        <Panel panel={newYork.panel} />
        <Locations locations={newYork.locations} cityOnly cityLinks={false} distanceFrom={newYorkDistances} />
        <AppDownload app={newYork.app} />
        <Faq faq={newYork.faq} />
        <FinalCta finalCta={newYork.finalCta} />
        <StateCityPages data={newYork.cityLinks} />
        <OtherStateFairs otherFairs={newYork.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={newYork.sticky} />
    </>
  );
}
