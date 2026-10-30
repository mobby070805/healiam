"use client";

import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";

// Phones: tap to show markers. Tablet and up: markers always shown.
// Markers stay in the HTML either way, so search engines read the full list.
export function PanelCategory({
  icon,
  name,
  line,
  markers,
  wide = false,
}: {
  icon: React.ReactNode;
  name: string;
  line: string;
  markers: readonly string[];
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
      <ul id={listId} className={`${open ? "flex" : "hidden"} mt-3 flex-wrap gap-1.5 md:mt-4 md:flex`}>
        {markers.map((m) => (
          <li key={m} className="chip">
            {m}
          </li>
        ))}
      </ul>
    </li>
  );
}
