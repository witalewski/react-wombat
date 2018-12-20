const fs = require("fs");
const { task } = require('folktale/concurrency/task');

const readFile = path =>
  task(resolver =>
    fs.readFile(path, "utf8", (err, data) =>
      err ? resolver.reject(err) : resolver.resolve(data)
    )
  );

module.exports = readFile;
