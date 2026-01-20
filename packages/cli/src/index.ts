#!/usr/bin/env node
import { Command } from "commander";
import { initCommand } from "./commands/init.js";
import { addCommand } from "./commands/add.js";
import { doctorCommand } from "./commands/doctor.js";

const program = new Command();

program
  .name("storefuse")
  .description("StoreFuse CLI - Modular WooCommerce + Next.js framework")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize a new StoreFuse project")
  .option("-n, --name <name>", "Project name")
  .option("--skip-install", "Skip dependency installation")
  .action(initCommand);

program
  .command("add")
  .description("Add a module or theme to your project")
  .argument("<type>", "Type to add: module or theme")
  .argument("[name]", "Name of the module or theme")
  .action(addCommand);

program
  .command("doctor")
  .description("Check StoreFuse project health and configuration")
  .action(doctorCommand);

program.parse();
