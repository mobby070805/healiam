import { ImageResponse } from "next/og";
import { site } from "@/lib/site";
import { home as page } from "@/lib/pages/home";

export const dynamic = "force-static";

export const alt = page.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Mirrors the dark hero band so the share card matches the page it links to.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0A0A0F",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#FFFFFF" }}>{site.name}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 76, fontWeight: 800, lineHeight: 1.05, maxWidth: 1000 }}>
            {page.hero.titleParts.map((part, i) => (
              <span key={i} style={{ color: part.accent ? "#E83656" : "#FFFFFF", whiteSpace: "pre" }}>
                {part.text}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "rgba(255,255,255,0.65)" }}>
            {site.price.display} · 50+ markers · No referral · No insurance · Results in 4-5 days
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div
            style={{
              display: "flex",
              background: "#E83656",
              color: "#FFFFFF",
              fontSize: 28,
              fontWeight: 700,
              padding: "18px 40px",
              borderRadius: 999,
            }}
          >
            {page.hero.primary.label}
          </div>
        </div>
      </div>
    ),
    size,
  );
}
