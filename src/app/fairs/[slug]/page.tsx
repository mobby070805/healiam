import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { site } from "@/lib/site";
import { fairs } from "@/lib/fairs";
import { fairDetail } from "@/lib/pages/fair-detail";
import { fairDetailGraph } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { FinalCta } from "@/components/sections/FinalCta";
import { FairDetailHero, FairDirections, FairExpect, OtherFairs } from "@/components/fairs/FairDetail";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return fairs.map((fair) => ({ slug: fair.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const fair = fairs.find((f) => f.slug === slug);
  if (!fair) return {};

  const meta = fairDetail.meta(fair);
  const url = `${site.url}/fairs/${fair.slug}`;
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      siteName: site.name,
      title: meta.title,
      description: meta.description,
      locale: "en_US",
    },
    twitter: { card: "summary_large_image", title: meta.title, description: meta.description },
    robots: { index: true, follow: true },
  };
}

export default async function FairDetailPage({ params }: Params) {
  const { slug } = await params;
  const fair = fairs.find((f) => f.slug === slug);
  if (!fair) notFound();

  return (
    <>
      <JsonLd data={fairDetailGraph(fair)} />
      <Header nav={fairDetail.nav} />
      <main>
        <FairDetailHero fair={fair} />
        <FairDirections fair={fair} />
        <FairExpect fair={fair} />
        <OtherFairs current={fair} />
        <FinalCta finalCta={fairDetail.finalCta(fair)} />
      </main>
      <Footer />
      <StickyCta sticky={fairDetail.sticky(fair)} />
    </>
  );
}
