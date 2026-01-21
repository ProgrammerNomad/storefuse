import type { StoreFuseModule } from "@storefuse/core";

/**
 * StoreFuse Cart Module
 * 
 * Provides cart state management with localStorage persistence.
 * UI components live in @storefuse/theme-core.
 * Follows README Module System specification.
 */
export const CartModule: StoreFuseModule = {
  name: "cart",
  dependsOn: [],

  hooks: {
    onInit: (ctx) => {
      console.log("[CartModule] Initialized", ctx);
    },
  },

  settings: {
    storageKey: "storefuse_cart",
    persistCart: true,
  },
};

export default CartModule;

// Export cart state management (NOT UI components)
export { CartProvider, useCart } from "./CartContext";
export type { CartItem, CartState, CartActions, CartContextValue } from "./types";
