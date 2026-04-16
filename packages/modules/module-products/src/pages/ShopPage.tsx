import type { Product } from "@storefuse/core";
import { ProductGrid } from "@storefuse/theme-core";

export interface ShopPageProps {
  products: Product[];
}

/**
 * ShopPage
 *
 * Main shop page — data shell. Renders using theme-core UI components.
 * UI can be overridden by child themes via the theme engine.
 */
export default function ShopPage({ products }: ShopPageProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shop</h1>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          Showing {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      <ProductGrid products={products} columns={4} />
    </div>
  );
}
