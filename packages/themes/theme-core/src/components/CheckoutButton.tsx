"use client";

import { useCart } from "@storefuse/module-cart";
import { redirectToCheckout, type CheckoutRedirectOptions } from "@storefuse/module-checkout-redirect";
import Button from "./Button";

export interface CheckoutButtonProps {
  storeUrl: string;
  className?: string;
  children?: React.ReactNode;
}

export default function CheckoutButton({ 
  storeUrl, 
  className = "",
  children = "Proceed to Checkout"
}: CheckoutButtonProps) {
  const { items } = useCart();

  const handleCheckout = () => {
    if (items.length === 0) return;
    
    // Convert cart items to the format expected by checkout redirect
    const checkoutItems: CheckoutRedirectOptions["items"] = items.map(item => ({
      key: `${item.product.id}-${item.quantity}`,
      productId: item.product.id,
      variationId: undefined,
      quantity: item.quantity,
      name: item.product.name,
      price: item.product.price,
      subtotal: item.product.price,
      total: item.product.price,
      image: item.product.images[0]?.src,
      sku: item.product.sku,
    }));

    redirectToCheckout({
      storeUrl,
      items: checkoutItems,
    });
  };

  return (
    <Button
      variant="primary"
      size="lg"
      className={`w-full ${className}`}
      onClick={handleCheckout}
      disabled={items.length === 0}
    >
      {children}
    </Button>
  );
}
