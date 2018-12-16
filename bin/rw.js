#!/usr/bin/env node
"use strict";

const program = require("commander");
const childProcess = require("child_process");
const chalk = require("chalk");

program
  .version("1.0.0")
  .option("-n, --name [componentName]", "Component name")
  .option("-p, --path [pathToComponents]", "Path to components direcotry")
  .option("-c, --connected", "Connect component to redux")
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
  writeFile(`${options.path}/${name}/index.js`, indexJs(name, options));
const writeComponentJs = (name, options) =>
  writeFile(`${options.path}/${name}/${name}.js`, componentJs(name, options));
const writeComponentStyledJs = (name, options) =>
  writeFile(
    `${options.path}/${name}/${name}Styled.js`,
    componentStyledJs(name, options)
  );

const makeDir = (name, options) =>
  exec(
    `mkdir ${options.path}/${name}`,
    "Directory",
    chalk.green(`${options.path}/${name}`),
    "created."
  );

const createComponentFiles = (name, options) =>
  makeDir(name, options)
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

const { name, connected } = program;
const path = program.path || "src/components";

createComponentFiles(name, {
  path,
  connected
});
