"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ComponentType,
  type ReactNode,
} from "react";
import type { ThemeRegistry, ThemeKey } from "./index";

// ─── Types ────────────────────────────────────────────────────────────────────

/**
 * The merged registry exposed through context.
 * Values are already-loaded components (not lazy loaders).
 */
type ResolvedRegistry = Partial<Record<ThemeKey, ComponentType<any>>>;

interface ThemeContextValue {
  registry: ResolvedRegistry;
  /**
   * Synchronously return a resolved component, or null if not yet loaded.
   * Use `useThemeComponent` for the full async-resolved version.
   */
  get(key: ThemeKey): ComponentType<any> | null;
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ThemeContext = createContext<ThemeContextValue>({
  registry: {},
  get: () => null,
});

// ─── Provider ─────────────────────────────────────────────────────────────────

export interface ThemeProviderProps {
  /** Registry from @storefuse/theme-core */
  core: ThemeRegistry;
  /** Registry from the active child theme (optional) */
  child?: Partial<ThemeRegistry>;
  children: ReactNode;
}

/**
 * ThemeProvider
 *
 * Merges the core and child registries so that:
 *   - child component wins when key exists in both
 *   - core component is used as fallback
 *
 * Lazy-loads all components on mount so they are ready synchronously
 * for any descendant that calls useThemeComponent().
 */
export function ThemeProvider({ core, child, children }: ThemeProviderProps) {
  const [registry, setRegistry] = useState<ResolvedRegistry>({});

  useEffect(() => {
    // Merge: child keys override core keys (child wins), strip undefined values
    const raw = { ...core, ...(child ?? {}) };
    const merged = Object.fromEntries(
      Object.entries(raw).filter((entry): entry is [ThemeKey, () => Promise<{ default: ComponentType<any> }>] =>
        typeof entry[1] === "function"
      )
    ) as ThemeRegistry;

    // Load all components in parallel
    const entries = Object.entries(merged) as [
      ThemeKey,
      () => Promise<{ default: ComponentType<any> }>
    ][];

    Promise.all(
      entries.map(async ([key, loader]) => {
        const mod = await loader();
        return [key, mod.default] as [ThemeKey, ComponentType<any>];
      })
    ).then((resolved) => {
      setRegistry(Object.fromEntries(resolved));
    });
  }, [core, child]);

  const contextValue: ThemeContextValue = {
    registry,
    get(key) {
      return registry[key] ?? null;
    },
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

/**
 * useThemeComponent
 *
 * Returns the resolved component for a given theme key.
 * Child theme overrides core theme — fallback is null while loading.
 *
 * @example
 * const Header = useThemeComponent("Header");
 * return Header ? <Header siteName="My Store" /> : null;
 */
export function useThemeComponent<P = any>(
  key: ThemeKey
): ComponentType<P> | null {
  const { get } = useContext(ThemeContext);
  return get(key) as ComponentType<P> | null;
}

// ─── Server-side helper ───────────────────────────────────────────────────────

/**
 * getThemeComponent
 *
 * Server-safe async resolver. Use this in Next.js Server Components
 * where React hooks are unavailable.
 *
 * Child wins over core. Throws if the key is not found in either registry.
 *
 * @example
 * const Header = await getThemeComponent("Header", coreRegistry, childRegistry);
 * return <Header siteName="My Store" />;
 */
export async function getThemeComponent<P = any>(
  key: ThemeKey,
  core: ThemeRegistry,
  child?: Partial<ThemeRegistry>
): Promise<ComponentType<P>> {
  const loader = child?.[key] ?? core[key];

  if (!loader) {
    throw new Error(
      `[StoreFuse] Theme component "${key}" not found in core or child theme.`
    );
  }

  const mod = await loader();
  return mod.default as ComponentType<P>;
}
