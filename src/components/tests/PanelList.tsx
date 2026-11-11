import { Info } from "lucide-react";
import { tests } from "@/lib/pages/tests";
import { panelCategories } from "@/lib/panel";

// Eleven categories and sixty-odd markers is a lot to scroll past on a phone, so the
// desktop "browse" sidebar becomes a scrollable row of jump links pinned under the heading.
// Everything stays in the DOM and visible, which keeps it indexable.
export function PanelList() {
  const { included } = tests;

  return (
    <section id="included" className="section bg-white" aria-labelledby="included-title">
      <div className="shell">
        <div className="grid gap-6 sm:gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-xl">
            <span className="eyebrow-text">{included.eyebrow}</span>
            <h2 id="included-title" className="h2">
              {included.title}
            </h2>
            <p className="lead mt-3">{included.sub}</p>
          </div>

          <dl className="grid grid-cols-3 gap-2.5 sm:gap-4 lg:w-[420px]">
            {included.stats.map((stat) => (
              <div
                key={stat.label}
                className="card flex flex-col items-center justify-center px-2 py-4 text-center sm:py-5"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[22px] font-extrabold leading-none tracking-[-0.03em] text-ink sm:text-[30px]">
                  {stat.value}
                </dd>
                <p className="mt-1.5 text-[11.5px] text-ink-muted sm:mt-2 sm:text-[13px]">{stat.label}</p>
              </div>
            ))}
          </dl>
        </div>

        {/* Phones and tablets: a jump bar. It scrolls horizontally rather than stacking
            eleven links on top of the list they are meant to shortcut. */}
        <nav aria-label="Panel categories" className="mt-7 lg:hidden">
          <ul className="no-scrollbar -mx-5 -my-2 flex gap-2 overflow-x-auto px-5 pb-3 pt-2">
            {panelCategories.map((cat) => (
              <li key={cat.slug}>
                <a href={`#${cat.slug}`} className="chip relative whitespace-nowrap before:absolute before:inset-x-0 before:-inset-y-2">
                  {cat.short ?? cat.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-5 grid gap-4 sm:mt-8 lg:grid-cols-[1fr_260px] lg:items-start lg:gap-10">
          <ul className="grid gap-3 sm:gap-4">
            {panelCategories.map((cat) => (
              <li key={cat.slug} id={cat.slug} className="card p-4 sm:p-6">
                <div className="flex items-start gap-3.5 sm:gap-4">
                  <span className="icon-tile">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={cat.image} alt="" width={512} height={512} loading="lazy" className="h-5 w-5 sm:h-6 sm:w-6" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <h3 className="h3">{cat.name}</h3>
                    <p className="body mt-1 !text-[12.5px] sm:!text-[14px]">
                      {cat.markers.length} {cat.markers.length === 1 ? "measurement" : "measurements"}
                      {". "}
                      {cat.line}
                    </p>
                  </div>
                </div>

                <ul className="mt-3.5 flex flex-wrap gap-1.5 sm:mt-4 sm:gap-2">
                  {cat.markers.map((marker) => (
                    <li key={marker} className="chip">
                      {marker}
                    </li>
                  ))}
                </ul>

                {cat.selfLogged && (
                  <p className="mt-3 flex items-start gap-2 text-[12px] leading-snug text-ink-muted sm:text-[13px]">
                    <Info className="mt-px h-3.5 w-3.5 shrink-0" strokeWidth={1.9} aria-hidden="true" />
                    {included.selfLoggedNote}
                  </p>
                )}
              </li>
            ))}
          </ul>

          {/* Desktop only: the sidebar the jump bar replaces on narrow screens. */}
          <div className="hidden lg:sticky lg:top-24 lg:block">
            <nav aria-label="Panel categories" className="card p-5">
              <p className="text-[13px] font-semibold text-ink">{included.browseLabel}</p>
              <ul className="mt-3 space-y-0.5">
                {panelCategories.map((cat) => (
                  <li key={cat.slug}>
                    <a
                      href={`#${cat.slug}`}
                      className="flex items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-[14px] text-ink-soft transition-colors duration-150 hover:bg-mist hover:text-ink"
                    >
                      <span className="truncate">{cat.short ?? cat.name}</span>
                      <span className="shrink-0 text-[12px] tabular-nums text-ink-faint">{cat.markers.length}</span>
                    </a>
                  </li>
                ))}
              </ul>
              <a href={included.cta.href} className="btn-primary mt-4 w-full">
                {included.cta.label}
              </a>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
}
