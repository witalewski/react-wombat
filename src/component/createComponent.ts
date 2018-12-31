import { of, Task } from "folktale/concurrency/task";
import { createFileFromTemplate } from "../file/createFileFromTemplate";
import { makeDirsForPath } from "../file/makeDirsForPath";

const makeComponentFile: (data: ReactComponentPayload) => Task = data =>
  createFileFromTemplate(
    data,
    "../../templates/components/Component.ejs",
    `${data.name}.js`
  );

const makeComponentStyledFile: (data: ReactComponentPayload) => Task = data =>
  data.styled
    ? createFileFromTemplate(
        data,
        "../../templates/components/ComponentStyled.ejs",
        `${data.name}Styled.js`
      )
    : of(true);

const makeIndexFile: (data: ReactComponentPayload) => Task = data =>
  data.flat
    ? of(true)
    : createFileFromTemplate(
        data,
        "../../templates/components/index.ejs",
        `index.js`
      );

const makeFiles: (data: ReactComponentPayload) => Task = data =>
  [
    makeComponentFile(data),
    makeComponentStyledFile(data),
    makeIndexFile(data)
  ].reduce((acc, task) => acc.and(task));

export const createComponent: (data: ReactComponentPayload) => Task = data =>
  makeDirsForPath(data).chain(makeFiles);
