import { Task } from "folktale/concurrency/task";
import { createFileFromTemplate } from "../file/createFileFromTemplate";
import { makeDirsForPath } from "../file/makeDirsForPath";

const makeActionsFile: (data: actionsData) => Task = data =>
  createFileFromTemplate(
    data,
    "../../templates/state/actions.ejs",
    `${data.name}.js`
  );

export const createActions: (data: actionsData) => Task = data =>
  makeDirsForPath(data).chain(makeActionsFile);
