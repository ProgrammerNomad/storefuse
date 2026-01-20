/**
 * @storefuse/core
 * 
 * StoreFuse Framework Core
 * Runtime framework core with config, types, and utilities
 * 
 * Architecture: Following README.md specification
 */

// ============================================
// TYPES (From README - All core types)
// ============================================
export type {
  // Product types
  Product,
  ProductImage,
  ProductAttribute,
  ProductListParams,
  
  // Category types
  Category,
  CategoryImage,
  Tag,
  
  // Cart types
  Cart,
  CartItem,
  CartAddItem,
  
  // Search types
  SearchResult,
  
  // Blog types
  Post,
  Author,
  
  // Checkout types
  CheckoutPayload,
  
  // Pagination
  PaginationMeta,
} from "./types";

// ============================================
// ADAPTER (From README - Adapter System)
// ============================================
export type {
  StoreFuseAdapter,
  AdapterConfig,
} from "./adapter";

// ============================================
// MODULE SYSTEM (From README - Module System)
// ============================================
export type {
  StoreFuseModule,
  StoreFuseContext,
  StoreFuseRequestContext,
  ModuleCompatibility,
} from "./module-system";

// ============================================
// CONFIG (From README - Config System)
// ============================================
export type {
  StoreFuseConfig,
} from "./config";

export {
  defineStoreFuseConfig,
  validateConfig,
  loadConfig,
} from "./config";

// ============================================
// THEME ENGINE (From README - Theme System)
// ============================================
export type {
  ThemeKey,
  ThemeRegistry,
  ThemeConfig,
} from "./theme-engine";

export {
  resolveThemeComponent,
} from "./theme-engine";

// ============================================
// CACHE (From README - Caching Helpers)
// ============================================
export type {
  CacheConfig,
} from "./cache";

export {
  getRevalidateTime,
  createFetchOptions,
} from "./cache";

// ============================================
// EVENTS (From README - Event Bus)
// ============================================
export {
  EventBus,
  CoreEvents,
} from "./events";

// ============================================
// VERSION
// ============================================
export const VERSION = "0.0.1";
