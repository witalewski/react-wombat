const fs = require("fs");
const chalk = require("chalk");
const forEachAsync = require("./forEachAsync");
const exec = require("./exec");

const doesDirExist = name =>
  new Promise(resolve => {
    fs.access(name, fs.constants.F_OK, err =>
      err ? resolve(false) : resolve(true)
    );
  });

const getDirsInPath = pathElements =>
  pathElements.map((_, i) => pathElements.slice(0, i + 1).join("/"));

const makeDir = path =>
  new Promise(async (resolve, reject) => {
    await forEachAsync(
      async dirName =>
        !(await doesDirExist(dirName)) &&
        (await exec(
          `mkdir ${dirName}`,
          "Directory",
          chalk.green(dirName),
          "created."
        )),
      getDirsInPath(path.split("/"))
    );
    resolve();
  });

module.exports = makeDir;
