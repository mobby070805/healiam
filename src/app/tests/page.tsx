import type { Metadata } from "next";
import { site } from "@/lib/site";
import { tests } from "@/lib/pages/tests";
import { home } from "@/lib/pages/home";
import { testsGraph } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FinalCta } from "@/components/sections/FinalCta";
import { TestsHero } from "@/components/tests/TestsHero";
import { PanelList } from "@/components/tests/PanelList";
import { PrepSteps } from "@/components/tests/PrepSteps";

const url = `${site.url}${tests.path}`;

export const metadata: Metadata = {
  title: tests.meta.title,
  description: tests.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: tests.meta.title,
    description: tests.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: tests.meta.title, description: tests.meta.description },
  robots: { index: true, follow: true },
};

export default function TestsPage() {
  return (
    <>
      <JsonLd data={testsGraph()} />
      <Header />
      <main>
        <TestsHero />
        <TrustStrip items={home.trust} />
        <PanelList />
        <PrepSteps />
        <FinalCta finalCta={tests.finalCta} />
      </main>
      <Footer />
      <StickyCta sticky={tests.sticky} />
    </>
  );
}
