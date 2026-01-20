/**
 * @storefuse/adapter-woo-rest
 * 
 * WooCommerce REST API Adapter
 * Implements StoreFuseAdapter interface for WooCommerce REST API
 * 
 * Architecture: Following README.md Commerce Adapter System spec
 */

import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api";
import type {
  StoreFuseAdapter,
  Product,
  ProductListParams,
  Category,
  AdapterConfig,
} from "@storefuse/core";

/**
 * WooCommerce REST API Adapter Configuration
 */
export interface WooRestAdapterConfig extends AdapterConfig {
  name: "woo-rest";
  endpoint: string;
  keys: {
    consumerKey: string;
    consumerSecret: string;
  };
  version?: "wc/v3" | "wc/v2" | "wc/v1";
}

/**
 * WooCommerce REST API Adapter
 * 
 * From README: "REST Adapter: Implements products/categories easily"
 */
export class WooRestAdapter implements StoreFuseAdapter {
  private api: WooCommerceRestApi;

  constructor(config: WooRestAdapterConfig) {
    // Initialize WooCommerce REST API client
    this.api = new WooCommerceRestApi({
      url: config.endpoint,
      consumerKey: config.keys.consumerKey,
      consumerSecret: config.keys.consumerSecret,
      version: config.version || "wc/v3",
    });
  }

  /**
   * Products API
   * From README Adapter Contract
   */
  products = {
    /**
     * List products with filters and pagination
     */
    list: async (params: ProductListParams = {}): Promise<Product[]> => {
      try {
        const queryParams: Record<string, any> = {
          page: params.page || 1,
          per_page: params.perPage || 10,
        };

        // Add optional filters
        if (params.category) queryParams.category = params.category;
        if (params.tag) queryParams.tag = params.tag;
        if (params.search) queryParams.search = params.search;
        if (params.orderby) queryParams.orderby = params.orderby;
        if (params.order) queryParams.order = params.order;
        if (params.onSale !== undefined) queryParams.on_sale = params.onSale;
        if (params.featured !== undefined) queryParams.featured = params.featured;

        const response = await this.api.get("products", queryParams);
        
        return this.mapWooProductsToStoreFuse(response.data);
      } catch (error) {
        throw this.handleError(error, "Failed to list products");
      }
    },

    /**
     * Get product by ID
     */
    getById: async (id: string): Promise<Product> => {
      try {
        const response = await this.api.get(`products/${id}`);
        return this.mapWooProductToStoreFuse(response.data);
      } catch (error) {
        throw this.handleError(error, `Failed to get product ${id}`);
      }
    },

    /**
     * Get product by slug
     */
    getBySlug: async (slug: string): Promise<Product | null> => {
      try {
        const response = await this.api.get("products", { slug });
        
        if (!response.data || response.data.length === 0) {
          return null;
        }

        return this.mapWooProductToStoreFuse(response.data[0]);
      } catch (error) {
        throw this.handleError(error, `Failed to get product by slug: ${slug}`);
      }
    },
  };

  /**
   * Categories API
   * From README Adapter Contract
   */
  categories = {
    /**
     * List all categories
     */
    list: async (): Promise<Category[]> => {
      try {
        const response = await this.api.get("products/categories", {
          per_page: 100, // Get all categories
        });

        return this.mapWooCategoriesToStoreFuse(response.data);
      } catch (error) {
        throw this.handleError(error, "Failed to list categories");
      }
    },

    /**
     * Get category by slug
     */
    getBySlug: async (slug: string): Promise<Category | null> => {
      try {
        const response = await this.api.get("products/categories", { slug });

        if (!response.data || response.data.length === 0) {
          return null;
        }

        return this.mapWooCategoryToStoreFuse(response.data[0]);
      } catch (error) {
        throw this.handleError(error, `Failed to get category by slug: ${slug}`);
      }
    },
  };

  /**
   * Search API (optional)
   * Simple product search implementation
   */
  search = {
    query: async (q: string): Promise<any[]> => {
      try {
        const response = await this.api.get("products", {
          search: q,
          per_page: 20,
        });

        return response.data.map((product: any) => ({
          id: product.id.toString(),
          type: "product" as const,
          title: product.name,
          excerpt: product.short_description,
          url: product.permalink,
          image: product.images[0]?.src,
          price: product.price,
        }));
      } catch (error) {
        throw this.handleError(error, `Failed to search for: ${q}`);
      }
    },
  };

