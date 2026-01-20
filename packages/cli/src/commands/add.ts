import prompts from "prompts";
import chalk from "chalk";
import ora from "ora";
import { execa } from "execa";
import fs from "fs-extra";
import path from "path";

const AVAILABLE_MODULES = [
  { name: "products", package: "@storefuse/module-products", available: true },
  { name: "cart", package: "@storefuse/module-cart", available: false },
  { name: "checkout-redirect", package: "@storefuse/module-checkout-redirect", available: false },
  { name: "search", package: "@storefuse/module-search", available: false },
  { name: "seo", package: "@storefuse/module-seo", available: false },
];

export async function addCommand(type: string, name?: string) {
  if (type === "module") {
    await addModule(name);
  } else if (type === "theme") {
    await addTheme(name);
  } else {
    console.log(chalk.red(`❌ Unknown type: ${type}`));
    console.log(chalk.gray("Available types: module, theme"));
    process.exit(1);
  }
}

async function addModule(moduleName?: string) {
  console.log(chalk.bold.cyan("\n📦 Add StoreFuse Module\n"));

  let selectedModule = moduleName;

  if (!selectedModule) {
    const choices = AVAILABLE_MODULES.map((mod) => ({
      title: mod.name,
      value: mod.name,
      disabled: !mod.available,
    }));

    const answer = await prompts({
      type: "select",
      name: "module",
      message: "Select a module to add:",
      choices,
    });

    selectedModule = answer.module;
  }

  if (!selectedModule) {
    console.log(chalk.red("❌ Module selection cancelled"));
    process.exit(1);
  }

  const module = AVAILABLE_MODULES.find((m) => m.name === selectedModule);

  if (!module) {
    console.log(chalk.red(`❌ Module "${selectedModule}" not found`));
    process.exit(1);
  }

  if (!module.available) {
    console.log(chalk.yellow(`⚠️  Module "${selectedModule}" is not yet available`));
    process.exit(1);
  }

  const spinner = ora(`Installing ${module.package}...`).start();

  try {
    // Install the module package
    await execa("pnpm", ["add", module.package]);
    spinner.succeed(`${module.package} installed`);

    // Update storefuse.config.ts
    spinner.start("Updating storefuse.config.ts...");
    await updateConfig(selectedModule);
    spinner.succeed("Configuration updated");

    console.log(chalk.green.bold(`\n✅ Module "${selectedModule}" added successfully!\n`));
  } catch (error) {
    spinner.fail("Failed to add module");
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
}

async function addTheme(themeName?: string) {
  console.log(chalk.bold.cyan("\n🎨 Add StoreFuse Child Theme\n"));

  const themeDir = themeName || "theme-child";
  const themePath = path.resolve(process.cwd(), themeDir);

  if (await fs.pathExists(themePath)) {
    console.log(chalk.red(`❌ Directory ${themeDir} already exists`));
    process.exit(1);
  }

  const spinner = ora("Creating child theme...").start();

  try {
    // Create theme directory structure
    await fs.ensureDir(path.join(themePath, "src/components"));
    await fs.ensureDir(path.join(themePath, "src/layouts"));

    // Create theme files
    const themeConfig = `export default {
  name: "${themeDir}",
  extends: "@storefuse/theme-core",
};
`;

    const exampleComponent = `import { Button as CoreButton } from "@storefuse/theme-core";

// Override core Button component
export function Button(props: any) {
  return (
    <CoreButton {...props} className={\`custom-button \${props.className || ""}\`} />
  );
}
`;

    await fs.writeFile(path.join(themePath, "theme.config.ts"), themeConfig);
    await fs.writeFile(
      path.join(themePath, "src/components/Button.tsx"),
      exampleComponent
    );

    spinner.succeed("Child theme created");

    // Update storefuse.config.ts
    spinner.start("Updating storefuse.config.ts...");
    await updateThemeConfig(themeDir);
    spinner.succeed("Configuration updated");

    console.log(chalk.green.bold(`\n✅ Child theme "${themeDir}" created!\n`));
    console.log(chalk.cyan("Theme location:"), themePath);
    console.log(chalk.gray("\nCustomize components in:"), `${themeDir}/src/components/`);
  } catch (error) {
    spinner.fail("Failed to create child theme");
    console.error(chalk.red(error instanceof Error ? error.message : String(error)));
    process.exit(1);
  }
}

async function updateConfig(moduleName: string) {
  const configPath = path.resolve(process.cwd(), "storefuse.config.ts");

  if (!(await fs.pathExists(configPath))) {
    throw new Error("storefuse.config.ts not found in current directory");
  }

  let configContent = await fs.readFile(configPath, "utf-8");

  // Simple regex to add module to array
  const modulesMatch = configContent.match(/modules:\s*\[([\s\S]*?)\]/);

  if (modulesMatch) {
    const currentModules = modulesMatch[1];
    
    // Check if module already exists
    if (currentModules.includes(`"${moduleName}"`)) {
      console.log(chalk.yellow(`⚠️  Module "${moduleName}" already in config`));
      return;
    }

    const updatedModules = currentModules.trim()
      ? `${currentModules.trim()},\n    "${moduleName}"`
      : `"${moduleName}"`;

    configContent = configContent.replace(
      /modules:\s*\[([\s\S]*?)\]/,
      `modules: [\n    ${updatedModules}\n  ]`
    );

    await fs.writeFile(configPath, configContent);
  }
}

async function updateThemeConfig(themeDir: string) {
  const configPath = path.resolve(process.cwd(), "storefuse.config.ts");

  if (!(await fs.pathExists(configPath))) {
    throw new Error("storefuse.config.ts not found in current directory");
  }

  let configContent = await fs.readFile(configPath, "utf-8");

  // Update theme.child property
  configContent = configContent.replace(
    /theme:\s*{[\s\S]*?}/,
    `theme: {
    core: "@storefuse/theme-core",
    child: "./${themeDir}",
  }`
  );

  await fs.writeFile(configPath, configContent);
}
