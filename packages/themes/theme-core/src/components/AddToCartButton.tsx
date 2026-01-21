"use client";

import type { Product } from "@storefuse/core";
import { useCart } from "@storefuse/module-cart";
import Button from "./Button";

export interface AddToCartButtonProps {
  product: Product;
  quantity?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
}

/**
 * AddToCartButton Component - Core Theme
 * 
 * Button that adds a product to cart using module-cart hooks.
 * Can be overridden in child themes.
 */
export default function AddToCartButton({
  product,
  quantity = 1,
  className = "",
  size = "md",
  disabled = false,
}: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const isInStock = product.stockStatus === "instock";

  const handleClick = () => {
    if (isInStock && !disabled) {
      addToCart(product, quantity);
    }
  };

  if (!isInStock) {
    return (
      <Button
        variant="secondary"
        size={size}
        disabled
        className={className}
      >
        Out of Stock
      </Button>
    );
  }

  return (
    <Button
      variant="primary"
      size={size}
      onClick={handleClick}
      disabled={disabled}
      className={className}
    >
      Add to Cart
    </Button>
  );
}
