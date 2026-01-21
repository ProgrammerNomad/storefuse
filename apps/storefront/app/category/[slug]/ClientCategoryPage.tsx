"use client";

import { CategoryPage } from "@storefuse/theme-core";
import type { Product, Category } from "@storefuse/core";

interface ClientCategoryPageProps {
  category: Category;
  products: Product[];
}

export default function ClientCategoryPage({ category, products }: ClientCategoryPageProps) {
  const handleAddToCart = (product: Product) => {
    console.log("Add to cart:", product);
    // TODO: Integrate with cart module when available
  };

  return <CategoryPage category={category} products={products} onAddToCart={handleAddToCart} />;
}
