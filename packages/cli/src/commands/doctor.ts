import chalk from "chalk";
import ora from "ora";
import fs from "fs-extra";
import path from "path";
import { execa } from "execa";

interface DoctorCheck {
  name: string;
  status: "pass" | "fail" | "warn";
  message: string;
}

export async function doctorCommand() {
  console.log(chalk.bold.cyan("\n🩺 StoreFuse Health Check\n"));

  const checks: DoctorCheck[] = [];

  // Check Node.js version
  const nodeCheck = await checkNodeVersion();
  checks.push(nodeCheck);

  // Check pnpm
  const pnpmCheck = await checkPnpm();
  checks.push(pnpmCheck);

  // Check storefuse.config.ts
  const configCheck = await checkConfig();
  checks.push(configCheck);

  // Check environment variables
  const envCheck = await checkEnvironment();
  checks.push(envCheck);

  // Check WooCommerce connection
  if (envCheck.status === "pass") {
    const wooCheck = await checkWooCommerce();
    checks.push(wooCheck);
  }

  // Print results
  console.log(chalk.bold("\nHealth Check Results:\n"));

  for (const check of checks) {
    const icon =
      check.status === "pass"
        ? chalk.green("✓")
        : check.status === "warn"
        ? chalk.yellow("⚠")
        : chalk.red("✗");

    console.log(`${icon} ${chalk.bold(check.name)}`);
    console.log(`  ${chalk.gray(check.message)}\n`);
  }

  // Summary
  const passed = checks.filter((c) => c.status === "pass").length;
  const failed = checks.filter((c) => c.status === "fail").length;
  const warnings = checks.filter((c) => c.status === "warn").length;

  console.log(chalk.bold("Summary:"));
  console.log(
    `  ${chalk.green(`${passed} passed`)} ${chalk.red(`${failed} failed`)} ${chalk.yellow(
      `${warnings} warnings`
    )}\n`
  );

  if (failed > 0) {
    process.exit(1);
  }
}

async function checkNodeVersion(): Promise<DoctorCheck> {
  try {
    const { stdout } = await execa("node", ["--version"]);
    const version = stdout.trim();
    const majorVersion = parseInt(version.slice(1).split(".")[0]);

    if (majorVersion >= 18) {
      return {
        name: "Node.js Version",
        status: "pass",
        message: `${version} (>= 18.0.0 required)`,
      };
    } else {
      return {
        name: "Node.js Version",
        status: "fail",
        message: `${version} - Node.js 18 or higher required`,
      };
    }
  } catch (error) {
    return {
      name: "Node.js Version",
      status: "fail",
      message: "Node.js not found",
    };
  }
}

async function checkPnpm(): Promise<DoctorCheck> {
  try {
    const { stdout } = await execa("pnpm", ["--version"]);
    const version = stdout.trim();

    return {
      name: "pnpm",
      status: "pass",
      message: `v${version} installed`,
    };
  } catch (error) {
    return {
      name: "pnpm",
      status: "fail",
      message: "pnpm not found. Install with: npm install -g pnpm",
    };
  }
}

async function checkConfig(): Promise<DoctorCheck> {
  const configPath = path.resolve(process.cwd(), "storefuse.config.ts");

  if (await fs.pathExists(configPath)) {
    return {
      name: "StoreFuse Config",
      status: "pass",
      message: "storefuse.config.ts found",
    };
  } else {
    return {
      name: "StoreFuse Config",
      status: "fail",
      message: "storefuse.config.ts not found. Run: storefuse init",
    };
  }
}

async function checkEnvironment(): Promise<DoctorCheck> {
  const envPath = path.resolve(process.cwd(), ".env.local");
  const envExamplePath = path.resolve(process.cwd(), ".env.example");

  if (!(await fs.pathExists(envPath))) {
    return {
      name: "Environment Variables",
      status: "fail",
      message: ".env.local not found. Copy from .env.example and configure",
    };
  }

  const envContent = await fs.readFile(envPath, "utf-8");
  const requiredVars = ["WOO_URL", "WOO_KEY", "WOO_SECRET"];
  const missingVars = [];

  for (const varName of requiredVars) {
    if (!envContent.includes(`${varName}=`) || envContent.includes(`${varName}=your-`)) {
      missingVars.push(varName);
    }
  }

  if (missingVars.length > 0) {
    return {
      name: "Environment Variables",
      status: "warn",
      message: `Missing or incomplete: ${missingVars.join(", ")}`,
    };
  }

  return {
    name: "Environment Variables",
    status: "pass",
    message: "All required variables configured",
  };
}

async function checkWooCommerce(): Promise<DoctorCheck> {
  const spinner = ora("Testing WooCommerce connection...").start();

  try {
    // Load environment variables
    const envPath = path.resolve(process.cwd(), ".env.local");
    const envContent = await fs.readFile(envPath, "utf-8");
    
    const wooUrl = envContent.match(/WOO_URL=(.+)/)?.[1]?.trim();
    const wooKey = envContent.match(/WOO_KEY=(.+)/)?.[1]?.trim();
    const wooSecret = envContent.match(/WOO_SECRET=(.+)/)?.[1]?.trim();

    if (!wooUrl || !wooKey || !wooSecret) {
      spinner.stop();
      return {
        name: "WooCommerce Connection",
        status: "warn",
        message: "Cannot test - credentials not configured",
      };
    }

    // Test connection with a simple API request
    const auth = Buffer.from(`${wooKey}:${wooSecret}`).toString("base64");
    const response = await fetch(`${wooUrl}/wp-json/wc/v3/system_status`, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });

    spinner.stop();

    if (response.ok) {
      return {
        name: "WooCommerce Connection",
        status: "pass",
        message: `Connected to ${wooUrl}`,
      };
    } else {
      return {
        name: "WooCommerce Connection",
        status: "fail",
        message: `Connection failed: ${response.status} ${response.statusText}`,
      };
    }
  } catch (error) {
    spinner.stop();
    return {
      name: "WooCommerce Connection",
      status: "fail",
      message: `Connection error: ${error instanceof Error ? error.message : String(error)}`,
    };
  }
}
