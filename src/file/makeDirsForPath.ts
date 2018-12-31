import mkdirp from "mkdirp";
import chalk from "chalk";
import { task, Task, Void } from "folktale/concurrency/task";

export const makeDirsForPath: (
  data: Payload
) => Task = data =>
  task(
    (resolver: {
      resolve: (value: any) => Void;
      reject: (reason: any) => Void;
    }) =>
      mkdirp(data.path, (err: NodeJS.ErrnoException) => {
        if (err) {
          resolver.reject(err);
        } else {
          console.log("Directory", chalk.green(data.path), "created.");
          resolver.resolve(data);
        }
      })
  );
