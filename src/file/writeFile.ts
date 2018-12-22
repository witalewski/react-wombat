import fs from "fs";
import chalk from "chalk";
import { task, Void } from "folktale/concurrency/task";

export const writeFile: (
  path: string,
  filename: string,
  contents: string
) => any = (path, filename, contents) =>
  task(
    (resolver: {
      resolve: (value: any) => Void;
      reject: (reason: any) => Void;
    }) =>
      fs.writeFile(
        `${path}/${filename}`,
        contents,
        (err: NodeJS.ErrnoException) => {
          if (err) {
            resolver.reject(err);
          } else {
            console.log("File", chalk.green(filename), "written.");
            resolver.resolve(true);
          }
        }
      )
  );
