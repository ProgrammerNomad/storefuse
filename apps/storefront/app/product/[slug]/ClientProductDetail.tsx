"use client";

import { ProductDetailPage } from "@storefuse/theme-core";
import type { Product } from "@storefuse/core";

interface ClientProductDetailProps {
  product: Product;
}

export default function ClientProductDetail({ product }: ClientProductDetailProps) {
  const handleAddToCart = (product: Product) => {
    console.log("Add to cart:", product);
    // TODO: Integrate with cart module when available
  };

  return <ProductDetailPage product={product} onAddToCart={handleAddToCart} />;
}
