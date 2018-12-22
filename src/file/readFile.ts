import fs from "fs";
import { task, Task, Void } from "folktale/concurrency/task";

export const readFile: (path: string) => Task = path =>
  task(
    (resolver: {
      resolve: (value: any) => Void;
      reject: (reason: any) => Void;
    }) =>
      fs.readFile(path, "utf8", (err: NodeJS.ErrnoException, data: any) =>
        err ? resolver.reject(err) : resolver.resolve(data)
      )
  );
