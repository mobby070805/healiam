import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Outfit } from "next/font/google";
import { site } from "@/lib/site";
import { MotionProvider } from "@/components/MotionProvider";
import "./globals.css";

// One font family across the whole site: Outfit (Healiam's brand typeface), weights 400 to 800.
const outfit = Outfit({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-brand",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s` },
  icons: { icon: site.logoMark },
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={outfit.variable}>
      <body>
        <MotionProvider>{children}</MotionProvider>
        {site.gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${site.gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${site.gaId}');`}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  );
}
