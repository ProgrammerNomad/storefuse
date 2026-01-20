# StoreFuse

Complete Architecture Spec — WooCommerce + Next.js Modular Framework (Tailwind v4)

## Overview

StoreFuse is an open-source modular storefront framework that uses WooCommerce as the backend (CMS + commerce engine) and Next.js as the frontend (fast UI + SEO + modern DX).

### Core Promises

- **Modular**: Add/remove features like plugins (cart, search, blog...)
- **Updatable Core**: Update StoreFuse without breaking user customization
- **Child Theme Overrides**: User changes persist across updates
- **Adapter-Based**: REST or GraphQL backend support
- **Production-Ready**: Deploy to Vercel/VPS
- **Modern UI Base**: Tailwind CSS v4 in the official theme package

---

## What StoreFuse Is

StoreFuse is not a single "starter repo". It's a framework + CLI + modules + themes.

### StoreFuse Provides

- `@storefuse/core` → Runtime framework core
- `@storefuse/cli` → Create and manage storefront projects
- **Adapters**:
  - `@storefuse/adapter-woo-rest`
  - `@storefuse/adapter-woo-graphql`
- **Modules**: `@storefuse/module-*` (cart, search, etc.)
- **Themes**:
  - `@storefuse/theme-core` (Tailwind v4 + default UI)
  - `@storefuse/theme-child-template` (safe user overrides)

### User Experience

```bash
npx storefuse init my-store
cd my-store
npm run dev
```

---

## System Architecture

### Layer A — Backend (User Already Has)

- WordPress
- WooCommerce
- Optional plugins:
  - WPGraphQL
  - WooGraphQL
  - JWT Auth plugin (if account module used)

### Layer B — StoreFuse Core (Framework)

Responsible for:
- Config loading
- Module loading
- Theme override resolution
- Unified commerce API
- Caching helpers
- Event bus

### Layer C — Modules (Feature Plugins)

Each module can contribute:
- Routes/pages
- Server actions/data loaders
- Components
- Hooks/events
- Settings
- Translations


**Styling Rule:**
StoreFuse Core is UI-agnostic, but `theme-core` uses Tailwind v4 for modern customization and speed.
### Layer D — Themes (Core + Child)

- `theme-core` = Official UI (updatable)
- `theme-child` = User override (safe across core updates)

---

## Repository Layout

Monorepo structure using pnpm workspaces + turborepo:

```
storefuse/
  apps/
    storefront/
      app/
      public/
      storefuse.config.ts
      next.config.ts
      package.json

  packages/
    core/
      src/
        config/
        adapter/
        module-system/
        theme-engine/
        cache/
        events/
        types/
      package.json

    cli/
      src/
      package.json

    adapters/
      adapter-woo-rest/
      adapter-woo-graphql/

    modules/
      module-products/
      module-cart/
      module-checkout-redirect/
      module-search/
      module-seo/
      module-blog/
      module-account/

    themes/
      theme-core/               # Tailwind v4 official theme
      theme-child-template/     # safe overrides

  docs/
    README.md
    getting-started.md
    modules.md
    themes.md
    adapters.md
```

---

## Configuration

### StoreFuse Config Spec

The storefront app must have one config file: `storefuse.config.ts`

```typescript
import { defineStoreFuseConfig } from "@storefuse/core";

export default defineStoreFuseConfig({
  adapter: {
    name: "woo-rest", // or "woo-graphql"
    endpoint: process.env.WOO_URL!,
    keys: {
      consumerKey: process.env.WOO_KEY!,
      consumerSecret: process.env.WOO_SECRET!,
    },
  },

  modules: [
    "products",
    "cart",
    "checkout-redirect",
    "search",
    "seo",
  ],

  theme: {
    core: "@storefuse/theme-core",
    child: "./theme-child",
  },

  cache: {
    strategy: "next-fetch",
    revalidate: {
      product: 600,
      category: 1800,
      home: 300,
    },
  },
});
```

### Configuration Rules

- Modules order is resolved by dependency graph
- No module = no feature
- Minimal env vars for MVP

---

## Commerce Adapter System

Modules never talk directly to REST/GraphQL. They talk to a single API interface:

