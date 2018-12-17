const chalk = require("chalk");
const makeDir = require("./makeDir");
const exec = require("./exec");



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

module.exports = createComponentFiles;