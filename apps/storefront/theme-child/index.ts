/**
 * Custom Child Theme for My Storefront
 *
 * This file demonstrates how to override theme components and hook into
 * StoreFuse lifecycle events via the global event bus.
 *
 * Only include the components / event handlers you want to customize.
 */

// ============================================================
// COMPONENT OVERRIDES
// Uncomment and add components you want to override:
//
// export const childThemeRegistry = {
//   Header: () => import("./components/Header"),
//   Footer: () => import("./components/Footer"),
//   ProductCard: () => import("./components/ProductCard"),
// };
// ============================================================

export const childThemeRegistry = {
  // Add your custom components here
  // Example: Header: () => import("./components/Header"),
};

// ============================================================
// BEHAVIOR OVERRIDES via EventBus
// Subscribe to cart / checkout / product events below.
// These run in the browser and work alongside any component overrides.
//
// Examples (uncomment to enable):
//
// import { storefuseEvents, CoreEvents } from "@storefuse/core";
//
// Track cart additions with your analytics provider:
// storefuseEvents.on(CoreEvents.CART_AFTER_ADD, ({ product, quantity }) => {
//   analytics.track("Add to Cart", { productId: product.id, name: product.name, quantity });
// });
//
// Show a toast before checkout redirect:
// storefuseEvents.on(CoreEvents.CHECKOUT_BEFORE_REDIRECT, ({ url }) => {
//   console.log("Redirecting to checkout:", url);
// });
//
// Fire a page-view event when a product is viewed:
// storefuseEvents.on(CoreEvents.PRODUCT_VIEW, ({ product }) => {
//   analytics.page("Product", { productId: product.id });
// });
// ============================================================
