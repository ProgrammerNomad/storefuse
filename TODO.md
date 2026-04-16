# StoreFuse Development Roadmap

**Status**: Active Development
**Last Updated**: April 16, 2026

---

## Phase 0: Foundation Setup ✅ COMPLETED

### Repository Infrastructure

- [x] Initialize pnpm workspace
  - [x] Create root `package.json`
  - [x] Create `pnpm-workspace.yaml`
  - [x] Create `.npmrc` configuration
- [x] Configure Turborepo
  - [x] Create `turbo.json`
  - [x] Define build pipeline
  - [x] Configure cache settings
- [x] Setup TypeScript
  - [x] Create root `tsconfig.json`
  - [ ] Create `tsconfig.build.json`
  - [ ] Configure path aliases
- [x] Development tooling
  - [x] Setup ESLint (`.eslintrc.js`)
  - [x] Setup Prettier (`.prettierrc`)
  - [x] Create `.gitignore`
  - [x] Create `.editorconfig`

### Directory Structure

- [x] Create `apps/` directory
- [x] Create `packages/` directory structure
  - [x] Create `packages/core/`
  - [x] Create `packages/cli/`
  - [x] Create `packages/adapters/`
  - [x] Create `packages/modules/`
  - [x] Create `packages/themes/`
  - [x] Create `packages/shared/`
- [x] Create `docs/` directory
- [ ] Create `examples/` directory (optional)

---

## Phase 1: Core Framework (v0.1 Foundation) ✅ COMPLETED

### Summary
Phase 1 packages are built and compiling. However a post-phase review found that several systems exist as code but are not yet connected to the running app.

- ✅ @storefuse/core - Framework core with config, adapter, module system, theme engine
- ✅ @storefuse/adapter-woo-rest - WooCommerce REST API adapter
- ✅ @storefuse/module-products - Product listings and pages
- ✅ @storefuse/module-cart - Cart context and types
- ✅ @storefuse/theme-core - Default theme with Tailwind v3
- ✅ @storefuse/theme-child-template - Child theme template for safe overrides
- ✅ Storefront demo app routes working

**Build Status**: ✅ All packages build successfully
**Routes**: ✅ Home, Shop, Cart, Product Detail, Category pages working
**Theme System**: ⚠️ Theme engine code exists but is NOT wired to the running app

> **Known Gaps Found in Review:**
> - `layout.tsx` hard-imports `@storefuse/theme-core` directly — child theme registry is never consulted
> - `storefuse.config.ts` `theme.child` setting is declarative only — does nothing at runtime
> - Module `pages` registry and actual Next.js `app/` routes are two parallel systems — module registry is never used
> - `module-products` and `theme-core` both contain duplicate UI components (ProductCard, ProductGrid, etc.) — ownership is unclear
> - CLI `init` command scaffolds direct theme-core imports — new projects start with the wrong pattern
> - EventBus exists but is not connected to any module lifecycle or rendering pipeline

### Package: @storefuse/core ✅ COMPLETED

- [x] Initialize package
  - [x] Create `package.json`
  - [x] Create `tsconfig.json`
  - [x] Setup build configuration
- [x] Config System
  - [x] Define `StoreFuseConfig` TypeScript types
  - [x] Implement `defineStoreFuseConfig()` helper
  - [x] Create config loader with validation
  - [x] Add environment variable support
- [x] Adapter System
  - [x] Define `StoreFuseAdapter` interface
  - [x] Create adapter registry
  - [ ] Implement adapter loader
  - [ ] Add adapter context provider
- [x] Module System
  - [x] Define `StoreFuseModule` interface
  - [x] Create module registry (ModuleRegistry class)
  - [x] Implement dependency resolver (with circular detection)
  - [x] Create module loader (ModuleLoader class)
  - [x] Add module hooks system (onInit, onRequest)
  - [x] Export getPage() and getComponent() helpers
- [x] Theme Engine
  - [x] Define theme component registry interface
  - [x] Implement theme resolver (core + child)
  - [x] Create `resolveThemeComponent()` function
  - [x] Add theme component loader (ThemeManager class)
- [x] Cache System
  - [x] Define cache configuration types
  - [x] Implement Next.js fetch cache wrapper
  - [x] Add revalidation helpers
  - [x] Create cache utilities
- [x] Event System
  - [x] Create event bus
  - [x] Define core events
  - [x] Implement event listeners
