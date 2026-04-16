"use client";

import { useThemeComponent } from "@storefuse/core";
import type { Product, Category } from "@storefuse/core";

interface ClientCategoryPageProps {
  category: Category;
  products: Product[];
}

export default function ClientCategoryPage({ category, products }: ClientCategoryPageProps) {
  const CategoryPage = useThemeComponent("CategoryPage");

  if (!CategoryPage) return null;
  return <CategoryPage category={category} products={products} />;
}
