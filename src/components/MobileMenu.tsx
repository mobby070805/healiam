"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import { site } from "@/lib/site";
import type { HeaderMenuData } from "@/lib/locations";
import type { NavItem } from "@/lib/types";
import { MenuRow, todayIso } from "@/components/HeaderMenu";

// Phone menu (owner, 11 Nov 2026): below md the header is logo, Book now and a three-bar button. The
// button opens a full-screen panel under the header with the Fairs list (with dates) and Locations
// (states, each opening to its cities) first, then this page's section links, the phone number and Book now.
// Fairs and Locations start closed so the panel opens short. md up the header is unchanged.
export function MobileMenu({
  nav,
  fairs,
  locations,
}: {
  nav: readonly NavItem[];
  fairs: HeaderMenuData;
  locations: HeaderMenuData;
}) {
  const [open, setOpen] = useState(false);
  const [section, setSection] = useState<"fairs" | "locations" | null>(null);
  const [state, setState] = useState<number | null>(null);
  const [today, setToday] = useState<string | null>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  useEffect(() => setToday(todayIso()), []);

  // While open: Escape closes, the page behind doesn't scroll, and widening past md closes it.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const wide = window.matchMedia("(min-width: 768px)");
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
      setSection(null);
      setState(null);
    }
  }, [open]);

  const close = () => setOpen(false);
  const states = locations.groups.map((g) => ({
    state: g.state,
    page: g.items.find((i) => i.strong),
    cities: g.items.filter((i) => !i.strong),
  }));
  const cityName = (label: string) => label.replace(/,\s*[A-Z]{2}$/, "");

  return (
    <div className="md:hidden">
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
        <div className="shell pb-[calc(1.5rem+env(safe-area-inset-bottom))]">

          {/* Fairs: every fair with its date, then the fairs page. */}
          <Group
            label={fairs.label}
            open={section === "fairs"}
            onToggle={() => setSection(section === "fairs" ? null : "fairs")}
          >
            <p className="pb-1 text-[12.5px] text-ink-muted">{fairs.summary}</p>
            {fairs.groups.map((g) => (
              <div key={g.state} className="mt-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">{g.state}</p>
                <ul className="mt-1">
                  {g.items.map((item) => (
                    <MenuRow key={item.href} item={item} today={today} onPick={close} />
                  ))}
                </ul>
              </div>
            ))}
            {fairs.footer && (
              <a
                href={fairs.footer.href}
                onClick={close}
                className="mt-2 inline-flex min-h-[44px] items-center gap-1.5 text-[14.5px] font-semibold text-ink"
              >
                {fairs.footer.label}
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </a>
            )}
          </Group>

          {/* Locations: each state links to its page; its chevron opens the state's cities. */}
          <Group
            label={locations.label}
            open={section === "locations"}
            onToggle={() => setSection(section === "locations" ? null : "locations")}
          >
            <p className="pb-1 text-[12.5px] text-ink-muted">{locations.summary}</p>
            <ul>
              {states.map((g, i) => {
                const expanded = state === i;
                const listId = `${panelId}-cities-${i}`;
                return (
                  <li key={g.state} className="border-b border-ink/[0.06] last:border-b-0">
                    <div className="flex items-center">
                      <a
                        href={g.page?.href ?? g.cities[0]?.href}
                        onClick={close}
                        className="flex min-h-[48px] flex-1 items-center text-[15px] font-semibold text-ink"
                      >
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
                      <ul id={listId} className="grid grid-cols-2 gap-x-4 pb-3">
                        {g.cities.map((c) => (
                          <li key={c.href}>
                            <a
                              href={c.href}
                              onClick={close}
                              className="flex min-h-[44px] items-center text-[14.5px] text-ink-soft transition-colors duration-150 hover:text-ink"
                            >
                              {cityName(c.label)}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </Group>

          {/* This page's section links, after Fairs and Locations (owner, 11 Nov 2026). */}
          {nav.length > 0 && (
            <ul className="border-b border-ink/[0.07] py-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={close}
                    className="flex min-h-[48px] items-center text-[16px] font-medium text-ink-soft transition-colors duration-150 hover:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-6 grid gap-3">
            <a
              href={site.phoneHref}
              onClick={close}
              className="btn-ghost inline-flex items-center justify-center gap-2"
            >
              <Phone className="h-4 w-4" strokeWidth={1.8} aria-hidden="true" />
              {site.phone}
            </a>
            <a href={site.bookingUrl} onClick={close} className="btn-primary">
              Book now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// One collapsible row in the phone menu (Fairs, Locations).
function Group({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  const id = useId();
  return (
    <div className="border-b border-ink/[0.07]">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
        className="flex min-h-[56px] w-full items-center justify-between text-[17px] font-semibold text-ink"
      >
        {label}
        <ChevronDown
          className={`h-5 w-5 text-ink-muted transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div id={id} className="pb-4">
          {children}
        </div>
      )}
    </div>
  );
}