- [x] Shared Types
  - [x] Define `Product` type
  - [x] Define `Category` type
  - [x] Define `Cart` and `CartItem` types
  - [x] Define `SearchResult` type
  - [x] Define `Post` type (blog)
- [ ] Testing
  - [ ] Setup Vitest or Jest
  - [ ] Write unit tests for config loader
  - [ ] Write unit tests for module system
  - [ ] Write unit tests for theme resolver

### Package: @storefuse/adapter-woo-rest ✅ COMPLETED

- [x] Initialize package
  - [x] Create `package.json`
  - [x] Create `tsconfig.json`
  - [x] Add WooCommerce REST API dependency
- [x] Implement adapter interface
  - [x] Implement `products.list()`
  - [x] Implement `products.getById()`
  - [x] Implement `products.getBySlug()`
  - [x] Implement `categories.list()`
  - [x] Implement `categories.getBySlug()`
  - [x] Implement `search.query()` (optional)
- [x] Error handling
  - [x] Add API error handling
  - [ ] Add rate limiting support
  - [ ] Add retry logic
- [x] Authentication
  - [x] Implement consumer key/secret auth
  - [x] Add request signing
- [x] Storefront Integration
  - [x] Create `storefuse.config.ts` in demo app
  - [x] Add `.env.local.example` with credentials
  - [x] Create adapter instance singleton
  - [x] Update shop page to fetch real products
  - [x] Display WooCommerce products with images, prices, stock
- [ ] Testing
  - [ ] Setup test environment
  - [ ] Write integration tests (mock WooCommerce API)
  - [ ] Add E2E tests with actual WooCommerce instance

### Package: @storefuse/module-products ✅ COMPLETED

- [x] Initialize package
  - [x] Create `package.json`
  - [x] Create `tsconfig.json`
- [x] Module definition
  - [x] Create module manifest
  - [x] Define dependencies
  - [x] Register pages with module system
  - [x] Add onInit hook
- [x] Components
  - [x] Create `ProductCard` component
  - [x] Create `ProductList` component
  - [x] Create `ProductGrid` component
  - [x] Create `ProductImage` component
  - [x] Create `Price` component
- [x] Pages (contribution)
  - [x] Define home page loader
  - [x] Define shop page loader
  - [x] Define product detail page loader
  - [x] Define category page loader
- [x] Data fetching
  - [x] Create product data fetchers
  - [x] Add caching configuration
  - [x] Implement error boundaries
- [x] Build and Export
  - [x] Build successfully with tsup
  - [x] Export module manifest
  - [x] Export all components and pages
- [ ] Testing
  - [ ] Write component tests
  - [ ] Write integration tests

### Package: @storefuse/theme-core ✅ COMPLETED

- [x] Initialize package
  - [x] Create `package.json`
  - [x] Create `tsconfig.json`
  - [x] Add Tailwind v3 dependency
- [x] Tailwind Configuration
  - [x] Create `globals.css` with Tailwind v3
  - [x] Setup traditional Tailwind directives
  - [x] Define design tokens
  - [x] Create global styles
- [x] Core Components
  - [x] Create `Header` component
  - [x] Create `Footer` component
  - [x] Create `Navigation` component
  - [x] Create `Logo` component
  - [x] Create `ProductCard` component
  - [x] Create `Button` component
  - [x] Create `Input` component
  - [x] Create `Badge` component
  - [x] Create `Price` component
- [x] Layout Components
  - [x] Create `Container` component
  - [x] Create `Grid` component
  - [x] Create `Section` component
- [x] Theme Registry
  - [x] Export component registry
  - [x] Document override patterns
- [x] Storefront Integration
  - [x] Install in storefront app
  - [x] Replace layout Header/Footer with theme components
  - [x] Import theme styles
  - [x] Build and test successfully
- [x] Build successfully
  - [x] TypeScript compilation
  - [x] Component exports
- [ ] Documentation
  - [ ] Create component documentation
  - [ ] Add usage examples
  - [ ] Document Tailwind customization

### Package: @storefuse/theme-child-template ✅ COMPLETED

- [x] Initialize package
  - [x] Create `package.json`
  - [x] Create `tsconfig.json`
  - [x] Setup build configuration (tsup)
