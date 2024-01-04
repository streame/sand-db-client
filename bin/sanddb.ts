#! /usr/bin/env node

import chalk from "chalk";
import { config } from "dotenv";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generate } from "../src/generate.js";

// Load environment variables that may be present.
config();
const argv = yargs(hideBin(process.argv)).argv as any;

if (argv._[0] === "generate") {
  generate(argv).catch((err) => console.error(chalk.red(err)));
}
