/**
 * StoreFuse Module System
 * 
 * From README: "StoreFuse modules are like plugins"
 */

import type { ComponentType } from "react";

/**
 * StoreFuse Module Interface (From README Architecture Spec)
 */
export interface StoreFuseModule {
  /**
   * Module unique name
   */
  name: string;

  /**
   * Dependencies on other modules
   */
  dependsOn?: string[];

  /**
   * Pages contributed by this module
   */
  pages?: {
    [route: string]: () => Promise<ComponentType<any>>;
  };

  /**
   * Components contributed by this module
   */
  components?: {
    [key: string]: () => Promise<ComponentType<any>>;
  };

  /**
   * Lifecycle hooks
   */
  hooks?: {
    onInit?: (ctx: StoreFuseContext) => void;
    onRequest?: (ctx: StoreFuseRequestContext) => void;
  };

  /**
   * Module settings
   */
  settings?: Record<string, any>;
}

/**
 * Module Context
 */
export interface StoreFuseContext {
  config: any;
  adapter: any;
  modules: Map<string, StoreFuseModule>;
}

/**
 * Request Context
 */
export interface StoreFuseRequestContext extends StoreFuseContext {
  request: Request;
  params?: Record<string, string>;
}

/**
 * Module Compatibility
 */
export interface ModuleCompatibility {
  core: string; // semver range
}
