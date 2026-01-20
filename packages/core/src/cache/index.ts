/**
 * StoreFuse Cache Utilities
 * 
 * From README: "Caching using Next fetch + revalidate"
 */

/**
 * Cache Configuration
 */
export interface CacheConfig {
  strategy: "next-fetch" | "custom";
  revalidate?: {
    product?: number;
    category?: number;
    home?: number;
    [key: string]: number | undefined;
  };
}

/**
 * Get revalidation time for a resource type
 */
export function getRevalidateTime(
  type: string,
  config?: CacheConfig
): number | undefined {
  if (!config?.revalidate) {
    return undefined;
  }

  return config.revalidate[type];
}

/**
 * Create fetch options with caching
 */
export function createFetchOptions(
  type: string,
  config?: CacheConfig
): RequestInit & { next?: { revalidate?: number } } {
  const revalidate = getRevalidateTime(type, config);

  if (revalidate) {
    return {
      next: {
        revalidate,
      },
    };
  }

  return {};
}
