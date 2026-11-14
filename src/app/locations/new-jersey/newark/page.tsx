import type { Metadata } from "next";
import { site } from "@/lib/site";
import { newark } from "@/lib/pages/newark-blood-testing";
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

const url = `${site.url}${newark.path}`;

export const metadata: Metadata = {
  title: newark.meta.title,
  description: newark.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: newark.meta.title,
    description: newark.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: newark.meta.title, description: newark.meta.description },
  robots: { index: true, follow: true },
};

// Nearby city page (owner, 6 Nov 2026): the city pages' design, with the closest fairs and the
// distance to each in the locations section, soonest fair first.
export default function NewarkBloodTestingPage() {
  return (
    <>
      <JsonLd data={nearbyCityGraph(newark, "Newark", "NJ")} />
      <Header />
      <main>
        <Hero hero={newark.hero} breadcrumb={newark.breadcrumb} heroVisual={newark.heroVisual} />
        <TrustStrip items={newark.trust} />
        <Challenges challenges={newark.challenges} />
        <Comparison comparison={newark.comparison} />
        <Process process={newark.process} />
        <Benefits benefits={newark.benefits} />
        <Panel panel={newark.panel} />
        <Locations locations={newark.locations} currentPath={newark.path} cityOnly distanceFrom={newark.near.distanceFrom} />
        <AppDownload app={newark.app} />
        <Faq faq={newark.faq} />
        <FinalCta finalCta={newark.finalCta} />
        <OtherStateFairs otherFairs={newark.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={newark.sticky} />
    </>
  );
}
