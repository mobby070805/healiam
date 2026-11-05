import type { Metadata } from "next";
import { site } from "@/lib/site";
import { denver, denverFair } from "@/lib/pages/denver-blood-testing";
import { denverGraph } from "@/lib/schema";
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
import { CityDayChoice } from "@/components/city/CityDayChoice";
import { CityDistances } from "@/components/city/CityDistances";

const url = `${site.url}${denver.path}`;

export const metadata: Metadata = {
  title: denver.meta.title,
  description: denver.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: denver.meta.title,
    description: denver.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: denver.meta.title, description: denver.meta.description },
  robots: { index: true, follow: true },
};

// City page first, fair second (owner, 5 Nov 2026): blood testing in Denver and the suburbs, what it
// covers and how it works, then the next Denver fair with the Sunday Centennial option.
export default function DenverBloodTestingPage() {
  return (
    <>
      <JsonLd data={denverGraph()} />
      <Header nav={denver.nav} />
      <main>
        <CityHero page={denver} fair={denverFair} />
        <TrustStrip items={denver.trust} />
        <CityDistances nearby={denver.nearby} />
        <Panel panel={denver.panel} />
        <Process process={denver.process} tone="mist" />
        <CityDayChoice day={denver.day} tone="white" />
        <AppDownload app={denver.app} />
        <Faq faq={denver.faq} />
        <FinalCta finalCta={denver.finalCta} />
      </main>
      <Footer />
      <StickyCta sticky={denver.sticky} />
    </>
  );
}
