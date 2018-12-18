const compose = require("folktale/core/lambda/compose");
const { of } = require("folktale/concurrency/task");
const makeDirsForPath = require("./makeDirsForPath");
const renderTemplate = require("./renderTemplate");
const { addTasks } = require("./utils/taskUtils");

const setIndexJsTargetPath = data => ({
  ...data,
  targetPath: `${data.path}/index.js`
});

const writeIndexJs = compose(
  renderTemplate("../templates/components/index.ejs"),
  setIndexJsTargetPath
);

const setComponentJsTargetPath = data => ({
  ...data,
  targetPath: `${data.path}/${data.component}.js`
});

const writeComponentJs = compose(
  renderTemplate("../templates/components/Component.ejs"),
  setComponentJsTargetPath
);

const setComponentStyledJsTargetPath = data => ({
  ...data,
  targetPath: `${data.path}/${data.component}Styled.js`
});

const writeComponentStyledJs = compose(
  renderTemplate("../templates/components/ComponentStyled.ejs"),
  setComponentStyledJsTargetPath
);

const createComponentFiles = data =>
  makeDirsForPath(data.path).chain(_ =>
    [
      data.flat || writeIndexJs(data),
      writeComponentJs(data),
      data.styled && writeComponentStyledJs(data)
    ]
      .filter(x => typeof x === "object")
      .reduce(addTasks, of(true))
  );

module.exports = createComponentFiles;
