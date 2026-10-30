import type { Metadata } from "next";
import { site } from "@/lib/site";
import { employer } from "@/lib/pages/employer";
import { home } from "@/lib/pages/home";
import { employerGraph } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { FinalCta } from "@/components/sections/FinalCta";
import { EmployerHero, EmployerBenefits, EmployerHow, EmployerCost } from "@/components/employer/EmployerSections";

const url = `${site.url}${employer.path}`;

export const metadata: Metadata = {
  title: employer.meta.title,
  description: employer.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: employer.meta.title,
    description: employer.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: employer.meta.title, description: employer.meta.description },
  robots: { index: true, follow: true },
};

export default function EmployerPage() {
  return (
    <>
      <JsonLd data={employerGraph()} />
      <Header nav={employer.nav} />
      <main>
        <EmployerHero />
        <TrustStrip items={home.trust} />
        <EmployerBenefits />
        <EmployerHow />
        <EmployerCost />
        <FinalCta finalCta={employer.finalCta} />
      </main>
      <Footer />
    </>
  );
}
