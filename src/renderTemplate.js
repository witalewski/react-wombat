const ejs = require("ejs");
const { task } = require("folktale/concurrency/task");
const readFile = require("./readFile");
const writeFile = require("./writeFile");

const renderTemplate = source => data =>
  readFile(require.resolve(source))
    .chain(template =>
      task(resolver =>
        ejs
          .render(template, data, { async: true })
          .then(resolver.resolve)
          .catch(resolver.reject)
      )
    )
    .chain(result =>
      task(resolver =>
        writeFile(data.targetPath, result)
          .then(resolver.resolve)
          .catch(resolver.reject)
      )
    );

module.exports = renderTemplate;
