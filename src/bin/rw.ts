#!/usr/bin/env node
"use strict";

import program from "commander";
import { mapParamsToComponentData } from "../mapParamsToComponentData";
import { createComponent } from "../createComponent";
const packageJson = require("../../package.json");

let files;

program
  .version(packageJson.version)
  .description(packageJson.description)
  .usage("[options] <files ...>")
  .arguments("<names...>")
  .option("-p, --props <props>", "Component props")
  .option("-c, --connected [stateProps+actions]", "Connect component to redux")
  .option("-s, --styled", "Create styled component")
  .option("-f, --flat", "Don't create a separate directory for Component")
  .action(function(names) {
    files = names;
  })
  .parse(process.argv);

const run: (program: any, files: string[]) => void = (program, files) => {
  if (!files) {
    console.log("Usage: ", program.usage());
    return;
  }
  files.map(file => {
    if (file.match(/^[A-Z]/)) {
      createComponent(mapParamsToComponentData(file, `src/components`, program))
        .run()
        .future()
        .map(() => console.log("🐨  Done."));
    }
  });
};

run(program, files);
