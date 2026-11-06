import { site } from "@/lib/site";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <a href={site.url} className="group inline-flex shrink-0 items-center gap-1.5 sm:gap-2" aria-label={`${site.name} home`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={site.logoMark}
        alt=""
        width={24}
        height={25}
        className="logo-tint h-5 w-auto sm:h-6"
      />
      <span className={`font-display text-[17px] font-bold sm:text-[19px] tracking-tight ${onDark ? "text-white" : "text-ink"}`}>
        {site.name}
      </span>
    </a>
  );
}
