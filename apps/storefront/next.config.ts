import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  webpack(config) {
    // Suppress warnings for dynamic imports that webpack can't statically analyze.
    // These are server-side-only code paths (ModuleLoader, ThemeManager) that are
    // dead code on the client but still included in the bundle from @storefuse/core.
    config.ignoreWarnings = [
      ...(config.ignoreWarnings ?? []),
      /Module not found: Can't resolve '@storefuse\/module-'/,
      /Module not found: Can't resolve <dynamic>/,
    ];
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