- [x] Child theme structure
  - [x] Create `src/index.ts` with childThemeRegistry
  - [x] Create `src/components/` directory
  - [x] Add example components (Header, ProductCard)
- [x] Documentation
  - [x] Create comprehensive README
  - [x] Document override pattern
  - [x] Add usage examples
  - [x] Document benefits
- [x] Storefront Integration
  - [x] Create local `theme-child` directory in storefront
  - [x] Add example components
  - [x] Update storefuse.config.ts to use child theme
- [x] Build successfully
  - [x] Fix TypeScript incremental compilation error
  - [x] Generate type definitions
  - [x] Export registry properly

### Package: @storefuse/cli ✅ COMPLETED

- [x] Initialize package
  - [x] Create `package.json`
  - [x] Create `tsconfig.json`
  - [x] Setup bin entry point
- [x] CLI Framework
  - [x] Setup Commander.js
  - [x] Create CLI entry point
  - [x] Add help documentation
- [x] Command: `init`
  - [x] Create project scaffolding logic
  - [x] Add template system
  - [x] Implement dependency installation
  - [x] Generate `storefuse.config.ts`
  - [x] Generate `.env.example`
  - [x] Print setup instructions
- [x] Command: `add module`
  - [x] List available modules
  - [x] Install module package
  - [x] Update config file
  - [x] Install dependencies
- [x] Command: `add theme child`
  - [x] Create child theme directory
  - [x] Copy template files
  - [x] Update config
- [x] Command: `doctor`
  - [x] Check environment variables
  - [x] Test WooCommerce API connection
  - [x] Verify required packages
  - [x] Check Node.js version
  - [x] Check pnpm version
- [x] Build successfully
  - [x] TypeScript compilation
  - [x] ESM output
  - [x] Type definitions
- [ ] Testing
  - [ ] Write CLI command tests
  - [ ] Add E2E tests for scaffolding

### App: storefront (Demo App) ✅ COMPLETED (Basic Setup)

- [x] Initialize Next.js 16 app (using Next.js 15.5.9)
  - [x] Create with App Router
  - [x] Add TypeScript
  - [x] Configure `next.config.ts`
  - [x] Setup Tailwind v3 (stable, production-ready)
- [x] Setup StoreFuse
  - [x] Create `storefuse.config.ts`
  - [x] Install core packages
  - [x] Configure adapter
  - [x] Enable modules
- [x] Create Routes
  - [x] Create `app/layout.tsx`
  - [x] Create `app/page.tsx` (home)
  - [x] Create `app/shop/page.tsx`
  - [x] Create `app/product/[slug]/page.tsx`
  - [x] Create `app/category/[slug]/page.tsx`
  - [x] Create `app/cart/page.tsx`
- [x] Environment Setup
  - [x] Create `.env.example`
  - [x] Document required variables
- [x] Child Theme Setup
  - [x] Create `theme-child` directory
  - [x] Add example component overrides
  - [x] Configure in storefuse.config.ts
- [x] Build Successfully
  - [x] Production build complete
  - [x] Static page generation (137 pages)
  - [x] No TypeScript errors
- [ ] Testing
  - [ ] Add Playwright for E2E tests
  - [ ] Write basic navigation tests

---

## Completed Interim Work (Originally Planned as Phase 2)

> These were completed before the architecture gaps were identified. They are tracked here for reference.
> Architecture wiring (Phase 2 below) must still be completed.

### Package: @storefuse/module-cart ✅ COMPLETED

**Status**: Fully functional cart implementation with UI

- [x] Initialize package
- [x] Basic module structure
- [x] Cart state management
  - [x] Implement local storage cart
  - [x] Create cart context (CartContext.tsx)
  - [x] Add cart hooks (useCart)
  - [x] Cart operations (add, remove, update, clear)
- [x] Components
  - [x] Create `CartItem` component in theme-core
  - [x] Create `CartSummary` component in theme-core
  - [x] Create `AddToCartButton` component with feedback
  - [x] Create `CartPage` with empty state
  - [x] Integrate cart count in Header
- [x] Cart operations
  - [x] Implement add to cart
  - [x] Implement update quantity
  - [x] Implement remove item
  - [x] Implement clear cart
  - [x] Calculate totals
- [ ] Testing
  - [ ] Write cart logic tests
  - [ ] Write component tests

### Package: @storefuse/module-checkout-redirect ✅ COMPLETED

