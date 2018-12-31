import { Task } from "folktale/concurrency/task";
import { createFileFromTemplate } from "../file/createFileFromTemplate";
import { makeDirsForPath } from "../file/makeDirsForPath";

const makeActionsFile: (data: ReduxActionsPayload) => Task = data =>
  createFileFromTemplate(
    data,
    "../../templates/state/actions.ejs",
    `${data.name}.js`
  );

export const createActions: (data: ReduxActionsPayload) => Task = data =>
  makeDirsForPath(data).chain(makeActionsFile);
