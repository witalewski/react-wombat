import { Task } from "folktale/concurrency/task";
import { createFileFromTemplate } from "./createFileFromTemplate";
import { makeDirsForPath } from "./makeDirsForPath";

const makeActionsFile: (data: actionsData) => Task = data =>
  createFileFromTemplate(
    data,
    "../templates/state/actions.ejs",
    `${data.name}.js`
  );

export const createActions: (data: actionsData) => Task = data =>
  makeDirsForPath(data).chain(makeActionsFile);
