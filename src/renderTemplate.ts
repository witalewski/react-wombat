import ejs from "ejs";
import { task, Void } from "folktale/concurrency/task";

export const renderTemplate: (template: any, data: any) => any = (
  template,
  data
) =>
  task(
    (resolver: {
      resolve: (value: any) => Void;
      reject: (reason: any) => Void;
    }) =>
      ejs
        .render(template, data, { async: true })
        .then((result: string) => resolver.resolve(result))
        .catch((reason: string) => resolver.reject(reason))
  );
