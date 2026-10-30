import type { Metadata } from "next";
import { site } from "@/lib/site";
import { fairsPage } from "@/lib/pages/fairs";
import { home } from "@/lib/pages/home";
import { fairsGraph } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FinalCta } from "@/components/sections/FinalCta";
import { FairsHero } from "@/components/fairs/FairsHero";
import { FairsByState } from "@/components/fairs/FairsByState";
import { FairsCommunity } from "@/components/fairs/FairsCommunity";

const url = `${site.url}${fairsPage.path}`;

export const metadata: Metadata = {
  title: fairsPage.meta.title,
  description: fairsPage.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: fairsPage.meta.title,
    description: fairsPage.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: fairsPage.meta.title, description: fairsPage.meta.description },
  robots: { index: true, follow: true },
};

export default function FairsPage() {
  return (
    <>
      <JsonLd data={fairsGraph()} />
      <Header nav={fairsPage.nav} />
      <main>
        <FairsHero />
        <TrustStrip items={home.trust} />
        <FairsByState />
        <FairsCommunity />
        <FinalCta finalCta={fairsPage.finalCta} />
      </main>
      <Footer />
      <StickyCta sticky={fairsPage.sticky} />
    </>
  );
}
