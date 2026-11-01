import type { Metadata } from "next";
import { site } from "@/lib/site";
import { newJersey } from "@/lib/pages/new-jersey-blood-testing";
import { newJerseyGraph } from "@/lib/schema";
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
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

const url = `${site.url}${newJersey.path}`;

export const metadata: Metadata = {
  title: newJersey.meta.title,
  description: newJersey.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: newJersey.meta.title,
    description: newJersey.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: newJersey.meta.title, description: newJersey.meta.description },
  robots: { index: true, follow: true },
};

// Design: exactly the Texas page's sections, in the Texas order (owner, 31 Oct 2026).
// Only the content is New Jersey's own.
export default function NewJerseyBloodTestingPage() {
  return (
    <>
      <JsonLd data={newJerseyGraph()} />
      <Header nav={newJersey.nav} />
      <main>
        <Hero hero={newJersey.hero} breadcrumb={newJersey.breadcrumb} heroVisual={newJersey.heroVisual} />
        <TrustStrip items={newJersey.trust} />
        <Challenges challenges={newJersey.challenges} />
        <Comparison comparison={newJersey.comparison} />
        <Process process={newJersey.process} />
        <Benefits benefits={newJersey.benefits} />
        <Panel panel={newJersey.panel} />
        <Locations locations={newJersey.locations} />
        <Faq faq={newJersey.faq} />
        <FinalCta finalCta={newJersey.finalCta} />
      </main>
      <Footer />
      <StickyCta sticky={newJersey.sticky} />
    </>
  );
}
