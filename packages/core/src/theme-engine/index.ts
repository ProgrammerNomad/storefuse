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
  | "Navigation"
  | "Logo"
  | "ProductImage"
  | "ProductGrid"
  | "ProductList"
  | "ProductDetailPage"
  | "CategoryPage"
  | "CartItem"
  | "CartSummary"
  | "CartPage"
  | "Button"
  | "Input"
  | "Badge"
  | "Container"
  | "Grid"
  | "Section"
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

/**
 * Theme Manager
 * 
 * Manages loading and resolving theme components from core and child themes.
 */
export class ThemeManager {
  private coreRegistry?: ThemeRegistry;
  private childRegistry?: ThemeRegistry;

  constructor(
    private coreThemePath?: string,
    private childThemePath?: string
  ) {}

  /**
   * Load theme registries
   */
  async loadThemes(): Promise<void> {
    // Load core theme registry
    if (this.coreThemePath) {
      try {
        const coreModule = await import(this.coreThemePath);
        this.coreRegistry = coreModule.coreThemeRegistry;
      } catch (error) {
        console.warn(`Failed to load core theme: ${this.coreThemePath}`, error);
      }
    }

    // Load child theme registry (optional)
    if (this.childThemePath) {
      try {
        const childModule = await import(this.childThemePath);
        this.childRegistry = childModule.childThemeRegistry;
      } catch (error) {
        console.warn(`Failed to load child theme: ${this.childThemePath}`, error);
      }
    }
  }

  /**
   * Get a theme component by key
   * 
   * Follows README rule: child first, then core
   */
  async getComponent(key: ThemeKey): Promise<ComponentType<any>> {
    if (!this.coreRegistry && !this.childRegistry) {
      await this.loadThemes();
    }

    return resolveThemeComponent(key, this.childRegistry, this.coreRegistry);
  }

  /**
   * Check if a component exists in child or core theme
   */
  hasComponent(key: ThemeKey): boolean {
    return !!(this.childRegistry?.[key] || this.coreRegistry?.[key]);
  }

  /**
   * Get all available component keys
   */
  getAvailableKeys(): ThemeKey[] {
    const coreKeys = this.coreRegistry ? Object.keys(this.coreRegistry) : [];
    const childKeys = this.childRegistry ? Object.keys(this.childRegistry) : [];
    return Array.from(new Set([...coreKeys, ...childKeys]));
  }
}

/**
 * Create a theme manager instance
 */
export function createThemeManager(
  coreThemePath?: string,
  childThemePath?: string
): ThemeManager {
  return new ThemeManager(coreThemePath, childThemePath);
}
