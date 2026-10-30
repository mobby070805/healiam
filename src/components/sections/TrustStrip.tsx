import type { IconItem } from "@/lib/types";
import { LucideByName } from "@/components/LucideByName";

export function TrustStrip({ items }: { items: readonly IconItem[] }) {
  return (
    <div className="border-y border-ink/[0.07] bg-mist">
      <ul className="shell flex flex-wrap justify-center gap-x-5 gap-y-2.5 py-4 sm:gap-x-7 sm:py-5 lg:justify-between lg:gap-x-4">
        {items.map((item) => (
          <li key={item.label} className="flex items-center gap-1.5 whitespace-nowrap text-[11.5px] font-medium text-ink-soft sm:gap-2 sm:text-[14px]">
            <LucideByName name={item.icon} className="h-4 w-4 shrink-0 text-ink sm:h-5 sm:w-5" />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
