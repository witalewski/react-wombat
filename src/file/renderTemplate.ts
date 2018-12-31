import ejs from "ejs";
import { task, Task, Void } from "folktale/concurrency/task";

export const renderTemplate: (
  template: string,
  data: ReactComponentPayload | ReduxActionsPayload | ReduxReducerPayload
) => Task = (template, data) =>
  task(
    (resolver: {
      resolve: (value: string) => Void;
      reject: (reason: string) => Void;
    }) =>
      ejs
        .render(template, data, { async: true })
        .then((result: string) => resolver.resolve(result))
        .catch((reason: string) => resolver.reject(reason))
  );
