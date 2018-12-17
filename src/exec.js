const childProcess = require("child_process");

const exec = (cmd, ...log) =>
  new Promise((resolve, reject) =>
    childProcess.exec(cmd, {}, (error, stdout, stderr) => {
      if (error || stderr) {
        console.log("Couldn't complete", chalk.red(cmd));
        reject(error || stdout);
      } else {
        console.log(...log);
        resolve(stdout);
      }
    })
  );

module.exports = exec;
