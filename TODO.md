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

## Phase 1: Core Framework (v0.1 Foundation) 🚧 IN PROGRESS

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

### Package: @storefuse/adapter-woo-rest

- [ ] Initialize package
  - [ ] Create `package.json`
  - [ ] Create `tsconfig.json`
  - [ ] Add WooCommerce REST API dependency
- [ ] Implement adapter interface
  - [ ] Implement `products.list()`
  - [ ] Implement `products.getById()`
  - [ ] Implement `products.getBySlug()`
  - [ ] Implement `categories.list()`
  - [ ] Implement `categories.getBySlug()`
  - [ ] Implement `search.query()` (optional)
- [ ] Error handling
  - [ ] Add API error handling
  - [ ] Add rate limiting support
  - [ ] Add retry logic
- [ ] Authentication
  - [ ] Implement consumer key/secret auth
  - [ ] Add request signing
- [ ] Testing
  - [ ] Setup test environment
  - [ ] Write integration tests (mock WooCommerce API)
  - [ ] Add E2E tests with actual WooCommerce instance

### Package: @storefuse/module-products

- [ ] Initialize package
  - [ ] Create `package.json`
  - [ ] Create `tsconfig.json`
- [ ] Module definition
  - [ ] Create module manifest
  - [ ] Define dependencies
- [ ] Components
  - [ ] Create `ProductCard` component
  - [ ] Create `ProductList` component
  - [ ] Create `ProductGrid` component
  - [ ] Create `ProductImage` component
  - [ ] Create `Price` component
- [ ] Pages (contribution)
  - [ ] Define home page loader
  - [ ] Define shop page loader
  - [ ] Define product detail page loader
  - [ ] Define category page loader
- [ ] Data fetching
  - [ ] Create product data fetchers
  - [ ] Add caching configuration
  - [ ] Implement error boundaries
- [ ] Testing
  - [ ] Write component tests
  - [ ] Write integration tests

### Package: @storefuse/theme-core

- [ ] Initialize package
  - [ ] Create `package.json`
  - [ ] Create `tsconfig.json`
  - [ ] Add Tailwind v4 dependency
- [ ] Tailwind Configuration
  - [ ] Create `tailwind.config.ts`
  - [ ] Setup CSS v4 syntax
  - [ ] Define design tokens
  - [ ] Create global styles
- [ ] Core Components
  - [ ] Create `Header` component
  - [ ] Create `Footer` component
  - [ ] Create `Navigation` component
  - [ ] Create `Logo` component
  - [ ] Create `ProductCard` component
  - [ ] Create `Button` component
  - [ ] Create `Input` component
  - [ ] Create `Badge` component
  - [ ] Create `Price` component
- [ ] Layout Components
  - [ ] Create `Container` component
  - [ ] Create `Grid` component
  - [ ] Create `Section` component
- [ ] Theme Registry
  - [ ] Export component registry
  - [ ] Document override patterns
- [ ] Documentation
  - [ ] Create component documentation
  - [ ] Add usage examples
  - [ ] Document Tailwind customization

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
  - [x] Setup Tailwind v4
- [ ] Setup StoreFuse
  - [ ] Create `storefuse.config.ts`
  - [ ] Install core packages
  - [ ] Configure adapter
  - [ ] Enable modules
- [x] Create Routes
  - [x] Create `app/layout.tsx`
  - [x] Create `app/page.tsx` (home)
  - [x] Create `app/shop/page.tsx`
  - [ ] Create `app/product/[slug]/page.tsx`
  - [ ] Create `app/category/[slug]/page.tsx`
  - [x] Create `app/cart/page.tsx`
- [x] Environment Setup
  - [x] Create `.env.example`
  - [x] Document required variables
- [ ] Testing
  - [ ] Add Playwright for E2E tests
  - [ ] Write basic navigation tests
  - [ ] Add Playwright for E2E tests
  - [ ] Write basic navigation tests

---

## Phase 2: Enhanced Features (v0.2)

### Package: @storefuse/module-cart

- [ ] Initialize package
- [ ] Cart state management
  - [ ] Implement local storage cart
  - [ ] Create cart context
  - [ ] Add cart hooks
- [ ] Components
  - [ ] Create `CartDrawer` component
  - [ ] Create `CartItem` component
  - [ ] Create `CartSummary` component
  - [ ] Create `AddToCartButton` component
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

- [ ] Write getting started guide
- [ ] Document module system
- [ ] Create theme customization guide
- [ ] Add deployment guide (Vercel)
- [ ] Create adapter documentation

---

## Phase 3: Advanced Features (v0.3)

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

- [ ] Create child theme template
- [ ] Override example components
- [ ] Document override patterns
- [ ] Add customization examples

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
