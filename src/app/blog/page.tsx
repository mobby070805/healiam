import type { Metadata } from "next";
import { site } from "@/lib/site";
import { blog } from "@/lib/pages/blog";
import { blogGraph } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { FinalCta } from "@/components/sections/FinalCta";
import { AllArticles, BlogHero, FeaturedPost } from "@/components/blog/BlogSections";

const url = `${site.url}${blog.path}`;

export const metadata: Metadata = {
  title: blog.meta.title,
  description: blog.meta.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    siteName: site.name,
    title: blog.meta.title,
    description: blog.meta.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title: blog.meta.title, description: blog.meta.description },
  robots: { index: true, follow: true },
};

export default function BlogPage() {
  return (
    <>
      <JsonLd data={blogGraph()} />
      <Header />
      <main>
        <BlogHero />
        <FeaturedPost />
        <AllArticles />
        <FinalCta finalCta={blog.finalCta} />
      </main>
      <Footer blog={false} />
      <StickyCta sticky={blog.sticky} />
    </>
  );
}
