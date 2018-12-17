#!/usr/bin/env node
"use strict";

const program = require("commander");
const createComponentFiles = require("../src/createComponentFiles");

let fileNames;

program
  .version("1.0.0")
  .arguments("<names...>")
  .option("-p, --path [pathToComponents]", "Path to components direcotry")
  .option("-c, --connected", "Connect component to redux")
  .action(function(names) {
    fileNames = names;
  })
  .parse(process.argv);

const getPathForFile = (program, name) => {
  if (program.path) {
    return program.path;
  }
  if (name.match(/^[A-Z]/)) {
    return `src/components/${name}`;
  }
  return "src";
};

const name = fileNames[0];
const { connected } = program;
const path = getPathForFile(program, name);

createComponentFiles(name, {
  path,
  connected
});
