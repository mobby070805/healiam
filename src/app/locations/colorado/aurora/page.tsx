import type { Metadata } from "next";
import { site } from "@/lib/site";
import { aurora } from "@/lib/pages/aurora-blood-testing";
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

const url = `${site.url}${aurora.path}`;

export const metadata: Metadata = {
  title: aurora.meta.title,
  description: aurora.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: aurora.meta.title,
    description: aurora.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: aurora.meta.title, description: aurora.meta.description },
  robots: { index: true, follow: true },
};

// Nearby city page (owner, 6 Nov 2026): the city pages' design, with the closest fairs and the
// distance to each in the locations section, soonest fair first.
export default function AuroraBloodTestingPage() {
  return (
    <>
      <JsonLd data={nearbyCityGraph(aurora, "Aurora", "CO")} />
      <Header />
      <main>
        <Hero hero={aurora.hero} breadcrumb={aurora.breadcrumb} heroVisual={aurora.heroVisual} />
        <TrustStrip items={aurora.trust} />
        <Challenges challenges={aurora.challenges} />
        <Comparison comparison={aurora.comparison} />
        <Process process={aurora.process} />
        <Benefits benefits={aurora.benefits} />
        <Panel panel={aurora.panel} />
        <Locations locations={aurora.locations} currentPath={aurora.path} cityOnly distanceFrom={aurora.near.distanceFrom} />
        <AppDownload app={aurora.app} />
        <Faq faq={aurora.faq} />
        <FinalCta finalCta={aurora.finalCta} />
        <OtherStateFairs otherFairs={aurora.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={aurora.sticky} />
    </>
  );
}
