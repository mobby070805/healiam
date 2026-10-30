import type { Metadata } from "next";
import { site } from "@/lib/site";
import { about } from "@/lib/pages/about";
import { home } from "@/lib/pages/home";
import { aboutGraph } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FinalCta } from "@/components/sections/FinalCta";
import { AboutHero, AboutTeam, AboutMission } from "@/components/about/AboutSections";

const url = `${site.url}${about.path}`;

export const metadata: Metadata = {
  title: about.meta.title,
  description: about.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: about.meta.title,
    description: about.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: about.meta.title, description: about.meta.description },
  robots: { index: true, follow: true },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutGraph()} />
      <Header nav={about.nav} />
      <main>
        <AboutHero />
        <TrustStrip items={home.trust} />
        <AboutTeam />
        <AboutMission />
        <FinalCta finalCta={about.finalCta} />
      </main>
      <Footer />
      <StickyCta sticky={about.sticky} />
    </>
  );
}
