import type { Metadata } from "next";
import { site } from "@/lib/site";
import { lawrenceville, lawrencevilleFair } from "@/lib/pages/lawrenceville-blood-testing";
import { lawrencevilleGraph } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Process } from "@/components/sections/Process";
import { Panel } from "@/components/sections/Panel";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { AppDownload } from "@/components/home/AppDownload";
import { CityHero } from "@/components/city/CityHero";
import { CityCoverage } from "@/components/city/CityCoverage";
import { CityEventCard } from "@/components/city/CityEventCard";

const url = `${site.url}${lawrenceville.path}`;

export const metadata: Metadata = {
  title: lawrenceville.meta.title,
  description: lawrenceville.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: lawrenceville.meta.title,
    description: lawrenceville.meta.description,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: lawrenceville.meta.title,
    description: lawrenceville.meta.description,
  },
  robots: { index: true, follow: true },
};

// City page first, fair second (owner, 5 Nov 2026): blood testing in Lawrenceville and nearby Gwinnett
// towns, what it covers and how it works, then the next fair as one event card.
export default function LawrencevilleBloodTestingPage() {
  return (
    <>
      <JsonLd data={lawrencevilleGraph()} />
      <Header nav={lawrenceville.nav} />
      <main>
        <CityHero page={lawrenceville} fair={lawrencevilleFair} />
        <TrustStrip items={lawrenceville.trust} />
        <CityCoverage coverage={lawrenceville.coverage} />
        <Panel panel={lawrenceville.panel} />
        <Process process={lawrenceville.process} tone="mist" />
        <CityEventCard event={lawrenceville.event} fair={lawrencevilleFair} />
        <AppDownload app={lawrenceville.app} />
        <Faq faq={lawrenceville.faq} />
        <FinalCta finalCta={lawrenceville.finalCta} />
      </main>
      <Footer />
      <StickyCta sticky={lawrenceville.sticky} />
    </>
  );
}
