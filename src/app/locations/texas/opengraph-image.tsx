import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const dynamic = "force-static";
import { page } from "@/lib/pages/texas-blood-test";

export const alt = page.meta.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          background: "#FFFFFF",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#0A0A0F" }}>{site.name}</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", flexWrap: "wrap", fontSize: 76, fontWeight: 800, color: "#0A0A0F", lineHeight: 1.05, maxWidth: 980 }}>
            {page.hero.titleLead}&nbsp;<span style={{ color: "#168A4C" }}>{page.hero.titleAccent}</span>
          </div>
          <div style={{ display: "flex", marginTop: 28, fontSize: 30, color: "#3F3F46" }}>
            All tests in one panel · No referral · No insurance · Results in 4-5 days
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
