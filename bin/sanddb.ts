#! /usr/bin/env node

import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import { generate } from "../src/generate.js";

const argv = yargs(hideBin(process.argv)).argv as any;

if (argv._[0] === "generate") {
  generate(argv).catch((err) => console.error(err));
}
