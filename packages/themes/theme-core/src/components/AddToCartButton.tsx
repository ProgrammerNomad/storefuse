"use client";

import { useState } from "react";
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
  const [isAdding, setIsAdding] = useState(false);
  const isInStock = product.stockStatus === "instock";

  const handleClick = async () => {
    if (isInStock && !disabled && !isAdding) {
      setIsAdding(true);
      addToCart(product, quantity);
      
      setTimeout(() => {
        setIsAdding(false);
      }, 1000);
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
      disabled={disabled || isAdding}
      className={className}
    >
      {isAdding ? "Added!" : "Add to Cart"}
    </Button>
  );
}
