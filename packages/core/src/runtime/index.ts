/**
 * StoreFuse Runtime Factory
 *
 * createStoreFuseApp() reads storefuse.config.ts and returns
 * the merged theme registry and loaded modules so layout.tsx
 * doesn't need to know about individual packages.
 *
 * Usage in layout.tsx (Server Component):
 *
 *   import config from "@/storefuse.config";
 *   import { createStoreFuseApp } from "@storefuse/core/runtime";
 *
 *   const { coreRegistry, childRegistry } = await createStoreFuseApp(config);
 *
 *   return (
 *     <ThemeProvider core={coreRegistry} child={childRegistry}>
 *       ...
 *     </ThemeProvider>
 *   );
 */

import type { StoreFuseConfig } from "../config";
import type { ThemeRegistry } from "../theme-engine";

export interface StoreFuseApp {
  /** Core theme registry */
  coreRegistry: ThemeRegistry;
  /** Child theme registry (empty if none configured) */
  childRegistry: Partial<ThemeRegistry>;
  /** Resolved config */
  config: StoreFuseConfig;
}

/**
 * createStoreFuseApp
 *
 * Reads the StoreFuse config and dynamically imports the core and child
 * theme registries. This is the single call that wires config → runtime.
 *
 * Note: Dynamic imports in Next.js work best when the import path is
 * a package name (resolved via node_modules) or an alias. Relative
 * `config.theme.child` paths are resolved from the project root.
 */
export async function createStoreFuseApp(
  config: StoreFuseConfig
): Promise<StoreFuseApp> {
  // Load core theme registry
  let coreRegistry: ThemeRegistry;
  try {
    const coreMod = await import(/* webpackIgnore: true */ config.theme.core as any);
    coreRegistry = coreMod.coreThemeRegistry ?? coreMod.default?.coreThemeRegistry;

    if (!coreRegistry) {
      throw new Error(
        `[StoreFuse] Core theme "${config.theme.core}" does not export "coreThemeRegistry".`
      );
    }
  } catch (err) {
    throw new Error(
      `[StoreFuse] Failed to load core theme "${config.theme.core}": ${err}`
    );
  }

  // Load child theme registry (optional)
  let childRegistry: Partial<ThemeRegistry> = {};
  if (config.theme.child) {
    try {
      const childMod = await import(/* webpackIgnore: true */ config.theme.child as any);
      childRegistry =
        childMod.childThemeRegistry ?? childMod.default?.childThemeRegistry ?? {};
    } catch (err) {
      console.warn(
        `[StoreFuse] Could not load child theme "${config.theme.child}". Falling back to core theme. Error:`,
        err
      );
    }
  }

  return { coreRegistry, childRegistry, config };
}
