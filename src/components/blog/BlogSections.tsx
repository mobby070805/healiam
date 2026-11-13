import { ArrowRight } from "lucide-react";
import { blog, blogTopics, posts } from "@/lib/pages/blog";
import { PostBanner, PostMeta } from "@/components/blog/PostCard";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { BlogArticles } from "@/components/blog/BlogArticles";

// Dark hero, same build as /about: breadcrumb, eyebrow, H1, the client's intro line, and a count.
export function BlogHero() {
  const { hero, breadcrumb } = blog;
  return (
    <section id="hero" className="on-dark relative overflow-hidden bg-ink">
      <div className="grid-backdrop-dark pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-[-30%] h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(232,54,86,0.14),transparent_62%)]"
        aria-hidden="true"
      />
      <div className="shell relative pb-10 pt-4 sm:pb-14 sm:pt-5 lg:pb-16">
        <Breadcrumbs crumbs={breadcrumb} onDark />
        <div className="max-w-3xl pt-7 sm:pt-10">
          <span className="eyebrow-text !text-brand">{hero.eyebrow}</span>
          <h1 className="text-[2.2rem] font-extrabold leading-[1.04] tracking-[-0.03em] text-white sm:text-[3.25rem]">
            {hero.title}
          </h1>
          <p className="mt-3.5 max-w-[38rem] text-[15px] leading-[1.6] text-white/70 sm:mt-5 sm:text-[17px] sm:leading-relaxed">
            {hero.sub}
          </p>
          <p className="mt-5 text-[13px] font-medium text-white/50 sm:mt-7 sm:text-[14px]">
            {posts.length} articles · {blogTopics.length} topics
          </p>
        </div>
      </div>
    </section>
  );
}

// Latest post, large. With a banner (posts we write): text left, banner right from lg up, banner on
// top on phones. Without one (the client's posts): a text-only card, title left and summary right.
export function FeaturedPost() {
  const post = posts[0];
  const badges = (
    <div className="flex flex-wrap items-center gap-2">
      <span className="rounded-full bg-ink px-2.5 py-1 text-[11.5px] font-semibold text-white sm:text-[12px]">Latest</span>
      <span className="chip !bg-white">{post.topic}</span>
    </div>
  );
  const title = (
    <h3 className="mt-4 text-[1.5rem] font-extrabold leading-[1.12] tracking-[-0.025em] text-ink sm:mt-5 sm:text-[2.1rem] lg:text-[2.4rem]">
      {post.title}
    </h3>
  );
  const footer = (
    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-ink/[0.08] pt-4 sm:mt-7 sm:pt-5">
      <PostMeta post={post} />
      <span className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-ink sm:text-[15px]">
        Read article
        <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={2} aria-hidden="true" />
      </span>
    </div>
  );
  const excerpt = <p className="text-[14.5px] leading-relaxed text-ink-soft sm:text-[16.5px]">{post.excerpt}</p>;

  return (
    <section id="latest" className="bg-white pt-8 sm:pt-14 lg:pt-16" aria-labelledby="latest-title">
      <div className="shell">
        <h2 id="latest-title" className="sr-only">
          Latest article
        </h2>
        {post.banner ? (
          <a href={post.href} className="card card-hover group grid overflow-hidden lg:grid-cols-[1.05fr_1fr]">
            <div className="order-2 flex flex-col p-5 sm:p-8 lg:order-1 lg:p-11">
              {badges}
              {title}
              <div className="mt-3 sm:mt-4">{excerpt}</div>
              <div className="mt-auto">{footer}</div>
            </div>
            <div className="order-1 border-b border-ink/[0.08] lg:order-2 lg:flex lg:items-center lg:border-b-0 lg:border-l lg:bg-ink">
              <PostBanner post={post} featured />
            </div>
          </a>
        ) : (
          <a
            href={post.href}
            className="card card-hover group relative block overflow-hidden !bg-mist p-5 sm:p-9 lg:p-12"
          >
            <div className="grid-backdrop pointer-events-none absolute inset-0" aria-hidden="true" />
            <div className="relative grid gap-3 sm:gap-4 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-14">
              <div>
                {badges}
                {title}
              </div>
              <div className="lg:pb-1.5">{excerpt}</div>
            </div>
            <div className="relative">{footer}</div>
          </a>
        )}
      </div>
    </section>
  );
}

export function AllArticles() {
  const { articles, note } = blog;
  return (
    <section id="articles" className="section bg-white" aria-labelledby="articles-title">
      <div className="shell">
        <div className="mb-5 flex flex-col gap-1 sm:mb-8">
          <span className="eyebrow-text">{articles.eyebrow}</span>
          <h2 id="articles-title" className="h2">
            {articles.title}
          </h2>
        </div>
        <BlogArticles />
        <p className="mt-8 max-w-3xl text-[12.5px] leading-relaxed text-ink-faint sm:mt-10 sm:text-[13px]">{note}</p>
      </div>
    </section>
  );
}
