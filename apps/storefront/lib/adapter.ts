import { WooRestAdapter } from "@storefuse/adapter-woo-rest";
import type { StoreFuseAdapter } from "@storefuse/core";

// Singleton adapter instance
let adapterInstance: StoreFuseAdapter | null = null;

export function getAdapter(): StoreFuseAdapter {
  if (!adapterInstance) {
    if (!process.env.WOO_URL || !process.env.WOO_KEY || !process.env.WOO_SECRET) {
      throw new Error(
        "Missing WooCommerce credentials. Please set WOO_URL, WOO_KEY, and WOO_SECRET in .env.local"
      );
    }

    adapterInstance = new WooRestAdapter({
      endpoint: process.env.WOO_URL,
      keys: {
        consumerKey: process.env.WOO_KEY,
        consumerSecret: process.env.WOO_SECRET,
      },
    });
  }

  return adapterInstance;
}
