"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { storefuseEvents, CoreEvents } from "@storefuse/core";
import type { CartItem, CartState, CartActions, CartContextValue } from "./types";

const CartContext = createContext<CartContextValue | undefined>(undefined);

const CART_STORAGE_KEY = "storefuse_cart";

/**
 * Calculate cart totals
 */
function calculateTotals(items: CartItem[]): Pick<CartState, "itemCount" | "subtotal"> {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  
  const subtotalNum = items.reduce((sum, item) => {
    const price = parseFloat(item.product.price.replace(/[^0-9.]/g, ""));
    return sum + price * item.quantity;
  }, 0);
  
  return {
    itemCount,
    subtotal: `$${subtotalNum.toFixed(2)}`,
  };
}

/**
 * Load cart from localStorage
 */
function loadCartFromStorage(): CartItem[] {
  if (typeof window === "undefined") return [];
  
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Failed to load cart from storage:", error);
    return [];
  }
}

/**
 * Save cart to localStorage
 */
function saveCartToStorage(items: CartItem[]): void {
  if (typeof window === "undefined") return;
  
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch (error) {
    console.error("Failed to save cart to storage:", error);
  }
}

/**
 * CartProvider Component
 * 
 * Provides cart state management with localStorage persistence.
 * This is the ONLY component in module-cart - UI components live in theme-core.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    setItems(loadCartFromStorage());
    setIsHydrated(true);
  }, []);

  // Save to localStorage whenever items change (after hydration)
  useEffect(() => {
    if (isHydrated) {
      saveCartToStorage(items);
    }
  }, [items, isHydrated]);

  const addToCart: CartActions["addToCart"] = (product, quantity = 1) => {
    storefuseEvents.emit(CoreEvents.CART_BEFORE_ADD, { product, quantity });
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      const nextItems = existingItem
        ? prevItems.map((item) =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        : [...prevItems, { product, quantity }];

      storefuseEvents.emit(CoreEvents.CART_AFTER_ADD, { product, quantity, items: nextItems });
      return nextItems;
    });
  };

  const removeFromCart: CartActions["removeFromCart"] = (productId) => {
    const removing = items.find((i) => i.product.id === productId);
    storefuseEvents.emit(CoreEvents.CART_BEFORE_REMOVE, { productId, item: removing });
    setItems((prevItems) => {
      const nextItems = prevItems.filter((item) => item.product.id !== productId);
      storefuseEvents.emit(CoreEvents.CART_AFTER_REMOVE, { productId, items: nextItems });
      return nextItems;
    });
  };

  const updateQuantity: CartActions["updateQuantity"] = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart: CartActions["clearCart"] = () => {
    setItems([]);
    storefuseEvents.emit(CoreEvents.CART_CLEARED, {});
  };

  const { itemCount, subtotal } = calculateTotals(items);

  const value: CartContextValue = {
    items,
    itemCount,
    subtotal,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * useCart Hook
 * 
 * Access cart state and actions from any component.
 * Must be used within a CartProvider.
 */
export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  
  return context;
}
