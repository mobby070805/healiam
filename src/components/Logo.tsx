import { site } from "@/lib/site";

export function Logo({ onDark = false }: { onDark?: boolean }) {
  return (
    <a href={site.url} className="group inline-flex items-center gap-2" aria-label={`${site.name} home`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={site.logoMark}
        alt=""
        width={24}
        height={25}
        className="logo-tint h-6 w-auto"
      />
      <span className={`font-display text-[19px] font-bold tracking-tight ${onDark ? "text-white" : "text-ink"}`}>
        {site.name}
      </span>
    </a>
  );
}
