const fs = require("fs");
const chalk = require("chalk");
const forEachAsync = require("./forEachAsync");
const getLastPathSegment = require("./getLastPathSegment");

const doesDirExist = name =>
  new Promise(resolve => {
    fs.access(name, fs.constants.F_OK, err =>
      err ? resolve(false) : resolve(true)
    );
  });

const getDirsInPath = pathElements =>
  pathElements.map((_, i) => pathElements.slice(0, i + 1).join("/"));

const makeDir = path =>
  new Promise((resolve, reject) =>
    forEachAsync(
      pathElem =>
        doesDirExist(pathElem).then(exists =>
          exists
            ? resolve()
            : fs.mkdir(pathElem, { recursive: true, mode: 0o777 }, err =>
                err
                  ? reject(err)
                  : console.log(
                      "Directory",
                      chalk.green(getLastPathSegment(path)),
                      "created."
                    ) || resolve()
              )
        ),
      getDirsInPath(path.split("/"))
    )
  );

module.exports = makeDir;