```typescript
const api = useStoreFuseAPI();
const products = await api.products.list({ page: 1 });
```

### Adapter Contract

```typescript
export interface StoreFuseAdapter {
  products: {
    list(params: ProductListParams): Promise<Product[]>;
    getById(id: string): Promise<Product>;
    getBySlug(slug: string): Promise<Product | null>;
  };

  categories: {
    list(): Promise<Category[]>;
    getBySlug(slug: string): Promise<Category | null>;
  };

  search?: {
    query(q: string): Promise<SearchResult[]>;
  };

  cart?: {
    get(): Promise<Cart>;
    add(item: CartAddItem): Promise<Cart>;
    update(itemId: string, qty: number): Promise<Cart>;
    remove(itemId: string): Promise<Cart>;
    clear(): Promise<Cart>;
  };

  checkout?: {
    getCheckoutUrl(payload: CheckoutPayload): Promise<string>;
  };

  blog?: {
    listPosts(params: any): Promise<Post[]>;
    getPostBySlug(slug: string): Promise<Post | null>;
  };
}
```

### AdaptersFewer requests + structured data (better headless DX)

- **REST Adapter**: Implements products/categories easily
- **GraphQL Adapter**: Provides fewer requests + structured data

---

## Module System

StoreFuse modules are like plugins — the main USP of StoreFuse.

### Module Interface

```typescript
export type StoreFuseModule = {
  name: string;
  dependsOn?: string[];

  pages?: {
    [route: string]: () => Promise<React.ComponentType>;
  };

  components?: {
    [key: string]: () => Promise<React.ComponentType>;
  };

  hooks?: {
    onInit?: (ctx: StoreFuseContext) => void;
    onRequest?: (ctx: StoreFuseRequestContext) => void;
  };

  settings?: Record<string, any>;
};
```

### Module Loader Behavior

1. Reads enabled modules from config
2. Builds dependency order
3. Registers:
   - Routes
   - Components
   - Hooks
   - Settings defaults

### Module Naming Convention

- `module-products`
- `module-cart`
- `module-checkout-redirect`
- `module-search`
- `module-blog`
- `module-seo`
- `module-account`

---

## Routing Strategy

StoreFuse uses Next.js App Router.

### Minimal Routes (MVP)

```
app/
  layout.tsx
  page.tsx                    → loads HomePage from products module
  shop/page.tsx
  product/[slug]/page.tsx
  category/[slug]/page.tsx
  cart/page.tsx
  search/page.tsx
```

### Route Implementation

Each route renders a module page component:

```typescript
import { getPage } from "@storefuse/core";

export default async function ProductPage({ params }: any) {
  const Page = await getPage("product/[slug]");
  return <Page slug={params.slug} />;
}
```

---

## Theme Engine (Tailwind v4 Official Theme)

The theme engine keeps user changes safe during updates.

### Theme Component Keys

Core theme defines stable component keys:

- Header
- Footer
- ProductCard
- AddToCartButton
- CartDrawer
- Price
- RatingStars

### Core Theme Exports Registry

```typescript
export const coreThemeRegistry = {
  Header: () => import("./components/Header"),
  Footer: () => import("./components/Footer"),
  ProductCard: () => import("./components/ProductCard"),
};
```

### Child Theme Overrides Registry

```typescript
export const childThemeRegistry = {
  Header: () => import("./components/Header"),
};
```

### Resolver Rule

- If child provides key → use child
- Else → fallback to core

```typescript
export async function resolveThemeComponent(key: ThemeKey) {
  const loader = child[key] ?? core[key];
  const mod = await loader();
  return mod.default;
}
```

### Benefits

- No file merge conflicts
- Core updates safe
- Predictable override pattern
- Works on Vercel

### Tailwind v4 Rule

- `@storefuse/theme-core` uses Tailwind v4
- StoreFuse core has no Tailwind dependency
- A user's child theme can use Tailwind v4, CSS modules, or plain CSS

---

## Data Fetching & Performance

### Default Philosophy

- Server Components for product/category pages
- Caching using Next fetch + revalidate
- Avoid heavy client state except cart

