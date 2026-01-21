import { getAdapter } from "@/lib/adapter";
import type { Product } from "@storefuse/core";
import { ProductGrid } from "@storefuse/theme-core";

export default async function ShopPage() {
  let products: Product[] = [];
  let error = null;

  try {
    const adapter = getAdapter();
    products = await adapter.products.list({});
  } catch (err) {
    error = err instanceof Error ? err.message : "Failed to load products";
    console.error("Shop page error:", err);
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shop</h1>

      {error && (
        <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-900">
            <strong>Error loading products:</strong> {error}
          </p>
          <p className="text-sm text-red-700 mt-2">
            Make sure your .env.local file is configured with valid WooCommerce
            credentials.
          </p>
        </div>
      )}

      {!error && products.length === 0 && (
        <div className="p-6 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-900">
            No products found. Add some products to your WooCommerce store.
          </p>
        </div>
      )}

      {products.length > 0 && (
        <ProductGrid products={products} columns={4} />
      )}

      <div className="mt-12 p-6 bg-green-50 border border-green-200 rounded-lg">
        <p className="text-center text-green-900">
          <strong>✓ Live WooCommerce Integration:</strong> Products are loaded
          from your WooCommerce store via REST API with 10-minute cache.
        </p>
      </div>
    </div>
  );
}
