import { useId } from "react";
import type { site } from "@/lib/site";

type SocialName = (typeof site.socials)[number]["name"];

// Inline, not <img src="/logos/...">: three extra requests for 20px icons was the one
// part of the footer that showed as broken images on a slow phone connection.
export function SocialLogo({ name, className }: { name: SocialName; className?: string }) {
  // The Instagram gradient needs an id, and the contact page renders these twice.
  const gradientId = useId();

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      {name === "Facebook" && (
        <>
          <path
            fill="#1877F2"
            d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.413c0-3.026 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.264h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"
          />
          <path
            fill="#fff"
            d="M16.671 15.563l.532-3.49h-3.328V9.809c0-.956.465-1.886 1.956-1.886h1.513V4.952s-1.374-.236-2.686-.236c-2.741 0-4.533 1.671-4.533 4.697v2.66H7.078v3.49h3.047V24a12.1 12.1 0 003.75 0v-8.437h2.796z"
          />
        </>
      )}
      {name === "Instagram" && (
        <>
          <defs>
            <radialGradient id={gradientId} cx="30%" cy="107%" r="150%">
              <stop offset="0" stopColor="#fdf497" />
              <stop offset=".05" stopColor="#fdf497" />
              <stop offset=".45" stopColor="#fd5949" />
              <stop offset=".6" stopColor="#d6249f" />
              <stop offset=".9" stopColor="#285AEB" />
            </radialGradient>
          </defs>
          <rect width="24" height="24" rx="6" fill={`url(#${gradientId})`} />
          <rect x="5.5" y="5.5" width="13" height="13" rx="3.8" fill="none" stroke="#fff" strokeWidth="1.7" />
          <circle cx="12" cy="12" r="3.1" fill="none" stroke="#fff" strokeWidth="1.7" />
          <circle cx="16.1" cy="7.9" r=".95" fill="#fff" />
        </>
      )}
      {name === "LinkedIn" && (
        <>
          <rect width="24" height="24" rx="4" fill="#0A66C2" />
          <path
            fill="#fff"
            d="M7.1 9.5h2.4V18H7.1zM8.3 5.6a1.4 1.4 0 110 2.8 1.4 1.4 0 010-2.8zM11 9.5h2.3v1.2h.03c.32-.6 1.1-1.24 2.26-1.24 2.42 0 2.87 1.6 2.87 3.66V18h-2.4v-4.3c0-1.03-.02-2.35-1.43-2.35-1.43 0-1.65 1.12-1.65 2.27V18H11z"
          />
        </>
      )}
    </svg>
  );
}
