import type { StoreFuseModule } from "@storefuse/core";

/**
 * StoreFuse Products Module
 * 
 * Provides data fetching functions for products and categories.
 * UI components live in @storefuse/theme-core.
 * Follows README Module System specification.
 */
export const ProductsModule: StoreFuseModule = {
  name: "products",
  dependsOn: [],

  pages: {
    "/": () => import("./pages/ShopPage").then(m => ({ default: m.default })),
    "shop": () => import("./pages/ShopPage").then(m => ({ default: m.default })),
    "product/[slug]": () => import("./pages/ProductDetailPage").then(m => ({ default: m.default })),
    "category/[slug]": () => import("./pages/CategoryPage").then(m => ({ default: m.default })),
  },

  hooks: {
    onInit: () => {
      console.log("[ProductsModule] Initialized");
    },
  },

  settings: {
    productsPerPage: 12,
    showOutOfStock: true,
    defaultSort: "menu_order",
  },
};

export default ProductsModule;

// Export data loaders (NOT UI components)
export {
  loadProducts,
  loadProductBySlug,
  loadProductById,
  loadProductsByCategory,
  type ProductListParams,
} from "./loaders/product-loaders";

export {
  loadCategories,
  loadCategoryBySlug,
} from "./loaders/category-loaders";
export { default as ProductDetailPage } from "./pages/ProductDetailPage";
export { default as CategoryPage } from "./pages/CategoryPage";
