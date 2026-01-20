/**
 * StoreFuse Theme Engine
 * 
 * From README: "The theme engine keeps user changes safe during updates"
 */

import type { ComponentType } from "react";

/**
 * Theme Component Key
 */
export type ThemeKey =
  | "Header"
  | "Footer"
  | "ProductCard"
  | "AddToCartButton"
  | "CartDrawer"
  | "Price"
  | "RatingStars"
  | string;

/**
 * Theme Component Registry
 */
export type ThemeRegistry = Record<
  ThemeKey,
  () => Promise<{ default: ComponentType<any> }>
>;

/**
 * Resolve Theme Component (From README)
 * 
 * Rule: If child provides key → use child, Else → fallback to core
 */
export async function resolveThemeComponent(
  key: ThemeKey,
  child?: ThemeRegistry,
  core?: ThemeRegistry
): Promise<ComponentType<any>> {
  const loader = child?.[key] ?? core?.[key];

  if (!loader) {
    throw new Error(`Theme component "${key}" not found in core or child theme`);
  }

  const mod = await loader();
  return mod.default;
}

/**
 * Theme Configuration
 */
export interface ThemeConfig {
  core: string;
  child?: string;
}
