#!/usr/bin/env node
"use strict";

const program = require("commander");
const childProcess = require("child_process");
const chalk = require("chalk");

program
  .version("1.0.0")
  .option("-n, --name [componentName]", "Component name")
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

const indexJs = name => [`export { ${name} } from \\"./${name}\\";`, ``];
const componentJs = name => [
  `import React from \\"react\\";`,
  `import { ${name}Styled } from \\"./${name}Styled\\";`,
  ``,
  `export const ${name} = () => {`,
  `};`,
  ``
];
const componentStyledJs = name => [
  `import styled from \\"@emotion/styled\\";`,
  ``,
  `export const ${name}Styled = styled.div\\\``,
  `\\\`;`,
  ``
];

const writeFile = (name, contents) =>
  exec(
    `echo "${contents.join("\\n\\\n")}" | cat > ${name}`,
    "File",
    chalk.green(name),
    "wriiten."
  );

const writeIndexJs = name => writeFile(`${name}/index.js`, indexJs(name));
const writeComponentJs = name =>
  writeFile(`${name}/${name}.js`, componentJs(name));
const writeComponentStyledJs = name =>
  writeFile(`${name}/${name}Styled.js`, componentStyledJs(name));

const makeDir = name =>
  exec(`mkdir ${name}`, "Directory", chalk.green(name), "created.");

const createComponentFiles = name =>
  makeDir(name).then(() =>
    Promise.all([
      writeIndexJs(name),
      writeComponentJs(name),
      writeComponentStyledJs(name)
    ]).then(() => console.log("Done."))
  );

createComponentFiles(program.name);
