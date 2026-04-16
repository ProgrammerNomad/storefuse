"use client";

import { useThemeComponent } from "@storefuse/core";
import type { Product } from "@storefuse/core";

interface ClientShopPageProps {
  products: Product[];
  error?: string;
}

export default function ClientShopPage({ products, error }: ClientShopPageProps) {
  const ProductGrid = useThemeComponent("ProductGrid");

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shop</h1>

      {error && (
        <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-900">
            <strong>Error loading products:</strong> {error}
          </p>
          <p className="text-sm text-red-700 mt-2">
            Make sure your .env.local file is configured with valid WooCommerce credentials.
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

      {ProductGrid && products.length > 0 && (
        <ProductGrid products={products} columns={4} />
      )}
    </div>
  );
}
