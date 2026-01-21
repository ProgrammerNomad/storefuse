"use client";

import type { Product, Category } from "@storefuse/core";
import ProductGrid from "./ProductGrid";

export interface CategoryPageProps {
  category: Category;
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

/**
 * CategoryPage Component - Core Theme
 * 
 * Category page displaying filtered products.
 * Can be overridden in child themes for custom layouts.
 */
export default function CategoryPage({
  category,
  products,
  onAddToCart,
}: CategoryPageProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{category.name}</h1>
        {category.description && (
          <div
            className="text-gray-700"
            dangerouslySetInnerHTML={{ __html: category.description }}
          />
        )}
      </div>

      <div className="mb-6 flex items-center justify-between">
        <p className="text-gray-600">
          {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
      </div>

      <ProductGrid products={products} onAddToCart={onAddToCart} columns={4} />
    </div>
  );
}
