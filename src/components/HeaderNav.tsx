"use client";

// Desktop header links, the same set and order as the live healiam.com header (owner, 13 Nov 2026):
// Home, Our Tests, Fairs, Locations (menu), FAQs, More (menu), Contact. The live site's dark-mode
// switch is left out: this site has no dark theme. The current page's link is shown in ink.

import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { ArrowRight, ChevronDown, MapPin } from "lucide-react";
import { headerLinks, moreLinks as more, requestFairLink as request, type HeaderLink, type LocationsMenuGroup } from "@/lib/header-nav";

const linkClass = (active: boolean) =>
  `inline-flex min-h-[40px] items-center whitespace-nowrap px-2 text-[14.5px] transition-colors duration-150 xl:px-2.5 ${
    active ? "font-semibold text-ink" : "font-medium text-ink-soft hover:text-ink"
  }`;

/** True when the current path is this link's page or sits under it. */
export function isCurrent(pathname: string, href: string) {
  if (!href.startsWith("/")) return false;
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export function HeaderNav({ locations }: { locations: readonly LocationsMenuGroup[] }) {
  const pathname = usePathname() ?? "/";
  const { home, tests, fairs, faq, contact } = headerLinks;
  const onLocationPage = locations.some(
    (g) => (g.page && isCurrent(pathname, g.page.href)) || g.cities.some((c) => isCurrent(pathname, c.href)),
  );
  const onMorePage = more.some((m) => isCurrent(pathname, m.href));

  const plain = (l: HeaderLink) => (
    <a key={l.href} href={l.href} aria-current={isCurrent(pathname, l.href) ? "page" : undefined} className={linkClass(isCurrent(pathname, l.href))}>
      {l.label}
    </a>
  );

  return (
    <nav aria-label="Main" className="relative hidden items-center lg:flex">
      {plain(home)}
      {plain(tests)}
      {plain(fairs)}
      <Dropdown label="Locations" active={onLocationPage} anchor="nav">
        {(close) => (
          <div className="w-[min(1000px,calc(100vw-3rem))] rounded-2xl border border-ink/[0.08] bg-white px-6 pb-4 pt-6 shadow-[0_28px_60px_-30px_rgba(10,10,15,0.4)]">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-deep">Blood testing near you</p>
            <div className="mt-5 grid grid-cols-5 gap-x-6 gap-y-6">
              {locations.map((g) => (
                <div key={g.state} className="min-w-0">
                  <a
                    href={g.page?.href ?? g.cities[0]?.href}
                    onClick={close}
                    className="inline-flex items-center gap-2 text-[15px] font-semibold text-ink transition-colors duration-150 hover:text-brand-deep"
                  >
                    <MapPin className="h-4 w-4 shrink-0 text-brand-deep" strokeWidth={2} aria-hidden="true" />
                    {g.state}
                  </a>
                  <ul className="mt-2.5">
                    {g.cities.map((c) => (
                      <li key={c.href}>
                        <a
                          href={c.href}
                          onClick={close}
                          aria-current={isCurrent(pathname, c.href) ? "page" : undefined}
                          className={`flex min-h-[34px] items-center text-[14px] transition-colors duration-150 ${
                            isCurrent(pathname, c.href) ? "font-medium text-ink" : "text-ink-soft hover:text-ink"
                          }`}
                        >
                          {c.city}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between gap-4 border-t border-ink/[0.08] pt-4">
              <p className="text-[13px] text-ink-muted">Don’t see your city? We add fairs regularly.</p>
              <a
                href={request.href}
                onClick={close}
                className="inline-flex min-h-[36px] items-center gap-1.5 text-[13.5px] font-semibold text-brand-deep transition-colors duration-150 hover:text-brand-hover"
              >
                {request.label}
                <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
              </a>
            </div>
          </div>
        )}
      </Dropdown>
      {plain(faq)}
      <Dropdown label="More" active={onMorePage} anchor="button">
        {(close) => (
          <ul className="w-[208px] rounded-2xl border border-ink/[0.08] bg-white p-2 shadow-[0_28px_60px_-30px_rgba(10,10,15,0.4)]">
            {more.map((m) => (
              <li key={m.href}>
                <a
                  href={m.href}
                  onClick={close}
                  aria-current={isCurrent(pathname, m.href) ? "page" : undefined}
                  className={`flex min-h-[42px] items-center rounded-xl px-4 text-[14.5px] transition-colors duration-150 hover:bg-mist ${
                    isCurrent(pathname, m.href) ? "font-semibold text-ink" : "text-ink-soft hover:text-ink"
                  }`}
                >
                  {m.label}
                </a>
              </li>
            ))}
          </ul>
        )}
      </Dropdown>
      {plain(contact)}
    </nav>
  );
}

/**
 * A header menu button. Opens on hover with a mouse (with a short grace period so crossing to the panel
 * doesn't close it), and on click, tap or Enter. Escape, an outside click or tabbing away closes it.
 * anchor "nav": the panel centers under the whole link row (Locations, a wide panel); "button": it
 * centers under its own button (More).
 */
function Dropdown({
  label,
  active,
  anchor,
  children,
}: {
  label: string;
  active: boolean;
  anchor: "nav" | "button";
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const lastPointer = useRef<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const panelId = useId();
  const cancelLeave = () => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    leaveTimer.current = null;
  };
  useEffect(() => cancelLeave, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
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

  const close = () => setOpen(false);

  return (
    <div
      ref={wrapRef}
      className={anchor === "button" ? "relative" : undefined}
      onPointerEnter={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelLeave();
        setOpen(true);
      }}
      onPointerLeave={(e) => {
        if (e.pointerType !== "mouse") return;
        cancelLeave();
        leaveTimer.current = setTimeout(close, 180);
      }}
      onBlur={(e) => {
        if (open && e.relatedTarget && !wrapRef.current?.contains(e.relatedTarget as Node)) close();
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
        // A mouse click while hovering keeps it open (hover already opened it); taps and Enter toggle.
        onClick={() => {
          if (lastPointer.current === "mouse") setOpen(true);
          else setOpen((o) => !o);
          lastPointer.current = null;
        }}
        className={`${linkClass(active || open)} gap-1`}
      >
        {label}
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-150 ${open ? "rotate-180" : ""}`}
          strokeWidth={2}
          aria-hidden="true"
        />
      </button>
      {/* pt-2 is a transparent bridge over the gap, so moving the pointer down never "leaves" the menu. */}
      <div
        id={panelId}
        inert={!open}
        className={`absolute left-1/2 top-full z-10 -translate-x-1/2 pt-2 transition-[opacity,transform,visibility] duration-150 ease-out ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        {children(close)}
      </div>
    </div>
  );
}
