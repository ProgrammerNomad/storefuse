"use client";

import { CategoryPage } from "@storefuse/theme-core";
import type { Product, Category } from "@storefuse/core";

interface ClientCategoryPageProps {
  category: Category;
  products: Product[];
}

export default function ClientCategoryPage({ category, products }: ClientCategoryPageProps) {
  return <CategoryPage category={category} products={products} />;
}
