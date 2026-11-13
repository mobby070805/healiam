import type { Metadata } from "next";
import { site } from "@/lib/site";
import { home } from "@/lib/pages/home";
import { homeGraph } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { HomeHero } from "@/components/home/HomeHero";
import { WhyHealiam } from "@/components/home/WhyHealiam";
import { PanelOverview } from "@/components/home/PanelOverview";
import { HowItWorks } from "@/components/home/HowItWorks";
import { AppDownload } from "@/components/home/AppDownload";
import { ClientStory } from "@/components/home/ClientStory";
import { Fairs } from "@/components/home/Fairs";
import { Employers } from "@/components/home/Employers";

const url = `${site.url}/`;

export const metadata: Metadata = {
  title: home.meta.title,
  description: home.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: home.meta.title,
    description: home.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: home.meta.title, description: home.meta.description },
  robots: { index: true, follow: true },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeGraph()} />
      <Header />
      <main>
        <HomeHero />
        <TrustStrip items={home.trust} />
        <WhyHealiam />
        <PanelOverview />
        <HowItWorks />
        <AppDownload />
        <ClientStory />
        <Fairs />
        <Employers />
        <Faq faq={home.faq} />
        <FinalCta finalCta={home.finalCta} />
      </main>
      <Footer />
      <StickyCta sticky={home.sticky} />
    </>
  );
}
