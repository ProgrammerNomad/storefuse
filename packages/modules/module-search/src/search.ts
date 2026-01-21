import type { StoreFuseAdapter } from "@storefuse/core";
import type { SearchOptions, SearchResponse, SearchResult } from "./types";

export async function searchProducts(
  adapter: StoreFuseAdapter,
  options: SearchOptions
): Promise<SearchResponse> {
  const { query, limit = 10, category, minPrice, maxPrice, inStock } = options;

  // Build search parameters
  const params: Record<string, any> = {
    search: query,
    per_page: limit,
    status: "publish",
  };

  if (category) {
    params.category = category;
  }

  if (minPrice !== undefined) {
    params.min_price = minPrice;
  }

  if (maxPrice !== undefined) {
    params.max_price = maxPrice;
  }

  if (inStock) {
    params.stock_status = "instock";
  }

  // Fetch products from adapter
  const products = await adapter.products.list(params);

  // Transform to search results
  const results: SearchResult[] = products.map((product: any) => ({
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: parseFloat(product.price),
    regularPrice: parseFloat(product.regular_price),
    salePrice: product.sale_price ? parseFloat(product.sale_price) : null,
    image: product.images?.[0]?.src || null,
    inStock: product.stock_status === "instock",
    categories: product.categories?.map((cat: any) => cat.name) || [],
  }));

  return {
    results,
    total: results.length,
    query,
  };
}
