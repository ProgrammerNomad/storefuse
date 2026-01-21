import prompts from "prompts";
import chalk from "chalk";
import ora from "ora";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

interface InitOptions {
  name?: string;
  skipInstall?: boolean;
}

export async function initCommand(options: InitOptions) {
  console.log(chalk.bold.cyan("\n🚀 StoreFuse Project Initialization\n"));

  // Prompt for project details if not provided
  const answers = await prompts([
    {
      type: options.name ? null : "text",
      name: "projectName",
      message: "Project name:",
      initial: "my-storefuse-app",
      validate: (value) =>
        value.length > 0 ? true : "Project name is required",
    },
    {
      type: "select",
      name: "adapter",
      message: "Choose WooCommerce adapter:",
      choices: [
        { title: "REST API (Recommended)", value: "woo-rest" },
        { title: "GraphQL (Future)", value: "woo-graphql", disabled: true },
      ],
    },
    {
      type: "multiselect",
      name: "modules",
      message: "Select modules to install:",
      choices: [
        { title: "Products", value: "products", selected: true },
        { title: "Cart", value: "cart", selected: true },
        { title: "Checkout", value: "checkout-redirect", disabled: true },
        { title: "Search", value: "search", disabled: true },
        { title: "SEO", value: "seo", disabled: true },
      ],
      hint: "Space to select, Enter to confirm",
    },
  ]);

  if (!answers.projectName && !options.name) {
    console.log(chalk.red("❌ Project initialization cancelled"));
    process.exit(1);
  }

  const projectName = options.name || answers.projectName;
  const projectPath = path.resolve(process.cwd(), projectName);

  // Check if directory exists
  if (await fs.pathExists(projectPath)) {
    console.log(chalk.red(`❌ Directory ${projectName} already exists`));
    process.exit(1);
  }

  const spinner = ora("Creating project structure...").start();

  try {
    // Create project directory
    await fs.ensureDir(projectPath);

    // Create Next.js app structure
    await createProjectStructure(projectPath, {
      adapter: answers.adapter || "woo-rest",
      modules: answers.modules || ["products"],
    });

    spinner.succeed("Project structure created");

    // Create package.json
    spinner.start("Creating package.json...");
    await createPackageJson(projectPath, projectName);
    spinner.succeed("package.json created");

    // Create configuration files
    spinner.start("Creating configuration files...");
    await createConfigFiles(projectPath, {
      adapter: answers.adapter || "woo-rest",
      modules: answers.modules || ["products"],
    });
    spinner.succeed("Configuration files created");

    // Install dependencies
    if (!options.skipInstall) {
      spinner.start("Installing dependencies (this may take a moment)...");
      await execa("pnpm", ["install"], { cwd: projectPath });
      spinner.succeed("Dependencies installed");
    }

    // Success message
    console.log(chalk.green.bold("\n✅ StoreFuse project created successfully!\n"));
    console.log(chalk.cyan("Next steps:\n"));
    console.log(`  ${chalk.bold("1.")} cd ${projectName}`);
    console.log(`  ${chalk.bold("2.")} Copy .env.example to .env.local and add your WooCommerce credentials`);
    console.log(`  ${chalk.bold("3.")} pnpm dev\n`);
  } catch (error) {
    spinner.fail("Failed to create project");
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
}

async function createProjectStructure(
  projectPath: string,
  config: { adapter: string; modules: string[] }
) {
  const dirs = [
    "app",
    "app/shop",
    "app/product/[slug]",
    "app/category/[slug]",
    "app/cart",
    "public",
    "lib",
  ];

  for (const dir of dirs) {
    await fs.ensureDir(path.join(projectPath, dir));
  }

  // Create basic files
  await createAppFiles(projectPath);
}

async function createAppFiles(projectPath: string) {
  // app/layout.tsx
  const layoutContent = `import type { Metadata } from "next";
import { Header, Footer } from "@storefuse/theme-core";
import "./globals.css";

export const metadata: Metadata = {
  title: "StoreFuse Shop",
  description: "Powered by StoreFuse - WooCommerce + Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
`;

  // app/page.tsx
  const homeContent = `export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-5xl font-bold mb-4">Welcome to StoreFuse</h1>
      <p className="text-xl text-gray-600 mb-8">
        Modern WooCommerce storefront powered by Next.js 16
      </p>
      <a
        href="/shop"
        className="inline-block bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
      >
        Shop Now
      </a>
    </div>
  );
}
`;

  // app/shop/page.tsx
  const shopContent = `import { getAdapter } from "@/lib/adapter";
import Link from "next/link";
import Image from "next/image";

export default async function ShopPage() {
  const adapter = getAdapter();
  const products = await adapter.products.list({});

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Shop</h1>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Link
            key={product.id}
            href={\`/product/\${product.slug}\`}
            className="border rounded-lg overflow-hidden hover:shadow-lg transition"
          >
            {product.images?.[0] && (
              <Image
                src={product.images[0].src}
                alt={product.name}
                width={300}
                height={400}
                className="w-full h-64 object-cover"
              />
            )}
            <div className="p-4">
              <h3 className="font-bold mb-2">{product.name}</h3>
              <p className="text-lg font-semibold">{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
`;

  // app/product/[slug]/page.tsx
  const productContent = `import { getAdapter } from "@/lib/adapter";
import { ProductDetailPage } from "@storefuse/module-products";
import { notFound } from "next/navigation";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const adapter = getAdapter();
  const product = await adapter.products.getBySlug(slug);

  if (!product) notFound();

  return <ProductDetailPage product={product} />;
}
`;

  // app/globals.css
  const cssContent = `@import "tailwindcss";

@theme {
  --color-background: #ffffff;
  --color-foreground: #171717;
}
`;

  // lib/adapter.ts
  const adapterContent = `import { WooRestAdapter } from "@storefuse/adapter-woo-rest";

let adapter: WooRestAdapter | null = null;

export function getAdapter() {
  if (!adapter) {
    adapter = new WooRestAdapter({
      url: process.env.WOO_URL!,
      consumerKey: process.env.WOO_KEY!,
      consumerSecret: process.env.WOO_SECRET!,
    });
  }
  return adapter;
}
`;

  await fs.writeFile(path.join(projectPath, "app/layout.tsx"), layoutContent);
  await fs.writeFile(path.join(projectPath, "app/page.tsx"), homeContent);
  await fs.writeFile(path.join(projectPath, "app/shop/page.tsx"), shopContent);
  await fs.writeFile(path.join(projectPath, "app/product/[slug]/page.tsx"), productContent);
  await fs.writeFile(path.join(projectPath, "app/globals.css"), cssContent);
  await fs.writeFile(path.join(projectPath, "lib/adapter.ts"), adapterContent);
}

async function createPackageJson(projectPath: string, projectName: string) {
  const packageJson = {
    name: projectName,
    version: "0.1.0",
    private: true,
    scripts: {
      dev: "next dev --turbopack",
      build: "next build",
      start: "next start",
      lint: "next lint",
    },
    dependencies: {
      "@storefuse/core": "workspace:*",
      "@storefuse/adapter-woo-rest": "workspace:*",
      "@storefuse/module-products": "workspace:*",
      "@storefuse/theme-core": "workspace:*",
      next: "^16.1.4",
      react: "^19.0.0",
      "react-dom": "^19.0.0",
    },
    devDependencies: {
      "@tailwindcss/postcss": "^4.0.0",
      "@types/node": "^20",
      "@types/react": "^19",
      "@types/react-dom": "^19",
      postcss: "^8",
      tailwindcss: "^4.0.0",
      typescript: "^5.9.3",
    },
  };

  await fs.writeJson(path.join(projectPath, "package.json"), packageJson, {
    spaces: 2,
  });
}

async function createConfigFiles(
  projectPath: string,
  config: { adapter: string; modules: string[] }
) {
  // storefuse.config.ts
  const storefuseConfig = `import { defineStoreFuseConfig } from "@storefuse/core";

export default defineStoreFuseConfig({
  adapter: {
    name: "${config.adapter}",
    endpoint: process.env.WOO_URL!,
    keys: {
      consumerKey: process.env.WOO_KEY!,
      consumerSecret: process.env.WOO_SECRET!,
    },
  },
  modules: ${JSON.stringify(config.modules)},
  theme: {
    core: "@storefuse/theme-core",
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
`;

  // next.config.ts
  const nextConfig = `import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
};

export default nextConfig;
`;

  // tailwind.config.js
  const tailwindConfig = `const { join } = require("path");

module.exports = {
  content: [
    join(__dirname, "app/**/*.{js,ts,jsx,tsx,mdx}"),
    join(__dirname, "../../packages/themes/*/src/**/*.{js,ts,jsx,tsx,mdx}"),
    join(__dirname, "../../packages/modules/*/src/**/*.{js,ts,jsx,tsx,mdx}"),
    join(__dirname, "../../packages/core/src/**/*.{js,ts,jsx,tsx,mdx}"),
  ],
};
`;

  // postcss.config.mjs
  const postcssConfig = `const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
`;

  // tsconfig.json
  const tsConfig = {
    compilerOptions: {
      target: "ES2017",
      lib: ["dom", "dom.iterable", "esnext"],
      allowJs: true,
      skipLibCheck: true,
      strict: true,
      noEmit: true,
      esModuleInterop: true,
      module: "esnext",
      moduleResolution: "bundler",
      resolveJsonModule: true,
      isolatedModules: true,
      jsx: "preserve",
      incremental: true,
      plugins: [{ name: "next" }],
      paths: {
        "@/*": ["./*"],
      },
    },
    include: ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
    exclude: ["node_modules"],
  };

  // .env.example
  const envExample = `# WooCommerce REST API Configuration
WOO_URL=https://your-store.com
WOO_KEY=ck_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
WOO_SECRET=cs_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
`;

  // .gitignore
  const gitignore = `# Dependencies
node_modules
.pnpm-store

# Next.js
.next
out
dist

# Environment
.env
.env.local
.env*.local

# Debug
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db
`;

  await fs.writeFile(path.join(projectPath, "storefuse.config.ts"), storefuseConfig);
  await fs.writeFile(path.join(projectPath, "next.config.ts"), nextConfig);
  await fs.writeFile(path.join(projectPath, "tailwind.config.js"), tailwindConfig);
  await fs.writeFile(path.join(projectPath, "postcss.config.mjs"), postcssConfig);
  await fs.writeJson(path.join(projectPath, "tsconfig.json"), tsConfig, { spaces: 2 });
  await fs.writeFile(path.join(projectPath, ".env.example"), envExample);
  await fs.writeFile(path.join(projectPath, ".gitignore"), gitignore);
}
