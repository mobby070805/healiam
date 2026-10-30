import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Logo } from "@/components/Logo";
import type { NavItem } from "@/lib/types";

// Each page passes its own in-page section links. They show from md up; on phones the header
// stays a single row (logo and Book now), and the page is read by scrolling.
export function Header({ nav }: { nav: readonly NavItem[] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-ink/[0.07] bg-white/90 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-4">
        <Logo />
        <nav aria-label="Page sections" className="hidden items-center gap-7 md:flex">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-[14px] font-medium text-ink-soft transition-colors duration-150 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-1.5 text-[14px] font-semibold text-ink transition-colors duration-150 hover:text-ink-soft lg:inline-flex"
          >
            <Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            {site.phone}
          </a>
          <a href={site.bookingUrl} className="btn-primary !min-h-0 !px-4 !py-2 text-[13px] sm:!px-5 sm:!py-2.5 sm:text-[14px]">
            Book now
          </a>
        </div>
      </div>
    </header>
  );
}
