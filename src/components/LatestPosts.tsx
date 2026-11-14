import { ArrowRight } from "lucide-react";
import { blog, posts } from "@/lib/pages/blog";
import { ExploreCard } from "@/components/blog/ArticleParts";

// "From the blog" band above the footer on every page (owner, 14 Nov 2026). Shows the three newest posts
// we wrote (built on this site), newest first, so it updates itself as posts are added. Left off /blog and
// the post pages, which already end with post cards ("Explore more content").
const latest = posts.filter((p) => p.href.startsWith("/blog/")).slice(0, 3);

export function LatestPosts() {
  if (latest.length === 0) return null;
  return (
    <section className="border-t border-ink/[0.07] bg-mist/60 py-14 sm:py-20" aria-labelledby="latest-posts-title">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-deep">From the blog</p>
            <h2
              id="latest-posts-title"
              className="mt-2 text-[1.9rem] font-extrabold leading-[1.1] tracking-[-0.03em] text-ink sm:text-[2.6rem]"
            >
              Read before your blood test
            </h2>
          </div>
          <a
            href={blog.path}
            className="inline-flex min-h-[44px] items-center gap-1.5 text-[15px] font-semibold text-brand-deep transition-colors duration-150 hover:text-brand-hover"
          >
            See all articles
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
        <ul className="mt-7 grid gap-5 sm:mt-9 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {latest.map((p) => (
            <li key={p.slug}>
              <ExploreCard post={p} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