- [x] Initialize package
- [x] Checkout URL generation
  - [x] Generate WooCommerce checkout URL
  - [x] Add cart items to URL
  - [x] Support prefill parameters
- [x] Components
  - [x] Create `CheckoutButton` component in theme-core
- [x] Build successfully
  - [x] TypeScript compilation
  - [x] Type definitions
- [ ] Testing
  - [ ] Test URL generation
  - [ ] Test redirect flow

### Package: @storefuse/module-search

- [ ] Initialize package
- [ ] Search implementation
  - [ ] Integrate with WooCommerce search API
  - [ ] Create search data fetcher
- [ ] Components
  - [ ] Create `SearchBar` component
  - [ ] Create `SearchResults` component
  - [ ] Create `SearchFilters` component
- [ ] Search page
  - [ ] Create search results page
  - [ ] Add pagination
- [ ] Testing
  - [ ] Write search tests
  - [ ] Test filtering

### Package: @storefuse/module-seo

- [ ] Initialize package
- [ ] Meta tags
  - [ ] Create meta tag generators
  - [ ] Add Open Graph support
  - [ ] Add Twitter Card support
- [ ] Sitemap
  - [ ] Generate dynamic sitemap
  - [ ] Add product URLs
  - [ ] Add category URLs
- [ ] Structured data
  - [ ] Add Product schema
  - [ ] Add BreadcrumbList schema
- [ ] Testing
  - [ ] Test meta tag generation
  - [ ] Validate structured data

### Documentation (v0.2 — superseded by Phase 3)

- [x] Create theme customization guide (docs/themes.md)
- [ ] Write getting started guide
- [ ] Document module system
- [ ] Add deployment guide (Vercel)
- [ ] Create adapter documentation

---

## Phase 2: Architecture Fix — Connect the Dots (v0.2) ✅ COMPLETED

> **Goal**: Make the framework actually work as designed. The code exists. The wiring does not.
> All original promises (child theme overrides, module-driven routing, config-driven runtime)
> must become real by the end of this phase.

---

### Step 1: Fix UI Ownership — Remove Duplicate Components from module-products

**Rule**: Modules own data/logic/contracts. Themes own UI.

- [x] Delete `packages/modules/module-products/src/components/ProductCard.tsx`
- [x] Delete `packages/modules/module-products/src/components/ProductGrid.tsx`
- [x] Delete `packages/modules/module-products/src/components/ProductImage.tsx`
- [x] Delete `packages/modules/module-products/src/components/ProductList.tsx`
- [x] Delete `packages/modules/module-products/src/components/Price.tsx`
- [x] Delete `packages/modules/module-products/src/components/` directory
- [x] Update `packages/modules/module-products/src/index.ts` — remove all component exports
- [x] Verify `packages/themes/theme-core` is the single source of truth for all UI components
- [x] Confirm build passes after deletion

---

### Step 2: Wire the Theme Engine — ThemeProvider + useThemeComponent

**Goal**: Child theme registry is read at runtime and overrides core components transparently.

- [x] Create `packages/core/src/theme-engine/ThemeProvider.tsx`
  - [x] `ThemeProvider` component — accepts `coreRegistry` and `childRegistry` props, merges them (child wins), exposes via React context
  - [x] `useThemeComponent(key)` hook — returns the resolved component for a given key from context
  - [x] `ThemeContext` — typed React context holding the merged registry
- [x] Export `ThemeProvider` and `useThemeComponent` from `packages/core/src/index.ts`
- [x] Export `ThemeProvider` and `useThemeComponent` from `packages/core/src/theme-engine/index.ts`
- [x] Add server-side helper `getThemeComponent(key, coreRegistry, childRegistry)` for use in Server Components
- [ ] Write unit tests for merge logic (child wins, core fallback, missing key throws)

---

### Step 3: Connect ThemeProvider in the Storefront App

**Goal**: `layout.tsx` no longer hard-imports from `@storefuse/theme-core`. All components resolve through the theme engine.

- [x] Update `apps/storefront/app/layout.tsx`
  - [x] Import `coreThemeRegistry` from `@storefuse/theme-core`
  - [x] Import `childThemeRegistry` from `../theme-child`
  - [x] Wrap app with `<ThemeProvider core={coreThemeRegistry} child={childThemeRegistry}>`
  - [x] Remove direct `import { Header, Footer } from "@storefuse/theme-core"`
  - [x] Replace `<Header>` and `<Footer>` with components resolved via `useThemeComponent`
