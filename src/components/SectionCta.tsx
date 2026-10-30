type CtaLink = { readonly label: string; readonly href: string; readonly newTab?: boolean };

// Centred CTA pair under a section. Buttons stay side by side on phones.
export function SectionCta({
  primary,
  secondary,
  className = "",
}: {
  primary: CtaLink;
  secondary?: CtaLink;
  className?: string;
}) {
  return (
    <div className={`mt-7 flex flex-nowrap justify-center gap-2.5 sm:mt-10 sm:gap-3 ${className}`}>
      <a href={primary.href} className="btn-primary">
        {primary.label}
      </a>
      {secondary && (
        <a
          href={secondary.href}
          className="btn-ghost"
          {...(secondary.newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {secondary.label}
        </a>
      )}
    </div>
  );
}
