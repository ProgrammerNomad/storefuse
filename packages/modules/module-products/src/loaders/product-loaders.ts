import type { Product } from "@storefuse/core";
import type { StoreFuseAdapter } from "@storefuse/core";

/**
 * Product Data Loaders
 * 
 * Module-products provides data fetching functions for product-related data.
 * UI components live in theme-core, data loaders live here.
 */

export interface ProductListParams {
  page?: number;
  perPage?: number;
  category?: string;
  search?: string;
  orderBy?: string;
  order?: "asc" | "desc";
}

/**
 * Fetch list of products with optional filtering
 */
export async function loadProducts(
  adapter: StoreFuseAdapter,
  params: ProductListParams = {}
): Promise<Product[]> {
  return adapter.products.list(params);
}

/**
 * Fetch a single product by slug
 */
export async function loadProductBySlug(
  adapter: StoreFuseAdapter,
  slug: string
): Promise<Product | null> {
  return adapter.products.getBySlug(slug);
}

/**
 * Fetch a single product by ID
 */
export async function loadProductById(
  adapter: StoreFuseAdapter,
  id: string
): Promise<Product> {
  return adapter.products.getById(id);
}

/**
 * Fetch products for a specific category
 */
export async function loadProductsByCategory(
  adapter: StoreFuseAdapter,
  categorySlug: string,
  params: ProductListParams = {}
): Promise<Product[]> {
  return adapter.products.list({
    ...params,
    category: categorySlug,
  });
}
