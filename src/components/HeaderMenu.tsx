"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, ChevronDown } from "lucide-react";
import type { HeaderMenuData, MenuItem } from "@/lib/locations";

/** Local "YYYY-MM-DD", to compare with a fair's ISO date. */
function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Header mega menu, used twice (owner, 6 Nov 2026): "Fairs" (each fair page with its date) and
// "Locations" (each state page, bold with an arrow, then its city pages). Grouped by state. Phones: a single-column panel full width under the
// one-row header. sm up: two columns. md up: a card anchored to the button. Hover changes colour only;
// open and close is a 150ms fade and lift, switched off by the global reduced-motion rule.
export function HeaderMenu({ menu }: { menu: HeaderMenuData }) {
  const { groups } = menu;
  const [open, setOpen] = useState(false);
  // Set after mount, so "upcoming" is judged by the visitor's own date, never by the build date.
  const [today, setToday] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const panelId = useId();

  useEffect(() => setToday(todayIso()), []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const links = () => [...(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [])];

  // Arrow Down on the button opens the menu and moves into it.
  const onButtonKey = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      requestAnimationFrame(() => links()[0]?.focus());
    }
  };

  // Up, Down, Home and End move between the menu's links.
  const onPanelKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const list = links();
    const i = list.indexOf(document.activeElement as HTMLAnchorElement);
    const next =
      e.key === "ArrowDown" ? (i + 1) % list.length
      : e.key === "ArrowUp" ? (i - 1 + list.length) % list.length
      : e.key === "Home" ? 0
      : e.key === "End" ? list.length - 1
      : -1;
    if (next < 0) return;
    e.preventDefault();
    list[next]?.focus();
  };

  return (
    <div
      ref={wrapRef}
      className="md:relative"
      // Tabbing out of the menu closes it. A click on the panel's empty space has no relatedTarget,
      // so it never closes the menu by accident; outside clicks are handled by the pointer listener.
      onBlur={(e) => {
        if (open && e.relatedTarget && !wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onButtonKey}
        className="inline-flex min-h-[40px] items-center gap-0.5 rounded-full px-1.5 text-[13px] font-medium text-ink-soft transition-colors duration-150 hover:text-ink aria-expanded:text-ink sm:gap-1 sm:px-3 sm:text-[14px]"
      >
        {menu.label}
        <ChevronDown
          className={`h-3.5 w-3.5 transition-transform duration-150 sm:h-4 sm:w-4 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>

      <div
        ref={panelRef}
        id={panelId}
        role="region"
        aria-label={menu.label}
        inert={!open}
        onKeyDown={onPanelKey}
        className={`absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-ink/[0.08] bg-white shadow-[0_28px_60px_-34px_rgba(10,10,15,0.45)] transition-[opacity,transform,visibility] duration-150 ease-out md:inset-x-auto md:right-0 md:mt-3 md:w-[min(600px,calc(100vw-4rem))] md:rounded-2xl md:border ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <p className="px-5 pt-4 text-[12.5px] text-ink-muted md:px-6 md:pt-5">
          {menu.summary}
        </p>

        <div className="grid grid-cols-1 gap-y-5 px-5 pb-5 pt-3 sm:grid-cols-2 sm:gap-x-8 md:px-6">
          {groups.map((group) => (
            <section key={group.state} aria-label={group.state} className="min-w-0">
              {/* Not a heading: the header is on every page, and headings here would sit above each page's H1. */}
              <p className="flex items-center gap-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                {group.state}
                <span className="h-px flex-1 bg-ink/[0.08]" aria-hidden="true" />
              </p>

              <ul className="mt-1.5">
                {group.items.map((item) =>
                  item.strong ? (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="-mx-2 flex min-h-[44px] items-center justify-between gap-3 rounded-xl px-2 text-[14.5px] font-semibold text-ink transition-colors duration-150 hover:bg-mist focus-visible:bg-mist"
                      >
                        {item.label}
                        <ArrowRight className="h-4 w-4 shrink-0 text-green" strokeWidth={2} aria-hidden="true" />
                      </a>
                    </li>
                  ) : (
                    <MenuRow key={item.href} item={item} today={today} onPick={() => setOpen(false)} />
                  ),
                )}
              </ul>
            </section>
          ))}
        </div>

        {menu.footer && (
          <div className="border-t border-ink/[0.07] px-5 py-3 md:px-6">
            <a
              href={menu.footer.href}
              onClick={() => setOpen(false)}
              className="inline-flex min-h-[40px] items-center gap-1.5 text-[14px] font-semibold text-ink transition-colors duration-150 hover:text-ink-soft"
            >
              {menu.footer.label}
              <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

// One city row: a fair (with its date, an upcoming dot or "Ended") or a city page (no date).
function MenuRow({ item, today, onPick }: { item: MenuItem; today: string | null; onPick: () => void }) {
  const upcoming = item.date && today ? item.date >= today : null;
  // The state label above already names the state, so ", TX" is dropped here.
  const name = item.label.replace(/,\s*[A-Z]{2}$/, "");
  return (
    <li>
      <a
        href={item.href}
        onClick={onPick}
        aria-label={item.dateLabel ? `${name} health fair, ${item.dateLabel}${upcoming === false ? ", ended" : ""}` : undefined}
        className="-mx-2 flex min-h-[44px] items-center justify-between gap-3 rounded-xl px-2 text-[14px] text-ink-soft transition-colors duration-150 hover:bg-mist hover:text-ink focus-visible:bg-mist"
      >
        <span className="truncate">{item.dateLabel ? name : `Blood testing in ${name}`}</span>
        {item.dateLabel ? (
          <span className="flex shrink-0 items-center gap-1.5 text-[12.5px] tabular-nums text-ink-muted">
            {upcoming === true && <span className="h-1.5 w-1.5 rounded-full bg-green" aria-hidden="true" />}
            {upcoming === false ? <span className="text-ink-faint">Ended</span> : item.dateLabel}
          </span>
        ) : (
          <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint" strokeWidth={2} aria-hidden="true" />
        )}
      </a>
    </li>
  );
}
