const mkdirp = require("mkdirp");
const chalk = require("chalk");
const { task } = require("folktale/concurrency/task");

const makeDirsForPath = path =>
  task(resolver =>
    mkdirp(path, err => {
      if (err) {
        resolver.reject(err);
      } else {
        console.log("Directory", chalk.green(path), "created.");
        resolver.resolve();
      }
    })
  );

module.exports = makeDirsForPath;
