/**
 * StoreFuse Core Types
 * 
 * All type definitions according to README Architecture Spec
 */

// ============================================
// PRODUCT TYPES (From README - Adapter Contract)
// ============================================

export interface Product {
  id: string;
  slug: string;
  name: string;
  description?: string;
  shortDescription?: string;
  price: string;
  regularPrice?: string;
  salePrice?: string;
  onSale: boolean;
  images: ProductImage[];
  categories: Category[];
  tags?: Tag[];
  stockStatus: "instock" | "outofstock" | "onbackorder";
  stockQuantity?: number;
  sku?: string;
  weight?: string;
  dimensions?: {
    length: string;
    width: string;
    height: string;
  };
  attributes?: ProductAttribute[];
  variations?: string[];
  averageRating?: number;
  ratingCount?: number;
  permalink?: string;
  dateCreated?: string;
  dateModified?: string;
}

export interface ProductImage {
  id: string;
  src: string;
  alt?: string;
  name?: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  option: string;
}

// ============================================
// CATEGORY TYPES
// ============================================

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: CategoryImage;
  parent?: string;
  count?: number;
  permalink?: string;
}

export interface CategoryImage {
  id: string;
  src: string;
  alt?: string;
}

export interface Tag {
  id: string;
  slug: string;
  name: string;
  description?: string;
  count?: number;
}

// ============================================
// CART TYPES (From README - Adapter Contract)
// ============================================

export interface Cart {
  items: CartItem[];
  subtotal: string;
  total: string;
  totalTax?: string;
  shipping?: string;
  currency: string;
  itemCount: number;
}

export interface CartItem {
  key: string;
  productId: string;
  variationId?: string;
  quantity: number;
  name: string;
  price: string;
  subtotal: string;
  total: string;
  image?: string;
  sku?: string;
}

export interface CartAddItem {
  productId: string;
  variationId?: string;
  quantity: number;
}

// ============================================
// SEARCH TYPES (From README - Adapter Contract)
// ============================================

export interface SearchResult {
  id: string;
  type: "product" | "category" | "post";
  title: string;
  excerpt?: string;
  url: string;
  image?: string;
  price?: string;
}

// ============================================
// BLOG TYPES (From README - Adapter Contract)
// ============================================

export interface Post {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt?: string;
  author?: Author;
  featuredImage?: string;
  categories?: Category[];
  tags?: Tag[];
  datePublished: string;
  dateModified?: string;
  permalink?: string;
}

export interface Author {
  id: string;
  name: string;
  avatar?: string;
  bio?: string;
}

// ============================================
// CHECKOUT TYPES (From README - Adapter Contract)
// ============================================

export interface CheckoutPayload {
  items: CartItem[];
  customerInfo?: {
    email?: string;
    firstName?: string;
    lastName?: string;
  };
}

// ============================================
// PAGINATION TYPES
// ============================================

export interface ProductListParams {
  page?: number;
  perPage?: number;
  category?: string;
  tag?: string;
  search?: string;
  orderby?: "date" | "title" | "price" | "popularity" | "rating";
  order?: "asc" | "desc";
  onSale?: boolean;
  featured?: boolean;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  perPage: number;
}
