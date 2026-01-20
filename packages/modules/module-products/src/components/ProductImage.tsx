import Image from "next/image";
import type { Product } from "@storefuse/core";

export interface ProductImageProps {
  product: Product;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

/**
 * ProductImage Component
 * 
 * Displays optimized product image using Next.js Image.
 */
export default function ProductImage({
  product,
  className = "",
  width = 300,
  height = 400,
  priority = false,
}: ProductImageProps) {
  const image = product.images?.[0];

  if (!image) {
    return (
      <div
        className={`bg-gray-200 flex items-center justify-center ${className}`}
        style={{ width, height }}
      >
        <span className="text-gray-400 text-sm">No image</span>
      </div>
    );
  }

  return (
    <Image
      src={image.src}
      alt={image.alt || product.name}
      width={width}
      height={height}
      className={className}
      priority={priority}
    />
  );
}