  // ============================================
  // MAPPING FUNCTIONS (WooCommerce → StoreFuse)
  // ============================================

  /**
   * Map WooCommerce product to StoreFuse Product type
   */
  private mapWooProductToStoreFuse(wooProduct: any): Product {
    return {
      id: wooProduct.id.toString(),
      slug: wooProduct.slug,
      name: wooProduct.name,
      description: wooProduct.description,
      shortDescription: wooProduct.short_description,
      price: wooProduct.price,
      regularPrice: wooProduct.regular_price,
      salePrice: wooProduct.sale_price,
      onSale: wooProduct.on_sale,
      images: wooProduct.images.map((img: any) => ({
        id: img.id.toString(),
        src: img.src,
        alt: img.alt,
        name: img.name,
      })),
      categories: wooProduct.categories.map((cat: any) => ({
        id: cat.id.toString(),
        slug: cat.slug,
        name: cat.name,
      })),
      tags: wooProduct.tags?.map((tag: any) => ({
        id: tag.id.toString(),
        slug: tag.slug,
        name: tag.name,
      })),
      stockStatus: wooProduct.stock_status,
      stockQuantity: wooProduct.stock_quantity,
      sku: wooProduct.sku,
      weight: wooProduct.weight,
      dimensions: wooProduct.dimensions
        ? {
            length: wooProduct.dimensions.length,
            width: wooProduct.dimensions.width,
            height: wooProduct.dimensions.height,
          }
        : undefined,
      attributes: wooProduct.attributes?.map((attr: any) => ({
        id: attr.id,
        name: attr.name,
        option: attr.option,
      })),
      variations: wooProduct.variations?.map((v: any) => v.toString()),
      averageRating: parseFloat(wooProduct.average_rating) || undefined,
      ratingCount: wooProduct.rating_count || undefined,
      permalink: wooProduct.permalink,
      dateCreated: wooProduct.date_created,
      dateModified: wooProduct.date_modified,
    };
  }

  /**
   * Map array of WooCommerce products
   */
  private mapWooProductsToStoreFuse(wooProducts: any[]): Product[] {
    return wooProducts.map((p) => this.mapWooProductToStoreFuse(p));
  }

  /**
   * Map WooCommerce category to StoreFuse Category type
   */
  private mapWooCategoryToStoreFuse(wooCategory: any): Category {
    return {
      id: wooCategory.id.toString(),
      slug: wooCategory.slug,
      name: wooCategory.name,
      description: wooCategory.description,
      image: wooCategory.image
        ? {
            id: wooCategory.image.id?.toString(),
            src: wooCategory.image.src,
            alt: wooCategory.image.alt,
          }
        : undefined,
      parent: wooCategory.parent ? wooCategory.parent.toString() : undefined,
      count: wooCategory.count,
      permalink: wooCategory.permalink || undefined,
    };
  }

  /**
   * Map array of WooCommerce categories
   */
  private mapWooCategoriesToStoreFuse(wooCategories: any[]): Category[] {
    return wooCategories.map((c) => this.mapWooCategoryToStoreFuse(c));
  }

  // ============================================
  // ERROR HANDLING
  // ============================================

  /**
   * Handle API errors
   */
  private handleError(error: any, message: string): Error {
    if (error.response) {
      // WooCommerce API error
      const status = error.response.status;
      const data = error.response.data;

      return new Error(
        `${message}: [${status}] ${data.message || JSON.stringify(data)}`
      );
    }

    if (error.request) {
      // Network error
      return new Error(`${message}: Network error - ${error.message}`);
    }

    // Other errors
    return new Error(`${message}: ${error.message}`);
  }
}

/**
 * Create WooCommerce REST adapter instance
 * 
 * Usage:
 * ```ts
 * const adapter = createWooRestAdapter({
 *   name: "woo-rest",
 *   endpoint: process.env.WOO_URL!,
 *   keys: {
 *     consumerKey: process.env.WOO_KEY!,
 *     consumerSecret: process.env.WOO_SECRET!,
 *   }
 * });
 * ```
 */
export function createWooRestAdapter(
  config: WooRestAdapterConfig
): WooRestAdapter {
  return new WooRestAdapter(config);
}
