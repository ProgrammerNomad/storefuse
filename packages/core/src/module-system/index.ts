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
    [route: string]: () => Promise<ComponentType<any> | { default: ComponentType<any> }>;
  };

  /**
   * Components contributed by this module
   */
  components?: {
    [key: string]: () => Promise<ComponentType<any> | { default: ComponentType<any> }>;
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

/**
 * Module Registry
 * 
 * Central registry for all loaded modules
 */
export class ModuleRegistry {
  private modules = new Map<string, StoreFuseModule>();
  private pages = new Map<string, () => Promise<ComponentType<any> | { default: ComponentType<any> }>>();
  private components = new Map<string, () => Promise<ComponentType<any> | { default: ComponentType<any> }>>();

  /**
   * Register a module
   */
  register(module: StoreFuseModule): void {
    if (this.modules.has(module.name)) {
      console.warn(`Module "${module.name}" is already registered`);
      return;
    }

    this.modules.set(module.name, module);

    // Register pages
    if (module.pages) {
      for (const [route, loader] of Object.entries(module.pages)) {
        this.pages.set(route, loader);
      }
    }

    // Register components
    if (module.components) {
      for (const [key, loader] of Object.entries(module.components)) {
        this.components.set(key, loader);
      }
    }
  }

  /**
   * Get a module by name
   */
  getModule(name: string): StoreFuseModule | undefined {
    return this.modules.get(name);
  }

  /**
   * Get all registered modules
   */
  getAllModules(): StoreFuseModule[] {
    return Array.from(this.modules.values());
  }

  /**
   * Get page loader by route
   */
  getPage(route: string): (() => Promise<ComponentType<any> | { default: ComponentType<any> }>) | undefined {
    return this.pages.get(route);
  }

  /**
   * Get component loader by key
   */
  getComponent(key: string): (() => Promise<ComponentType<any> | { default: ComponentType<any> }>) | undefined {
    return this.components.get(key);
  }

  /**
   * Check if a module is registered
   */
  hasModule(name: string): boolean {
    return this.modules.has(name);
  }

  /**
   * Get all registered page routes
   */
  getPageRoutes(): string[] {
    return Array.from(this.pages.keys());
  }
}

/**
 * Module Loader
 * 
 * Loads modules in dependency order and initializes them
 */
export class ModuleLoader {
  private registry = new ModuleRegistry();
  private context: StoreFuseContext;

  constructor(context: StoreFuseContext) {
    this.context = context;
    this.context.modules = new Map();
  }

  /**
   * Load modules in dependency order
   */
  async loadModules(moduleNames: string[]): Promise<void> {
    // Resolve module dependencies and get load order
    const loadOrder = this.resolveDependencies(moduleNames);

    // Load each module
    for (const moduleName of loadOrder) {
      await this.loadModule(moduleName);
    }
  }

  /**
   * Load a single module
   */
  private async loadModule(moduleName: string): Promise<void> {
    try {
      // Dynamic import of the module
      const modulePackage = await import(`@storefuse/module-${moduleName}`);
      const module: StoreFuseModule = modulePackage.default || modulePackage;

      // Register the module
      this.registry.register(module);
      this.context.modules.set(module.name, module);

      // Call onInit hook
      if (module.hooks?.onInit) {
        module.hooks.onInit(this.context);
      }

      console.log(`✓ Module loaded: ${module.name}`);
    } catch (error) {
      console.error(`✗ Failed to load module: ${moduleName}`, error);
      throw error;
    }
  }

  /**
   * Resolve module dependencies and return load order
   * 
   * Uses topological sort to handle dependencies
   */
  private resolveDependencies(moduleNames: string[]): string[] {
    const visited = new Set<string>();
    const visiting = new Set<string>();
    const loadOrder: string[] = [];

    const visit = (name: string) => {
      if (visited.has(name)) return;
      
      if (visiting.has(name)) {
        throw new Error(`Circular dependency detected: ${name}`);
      }

      visiting.add(name);

      // For now, we'll just use the order provided
      // In a real implementation, we would:
      // 1. Load module metadata to get dependencies
      // 2. Visit dependencies first
      // 3. Then add this module

      visiting.delete(name);
      visited.add(name);
      loadOrder.push(name);
    };

    for (const name of moduleNames) {
      visit(name);
    }

    return loadOrder;
  }

  /**
   * Get the module registry
   */
  getRegistry(): ModuleRegistry {
    return this.registry;
  }
}

/**
 * Get page component from module registry
 * 
 * Usage in Next.js routes:
 * const Page = await getPage("product/[slug]");
 */
export async function getPage(
  route: string,
  registry: ModuleRegistry
): Promise<ComponentType<any>> {
  const loader = registry.getPage(route);

  if (!loader) {
    throw new Error(`Page not found for route: ${route}`);
  }

  const mod = await loader();
  return (mod as any).default || mod;
}

/**
 * Get component from module registry
 */
export async function getComponent(
  key: string,
  registry: ModuleRegistry
): Promise<ComponentType<any>> {
  const loader = registry.getComponent(key);

  if (!loader) {
    throw new Error(`Component not found: ${key}`);
  }

  const mod = await loader();
  return (mod as any).default || mod;
}
