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
            // Location pages moved to /locations/<state> and /locations/<state>/<city> on 14 Nov 2026, the same
            // addresses healiam.com uses. Every earlier address redirects straight to the new one (no chains):
            // the short state URLs, /<state>/blood-testing, /<state>/blood-testing-in-<city>, and Texas's
            // original /texas/blood-test.
            { source: "/texas", destination: "/locations/texas", permanent: true },
            { source: "/texas/blood-testing", destination: "/locations/texas", permanent: true },
            { source: "/texas/blood-test", destination: "/locations/texas", permanent: true },
            { source: "/texas/blood-testing-in-plano", destination: "/locations/texas/plano", permanent: true },
            { source: "/texas/blood-testing-in-garland", destination: "/locations/texas/garland", permanent: true },
            { source: "/texas/blood-testing-in-dallas", destination: "/locations/texas/dallas", permanent: true },
            { source: "/texas/blood-testing-in-irving", destination: "/locations/texas/irving", permanent: true },
            { source: "/texas/blood-testing-in-arlington", destination: "/locations/texas/arlington", permanent: true },
            { source: "/texas/blood-testing-in-fort-worth", destination: "/locations/texas/fort-worth", permanent: true },
            { source: "/colorado", destination: "/locations/colorado", permanent: true },
            { source: "/colorado/blood-testing", destination: "/locations/colorado", permanent: true },
            { source: "/colorado/blood-testing-in-denver", destination: "/locations/colorado/denver", permanent: true },
            { source: "/colorado/blood-testing-in-aurora", destination: "/locations/colorado/aurora", permanent: true },
            { source: "/georgia", destination: "/locations/georgia", permanent: true },
            { source: "/georgia/blood-testing", destination: "/locations/georgia", permanent: true },
            { source: "/georgia/blood-testing-in-lawrenceville", destination: "/locations/georgia/lawrenceville", permanent: true },
            { source: "/georgia/blood-testing-in-atlanta", destination: "/locations/georgia/atlanta", permanent: true },
            { source: "/new-jersey", destination: "/locations/new-jersey", permanent: true },
            { source: "/new-jersey/blood-testing", destination: "/locations/new-jersey", permanent: true },
            { source: "/new-jersey/blood-testing-in-rahway", destination: "/locations/new-jersey/rahway", permanent: true },
            { source: "/new-jersey/blood-testing-in-newark", destination: "/locations/new-jersey/newark", permanent: true },
            { source: "/new-jersey/blood-testing-in-jersey-city", destination: "/locations/new-jersey/jersey-city", permanent: true },
            { source: "/new-york", destination: "/locations/new-york", permanent: true },
            { source: "/new-york/blood-testing", destination: "/locations/new-york", permanent: true },
            { source: "/new-york/blood-testing-in-new-york-city", destination: "/locations/new-york/new-york-city", permanent: true },
          ];
        },
      }),
};

export default nextConfig;
