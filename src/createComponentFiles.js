const makeDir = require("./makeDir");
const renderTemplate = require("./renderTemplate");

const writeIndexJs = data =>
  renderTemplate(
    "../templates/components/index.ejs",
    data,
    `${data.path}/index.js`
  );

const writeComponentJs = data =>
  renderTemplate(
    "../templates/components/Component.ejs",
    data,
    `${data.path}/${data.component}.js`
  );

const writeComponentStyledJs = data =>
  renderTemplate(
    "../templates/components/ComponentStyled.ejs",
    data,
    `${data.path}/${data.component}Styled.js`
  );

const createComponentFiles = data =>
  makeDir(data.path).then(() =>
    Promise.all([
      data.flat || writeIndexJs(data),
      writeComponentJs(data),
      data.styled && writeComponentStyledJs(data)
    ])
  );

module.exports = createComponentFiles;
