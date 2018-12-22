import { Task } from "folktale/concurrency/task";
import { renderTemplate } from "./renderTemplate";
import { readFile } from "./readFile";
import { writeFile } from "./writeFile";

export const createFileFromTemplate: (
  data: componentData | actionsData,
  templatePath: string,
  filename: string
) => Task = (data, templatePath, filename) =>
  readFile(require.resolve(templatePath))
    .chain((template: string) => renderTemplate(template, data))
    .chain((result: string) => writeFile(data.path, filename, result));
