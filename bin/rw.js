#!/usr/bin/env node
"use strict";

const program = require("commander");
const childProcess = require("child_process");
const fs = require("fs");
const chalk = require("chalk");

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

const exec = (cmd, ...log) =>
  new Promise((resolve, reject) =>
    childProcess.exec(cmd, {}, (error, stdout, stderr) => {
      if (error || stderr) {
        console.log("Couldn't complete", chalk.red(cmd));
        reject(error || stdout);
      } else {
        console.log(...log);
        resolve(stdout);
      }
    })
  );

const SKIP = "[[[SKIP]]]";

const indexJs = (name, options) => [
  `export { ${
    options.connected ? name + "Connected" : name
  } } from \\"./${name}\\";`,
  ``
];
const componentJs = (name, options) => [
  `import React from \\"react\\";`,
  options.connected ? `import { connect } from \\"react-redux\\";` : SKIP,
  `import { ${name}Styled } from \\"./${name}Styled\\";`,
  ``,
  `export const ${name} = () => {`,
  `  return <${name}Styled></${name}Styled>`,
  `};`,
  options.connected ? `const mapStateToProps = state => ({` : SKIP,
  options.connected ? `});` : SKIP,
  options.connected ? `const mapDispatchToProps = {` : SKIP,
  options.connected ? `};` : SKIP,
  options.connected ? `export const ${name}Connected = connect(` : SKIP,
  options.connected ? `  mapStateToProps,` : SKIP,
  options.connected ? `  mapDispatchToProps` : SKIP,
  options.connected ? `)(${name});` : SKIP,
  ``
];
const componentStyledJs = (name, options) => [
  `import styled from \\"@emotion/styled\\";`,
  ``,
  `export const ${name}Styled = styled.div\\\``,
  `\\\`;`,
  ``
];

const writeFile = (name, contents) =>
  exec(
    `echo "${contents
      .filter(line => line !== SKIP)
      .join("\\n\\\n")}" | cat > ${name}`,
    "File",
    chalk.green(name),
    "wriiten."
  );

const writeIndexJs = (name, options) =>
  writeFile(`${options.path}/index.js`, indexJs(name, options));
const writeComponentJs = (name, options) =>
  writeFile(`${options.path}/${name}.js`, componentJs(name, options));
const writeComponentStyledJs = (name, options) =>
  writeFile(
    `${options.path}/${name}Styled.js`,
    componentStyledJs(name, options)
  );

const checkIfDirExists = name =>
  new Promise(resolve => {
    fs.access(name, fs.constants.F_OK, err =>
      err ? resolve(false) : resolve(true)
    );
  });

const getDirsInPath = pathElements =>
  pathElements.map((_, i) => pathElements.slice(0, i + 1).join("/"));

const forEachAsync = async (op, arr) => {
  for (let i = 0; i < arr.length; i++) {
    await op(arr[i]);
  }
};

const makeDir = path =>
  new Promise(async (resolve, reject) => {
    await forEachAsync(
      async dirName =>
        !(await checkIfDirExists(dirName)) &&
        (await exec(
          `mkdir ${dirName}`,
          "Directory",
          chalk.green(dirName),
          "created."
        )),
      getDirsInPath(path.split("/"))
    );
    resolve();
  });

const createComponentFiles = (name, options) =>
  makeDir(options.path)
    .then(() =>
      Promise.all([
        writeIndexJs(name, options),
        writeComponentJs(name, options),
        writeComponentStyledJs(name, options)
      ])
        .then(() => console.log("🐨  Done."))
        .catch(err => console.log("🐨  Something went wrong:", chalk.red(err)))
    )
    .catch(err => console.log("🐨  Something went wrong:", chalk.red(err)));

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
