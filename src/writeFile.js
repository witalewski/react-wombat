const fs = require("fs");
const chalk = require("chalk");
const getLastPathSegment = require("./getLastPathSegment");

const writeFile = (path, contents) =>
  new Promise((resolve, reject) =>
    fs.writeFile(path, contents, err =>
      err
        ? reject(err)
        : console.log(
            "File",
            chalk.green(getLastPathSegment(path)),
            "written."
          ) || resolve(true)
    )
  );

module.exports = writeFile;
