"use client";

import { useThemeComponent } from "@storefuse/core";
import type { Product } from "@storefuse/core";

interface ClientProductDetailProps {
  product: Product;
}

export default function ClientProductDetail({ product }: ClientProductDetailProps) {
  const ProductDetailPage = useThemeComponent("ProductDetailPage");

  if (!ProductDetailPage) return null;
  return <ProductDetailPage product={product} />;
}
