import { of, Task } from "folktale/concurrency/task";
import { createFileFromTemplate } from "./createFileFromTemplate";
import { makeDirsForPath } from "./makeDirsForPath";

const makeComponentFile: (data: componentData) => Task = data =>
  createFileFromTemplate(
    data,
    "../templates/components/Component.ejs",
    `${data.name}.js`
  );

const makeComponentStyledFile: (data: componentData) => Task = data =>
  data.styled
    ? createFileFromTemplate(
        data,
        "../templates/components/ComponentStyled.ejs",
        `${data.name}Styled.js`
      )
    : of(true);

const makeIndexFile: (data: componentData) => Task = data =>
  data.flat
    ? of(true)
    : createFileFromTemplate(
        data,
        "../templates/components/index.ejs",
        `index.js`
      );

const makeFiles: (data: componentData) => Task = data =>
  [
    makeComponentFile(data),
    makeComponentStyledFile(data),
    makeIndexFile(data)
  ].reduce((acc, task) => acc.and(task));

export const createComponent: (data: componentData) => Task = data =>
  makeDirsForPath(data).chain(makeFiles);
