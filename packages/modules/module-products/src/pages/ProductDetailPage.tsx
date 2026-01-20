import type { Product } from "@storefuse/core";
import ProductImage from "../components/ProductImage";
import Price from "../components/Price";

export interface ProductDetailPageProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

/**
 * ProductDetailPage
 * 
 * Single product detail page with full product information.
 * This is a module page contribution per README spec.
 */
export default function ProductDetailPage({
  product,
  onAddToCart,
}: ProductDetailPageProps) {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const isInStock = product.stockStatus === "instock";

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="grid md:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <ProductImage
            product={product}
            width={600}
            height={800}
            priority
            className="w-full rounded-lg"
          />
          
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4 mt-4">
              {product.images.slice(1, 5).map((image, index) => (
                <img
                  key={index}
                  src={image.src}
                  alt={image.alt || `${product.name} ${index + 2}`}
                  className="w-full h-24 object-cover rounded border hover:border-gray-400 cursor-pointer"
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-4xl font-bold mb-4">{product.name}</h1>

          <div className="mb-6">
            <Price
              price={product.price}
              regularPrice={product.regularPrice}
              className="text-2xl"
            />
          </div>

          {product.shortDescription && (
            <div
              className="text-gray-700 mb-6"
              dangerouslySetInnerHTML={{ __html: product.shortDescription }}
            />
          )}

          <div className="mb-6">
            {isInStock ? (
              <p className="text-green-600 font-medium">In Stock</p>
            ) : (
              <p className="text-red-600 font-medium">Out of Stock</p>
            )}
          </div>

          {isInStock ? (
            <button
              onClick={handleAddToCart}
              className="w-full md:w-auto bg-black text-white py-3 px-8 rounded text-lg hover:bg-gray-800 transition"
            >
              Add to Cart
            </button>
          ) : (
            <button
              disabled
              className="w-full md:w-auto bg-gray-300 text-gray-500 py-3 px-8 rounded text-lg cursor-not-allowed"
            >
              Out of Stock
            </button>
          )}

          {/* Categories */}
          {product.categories && product.categories.length > 0 && (
            <div className="mt-8">
              <h3 className="font-semibold mb-2">Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 text-sm"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <div className="mt-6">
              <h3 className="font-semibold mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 bg-blue-50 text-blue-700 rounded text-sm"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Full Description */}
      {product.description && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Description</h2>
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}
    </div>
  );
}
