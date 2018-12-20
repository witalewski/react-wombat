const fs = require("fs");
const chalk = require("chalk");
const { task } = require("folktale/concurrency/task");

const writeFile = (path, filename, contents) =>
  task(resolver =>
    fs.writeFile(`${path}/${filename}`, contents, err =>
      err
        ? resolver.reject(err)
        : console.log("File", chalk.green(filename), "written.") ||
          resolver.resolve(true)
    )
  );

module.exports = writeFile;