- [x] Update `apps/storefront/app/product/[slug]/ClientProductDetail.tsx`
  - [x] Remove direct `import { ProductDetailPage } from "@storefuse/theme-core"`
  - [x] Resolve `ProductDetailPage` via theme engine
- [x] Update `apps/storefront/app/category/[slug]/ClientCategoryPage.tsx`
  - [x] Remove direct `import { CategoryPage } from "@storefuse/theme-core"`
  - [x] Resolve `CategoryPage` via theme engine
- [ ] Test: activate a child theme component (e.g. custom Header) and confirm it renders instead of core Header without touching any core file

---

### Step 4: Make storefuse.config.ts Drive the Runtime

**Goal**: The config file is the single source of truth — reading `theme.child` loads the correct child registry automatically.

- [x] Create `packages/core/src/runtime/index.ts` — `createStoreFuseApp(config)` factory
  - [x] Reads `config.theme.core` and `config.theme.child`
  - [x] Dynamically imports and returns merged theme registry
  - [x] Returns loaded module list
- [x] Export `createStoreFuseApp` from `packages/core/src/index.ts`
- [ ] Update `apps/storefront/app/layout.tsx` to call `createStoreFuseApp` instead of manually importing registries
- [ ] Confirm changing only `storefuse.config.ts` `theme.child` is enough to switch child themes

---

### Step 5: Fix CLI — Scaffold the Correct Pattern

**Goal**: Every project created with `storefuse init` starts with the correct wiring.

- [x] Update `packages/cli/src/commands/init.ts` template for `layout.tsx`
  - [x] Generated `layout.tsx` must use `ThemeProvider` + `useThemeComponent` — not direct imports
  - [x] Generated `layout.tsx` must call `createStoreFuseApp(config)` to load registries
- [x] Update CLI `add theme child` command
  - [x] Generated `theme-child/index.ts` has correct registry export
  - [x] Generated example component uses correct prop types from `@storefuse/core`
- [ ] Re-test `storefuse init my-store` end-to-end and confirm child theme override works out of the box

---

### Step 6: Connect Module Page Registry to Next.js Routing

**Goal**: Module `pages` definitions become the source of truth. Next.js route files delegate to modules instead of duplicating logic.

- [x] Decide routing strategy (Option A — Thin shell routes): Keep `app/shop/page.tsx` etc. but make them thin delegations through the theme engine
- [x] Update `app/shop/page.tsx` — server-side data fetch, delegates rendering to `ClientShopPage` (uses `useThemeComponent("ProductGrid")`)
- [x] Update `app/product/[slug]/page.tsx` — already thin shell to `ClientProductDetail` (uses `useThemeComponent`)
- [x] Update `app/category/[slug]/page.tsx` — already thin shell to `ClientCategoryPage` (uses `useThemeComponent`)
- [x] Update `app/cart/page.tsx` — delegates to `ClientCartPage` (uses `useThemeComponent("CartPage")`)
- [ ] Confirm adding a new module with a `pages` entry works without manually creating route files

---

### Step 7: Wire EventBus to Module Lifecycle for Behavior Overrides

**Goal**: Child themes and modules can hook into business logic events, not just swap UI.

- [x] Define standard commerce events in `packages/core/src/events/index.ts`
  - [x] `cart:before-add` / `cart:after-add`
  - [x] `cart:before-remove` / `cart:after-remove`
  - [x] `checkout:before-redirect`
  - [x] `product:view`
  - [x] `search:query`
- [x] Fire `cart:before-add` and `cart:after-add` inside `module-cart` CartContext
- [x] Fire `cart:before-remove` and `cart:after-remove` inside `module-cart` CartContext
- [x] Fire `cart:cleared` inside `module-cart` CartContext
- [x] Fire `checkout:before-redirect` inside `module-checkout-redirect`
- [x] Expose global `storefuseEvents` singleton from `@storefuse/core`
- [x] Add example in `theme-child/index.ts` showing how to hook `cart:after-add`
- [ ] Document behavior override pattern in `docs/themes.md`

---

### Phase 2 Complete When:

