"use client";

import { useState } from "react";
import { blogTopics, posts, type BlogTopic } from "@/lib/pages/blog";
import { PostCard } from "@/components/blog/PostCard";

// Topic filter and the card grid. Every card is in the server HTML (the filter only hides cards),
// so search engines and no-JS visitors see all articles. The latest post is featured above, so the
// "All" view starts from the second post.
export function BlogArticles() {
  const [topic, setTopic] = useState<BlogTopic | "All">("All");
  const list = topic === "All" ? posts.slice(1) : posts.filter((p) => p.topic === topic);
  const count = (t: BlogTopic) => posts.filter((p) => p.topic === t).length;

  // "All" has no count: the latest post sits in the featured card, so the grid shows one fewer.
  const options: { key: BlogTopic | "All"; label: string; n?: number }[] = [
    { key: "All", label: "All" },
    ...blogTopics.map((t) => ({ key: t, label: t, n: count(t) })),
  ];

  return (
    <>
      <div role="group" aria-label="Filter articles by topic" className="no-scrollbar -mx-5 -my-2 flex gap-2 overflow-x-auto px-5 py-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {options.map((o) => {
          const on = topic === o.key;
          return (
            <button
              key={o.key}
              type="button"
              aria-pressed={on}
              onClick={() => setTopic(o.key)}
              className={`inline-flex min-h-[40px] shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full border px-4 text-[13.5px] font-medium transition-colors duration-150 sm:text-[14px] ${
                on ? "border-ink bg-ink text-white" : "border-ink/10 bg-mist text-ink-soft hover:border-ink/30"
              }`}
            >
              {o.label}
              {o.n !== undefined && <span className={`tabular-nums ${on ? "text-white/60" : "text-ink-faint"}`}>{o.n}</span>}
            </button>
          );
        })}
      </div>

      <ul className="mt-5 grid gap-4 sm:mt-7 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6" aria-live="polite">
        {posts.map((post) => (
          <li key={post.slug} hidden={!list.includes(post)}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </>
  );
}
