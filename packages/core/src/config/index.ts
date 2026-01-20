/**
 * StoreFuse Configuration System
 * 
 * From README: "The storefront app must have one config file: storefuse.config.ts"
 */

import type { AdapterConfig } from "../adapter";

/**
 * StoreFuse Configuration Type (From README Architecture Spec)
 */
export interface StoreFuseConfig {
  /**
   * Adapter configuration (REST or GraphQL)
   */
  adapter: AdapterConfig;

  /**
   * Enabled modules
   */
  modules: string[];

  /**
   * Theme configuration
   */
  theme: {
    core: string;
    child?: string;
  };

  /**
   * Cache configuration
   */
  cache?: {
    strategy: "next-fetch" | "custom";
    revalidate?: {
      product?: number;
      category?: number;
      home?: number;
      [key: string]: number | undefined;
    };
  };

  /**
   * Custom options
   */
  options?: Record<string, any>;
}

/**
 * Define StoreFuse Config Helper (From README Example)
 * 
 * Usage:
 * ```ts
 * import { defineStoreFuseConfig } from "@storefuse/core";
 * 
 * export default defineStoreFuseConfig({
 *   adapter: { ... },
 *   modules: [...],
 *   theme: { ... }
 * });
 * ```
 */
export function defineStoreFuseConfig(config: StoreFuseConfig): StoreFuseConfig {
  return config;
}

/**
 * Config Validation
 */
export function validateConfig(config: StoreFuseConfig): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Validate adapter
  if (!config.adapter) {
    errors.push("Adapter configuration is required");
  } else {
    if (!config.adapter.name) {
      errors.push("Adapter name is required");
    }
    if (!config.adapter.endpoint) {
      errors.push("Adapter endpoint is required");
    }
  }

  // Validate modules
  if (!Array.isArray(config.modules)) {
    errors.push("Modules must be an array");
  }

  // Validate theme
  if (!config.theme || !config.theme.core) {
    errors.push("Theme core configuration is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Load and validate config
 */
export async function loadConfig(
  configPath: string
): Promise<StoreFuseConfig> {
  try {
    const config = await import(configPath);
    const loadedConfig = config.default || config;

    const validation = validateConfig(loadedConfig);
    if (!validation.valid) {
      throw new Error(
        `Invalid config:\n${validation.errors.join("\n")}`
      );
    }

    return loadedConfig;
  } catch (error) {
    throw new Error(`Failed to load config: ${error}`);
  }
}
