"use client";

import type { Product } from "@storefuse/core";
import ProductImage from "./ProductImage";
import Price from "./Price";
import AddToCartButton from "./AddToCartButton";

export interface ProductDetailPageProps {
  product: Product;
}

/**
 * ProductDetailPage Component - Core Theme
 * 
 * Single product detail page with full product information.
 * Can be overridden in child themes for custom layouts.
 */
export default function ProductDetailPage({
  product,
}: ProductDetailPageProps) {
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

          <AddToCartButton
            product={product}
            size="lg"
            className="w-full md:w-auto"
          />

          {/* Categories */}
          {product.categories && product.categories.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="text-sm font-medium mb-2">Categories:</h3>
              <div className="flex flex-wrap gap-2">
                {product.categories.map((category) => (
                  <a
                    key={category.id}
                    href={`/category/${category.slug}`}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    {category.name}
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Description */}
          {product.description && (
            <div className="mt-8 pt-8 border-t">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
