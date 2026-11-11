import { ChevronRight } from "lucide-react";

type Crumb = { readonly name: string; readonly href?: string };

// Visible breadcrumb. The matching BreadcrumbList JSON-LD is built in lib/schema.ts,
// so the two always describe the same trail.
export function Breadcrumbs({ crumbs, onDark = false }: { crumbs: readonly Crumb[]; onDark?: boolean }) {
  const muted = onDark ? "text-white/50" : "text-ink-muted";
  const current = onDark ? "text-white/80" : "text-ink-soft";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1 text-[12px] sm:text-[13px]">
        {crumbs.map((crumb, i) => (
          <li key={crumb.name} className="flex items-center gap-1">
            {i > 0 && <ChevronRight className={`h-3.5 w-3.5 ${muted}`} strokeWidth={2} aria-hidden="true" />}
            {crumb.href ? (
              // The before: box widens the tap area on phones without changing the look.
              <a
                href={crumb.href}
                className={`relative before:absolute before:-inset-x-1 before:-inset-y-3 ${muted} transition-colors duration-150 ${onDark ? "hover:text-white" : "hover:text-ink"}`}
              >
                {crumb.name}
              </a>
            ) : (
              <span className={current} aria-current="page">
                {crumb.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
