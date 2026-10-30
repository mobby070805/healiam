// STATIC_EXPORT=1 builds a plain static site into out/ for Cloudflare Pages.
// Static export can't run redirects, so Pages serves them from public/_redirects instead.
// Build it with: STATIC_EXPORT=1 npm run build
const staticExport = process.env.STATIC_EXPORT === "1";

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  ...(staticExport
    ? { output: "export" }
    : {
        async redirects() {
          return [
            { source: "/texas", destination: "/texas/blood-test", permanent: true },
            { source: "/texas/blood-test/", destination: "/texas/blood-test", permanent: true },
          ];
        },
      }),
};

export default nextConfig;
