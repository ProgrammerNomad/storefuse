export interface SearchOptions {
  query: string;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

export interface SearchResult {
  id: number;
  name: string;
  slug: string;
  price: number;
  regularPrice: number;
  salePrice: number | null;
  image: string | null;
  inStock: boolean;
  categories: string[];
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
}
