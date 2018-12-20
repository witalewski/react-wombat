const renderTemplate = require("./renderTemplate");
const readFile = require("./readFile");
const writeFile = require("./writeFile");

const createFileFromTemplate = (data, templatePath, filename) =>
  readFile(require.resolve(templatePath))
    .chain(template => renderTemplate(template, data))
    .chain(result => writeFile(data.path, filename, result));

module.exports = createFileFromTemplate;
