/**
 * StoreFuse Adapter Interface
 * 
 * From README: "Modules never talk directly to REST/GraphQL.
 * They talk to a single API interface"
 */

import type {
  Product,
  ProductListParams,
  Category,
  SearchResult,
  Cart,
  CartAddItem,
  CheckoutPayload,
  Post,
} from "../types";

/**
 * StoreFuse Adapter Interface (From README Architecture Spec)
 * 
 * All adapters (REST, GraphQL) must implement this interface
 */
export interface StoreFuseAdapter {
  /**
   * Products API
   */
  products: {
    list(params: ProductListParams): Promise<Product[]>;
    getById(id: string): Promise<Product>;
    getBySlug(slug: string): Promise<Product | null>;
  };

  /**
   * Categories API
   */
  categories: {
    list(): Promise<Category[]>;
    getBySlug(slug: string): Promise<Category | null>;
  };

  /**
   * Search API (optional)
   */
  search?: {
    query(q: string): Promise<SearchResult[]>;
  };

  /**
   * Cart API (optional)
   */
  cart?: {
    get(): Promise<Cart>;
    add(item: CartAddItem): Promise<Cart>;
    update(itemId: string, qty: number): Promise<Cart>;
    remove(itemId: string): Promise<Cart>;
    clear(): Promise<Cart>;
  };

  /**
   * Checkout API (optional)
   */
  checkout?: {
    getCheckoutUrl(payload: CheckoutPayload): Promise<string>;
  };

  /**
   * Blog API (optional)
   */
  blog?: {
    listPosts(params: any): Promise<Post[]>;
    getPostBySlug(slug: string): Promise<Post | null>;
  };
}

/**
 * Adapter Configuration
 */
export interface AdapterConfig {
  name: string;
  endpoint: string;
  keys?: {
    consumerKey?: string;
    consumerSecret?: string;
  };
  options?: Record<string, any>;
}
