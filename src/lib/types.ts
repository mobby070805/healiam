// Shapes shared by page data files and the components that lay them out.

export type CtaLink = { readonly label: string; readonly href: string; readonly newTab?: boolean };
export type NavItem = { readonly label: string; readonly href: string };
export type IconItem = { readonly icon: string; readonly label: string };

export type FaqData = {
  readonly eyebrow: string;
  readonly title: string;
  readonly sub?: string;
  readonly items: readonly { readonly q: string; readonly a: string }[];
  readonly help: { readonly title: string; readonly secondary: CtaLink; readonly email: CtaLink };
};

export type FinalCtaData = {
  readonly title: string;
  readonly sub: string;
  readonly primary: CtaLink;
  readonly secondary: CtaLink;
};

export type StickyData = { readonly label: string; readonly sub: string; readonly cta: CtaLink };

export type HeroVisualData = {
  readonly ariaLabel: string;
  /** City or state shown in bold at the top of the floating card ("Plano, TX", "Texas"). */
  readonly place?: string;
  readonly screen: {
    readonly title: string;
    readonly sub: string;
    readonly summary: { readonly inRange: number; readonly total: number; readonly label: string; readonly review: string };
    readonly filters: readonly string[];
    readonly rows: readonly {
      readonly name: string;
      readonly value: string;
      readonly unit: string;
      readonly low: boolean;
      readonly pos: number;
    }[];
  };
  readonly notification: { readonly app: string; readonly time: string; readonly title: string; readonly line: string };
  /** Second floating card: a marker trend (Texas page) or a booking confirmation (home). */
  readonly trend?: {
    readonly name: string;
    readonly sub: string;
    readonly chip: string;
    readonly points: readonly { readonly label: string; readonly value: string }[];
  };
  readonly booking?: {
    readonly title: string;
    readonly chip: string;
    readonly lines: readonly IconItem[];
  };
};

/** Turns an `as const` object's literal types back into plain strings, numbers and booleans. */
export type Widen<T> = T extends string
  ? string
  : T extends number
    ? number
    : T extends boolean
      ? boolean
      : T extends readonly (infer U)[]
        ? readonly Widen<U>[]
        : T extends object
          ? { readonly [K in keyof T]: Widen<T[K]> }
          : T;
