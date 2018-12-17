const fs = require("fs");

const readFile = path =>
  new Promise((resolve, reject) =>
    fs.readFile(path, "utf8", (err, data) =>
      err ? reject(err) : resolve(data)
    )
  );

module.exports = readFile;
