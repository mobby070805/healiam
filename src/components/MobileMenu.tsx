"use client";

// Phone and tablet menu (below lg): the header is logo, Book Now and a three-bar button. The panel holds
// the same links as the desktop header, in the live healiam.com order (owner, 13 Nov 2026): Home, Our
// Tests, Fairs, Locations (states, each opening to its cities), FAQs, Contact, then More's links under
// a small label (so Contact doesn't read as one of them), and Book Now.

import { useEffect, useId, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, MapPin, Menu, X } from "lucide-react";
import { site } from "@/lib/site";
import { headerLinks, moreLinks, requestFairLink, type HeaderLink, type LocationsMenuGroup } from "@/lib/header-nav";
import { isCurrent } from "@/components/HeaderNav";

export function MobileMenu({ locations }: { locations: readonly LocationsMenuGroup[] }) {
  const pathname = usePathname() ?? "/";
  const [open, setOpen] = useState(false);
  const [locationsOpen, setLocationsOpen] = useState(false);
  const [state, setState] = useState<number | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  // While open: Escape closes, the page behind doesn't scroll, and widening past lg closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const wide = window.matchMedia("(min-width: 1024px)");
    const onWide = () => wide.matches && setOpen(false);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  // Reset to the short view each time it closes.
  useEffect(() => {
    if (!open) {
      setLocationsOpen(false);
      setState(null);
    }
  }, [open]);

  const close = () => setOpen(false);
  const row = (l: HeaderLink) => {
    const on = isCurrent(pathname, l.href);
    return (
      <li key={l.href} className="border-b border-ink/[0.07]">
        <a
          href={l.href}
          onClick={close}
          aria-current={on ? "page" : undefined}
          className={`flex min-h-[54px] items-center text-[17px] ${on ? "font-semibold text-ink" : "font-medium text-ink-soft"}`}
        >
          {l.label}
        </a>
      </li>
    );
  };

  return (
    <div className="lg:hidden">
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Close menu" : "Open menu"}
        onClick={() => setOpen((o) => !o)}
        className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink transition-colors duration-150 hover:bg-mist"
      >
        {open ? (
          <X className="h-[22px] w-[22px]" strokeWidth={2} aria-hidden="true" />
        ) : (
          <Menu className="h-[22px] w-[22px]" strokeWidth={2} aria-hidden="true" />
        )}
      </button>

      <div
        // Absolute under the header, not fixed: the header's backdrop blur makes it the containing block
        // for fixed children, so fixed would size to the header. The height fills the rest of the screen.
        id={panelId}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        className={`absolute inset-x-0 top-full h-[calc(100dvh-4rem)] overflow-y-auto border-t border-ink/[0.07] overscroll-contain bg-white transition-[opacity,transform,visibility] duration-150 ease-out ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <nav aria-label="Main" className="shell pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
          <ul>
            {row(headerLinks.home)}
            {row(headerLinks.tests)}
            {row(headerLinks.fairs)}
            <li className="border-b border-ink/[0.07]">
              <button
                type="button"
                aria-expanded={locationsOpen}
                aria-controls={`${panelId}-locations`}
                onClick={() => setLocationsOpen((o) => !o)}
                className="flex min-h-[54px] w-full items-center justify-between text-[17px] font-medium text-ink-soft"
              >
                Locations
                <ChevronDown
                  className={`h-5 w-5 text-ink-muted transition-transform duration-150 ${locationsOpen ? "rotate-180" : ""}`}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </button>
              {locationsOpen && (
                <div id={`${panelId}-locations`} className="pb-4">
                  <p className="text-[11.5px] font-semibold uppercase tracking-[0.16em] text-brand-deep">Blood testing near you</p>
                  <ul className="mt-2">
                    {locations.map((g, i) => {
                      const expanded = state === i;
                      const listId = `${panelId}-cities-${i}`;
                      return (
                        <li key={g.state} className="border-b border-ink/[0.06] last:border-b-0">
                          <div className="flex items-center">
                            <a
                              href={g.page?.href ?? g.cities[0]?.href}
                              onClick={close}
                              className="flex min-h-[48px] flex-1 items-center gap-2 text-[15.5px] font-semibold text-ink"
                            >
                              <MapPin className="h-4 w-4 shrink-0 text-brand-deep" strokeWidth={2} aria-hidden="true" />
                              {g.state}
                            </a>
                            {g.cities.length > 0 && (
                              <button
                                type="button"
                                aria-expanded={expanded}
                                aria-controls={listId}
                                aria-label={`${expanded ? "Hide" : "Show"} ${g.state} cities`}
                                onClick={() => setState(expanded ? null : i)}
                                className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition-colors duration-150 hover:bg-mist hover:text-ink"
                              >
                                <ChevronDown
                                  className={`h-4 w-4 transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}
                                  strokeWidth={2}
                                  aria-hidden="true"
                                />
                              </button>
                            )}
                          </div>
                          {expanded && (
                            <ul id={listId} className="grid grid-cols-2 gap-x-4 pb-3 pl-6">
                              {g.cities.map((c) => (
                                <li key={c.href}>
                                  <a
                                    href={c.href}
                                    onClick={close}
                                    className="flex min-h-[44px] items-center text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-ink"
                                  >
                                    {c.city}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                  <p className="mt-3 text-[13px] text-ink-muted">Don’t see your city? We add fairs regularly.</p>
                  <a
                    href={requestFairLink.href}
                    onClick={close}
                    className="inline-flex min-h-[44px] items-center gap-1.5 text-[14.5px] font-semibold text-brand-deep"
                  >
                    {requestFairLink.label}
                    <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                  </a>
                </div>
              )}
            </li>
            {row(headerLinks.faq)}
            {row(headerLinks.contact)}
          </ul>
          <p className="pt-5 text-[11.5px] font-semibold uppercase tracking-[0.16em] text-ink-muted">More</p>
          <ul>
            {moreLinks.map(row)}
          </ul>
          <a href={site.bookingUrl} onClick={close} className="btn-primary mt-6 w-full">
            Book Now
          </a>
        </nav>
      </div>
    </div>
  );
}
