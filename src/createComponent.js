const { of } = require("folktale/concurrency/task");
const createFileFromTemplate = require("./createFileFromTemplate");
const makeDirsForPath = require("../src/makeDirsForPath");

const createComponent = data => {
  let tasks = [
    createFileFromTemplate(
      data,
      "../templates/components/index.ejs",
      `index.js`
    )
  ];
  if (!data.flat) {
    tasks.push(
      createFileFromTemplate(
        data,
        "../templates/components/Component.ejs",
        `${data.name}.js`
      )
    );
  }
  if (data.styled) {
    tasks.push(
      createFileFromTemplate(
        data,
        "../templates/components/ComponentStyled.ejs",
        `${data.name}Styled.js`
      )
    );
  }
  return makeDirsForPath(data.path).chain(_ =>
    tasks.reduce((acc, task) => acc.and(task), of(true))
  );
};

module.exports = createComponent;
