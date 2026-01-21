# StoreFuse Development Roadmap

**Status**: Planning Phase
**Last Updated**: January 20, 2026

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
Phase 1 is now complete with all core packages built and working:
- ✅ @storefuse/core - Framework core with config, adapter, module system, theme engine
- ✅ @storefuse/adapter-woo-rest - WooCommerce REST API adapter
- ✅ @storefuse/module-products - Product listings and pages
- ✅ @storefuse/module-cart - Cart context and types
- ✅ @storefuse/theme-core - Default theme with Tailwind v3
- ✅ @storefuse/theme-child-template - Child theme template for safe overrides
- ✅ Storefront demo app with 137 static pages generated

**Build Status**: ✅ All packages build successfully
**Routes**: ✅ Home, Shop, Cart, Product Detail, Category pages working
**Theme System**: ✅ Child theme override system fully implemented

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
  - [ ] Create module registry
  - [ ] Implement dependency resolver
  - [ ] Create module loader
  - [ ] Add module hooks system
- [x] Theme Engine
  - [x] Define theme component registry interface
  - [x] Implement theme resolver (core + child)
  - [x] Create `resolveThemeComponent()` function
  - [ ] Add theme component loader
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

### Package: @storefuse/cli

- [ ] Initialize package
  - [ ] Create `package.json`
  - [ ] Create `tsconfig.json`
  - [ ] Setup bin entry point
- [ ] CLI Framework
  - [ ] Setup Commander.js or similar
  - [ ] Create CLI entry point
  - [ ] Add help documentation
- [ ] Command: `init`
  - [ ] Create project scaffolding logic
  - [ ] Add template system
  - [ ] Implement dependency installation
  - [ ] Generate `storefuse.config.ts`
  - [ ] Generate `.env.example`
  - [ ] Print setup instructions
- [ ] Command: `add module`
  - [ ] List available modules
  - [ ] Install module package
  - [ ] Update config file
  - [ ] Install dependencies
- [ ] Command: `add theme child`
  - [ ] Create child theme directory
  - [ ] Copy template files
  - [ ] Update config
- [ ] Command: `connect woo`
  - [ ] Interactive WooCommerce setup
  - [ ] Test API connection
  - [ ] Save credentials to .env
- [ ] Command: `doctor`
  - [ ] Check environment variables
  - [ ] Test WooCommerce API connection
  - [ ] Verify required plugins (if GraphQL)
  - [ ] Check Node.js version
  - [ ] Check pnpm version
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

## Phase 2: Enhanced Features (v0.2)

### Package: @storefuse/module-cart ⏳ IN PROGRESS

**Status**: Basic types and context created, needs UI components and functionality

- [x] Initialize package
- [x] Basic module structure
- [ ] Cart state management
  - [ ] Implement local storage cart
  - [x] Create cart context (CartContext.tsx exists)
  - [ ] Add cart hooks (useCart, useAddToCart, etc.)
- [ ] Components
  - [ ] Create `CartDrawer` component
  - [ ] Create `CartItem` component (exists in theme-core, needs integration)
  - [ ] Create `CartSummary` component (exists in theme-core, needs integration)
  - [ ] Create `AddToCartButton` component (exists in theme-core, needs functionality)
  - [ ] Create `QuantitySelector` component
- [ ] Cart operations
  - [ ] Implement add to cart
  - [ ] Implement update quantity
  - [ ] Implement remove item
  - [ ] Implement clear cart
- [ ] Testing
  - [ ] Write cart logic tests
  - [ ] Write component tests

### Package: @storefuse/module-checkout-redirect

- [ ] Initialize package
- [ ] Checkout URL generation
  - [ ] Generate WooCommerce checkout URL
  - [ ] Add cart items to URL
  - [ ] Support prefill parameters
- [ ] Components
  - [ ] Create `CheckoutButton` component
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

### Documentation (v0.2)

- [x] Create theme customization guide (docs/themes.md)
- [ ] Write getting started guide
- [ ] Document module system
- [ ] Add deployment guide (Vercel)
- [ ] Create adapter documentation

---

## Next Steps (Phase 2 - Start Here)

### Priority 1: Module System Implementation
The module system needs to be fully implemented to allow dynamic module loading:
- [ ] Implement module loader in @storefuse/core
- [ ] Implement module registry
- [ ] Implement dependency resolver
- [ ] Add module hooks system
- [ ] Create getPage() helper for routing

### Priority 2: Cart Module Enhancement
Complete the cart module with UI components:
- [ ] Create CartDrawer component in theme-core
- [ ] Create CartItem component (already in theme-core, needs cart integration)
- [ ] Create AddToCartButton component (already in theme-core, needs functionality)
- [ ] Implement local storage cart persistence
- [ ] Add cart hooks (useCart, useAddToCart)

### Priority 3: CLI Development
Start building the CLI for better developer experience:
- [ ] Implement `storefuse init` command
- [ ] Implement `storefuse add module` command
- [ ] Implement `storefuse doctor` command
- [ ] Create project templates

### Priority 4: Testing Infrastructure
Add testing to ensure stability:
- [ ] Setup Vitest for unit tests
- [ ] Add tests for theme resolver
- [ ] Add tests for config loader
- [ ] Setup Playwright for E2E tests

---

## Phase 2: Enhanced Features (v0.2) ⏳ NEXT

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
