import type { Metadata } from "next";
import { site } from "@/lib/site";
import { rahway, rahwayFair } from "@/lib/pages/rahway-blood-testing";
import { rahwayGraph } from "@/lib/schema";
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
import { CityWays } from "@/components/city/CityWays";
import { CityTownGroups } from "@/components/city/CityTownGroups";

const url = `${site.url}${rahway.path}`;

export const metadata: Metadata = {
  title: rahway.meta.title,
  description: rahway.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: rahway.meta.title,
    description: rahway.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: rahway.meta.title, description: rahway.meta.description },
  robots: { index: true, follow: true },
};

// City page first, fair second (owner, 5 Nov 2026): blood testing in Rahway and nearby towns, what it
// covers and how it works, then the next Rahway fair and the ways to reach it.
export default function RahwayBloodTestingPage() {
  return (
    <>
      <JsonLd data={rahwayGraph()} />
      <Header nav={rahway.nav} />
      <main>
        <CityHero page={rahway} fair={rahwayFair} />
        <TrustStrip items={rahway.trust} />
        <CityTownGroups nearby={rahway.nearby} />
        <Panel panel={rahway.panel} />
        <Process process={rahway.process} tone="mist" />
        <CityWays ways={rahway.ways} fair={rahwayFair} tone="white" />
        <AppDownload app={rahway.app} />
        <Faq faq={rahway.faq} />
        <FinalCta finalCta={rahway.finalCta} />
      </main>
      <Footer />
      <StickyCta sticky={rahway.sticky} />
    </>
  );
}
