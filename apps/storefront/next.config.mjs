/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    "@storefuse/adapter-woo-rest",
    "@storefuse/core",
    "@storefuse/module-cart",
    "@storefuse/module-products",
    "@storefuse/theme-core"
  ],
  // Optimize image handling
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
};

export default nextConfig;
