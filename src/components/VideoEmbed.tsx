"use client";

import { useState } from "react";
import { Play } from "lucide-react";

// A facade, not a YouTube iframe on load: the poster is served from our own domain, and
// nothing reaches Google (no player script, no cookies) until the visitor presses play.
export function VideoEmbed({
  id,
  poster,
  label,
  className = "",
}: {
  id: string;
  poster: string;
  label: string;
  className?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const frame = `relative aspect-video w-full overflow-hidden rounded-2xl bg-ink sm:rounded-3xl ${className}`;

  if (playing) {
    return (
      <div className={frame}>
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&modestbranding=1`}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    );
  }

  return (
    <button type="button" onClick={() => setPlaying(true)} className={`group ${frame}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={poster} alt="" width={1280} height={720} loading="lazy" className="h-full w-full object-cover" />
      <span className="absolute inset-0 flex items-center justify-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white transition-colors duration-150 group-hover:bg-brand-hover sm:h-[60px] sm:w-[60px]">
          <Play className="ml-[3px] h-6 w-6 fill-current" strokeWidth={0} aria-hidden="true" />
        </span>
      </span>
      <span className="sr-only">{label}</span>
    </button>
  );
}
