"use client";

import { CategoryPage as CategoryPageComponent } from "@storefuse/module-products";
import type { Product, Category } from "@storefuse/core";

interface ClientCategoryPageProps {
  category: Category;
  products: Product[];
}

export default function ClientCategoryPage({ category, products }: ClientCategoryPageProps) {
  return <CategoryPageComponent category={category} products={products} />;
}
