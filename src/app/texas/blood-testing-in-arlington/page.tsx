import type { Metadata } from "next";
import { site } from "@/lib/site";
import { arlington } from "@/lib/pages/arlington-blood-testing";
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

const url = `${site.url}${arlington.path}`;

export const metadata: Metadata = {
  title: arlington.meta.title,
  description: arlington.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: arlington.meta.title,
    description: arlington.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: arlington.meta.title, description: arlington.meta.description },
  robots: { index: true, follow: true },
};

// Nearby city page (owner, 6 Nov 2026): the city pages' design, with the closest DFW fairs and the
// distance to each in the locations section, soonest fair first.
export default function ArlingtonBloodTestingPage() {
  return (
    <>
      <JsonLd data={nearbyCityGraph(arlington, "Arlington", "TX")} />
      <Header nav={arlington.nav} />
      <main>
        <Hero hero={arlington.hero} breadcrumb={arlington.breadcrumb} heroVisual={arlington.heroVisual} />
        <TrustStrip items={arlington.trust} />
        <Challenges challenges={arlington.challenges} />
        <Comparison comparison={arlington.comparison} />
        <Process process={arlington.process} />
        <Benefits benefits={arlington.benefits} />
        <Panel panel={arlington.panel} />
        <Locations locations={arlington.locations} currentPath={arlington.path} cityOnly distanceFrom={arlington.near.distanceFrom} />
        <AppDownload app={arlington.app} />
        <Faq faq={arlington.faq} />
        <FinalCta finalCta={arlington.finalCta} />
        <OtherStateFairs otherFairs={arlington.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={arlington.sticky} />
    </>
  );
}
