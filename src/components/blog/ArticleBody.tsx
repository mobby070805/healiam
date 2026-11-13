import { Fragment } from "react";
import { ArrowRight } from "lucide-react";
import { site } from "@/lib/site";
import type { ArticleBlock } from "@/lib/blog/articles";
import { RichText } from "@/components/RichText";
import { cardTiles } from "@/components/blog/ArticleParts";

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
            // Same content and look as the sidebar booking card (owner, 13 Nov 2026): 50+ measurements in
            // one panel, the six areas from /tests, and the price shown once.
            return (
              <aside key={i} className="on-dark relative isolate !mt-10 overflow-hidden rounded-3xl bg-ink p-6 text-white sm:p-8">
                <div className="grid-backdrop-dark pointer-events-none absolute inset-0 -z-10" aria-hidden="true" />
                <div
                  className="pointer-events-none absolute -right-28 -top-32 -z-10 h-80 w-80 rounded-full bg-[radial-gradient(circle,rgba(232,54,86,0.16),transparent_62%)]"
                  aria-hidden="true"
                />
                <span className="flex items-center gap-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={site.logoMark} alt="" width={24} height={25} className="logo-tint h-5 w-auto" />
                  <span className="text-[16px] font-bold tracking-tight">{site.name}</span>
                </span>
                <p className="mt-4 text-[1.75rem] font-extrabold leading-[1.1] tracking-[-0.03em] sm:text-[2.2rem]">
                  One panel, <span className="text-brand">50+ measurements</span>
                </p>
                <p className="mt-2 max-w-[46ch] text-[14.5px] leading-[1.6] text-white/65 sm:text-[15.5px]">
                  Blood counts, thyroid, electrolytes, lipids, kidney, liver, diabetes and more, from a single draw.
                </p>
                <ul className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6 sm:gap-2.5">
                  {cardTiles.map((cat) => (
                    <li
                      key={cat.slug}
                      className="flex flex-col items-center gap-1.5 rounded-xl border border-white/10 bg-white/[0.04] px-1 py-3 text-center"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={cat.image} alt="" width={512} height={512} className="icon-white h-6 w-6 sm:h-7 sm:w-7" />
                      <span className="text-[11.5px] font-medium text-white/80 sm:text-[12.5px]">{cat.tile ?? cat.name}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-[2.4rem] font-extrabold leading-none tracking-[-0.04em]">{site.price.display}</p>
                    <p className="mt-1.5 text-[13.5px] text-white/65">Price for the full panel · No referral or insurance</p>
                  </div>
                  <div className="flex flex-col gap-2.5 sm:flex-row">
                    <a href={site.bookingUrl} className="btn-primary">
                      Book your spot
                    </a>
                    <a href={site.links.tests} className="btn-on-ink">
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
