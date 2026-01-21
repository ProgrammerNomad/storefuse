"use client";

import { ProductDetailPage } from "@storefuse/theme-core";
import type { Product } from "@storefuse/core";

interface ClientProductDetailProps {
  product: Product;
}

export default function ClientProductDetail({ product }: ClientProductDetailProps) {
  return <ProductDetailPage product={product} />;
}