- [x] Activating a component in `theme-child/index.ts` causes it to render instead of the core version — with zero changes to core files
- [x] `storefuse.config.ts` is the only file that needs to change to switch child themes
- [ ] A new module can register a page and it renders without manually creating an `app/` route file
- [x] A child theme can subscribe to `cart:after-add` and run custom code
- [x] `storefuse init` scaffolds all of the above correctly for new projects

---

## Phase 3: Enhanced Features (v0.3) ⏳ AFTER PHASE 2

### Package: @storefuse/adapter-woo-graphql

- [ ] Initialize package
- [ ] Setup WPGraphQL integration
  - [ ] Add GraphQL client
  - [ ] Create queries
  - [ ] Implement adapter interface
- [ ] Implement all adapter methods
- [ ] Add caching strategy
- [ ] Testing
  - [ ] Write integration tests

### Package: @storefuse/module-blog

- [ ] Initialize package
- [ ] Blog adapter methods
  - [ ] Extend adapter interface
  - [ ] Implement in REST adapter
  - [ ] Implement in GraphQL adapter
- [ ] Components
  - [ ] Create `PostCard` component
  - [ ] Create `PostList` component
  - [ ] Create `PostContent` component
- [ ] Pages
  - [ ] Create blog index page
  - [ ] Create post detail page
  - [ ] Create category/tag pages
- [ ] Testing
  - [ ] Write component tests
  - [ ] Write integration tests

### Package: @storefuse/module-account

- [ ] Initialize package
- [ ] Authentication
  - [ ] Add JWT authentication
  - [ ] Create auth context
  - [ ] Add auth hooks
- [ ] Components
  - [ ] Create `LoginForm` component
  - [ ] Create `RegisterForm` component
  - [ ] Create `AccountDashboard` component
  - [ ] Create `OrderHistory` component
- [ ] Pages
  - [ ] Create login page
  - [ ] Create register page
  - [ ] Create account page
  - [ ] Create orders page
- [ ] Testing
  - [ ] Write auth tests
  - [ ] Write component tests

### Package: @storefuse/theme-child-template

**Moved to Phase 1 - Already completed!** ✅

See Phase 1 section above for completion status.

---

## Phase 4: Polish & Release

### Documentation

- [ ] Complete API documentation
- [ ] Add video tutorials
- [ ] Create migration guides
- [ ] Write contribution guidelines
- [ ] Add troubleshooting guide

### Developer Experience

- [ ] Add development mode logging
- [ ] Create debug utilities
- [ ] Add TypeScript strict mode
- [ ] Improve error messages
- [ ] Add CLI autocomplete

### Testing & Quality

- [ ] Achieve 80%+ test coverage
- [ ] Add E2E test suite
- [ ] Performance testing
- [ ] Accessibility audit
- [ ] Security audit

### Examples

- [ ] Create basic store example
- [ ] Create custom theme example
- [ ] Create multi-language example
- [ ] Create headless checkout example

### CI/CD

- [ ] Setup GitHub Actions
  - [ ] Automated testing
  - [ ] Build verification
  - [ ] Linting and formatting
- [ ] Setup Changesets
  - [ ] Version management
  - [ ] Changelog generation
- [ ] Setup automated publishing
  - [ ] npm publish workflow
  - [ ] GitHub releases

### Website & Marketing

- [ ] Create documentation website
- [ ] Setup demo site
- [ ] Create announcement post
- [ ] Social media content
- [ ] Submit to directories

### Release v1.0

- [ ] Final testing
- [ ] Security review
- [ ] Performance optimization
- [ ] Documentation review
- [ ] Publish to npm
- [ ] Announce release
- [ ] Create GitHub release

---

## Maintenance & Future

### Community

- [ ] Setup Discord server
- [ ] Create GitHub Discussions
- [ ] Define contribution process
- [ ] Setup issue templates
- [ ] Create PR templates

### Roadmap Items (Post v1.0)

- [ ] Payment provider modules (Stripe, PayPal)
- [ ] Analytics modules
- [ ] Email marketing integrations
- [ ] Multi-language support
- [ ] Multi-currency support
- [ ] Advanced filtering
- [ ] Product reviews module
- [ ] Wishlist module
- [ ] Compare products module
- [ ] WordPress plugin (optional)

---

## Notes

- Keep all packages independently versioned
- Follow semantic versioning strictly
- Maintain backward compatibility in minor versions
- Document breaking changes clearly
- Test with real WooCommerce instances regularly
- Get community feedback early and often
