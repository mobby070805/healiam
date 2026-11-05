"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

// Shows "Upcoming" until the fair's end time, then says the date has passed, so a static page never
// presents an old fair as coming up. Decided in the visitor's browser, like the Locations menu's
// "Ended" label; the static HTML shows the upcoming state.
export function FairDateStatus({
  date,
  end,
  utcOffset,
  upcoming,
  ended,
  endedCta,
}: {
  date: string;
  end: string;
  utcOffset: string;
  upcoming: string;
  ended: string;
  endedCta: { readonly label: string; readonly href: string };
}) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    setPast(Date.now() > Date.parse(`${date}T${end}:00${utcOffset}`));
  }, [date, end, utcOffset]);

  if (!past) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-green/30 bg-green/15 px-2.5 py-1 text-[11.5px] font-semibold text-white">
        <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />
        {upcoming}
      </span>
    );
  }

  return (
    <div className="rounded-xl border border-white/15 bg-white/[0.06] p-3 text-[13px] leading-snug text-white/80 sm:text-[14px]">
      <p>{ended}</p>
      <a href={endedCta.href} className="mt-2 inline-flex items-center gap-1.5 font-semibold text-white hover:underline">
        {endedCta.label}
        <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
      </a>
    </div>
  );
}
