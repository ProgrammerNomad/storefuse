/**
 * StoreFuse Child Theme Template
 * 
 * This is a template for creating custom child themes.
 * Override only the components you want to customize.
 * 
 * From README: "Child theme = User override (safe across core updates)"
 */

/**
 * Child Theme Component Registry
 * 
 * Add your custom components here to override core theme components.
 * Only include components you want to customize - all others will
 * automatically fall back to the core theme.
 * 
 * Example:
 * 
 * export const childThemeRegistry = {
 *   Header: () => import("./components/Header"),
 *   Footer: () => import("./components/Footer"),
 *   ProductCard: () => import("./components/ProductCard"),
 * };
 */

export const childThemeRegistry = {
  // Add your component overrides here
  // Example:
  // Header: () => import("./components/Header"),
};

/**
 * Type export for TypeScript support
 */
export type ChildThemeRegistry = typeof childThemeRegistry;
