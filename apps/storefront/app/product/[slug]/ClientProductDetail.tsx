"use client";

import { ProductDetailPage as ProductDetailPageComponent } from "@storefuse/module-products";
import type { Product } from "@storefuse/core";

interface ClientProductDetailProps {
  product: Product;
}

export default function ClientProductDetail({ product }: ClientProductDetailProps) {
  return <ProductDetailPageComponent product={product} />;
}
