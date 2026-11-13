import { site } from "@/lib/site";
import { Logo } from "@/components/Logo";
import { HeaderNav } from "@/components/HeaderNav";
import { MobileMenu } from "@/components/MobileMenu";
import { locationsMenu } from "@/lib/locations";

// The same header as the live healiam.com site (owner, 13 Nov 2026), so nothing changes for visitors at
// launch: logo; Home, Our Tests, Fairs, Locations, FAQs, More and Contact in the middle; Book Now on the
// right. From lg (1024px) the links show in the bar; below that they move into the three-bar menu.
// The live site's dark-mode switch is left out: this site has no dark theme.
export function Header() {
  const locations = locationsMenu();
  // z-50: one above the phone sticky bar (z-40), so an open menu is never covered by it.
  return (
    <header className="sticky top-0 z-50 border-b border-ink/[0.07] bg-white/90 backdrop-blur-md">
      <div className="shell flex h-16 items-center justify-between gap-3">
        <Logo />
        <HeaderNav locations={locations} />
        <div className="flex items-center gap-2">
          <a href={site.bookingUrl} className="btn-primary !min-h-0 !px-4 !py-2 text-[13px] sm:!px-5 sm:!py-2.5 sm:text-[14px]">
            Book Now
          </a>
          <MobileMenu locations={locations} />
        </div>
      </div>
    </header>
  );
}
