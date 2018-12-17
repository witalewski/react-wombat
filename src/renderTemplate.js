const readFile = require("./readFile");
const writeFile = require("./writeFile");
const ejs = require("ejs");

const renderTemplate = (source, data, target) =>
  readFile(require.resolve(source)).then(template =>
    ejs
      .render(template, data, { async: true })
      .then(result => writeFile(target, result))
      .catch(console.log)
  );

module.exports = renderTemplate;
