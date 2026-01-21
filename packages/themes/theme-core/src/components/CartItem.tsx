"use client";

import type { CartItem as CartItemType } from "@storefuse/module-cart";
import { useCart } from "@storefuse/module-cart";
import ProductImage from "./ProductImage";
import Price from "./Price";

export interface CartItemProps {
  item: CartItemType;
  className?: string;
}

/**
 * CartItem Component - Core Theme
 * 
 * Displays a single cart item with quantity controls.
 * Can be overridden in child themes.
 */
export default function CartItem({ item, className = "" }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    } else {
      removeFromCart(product.id);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  const itemTotal = () => {
    const price = parseFloat(product.price.replace(/[^0-9.]/g, ""));
    return `$${(price * quantity).toFixed(2)}`;
  };

  return (
    <div className={`flex gap-4 py-4 border-b ${className}`}>
      <a href={`/product/${product.slug}`} className="flex-shrink-0">
        <ProductImage
          product={product}
          width={80}
          height={80}
          className="w-20 h-20 object-cover rounded"
        />
      </a>

      <div className="flex-1">
        <a
          href={`/product/${product.slug}`}
          className="font-medium hover:text-gray-600"
        >
          {product.name}
        </a>
        
        <div className="mt-1">
          <Price price={product.price} regularPrice={product.regularPrice} />
        </div>

        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleDecrease}
            className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
            aria-label="Decrease quantity"
          >
            −
          </button>
          
          <span className="w-12 text-center font-medium">{quantity}</span>
          
          <button
            onClick={handleIncrease}
            className="w-8 h-8 border rounded flex items-center justify-center hover:bg-gray-100"
            aria-label="Increase quantity"
          >
            +
          </button>

          <button
            onClick={handleRemove}
            className="ml-4 text-sm text-red-600 hover:text-red-800"
          >
            Remove
          </button>
        </div>
      </div>

      <div className="text-right font-semibold">{itemTotal()}</div>
    </div>
  );
}
