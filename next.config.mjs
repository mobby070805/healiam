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
            // The Texas page moved from /texas/blood-test to /texas/blood-testing on 1 Nov 2026,
            // matching /colorado/blood-testing. The old URL keeps working through a permanent redirect.
            { source: "/texas", destination: "/texas/blood-testing", permanent: true },
            { source: "/texas/blood-test", destination: "/texas/blood-testing", permanent: true },
            { source: "/texas/blood-test/", destination: "/texas/blood-testing", permanent: true },
          ];
        },
      }),
};

export default nextConfig;
