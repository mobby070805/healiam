import { Phone } from "lucide-react";
import { site } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { HeaderMenu } from "@/components/HeaderMenu";
import { MobileMenu } from "@/components/MobileMenu";
import { fairsMenu, locationsMenu } from "@/lib/locations";
import type { NavItem } from "@/lib/types";

// Each page passes its own in-page section links; they show from lg up (at tablet width they wrapped
// once Locations joined the header). From md up, Fairs and Locations sit beside Book now; the phone
// number shows from xl up. Phones (below md) get logo, Book now and a three-bar menu that holds the
// section links, Fairs, Locations and the phone number (owner, 11 Nov 2026).
export function Header({ nav }: { nav: readonly NavItem[] }) {
  // z-50: one above the phone sticky bar (z-40), so an open Locations panel is never covered by it.
  return (
    <header className="sticky top-0 z-50 border-b border-ink/[0.07] bg-white/90 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-2 sm:gap-4">
        <Logo />
        <nav aria-label="Page sections" className="hidden items-center gap-6 lg:flex xl:gap-7">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap text-[14px] font-medium text-ink-soft transition-colors duration-150 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3 xl:gap-5">
          {/* Fairs, then Locations (owner, 6 Nov 2026); on phones they move into the three-bar menu. */}
          <div className="hidden md:block">
            <HeaderMenu menu={fairsMenu()} />
          </div>
          <div className="hidden md:block">
            <HeaderMenu menu={locationsMenu()} />
          </div>
          <a
            href={site.phoneHref}
            className="hidden items-center gap-1.5 text-[14px] font-semibold text-ink transition-colors duration-150 hover:text-ink-soft xl:inline-flex"
          >
            <Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
            {site.phone}
          </a>
          <a href={site.bookingUrl} className="btn-primary !min-h-0 !px-3.5 !py-2 text-[13px] sm:!px-5 sm:!py-2.5 sm:text-[14px]">
            Book now
          </a>
          <MobileMenu nav={nav} fairs={fairsMenu()} locations={locationsMenu()} />
        </div>
      </div>
    </header>
  );
}
