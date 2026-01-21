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
