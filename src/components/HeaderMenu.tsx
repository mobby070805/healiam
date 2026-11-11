"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState, type KeyboardEvent } from "react";
import { ArrowRight, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import type { HeaderMenuData, MenuGroup, MenuItem } from "@/lib/locations";

/** Local "YYYY-MM-DD", to compare with a fair's ISO date. */
export function todayIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Header mega menu, used twice (owner, 6 Nov 2026): "Fairs" (each fair page with its date) and
// "Locations" (states only; hovering a state shows its city pages, see StatesPanel below). Grouped by state. Phones: a single-column panel full width under the
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
  // Mouse users (owner, 7 Nov 2026): the menu opens on hover and closes when the pointer leaves, after a
  // short grace period so crossing the gap between button and panel doesn't close it. Touch and keyboard
  // still open it with a tap or Enter.
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastPointer = useRef<string | null>(null);
  const cancelLeave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = null;
  };
  useEffect(() => cancelLeave, []);

  // md up, each panel is centered under its button (owner, 11 Nov 2026). Where that would run past the
  // window edge (the 600px Fairs panel at 1024px and below), nudge it back inside with a 16px gutter.
  // Measured even while closed: a hidden panel past the edge would still cause a sideways scroll.
  // Locations: the cities card opens on the right of the states (owner, 11 Nov 2026). If it would run
  // past the window, the menu moves left by up to half the states card so it still sits under the
  // button; past that, the cities open on the left instead.
  const [shift, setShift] = useState(0);
  const [citySide, setCitySide] = useState<"right" | "left">("right");
  const shiftRef = useRef(0);
  const statesLayout = menu.layout === "states";
  useLayoutEffect(() => {
    const fit = () => {
      const panel = panelRef.current;
      let next = 0;
      let side: "right" | "left" = "right";
      if (panel && window.matchMedia("(min-width: 768px)").matches) {
        const r = panel.getBoundingClientRect();
        const left = r.left - shiftRef.current;
        const right = r.right - shiftRef.current;
        const gutter = 16;
        const room = window.innerWidth - gutter;
        if (statesLayout && right + CITY_CARD_SPAN - room <= r.width / 2) {
          next = Math.min(0, room - (right + CITY_CARD_SPAN));
        } else {
          if (statesLayout) side = "left";
          if (right > room) next = room - right;
          else if (left < gutter) next = gutter - left;
        }
      }
      next = Math.round(next);
      shiftRef.current = next;
      setShift(next);
      setCitySide(side);
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, [statesLayout]);

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

  // Only visible links: the states layout renders a phone and a desktop version, one of them hidden.
  const links = () =>
    [...(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? [])].filter((a) => a.offsetParent !== null);

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
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelLeave();
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelLeave();
        leaveTimer.current = setTimeout(() => setOpen(false), 180);
      }}
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
        onPointerDown={(e) => {
          lastPointer.current = e.pointerType;
        }}
        // A mouse click while hovering keeps the menu open (hover already opened it); taps and Enter toggle.
        onClick={() => {
          if (lastPointer.current === "mouse") setOpen(true);
          else setOpen((o) => !o);
          lastPointer.current = null;
        }}
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
        style={shift ? { marginLeft: shift } : undefined}
        className={`absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-ink/[0.08] bg-white shadow-[0_28px_60px_-34px_rgba(10,10,15,0.45)] transition-[opacity,transform,visibility] duration-150 ease-out md:inset-x-auto md:mt-3 md:left-1/2 md:-translate-x-1/2 ${menu.layout === "states" ? "md:w-max md:overflow-visible" : "md:w-[min(600px,calc(100vw-4rem))]"} md:rounded-2xl md:border ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <p className="px-5 pt-4 text-[12.5px] text-ink-muted md:px-6 md:pt-5">
          {menu.summary}
        </p>

        {menu.layout === "states" ? (
          <StatesPanel groups={groups} open={open} side={citySide} onPick={() => setOpen(false)} />
        ) : (
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
        )}

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
export function MenuRow({ item, today, onPick }: { item: MenuItem; today: string | null; onPick: () => void }) {
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

// Locations menu (owner, 7 Nov 2026): only the states are listed; hovering or focusing a state shows its
// city pages beside it, by name only. Each state name still links to its state page. Phones have no hover,
// so there each state gets a chevron that opens its cities underneath. On md up the states card sits under
// the button, and a state's cities open as a second card on its right (left only when the window is too
// narrow), so the states never shift under the pointer (owner, 11 Nov 2026).
/** Cities card width (320) plus the 8px bridge between the cards. */
const CITY_CARD_SPAN = 328;

function StatesPanel({
  groups,
  open,
  side,
  onPick,
}: {
  groups: readonly MenuGroup[];
  open: boolean;
  /** Which side of the states card the cities card opens on (md up). */
  side: "right" | "left";
  onPick: () => void;
}) {
  const intoCities = side === "right" ? "ArrowRight" : "ArrowLeft";
  const backToStates = side === "right" ? "ArrowLeft" : "ArrowRight";
  const Chevron = side === "right" ? ChevronRight : ChevronLeft;
  const states = groups.map((g) => ({
    state: g.state,
    page: g.items.find((i) => i.strong),
    cities: g.items.filter((i) => !i.strong),
  }));
  // No state is active until one is hovered or focused: the panel opens showing the states alone.
  const [active, setActive] = useState<number | null>(null);
  const [expanded, setExpanded] = useState<number | null>(null);
  const stateLinks = useRef<(HTMLAnchorElement | null)[]>([]);
  const cityList = useRef<HTMLUListElement>(null);
  // A short hover delay, so a diagonal move from a lower state to the city list doesn't switch states.
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearHover = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  };
  useEffect(() => clearHover, []);
  useEffect(() => {
    if (!open) setActive(null);
  }, [open]);
  const current = active === null ? null : states[active];
  const cityName = (label: string) => label.replace(/,\s*[A-Z]{2}$/, "");

  return (
    <>
      {/* md up: the states card sits under the button; the hovered state's cities open as a second card
          beside it (right when there's room), so the states card never moves or resizes. */}
      <div className="hidden px-6 pb-6 pt-3 md:block">
        <ul className="w-[190px]">
          {states.map((g, i) => (
            <li key={g.state}>
              <a
                ref={(el) => {
                  stateLinks.current[i] = el;
                }}
                href={g.page?.href ?? g.cities[0]?.href}
                onClick={onPick}
                onMouseEnter={() => {
                  clearHover();
                  if (active === null) setActive(i);
                  else hoverTimer.current = setTimeout(() => setActive(i), 90);
                }}
                onMouseLeave={clearHover}
                onFocus={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === intoCities) {
                    e.preventDefault();
                    cityList.current?.querySelector("a")?.focus();
                  }
                }}
                className={`-mx-2 flex min-h-[44px] items-center justify-between gap-3 rounded-xl px-3 text-[14.5px] font-semibold transition-colors duration-150 ${
                  i === active ? "bg-mist text-ink" : "text-ink-soft hover:text-ink"
                }`}
              >
                {g.state}
                <Chevron
                  className={`h-4 w-4 shrink-0 transition-colors duration-150 ${i === active ? "text-green" : "text-ink-faint"}`}
                  strokeWidth={2}
                  aria-hidden="true"
                />
              </a>
            </li>
          ))}
        </ul>

        {current && (
        // The padding is a transparent bridge over the gap between the cards, so the pointer never "leaves".
        <div
          data-city-card
          className={`absolute top-0 ${side === "right" ? "left-full pl-2" : "right-full pr-2"}`}
          aria-live="polite"
        >
        <div className="w-[320px] rounded-2xl border border-ink/[0.08] bg-white px-6 pb-5 pt-2 shadow-[0_28px_60px_-34px_rgba(10,10,15,0.45)]">
          <p className="flex items-center gap-2.5 pt-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
            {current.state} cities
            <span className="h-px flex-1 bg-ink/[0.08]" aria-hidden="true" />
          </p>
          <ul
            ref={cityList}
            className="mt-1.5 grid grid-cols-2 gap-x-6"
            onKeyDown={(e) => {
              if (e.key === backToStates) {
                e.preventDefault();
                if (active !== null) stateLinks.current[active]?.focus();
              }
            }}
          >
            {current.cities.map((c) => (
              <li key={c.href}>
                <a
                  href={c.href}
                  onClick={onPick}
                  className="-mx-2 flex min-h-[44px] items-center justify-between gap-3 rounded-xl px-2 text-[14px] text-ink-soft transition-colors duration-150 hover:bg-mist hover:text-ink focus-visible:bg-mist"
                >
                  <span className="truncate">{cityName(c.label)}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-ink-faint" strokeWidth={2} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        </div>
        )}
      </div>

      {/* Phones: each state with a chevron that opens its cities underneath. */}
      <ul className="px-5 pb-4 pt-2 md:hidden">
        {states.map((g, i) => {
          const open = expanded === i;
          const listId = `menu-cities-${i}`;
          return (
            <li key={g.state} className="border-b border-ink/[0.06] last:border-b-0">
              <div className="flex items-center">
                <a
                  href={g.page?.href ?? g.cities[0]?.href}
                  onClick={onPick}
                  className="flex min-h-[48px] flex-1 items-center text-[15px] font-semibold text-ink"
                >
                  {g.state}
                </a>
                {g.cities.length > 0 && (
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={listId}
                    aria-label={`${open ? "Hide" : "Show"} ${g.state} cities`}
                    onClick={() => setExpanded(open ? null : i)}
                    className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-ink-muted transition-colors duration-150 hover:bg-mist hover:text-ink"
                  >
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                  </button>
                )}
              </div>
              {open && (
                <ul id={listId} className="grid grid-cols-2 gap-x-4 pb-3">
                  {g.cities.map((c) => (
                    <li key={c.href}>
                      <a
                        href={c.href}
                        onClick={onPick}
                        className="flex min-h-[40px] items-center text-[14px] text-ink-soft transition-colors duration-150 hover:text-ink"
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
    </>
  );
}
