import { defineStoreFuseConfig } from "@storefuse/core";

export default defineStoreFuseConfig({
  adapter: {
    name: "woo-rest",
    endpoint: process.env.WOO_URL!,
    keys: {
      consumerKey: process.env.WOO_KEY!,
      consumerSecret: process.env.WOO_SECRET!,
    },
  },
  modules: ["products"],
  theme: {
    core: "@storefuse/theme-core",
    child: "./theme-child",
  },
  cache: {
    strategy: "next-fetch",
    revalidate: {
      product: 600, // 10 minutes
      category: 1800, // 30 minutes
      home: 300, // 5 minutes
    },
  },
});
