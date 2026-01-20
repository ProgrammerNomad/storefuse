import type { StoreFuseModule } from "@storefuse/core";

/**
 * StoreFuse Products Module
 * 
 * Provides product listing, detail pages, and components.
 * Follows README Module System specification.
 */
export const ProductsModule: StoreFuseModule = {
  name: "products",
  dependsOn: [],

  pages: {
    "/shop": async () => (await import("./pages/ShopPage")).default,
    "/product/[slug]": async () => (await import("./pages/ProductDetailPage")).default,
    "/category/[slug]": async () => (await import("./pages/CategoryPage")).default,
  },

  components: {
    ProductCard: async () => (await import("./components/ProductCard")).default,
    ProductList: async () => (await import("./components/ProductList")).default,
    ProductGrid: async () => (await import("./components/ProductGrid")).default,
    ProductImage: async () => (await import("./components/ProductImage")).default,
    Price: async () => (await import("./components/Price")).default,
  },

  hooks: {
    onInit: (ctx) => {
      console.log("[ProductsModule] Initialized", ctx);
    },
  },

  settings: {
    productsPerPage: 12,
    showOutOfStock: true,
    defaultSort: "menu_order",
  },
};

export default ProductsModule;

// Export all components
export { default as ProductCard } from "./components/ProductCard";
export { default as ProductList } from "./components/ProductList";
export { default as ProductGrid } from "./components/ProductGrid";
export { default as ProductImage } from "./components/ProductImage";
export { default as Price } from "./components/Price";

// Export all pages
export { default as ShopPage } from "./pages/ShopPage";
export { default as ProductDetailPage } from "./pages/ProductDetailPage";
export { default as CategoryPage } from "./pages/CategoryPage";
