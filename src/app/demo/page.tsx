import type { Metadata } from "next";
import { site } from "@/lib/site";
import { demo } from "@/lib/pages/demo";
import { demoGraph } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FinalCta } from "@/components/sections/FinalCta";
import { DemoHero } from "@/components/demo/DemoHero";
import { DemoJourney } from "@/components/demo/DemoJourney";

const url = `${site.url}${demo.path}`;

export const metadata: Metadata = {
  title: demo.meta.title,
  description: demo.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: demo.meta.title,
    description: demo.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: demo.meta.title, description: demo.meta.description },
  robots: { index: true, follow: true },
};

export default function DemoPage() {
  return (
    <>
      <JsonLd data={demoGraph()} />
      <Header nav={demo.nav} />
      <main>
        <DemoHero />
        <DemoJourney />
        <FinalCta finalCta={demo.finalCta} />
      </main>
      <Footer />
    </>
  );
}
