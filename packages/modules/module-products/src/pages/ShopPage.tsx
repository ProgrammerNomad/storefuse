import type { Product } from "@storefuse/core";
import ProductGrid from "../components/ProductGrid";

export interface ShopPageProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

/**
 * ShopPage
 * 
 * Main shop page displaying all products in a grid.
 * This is a module page contribution per README spec.
 */
export default function ShopPage({ products, onAddToCart }: ShopPageProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shop</h1>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          Showing {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      <ProductGrid products={products} onAddToCart={onAddToCart} columns={4} />
    </div>
  );
}
