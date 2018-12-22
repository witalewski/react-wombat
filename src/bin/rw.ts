#!/usr/bin/env node
"use strict";

import chalk from "chalk";
import program from "commander";
import { mapParamsToComponentData } from "../component/mapParamsToComponentData";
import { mapParamsToActionsData } from "../actions/mapParamsToActionsData";
import { createComponent } from "../component/createComponent";
import { createActions } from "../actions/createActions";
const packageJson = require("../../package.json");

let files;

program
  .version(packageJson.version)
  .description(packageJson.description)
  .usage("[options] <files ...>")
  .arguments("<names...>")
  .option("-p, --props <props>", "Component props")
  .option("-c, --connected [stateProps+actions]", "Connect Component to redux")
  .option("-s, --styled", "Create styled Component")
  .option("-f, --flat", "Don't create a separate directory for Component or actions")
  .option("-a, --actions <actions>", "Create actions in actions file")
  .action(function(names) {
    files = names;
  })
  .parse(process.argv);

const run: (program: any, files: string[]) => void = (program, files) => {
  if (!files) {
    console.log("Usage: ", program.usage());
    return;
  }
  files
    .map(file => {
      if (file.match(/^[A-Z]/)) {
        return createComponent(
          mapParamsToComponentData(file, `src/components`, program)
        );
      } else if (file === "actions") {
        return createActions(
          mapParamsToActionsData(file, "src/state", { ...program, flat: true })
        );
      } else if (file.match(/Actions$/)) {
        return createActions(
          mapParamsToActionsData(file, "src/state", { ...program })
        );
      }
    })
    .reduce((acc, task) => acc.and(task))
    .run()
    .listen({
      onCancelled: () => console.log(chalk.red("🐨  Task was cancelled.")),
      onRejected: reason =>
        console.log(chalk.red("🐨  Couldn't complete task:"), reason),
      onResolved: () => console.log("🐨  Done.")
    });
};

run(program, files);
