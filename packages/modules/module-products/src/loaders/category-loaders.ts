import type { Category } from "@storefuse/core";
import type { StoreFuseAdapter } from "@storefuse/core";

/**
 * Category Data Loaders
 * 
 * Module-products provides data fetching functions for category-related data.
 */

/**
 * Fetch all categories
 */
export async function loadCategories(
  adapter: StoreFuseAdapter
): Promise<Category[]> {
  return adapter.categories.list();
}

/**
 * Fetch a single category by slug
 */
export async function loadCategoryBySlug(
  adapter: StoreFuseAdapter,
  slug: string
): Promise<Category | null> {
  return adapter.categories.getBySlug(slug);
}
