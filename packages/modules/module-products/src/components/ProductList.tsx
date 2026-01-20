import type { Product } from "@storefuse/core";
import ProductCard from "./ProductCard";

export interface ProductListProps {
  products: Product[];
  onAddToCart?: (product: Product) => void;
  className?: string;
}

/**
 * ProductList Component
 * 
 * Displays products in a vertical list layout.
 */
export default function ProductList({
  products,
  onAddToCart,
  className = "",
}: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="p-8 text-center bg-gray-50 rounded-lg">
        <p className="text-gray-600">No products found</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
}
