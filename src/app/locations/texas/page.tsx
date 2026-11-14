import type { Metadata } from "next";
import { site } from "@/lib/site";
import { page } from "@/lib/pages/texas-blood-test";
import { texasBloodTestGraph } from "@/lib/schema";
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
import { StateCityPages } from "@/components/sections/StateCityPages";

const url = `${site.url}${page.path}`;

export const metadata: Metadata = {
  title: page.meta.title,
  description: page.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: page.meta.title,
    description: page.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: page.meta.title, description: page.meta.description },
  robots: { index: true, follow: true },
};

export default function TexasBloodTestPage() {
  return (
    <>
      <JsonLd data={texasBloodTestGraph()} />
      <Header />
      <main>
        <Hero />
        <TrustStrip items={page.trust} />
        <Challenges />
        <Comparison />
        <Process />
        <Benefits />
        <Panel />
        <Locations cityOnly cityLinks={false} />
        <AppDownload app={page.app} />
        <Faq faq={page.faq} />
        <FinalCta finalCta={page.finalCta} />
        <StateCityPages data={page.cityLinks} />
        <OtherStateFairs otherFairs={page.otherFairs} />
      </main>
      <Footer />
      <StickyCta sticky={page.sticky} />
    </>
  );
}
