"use client";

import { useId, useState } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";

// Phones: tap to show markers. Tablet and up: markers always shown.
// Markers stay in the HTML either way, so search engines read the full list.
// Each card links to its healiam.com test guide, and each marker chip to that marker's page.
export function PanelCategory({
  icon,
  name,
  line,
  markers,
  guide,
  wide = false,
}: {
  icon: React.ReactNode;
  name: string;
  line: string;
  markers: readonly { readonly name: string; readonly href: string }[];
  guide: { readonly label: string; readonly href: string };
  wide?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const listId = useId();
  return (
    <li className={`card p-3.5 sm:p-5 ${wide ? "md:col-span-2" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={listId}
        className="flex min-h-[44px] w-full items-center gap-3 text-left md:pointer-events-none md:cursor-default sm:gap-4"
      >
        <span className="icon-tile !h-10 !w-10 sm:!h-11 sm:!w-11">{icon}</span>
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[15px] font-bold leading-tight tracking-[-0.01em] text-ink sm:text-[18px]">{name}</span>
          <span className="mt-1 block text-[12.5px] font-medium text-ink-muted sm:text-[14px]">
            {markers.length} {markers.length === 1 ? "marker" : "markers"}
            <span className="hidden font-normal md:inline"> · {line}</span>
          </span>
        </span>
        <ChevronDown
          className={`h-8 w-8 shrink-0 rounded-full border border-ink/10 p-1.5 text-ink transition-transform md:hidden ${open ? "rotate-180" : ""}`}
          strokeWidth={1.8}
          aria-hidden="true"
        />
      </button>
      <a
        href={guide.href}
        className="group ml-[52px] mt-1 inline-flex min-h-[32px] items-center gap-1.5 text-[13px] font-semibold text-brand hover:underline sm:ml-[60px] sm:mt-1.5 sm:min-h-0 sm:text-[14px]"
      >
        {guide.label}
        <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" strokeWidth={2.2} aria-hidden="true" />
      </a>
      <ul id={listId} className={`${open ? "flex" : "hidden"} mt-3 flex-wrap gap-1.5 md:mt-4 md:flex`}>
        {markers.map((m) => (
          <li key={m.name}>
            <a href={m.href} className="chip transition-colors duration-150 hover:border-ink/30 hover:text-ink">
              {m.name}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}
