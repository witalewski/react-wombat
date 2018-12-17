#!/usr/bin/env node
"use strict";

const program = require("commander");
const chalk = require("chalk");
const createComponentFiles = require("../src/createComponentFiles");
const packageJson = require("../package.json");

let files;

program
  .version(packageJson.version)
  .description(packageJson.description)
  .usage("rw [options] <files ...>")
  .arguments("<names...>")
  .option("-p, --props <props>", "Component props")
  .option("-c, --connected [stateProps+actions]", "Connect component to redux")
  .option("-s, --styled", "Create styled component")
  .option("-f, --flat", "Don't create a separate directory for Component")
  .action(function(names) {
    files = names;
  })
  .parse(process.argv);

const createComponent = (component, path, options) => {
  let { connected, styled, props, flat } = options;

  let stateProps, actions;
  if (typeof connected === "string") {
    [stateProps, actions] = connected.split("+").map(s => s.split(","));
  }
  stateProps = stateProps || [];
  actions = actions || [];

  props = [...(props ? props.split(",") : []), ...stateProps, ...actions];

  connected = true && connected;
  flat = true && flat;
  styled = true && styled;

  return createComponentFiles({
    component,
    path: flat ? path : `${path}/${component}`,
    connected,
    styled,
    props,
    stateProps,
    actions,
    flat
  });
};

const run = (program, files) => {
  if (!files) {
    console.log("Usage: ", program.usage());
    return;
  }
  Promise.all(
    files.map(file => {
      if (file.match(/^[A-Z]/)) {
        return createComponent(file, `src/components`, program);
      }
    })
  )
    .then(() => console.log("🐨  Done."))
    .catch(err => console.log("🐨  Something went wrong:", chalk.red(err)));
};

run(program, files);
