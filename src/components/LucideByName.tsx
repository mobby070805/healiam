import { icons, type LucideProps } from "lucide-react";

export type IconName = keyof typeof icons;

// Renders a lucide icon from a name stored in a data file.
export function LucideByName({ name, ...props }: { name: string } & LucideProps) {
  const Icon = icons[name as IconName];
  if (!Icon) {
    // Some names lucide-react exports as components are absent from its `icons` record.
    // Silently rendering nothing leaves an empty tile on the page, so say so in development.
    if (process.env.NODE_ENV !== "production") {
      throw new Error(`LucideByName: "${name}" is not in lucide-react's icons record.`);
    }
    return null;
  }
  return <Icon strokeWidth={1.7} aria-hidden="true" {...props} />;
}
