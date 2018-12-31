import { Task } from "folktale/concurrency/task";
import { createFileFromTemplate } from "../file/createFileFromTemplate";
import { makeDirsForPath } from "../file/makeDirsForPath";

const makeReducerFile: (data: ReduxReducerPayload) => Task = data =>
  createFileFromTemplate(
    data,
    "../../templates/state/reducer.ejs",
    `${data.name}.js`
  );

export const createReducer: (data: ReduxReducerPayload) => Task = data =>
  makeDirsForPath(data).chain(makeReducerFile);
