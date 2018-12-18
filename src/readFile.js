const { task } = require('folktale/concurrency/task');

const fs = require("fs");

const readFile = path =>
  task(resolver =>
    fs.readFile(path, "utf8", (err, data) =>
      err ? resolver.reject(err) : resolver.resolve(data)
    )
  );

module.exports = readFile;
