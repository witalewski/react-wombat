import { Task } from "folktale/concurrency/task";
import { renderTemplate } from "./renderTemplate";
import { readFile } from "./readFile";
import { writeFile } from "./writeFile";

export const createFileFromTemplate: (
  data: any,
  templatePath: string,
  filename: string
) => Task = (data, templatePath, filename) =>
  readFile(require.resolve(templatePath))
    .chain(template => renderTemplate(template, data))
    .chain(result => writeFile(data.path, filename, result));
