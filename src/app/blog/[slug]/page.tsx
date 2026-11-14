import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { site } from "@/lib/site";
import { authorProfile, blog, formatPostDate, posts } from "@/lib/pages/blog";
import { articles, disclaimer, getArticle } from "@/lib/blog/articles";
import { articleGraph } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyCta } from "@/components/StickyCta";
import { ArticleBody } from "@/components/blog/ArticleBody";
import { PostBanner } from "@/components/blog/PostCard";
import { ArticleToc, BackToTop, ReadingProgress, ShareButtons } from "@/components/blog/ArticleChrome";
import {
  AboutAuthor,
  ArticleFaq,
  AuthorAvatar,
  ExploreCard,
  PostCover,
  SidebarCta,
  SummarizeWith,
} from "@/components/blog/ArticleParts";

// Only posts with full text in lib/blog/articles.ts are built here; the client's posts still live on
// healiam.com until they are rebuilt.
export const dynamicParams = false;
export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  const post = posts.find((p) => p.slug === slug);
  if (!article || !post) return {};
  const url = `${site.url}/blog/${article.slug}`;
  return {
    title: article.meta.title,
    description: article.meta.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      siteName: site.name,
      title: article.meta.title,
      description: article.meta.description,
      locale: "en_US",
      publishedTime: post.date,
      ...(post.banner ? { images: [{ url: `${site.url}${post.banner.src}`, width: 1600, height: 900, alt: post.banner.alt }] } : {}),
    },
    twitter: { card: "summary_large_image", title: article.meta.title, description: article.meta.description },
    robots: { index: true, follow: true },
  };
}

// Layout follows bolddesk.com's post pages (owner, 13 Nov 2026): title and banner side by side, a
// sticky left column ("In this page", booking card, summarize and share), the article on the right
// with FAQs and the author box at its end, then "Explore more content".
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const article = getArticle(slug);
  const post = posts.find((p) => p.slug === slug);
  if (!article || !post) notFound();

  const url = `${site.url}/blog/${article.slug}`;
  const profile = authorProfile(post);
  const related = article.related
    .map((s) => posts.find((p) => p.slug === s))
    .filter((p): p is (typeof posts)[number] => Boolean(p));
  // "Explore more content": the post's picked related posts, topped up with the latest ones.
  const explore = [...related, ...posts.filter((p) => p.slug !== post.slug && !related.includes(p))].slice(0, 3);
  const sections = [
    ...(article.blocks.filter((b) => b.type === "h2") as { id: string; text: string }[]).map(({ id, text }) => ({ id, text })),
    { id: "faq", text: "FAQs" },
  ];

  return (
    <>
      <JsonLd data={articleGraph(article, post)} />
      <Header />
      <ReadingProgress articleId="article" />
      <main>
        {/* Title block. id="hero" lets the phone sticky bar appear once it scrolls away. */}
        <section id="hero" className="relative isolate overflow-hidden bg-white">
          <div className="grid-backdrop pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
          <div
            className="pointer-events-none absolute -right-32 -top-24 -z-10 h-[380px] w-[560px] rounded-full bg-brand/[0.12] blur-3xl"
            aria-hidden="true"
          />
          <div className="shell grid items-center gap-8 pb-10 pt-8 sm:pb-14 sm:pt-12 lg:grid-cols-2 lg:gap-14 lg:pb-16 lg:pt-16">
            <div>
              <a
                href={blog.path}
                className="-ml-1 inline-flex min-h-[36px] items-center gap-1 text-[16px] font-medium text-brand-deep transition-colors duration-150 hover:text-brand-hover sm:text-[17px]"
              >
                <ChevronLeft className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden="true" />
                Blog
              </a>
              <h1 className="mt-4 text-[2.2rem] font-extrabold leading-[1.1] tracking-[-0.035em] text-ink sm:mt-6 sm:text-[3.4rem]">
                {article.h1}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-[14.5px] text-ink-muted sm:mt-8 sm:text-[15px]">
                <span className="flex items-center gap-2.5">
                  <AuthorAvatar profile={profile} />
                  <span>
                    by{" "}
                    {profile ? (
                      <a href="#author" className="font-medium text-brand-deep underline-offset-4 hover:underline">
                        {profile.name}
                      </a>
                    ) : (
                      <a href={blog.path} className="font-medium text-brand-deep underline-offset-4 hover:underline">
                        {post.author}
                      </a>
                    )}
                    {profile && <span className="text-ink-muted">, {profile.role}</span>}
                  </span>
                </span>
                <span aria-hidden="true" className="hidden sm:inline">•</span>
                <span>
                  Updated on: <time dateTime={post.date}>{formatPostDate(post.date)}</time>
                </span>
              </div>
            </div>
            {post.banner ? (
              <div className="overflow-hidden rounded-2xl">
                <PostBanner post={post} featured />
              </div>
            ) : (
              <PostCover topic={post.topic} figure={article.cover.figure} label={article.cover.label} />
            )}
          </div>
        </section>

        <div className="shell grid grid-cols-[minmax(0,1fr)] gap-8 pb-16 sm:pb-20 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_368px]">
          {/* Side column: on phones it sits above the article; from lg it moves to the right so the
              eye lands on the article first (owner, 13 Nov 2026). */}
          <aside className="min-w-0 lg:order-2">
            <div className="no-scrollbar space-y-6 lg:sticky lg:top-[82px] lg:max-h-[calc(100vh-92px)] lg:space-y-4 lg:pr-2 lg:overflow-y-auto lg:pb-3">
              <ArticleToc sections={sections} />
              <SidebarCta />
              <SummarizeWith url={url} />
              <div>
                <p className="text-[17px] font-bold tracking-[-0.01em] text-ink">Share</p>
                <div className="mt-3">
                  <ShareButtons url={url} title={article.h1} />
                </div>
              </div>
            </div>
          </aside>

          <article id="article" className="min-w-0 max-w-[784px] lg:order-1">
            <ArticleBody blocks={article.blocks} />
            <ArticleFaq items={article.faq} />
            <AboutAuthor profile={profile} />
            <p className="mt-8 text-[12.5px] leading-relaxed text-ink-faint sm:text-[13px]">{disclaimer}</p>
          </article>
        </div>

        <section className="border-t border-ink/[0.08] bg-white py-14 sm:py-20" aria-labelledby="explore-title">
          <div className="shell">
            <h2 id="explore-title" className="text-[1.9rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.6rem]">
              Explore more content
            </h2>
            <ul className="mt-7 grid gap-5 sm:mt-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {explore.map((p) => (
                <li key={p.slug}>
                  <ExploreCard post={p} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer blog={false} />
      <StickyCta sticky={blog.sticky} />
      <BackToTop articleId="article" />
    </>
  );
}
