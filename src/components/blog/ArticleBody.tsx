import { Fragment } from "react";
import { ArrowRight, CalendarCheck, Droplet, Smartphone } from "lucide-react";
import { site } from "@/lib/site";
import type { ArticleBlock } from "@/lib/blog/articles";
import { RichText } from "@/components/RichText";

// "**bold**" lead-ins inside a copy string, then RichText for links in what's left.
function Inline({ text }: { text: string }) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="font-semibold text-ink">
            {part}
          </strong>
        ) : (
          <Fragment key={i}>
            <RichText text={part} />
          </Fragment>
        ),
      )}
    </>
  );
}

const para = "text-[16.5px] leading-[1.8] text-ink sm:text-[18px]";

// The three steps in the mid-article booking box (facts as on the city pages and healiam.com/faq).
const promoSteps = [
  { Icon: CalendarCheck, title: "Book a fair online", line: "Pick a date and time near you. No referral or insurance card needed." },
  { Icon: Droplet, title: "Two vials, about seven minutes", line: "Fairs run early in the morning, so you can come straight from your fast." },
  { Icon: Smartphone, title: "Results in the app", line: "Your numbers reach the Healiam app in 4 to 5 business days." },
] as const;

// Layout and type follow bolddesk.com's post pages (owner, 13 Nov 2026), in Healiam's colours.
export function ArticleBody({ blocks }: { blocks: readonly ArticleBlock[] }) {
  return (
    <div className="space-y-5">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "p":
            return (
              <p key={i} className={para}>
                <Inline text={block.text} />
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                id={block.id}
                className="!mt-11 scroll-mt-28 text-[1.75rem] font-extrabold leading-[1.15] tracking-[-0.025em] text-ink sm:!mt-14 sm:text-[2.4rem]"
              >
                {block.text}
              </h2>
            );
          case "callout":
            // TL;DR box: thick brand edge on the left, label run into the text.
            return (
              <aside key={i} className="!mt-7 mb-9 rounded-2xl border-l-4 border-brand bg-mist px-5 py-5 first:!mt-0 sm:px-7 sm:py-6">
                <p className="text-[16.5px] leading-[1.75] text-ink sm:text-[18.5px]">
                  <strong className="font-bold">{block.title}:</strong> <Inline text={block.text} />
                </p>
              </aside>
            );
          case "stats":
            return (
              <ul key={i} className="!mb-9 grid grid-cols-3 gap-2 sm:gap-4">
                {block.items.map((item, j) => {
                  const dark = j === block.items.length - 1;
                  return (
                    <li
                      key={item.label}
                      className={`relative overflow-hidden rounded-xl border p-3 sm:rounded-2xl sm:p-5 ${dark ? "border-ink bg-ink text-white" : "border-ink/[0.1] bg-white"}`}
                    >
                      {dark && <span className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-brand/40 blur-2xl" aria-hidden="true" />}
                      <p className="relative text-[1.45rem] font-extrabold leading-none tracking-[-0.035em] sm:text-[2.3rem]">{item.value}</p>
                      <p className={`relative mt-1.5 text-[12px] leading-snug sm:mt-2 sm:text-[14px] ${dark ? "text-white/70" : "text-ink-muted"}`}>{item.label}</p>
                    </li>
                  );
                })}
              </ul>
            );
          case "promo":
            // Mid-article booking box. Owner, 14 Nov 2026: it looked the same as the sidebar card ("both looks
            // same"), so it now has its own look and message: light card, how a Healiam test works in three
            // steps, the price once. The dark "One panel, 50+ measurements" card stays in the sidebar only.
            return (
              <aside
                key={i}
                className="relative isolate !mt-10 overflow-hidden rounded-3xl border border-ink/[0.1] bg-white p-6 shadow-[0_24px_60px_-40px_rgba(10,10,15,0.35)] sm:p-8"
              >
                <div
                  className="pointer-events-none absolute -right-24 -top-28 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(232,54,86,0.10),transparent_65%)]"
                  aria-hidden="true"
                />
                <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-deep">How a Healiam test works</p>
                <p className="mt-2 text-[1.55rem] font-extrabold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[2rem]">
                  Get your numbers at a morning health fair
                </p>
                <ol className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
                  {promoSteps.map(({ Icon, title, line }, n) => (
                    <li key={title} className="flex gap-3.5 rounded-2xl bg-mist p-4 sm:flex-col sm:gap-3 sm:p-5">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white text-brand-deep ring-1 ring-ink/[0.08]">
                        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden="true" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[15.5px] font-bold leading-snug text-ink sm:text-[16.5px]">
                          <span className="sr-only">Step {n + 1}: </span>
                          {title}
                        </p>
                        <p className="mt-1 text-[14px] leading-[1.6] text-ink-soft sm:text-[14.5px]">{line}</p>
                      </div>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 flex flex-col gap-4 border-t border-ink/[0.08] pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[15px] text-ink-soft">
                    <span className="mr-2 text-[1.9rem] font-extrabold tracking-[-0.04em] text-ink">{site.price.display}</span>
                    for the full panel
                  </p>
                  <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-5">
                    <a href={site.bookingUrl} className="btn-primary">
                      Book your spot
                    </a>
                    <a
                      href={site.links.tests}
                      className="inline-flex min-h-[44px] items-center justify-center gap-1.5 text-[15px] font-semibold text-brand-deep transition-colors duration-150 hover:text-brand-hover"
                    >
                      See what’s tested
                      <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </aside>
            );
          case "ol":
            // Numbered cards, one per step or question.
            return (
              <ol key={i} className="!mt-6 space-y-3">
                {block.items.map((item, j) => (
                  <li key={j} className="flex gap-4 rounded-2xl border border-ink/[0.1] bg-white p-4 sm:gap-5 sm:p-5">
                    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-ink text-[14px] font-bold tabular-nums text-white sm:h-10 sm:w-10 sm:text-[15px]">
                      {j + 1}
                    </span>
                    <div className="min-w-0 pt-0.5">
                      {item.lead && <p className="text-[16.5px] font-bold leading-snug text-ink sm:text-[18px]">{item.lead}</p>}
                      <p className={`text-[15.5px] leading-[1.7] text-ink-soft sm:text-[16.5px] ${item.lead ? "mt-1" : ""}`}>
                        <Inline text={item.text} />
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            );
          case "ul": {
            return (
              <ul key={i} className={`list-disc space-y-2.5 pl-6 marker:text-ink-muted ${para}`}>
                {block.items.map((item, j) => (
                  <li key={j} className="pl-1">
                    {item.lead && <strong className="font-semibold">{item.lead}</strong>}
                    {item.lead && ": "}
                    <Inline text={item.text} />
                  </li>
                ))}
              </ul>
            );
          }
          case "table":
            return (
              <figure key={i} className="!mt-7 sm:!mt-8">
                <div className="overflow-x-auto rounded-2xl border border-ink/[0.12]">
                  <table className="w-full min-w-[340px] border-collapse text-left text-[14px] sm:text-[15px]">
                    <thead className="bg-mist">
                      <tr>
                        {block.head.map((h, c) => (
                          <th
                            key={h}
                            scope="col"
                            className={`px-4 py-3.5 font-bold text-ink sm:px-5 ${c > 0 ? "border-l border-ink/[0.1]" : ""}`}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, r) => {
                        const total = row[0] === "Total";
                        return (
                          <tr key={r} className={`border-t border-ink/[0.1] ${total ? "bg-mist/70" : ""}`}>
                            {row.map((cell, c) =>
                              c === 0 ? (
                                <th key={c} scope="row" className="px-4 py-3.5 font-semibold text-ink sm:px-5">
                                  {cell}
                                </th>
                              ) : (
                                <td
                                  key={c}
                                  className={`border-l border-ink/[0.1] px-4 py-3.5 tabular-nums sm:px-5 ${total ? "font-semibold text-ink" : "text-ink-soft"}`}
                                >
                                  {cell}
                                </td>
                              ),
                            )}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <figcaption className="mt-2.5 text-center text-[12.5px] text-ink-muted sm:text-[13px]">{block.caption}</figcaption>
              </figure>
            );
        }
      })}
    </div>
  );
}
