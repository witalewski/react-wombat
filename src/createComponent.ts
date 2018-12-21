import { of, Task } from "folktale/concurrency/task";
import { createFileFromTemplate } from "./createFileFromTemplate";
import { makeDirsForPath } from "./makeDirsForPath";

const addComponent: (data: componentData) => Task = data =>
  createFileFromTemplate(
    data,
    "../templates/components/Component.ejs",
    `${data.name}.js`
  );

const addComponentStyled: (data: componentData) => Task = data =>
  data.styled
    ? createFileFromTemplate(
        data,
        "../templates/components/Component.ejs",
        `${data.name}.js`
      )
    : of(true);

const addIndex: (data: componentData) => Task = data =>
  data.flat
    ? of(true)
    : createFileFromTemplate(
        data,
        "../templates/components/ComponentStyled.ejs",
        `${data.name}Styled.js`
      );

const addFiles: (data: componentData) => Task = data =>
  [addComponent(data), addComponentStyled(data), addIndex(data)].reduce(
    (acc, task) => acc.and(task),
    of(true)
  );

export const createComponent: (data: componentData) => Task = data => {
  return makeDirsForPath(data.path).chain(_ => addFiles(data));
};
