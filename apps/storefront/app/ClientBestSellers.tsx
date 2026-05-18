"use client";

import { useThemeComponent } from "@storefuse/core";
import type { Product } from "@storefuse/core";

interface ClientBestSellersProps {
  products: Product[];
}

/**
 * Renders the best-sellers product grid via the theme engine.
 * Override "ProductGrid" or "ProductCard" in your child theme to customise
 * this section without touching any core files.
 */
export default function ClientBestSellers({ products }: ClientBestSellersProps) {
  const ProductGrid = useThemeComponent("ProductGrid");

  if (!ProductGrid) return null;

  return <ProductGrid products={products} columns={4} />;
}
