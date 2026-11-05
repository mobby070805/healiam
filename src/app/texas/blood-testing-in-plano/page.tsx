import type { Metadata } from "next";
import { site } from "@/lib/site";
import { plano, planoFair } from "@/lib/pages/plano-blood-testing";
import { planoGraph } from "@/lib/schema";
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
import { CityArrival } from "@/components/city/CityArrival";
import { CityNearby } from "@/components/city/CityNearby";

const url = `${site.url}${plano.path}`;

export const metadata: Metadata = {
  title: plano.meta.title,
  description: plano.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: plano.meta.title,
    description: plano.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: plano.meta.title, description: plano.meta.description },
  robots: { index: true, follow: true },
};

// City page first, fair second (owner, 5 Nov 2026): blood testing in Plano and nearby towns, what it
// covers and how it works, then the next Plano fair and how to find the suite.
export default function PlanoBloodTestingPage() {
  return (
    <>
      <JsonLd data={planoGraph()} />
      <Header nav={plano.nav} />
      <main>
        <CityHero page={plano} fair={planoFair} />
        <TrustStrip items={plano.trust} />
        <CityNearby page={plano} />
        <Panel panel={plano.panel} />
        <Process process={plano.process} tone="mist" />
        <CityArrival page={plano} fair={planoFair} tone="white" />
        <AppDownload app={plano.app} />
        <Faq faq={plano.faq} />
        <FinalCta finalCta={plano.finalCta} />
      </main>
      <Footer />
      <StickyCta sticky={plano.sticky} />
    </>
  );
}
