import type { Product } from "@storefuse/core";
import ProductImage from "./ProductImage";
import Price from "./Price";

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  className?: string;
}

/**
 * ProductCard Component
 * 
 * Displays a single product in card format with image, name, price, and actions.
 */
export default function ProductCard({
  product,
  onAddToCart,
  className = "",
}: ProductCardProps) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const isInStock = product.stockStatus === "instock";

  return (
    <div
      className={`border rounded-lg overflow-hidden hover:shadow-lg transition ${className}`}
    >
      <a href={`/product/${product.slug}`} className="block">
        <ProductImage product={product} className="w-full h-64 object-cover" />
      </a>

      <div className="p-4">
        <a
          href={`/product/${product.slug}`}
          className="block hover:text-blue-600"
        >
          <h3 className="font-bold mb-2 line-clamp-2">{product.name}</h3>
        </a>

        {product.shortDescription && (
          <div
            className="text-sm text-gray-600 mb-2 line-clamp-2"
            dangerouslySetInnerHTML={{ __html: product.shortDescription }}
          />
        )}

        <div className="flex items-center justify-between mb-4">
          <Price price={product.price} regularPrice={product.regularPrice} />
        </div>

        {isInStock ? (
          <button
            onClick={handleAddToCart}
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