### Recommended Revalidate Defaults

- **Home**: 5 minutes (300s)
- **Category**: 30 minutes (1800s)
- **Product**: 10 minutes (600s)
- **Blog posts**: 1 hour (3600s)

### Search

- Simple search uses Woo search endpoint
- Later module can support Typesense/Algolia

---

## Cart & Checkout

### MVP Strategy (Phase 1 — Recommended)

**Works with all Woo payment gateways**

- Cart UI in Next.js (local storage + state)
- Checkout redirects to Woo checkout page
- Module: `module-checkout-redirect`

#### Flow

1. User adds items in Next.js
2. Clicks checkout
3. StoreFuse generates checkout URL:
   - Either prefilled link
   - Or sends cart to WP endpoint (later)
4. User pays on Woo checkout (gateway compatibility)

#### Benefits

- Best compatibility

- Fastest launch
- Minimal bug risk

### Phase 2 (Optional Future)

Full headless checkout:
- Shipping calculation
- Payment provider modules
- Order creation API

This is hard, keep it optional.

---

## Optional WordPress Plugin

After MVP, you can ship: `storefuse-wp-plugin`

### Purpose

- Expose "StoreFuse Layout Builder" endpoint
- Menus API
- Checkout session helpers
- Webhooks to trigger Next revalidation

**Note**: Do NOT depend on it for first release.

---

## StoreFuse CLI

CLI makes StoreFuse feel like a real framework.

### Commands

```bash
npx storefuse init my-store
npx storefuse add module cart
npx storefuse add module search
npx storefuse add theme child
npx storefuse connect woo
npx storefuse doctor
```

### What `init` Does

1. Creates Next.js app
2. Installs core + default modules
3. Creates `storefuse.config.ts`
4. Adds `.env.example`
5. Prints backend checklist

### What `doctor` Does

1. Checks env vars
2. Checks Woo API connection
3. Checks required WP plugins (if adapter is GraphQL)

---

## Versioning & Stability Rules

To make child themes survive updates:

### Stable Component Contracts

Core must NOT randomly change props. Version carefully:

- `@storefuse/theme-core` follows semver
- Breaking props = major bump

### Module Compatibility

Modules declare core compatibility:

```typescript
compat: { core: "^0.2.0" }
```

---

## MVP Release Plan

### StoreFuse v0.1 (Public Release)

- Products module
- Category module
- Product page
- Theme override system
- Checkout redirect module
- Docs + Vercel deployment guide

### StoreFuse v0.2

- Cart drawer
- Basic search
- SEO module (meta + sitemap)

### StoreFuse v0.3

- Blog module
- Account module (login/orders)

---

## Official Package Naming

### NPM Packages

**Core:**
- `@storefuse/core`
- `@storefuse/cli`

**Adapters:**
- `@storefuse/adapter-woo-rest`
- `@storefuse/adapter-woo-graphql`

**Modules:**
- `@storefuse/module-products`
- `@storefuse/module-cart`
- `@storefuse/module-chec (Tailwind v4)kout-redirect`
- `@storefuse/module-search`
- `@storefuse/module-seo`
- `@storefuse/module-blog`
- `@storefuse/module-account`

**Themes:**
- `@storefuse/theme-core`
- `@storefuse/theme-child-template`

---

## What StoreFuse Should NOT Do

### Avoid These Mistakes

- Don't try to support every Woo plugin on day 1
- Don't build full headless payment flows first
- Don't use filesystem "override magic" that breaks Next build

### Instead

- Use stable registries + module system

---

## Getting Started

1. **Initialize a new project:**
   ```bash
   npx storefuse init my-store
   cd my-store
   ```

2. **Configure your environment:**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your WooCommerce credentials
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser:**
   ```
   http://localhost:3000.
   ```

---

## Contributing

StoreFuse is an open-source project. Contributions are welcome!

### Development Setup

1. Clone the repository
2. Install dependencies: `pnpm install`
3. Build packages: `pnpm build`
4. Run storefront: `pnpm dev`

---

## License

MIT

---

## Support

- Documentation: [docs/](docs/)
- Issues: GitHub Issues
- Discussions: GitHub Discussions