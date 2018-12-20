const ejs = require("ejs");
const { task } = require("folktale/concurrency/task");

const renderTemplate = (template, data) =>
  task(resolver =>
    ejs
      .render(template, data, { async: true })
      .then(resolver.resolve)
      .catch(resolver.reject)
  );

module.exports = renderTemplate;
