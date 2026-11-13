import { ArrowUpRight } from "lucide-react";
import { formatPostDate, type BlogPost } from "@/lib/pages/blog";

// A post's banner. Only posts we write have one; the client's posts are text-only cards. Banners carry
// the post title and the Healiam logo, so they always show whole at 16:9 and are never cropped.
export function PostBanner({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  if (!post.banner) return null;
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={post.banner.src}
      alt={post.banner.alt}
      width={1600}
      height={900}
      loading={featured ? "eager" : "lazy"}
      className="aspect-[16/9] w-full bg-ink object-cover"
    />
  );
}

export function PostMeta({ post }: { post: BlogPost }) {
  return (
    <p className="text-[12.5px] text-ink-muted sm:text-[13px]">
      <time dateTime={post.date}>{formatPostDate(post.date)}</time> · {post.readMinutes} min read
    </p>
  );
}

export function PostCard({ post }: { post: BlogPost }) {
  return (
    <a href={post.href} className="card card-hover group flex h-full flex-col overflow-hidden">
      {post.banner && (
        <div className="border-b border-ink/[0.08]">
          <PostBanner post={post} />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-deep sm:text-[11.5px]">
          {post.topic}
        </p>
        <h3 className="mt-2.5 text-[17px] font-bold leading-snug tracking-[-0.015em] text-ink sm:text-[19px]">
          {post.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-[13.5px] leading-relaxed text-ink-muted sm:text-[14.5px]">{post.excerpt}</p>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-ink/[0.06] pt-4 sm:pt-5">
          <PostMeta post={post} />
          <ArrowUpRight
            className="h-4 w-4 shrink-0 text-ink-faint transition-colors duration-150 group-hover:text-ink"
            strokeWidth={2}
            aria-hidden="true"
          />
        </div>
      </div>
    </a>
  );
}
