import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Position dev indicator (route type, cache status) away from left sidebar
  devIndicators: {
    position: "bottom-right",
  },

  // Enables "use cache" directive, cacheLife(), cacheTag(), and Partial Prerendering.
  // Routes are dynamic by default; use "use cache" to opt into caching.
  cacheComponents: true,

  // TypeScript validates <Link href> and router.push() against actual routes.
  // Catches typos at build time - no manual routes constants file needed.
  typedRoutes: true,
};

export default nextConfig;
