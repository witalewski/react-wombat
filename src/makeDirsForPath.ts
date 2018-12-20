import mkdirp from "mkdirp";
import chalk from "chalk";
import { task, Task, Void } from "folktale/concurrency/task";

export const makeDirsForPath: (path: string) => Task = path =>
  task(
    (resolver: {
      resolve: (value: any) => Void;
      reject: (reason: any) => Void;
    }) =>
      mkdirp(path, (err: NodeJS.ErrnoException) => {
        if (err) {
          resolver.reject(err);
        } else {
          console.log("Directory", chalk.green(path), "created.");
          resolver.resolve(true);
        }
      })
  );
