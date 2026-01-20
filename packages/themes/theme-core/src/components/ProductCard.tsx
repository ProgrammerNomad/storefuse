import type { Product } from "@storefuse/core";
import Image from "next/image";
import Link from "next/link";

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

/**
 * ProductCard Component - Core Theme
 * 
 * Product card with image, name, price, and add to cart button.
 */
export default function ProductCard({
  product,
  onAddToCart,
  className = "",
}: ProductCardProps) {
  const image = product.images?.[0];
  const isInStock = product.stockStatus === "instock";

  return (
    <div className={`border rounded-lg overflow-hidden hover:shadow-lg transition ${className}`}>
      <Link href={`/product/${product.slug}`}>
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            width={300}
            height={400}
            className="w-full h-64 object-cover"
          />
        ) : (
          <div className="w-full h-64 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">No image</span>
          </div>
        )}
      </Link>

      <div className="p-4">
        <Link href={`/product/${product.slug}`} className="block hover:text-blue-600">
          <h3 className="font-bold mb-2 line-clamp-2">{product.name}</h3>
        </Link>

        <p className="text-lg font-semibold mb-4">{product.price}</p>

        {isInStock ? (
          <button
            onClick={() => onAddToCart?.(product)}
            className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800 transition"
          >
            Add to Cart
          </button>
        ) : (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-2 px-4 rounded cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}
      </div>
    </div>
  );
}
