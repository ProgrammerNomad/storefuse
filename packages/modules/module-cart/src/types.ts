import type { Product } from "@storefuse/core";

/**
 * Cart Item Type
 * 
 * Represents a product in the cart with quantity.
 */
export interface CartItem {
  product: Product;
  quantity: number;
}

/**
 * Cart State Type
 * 
 * The complete cart state managed by the CartContext.
 */
export interface CartState {
  items: CartItem[];
  itemCount: number;
  subtotal: string;
}

/**
 * Cart Actions Type
 * 
 * All actions available for cart state management.
 */
export interface CartActions {
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

/**
 * Cart Context Value Type
 * 
 * Combined cart state and actions.
 */
export type CartContextValue = CartState & CartActions;
