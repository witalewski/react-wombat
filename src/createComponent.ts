import { of, Task } from "folktale/concurrency/task";
import { createFileFromTemplate } from "./createFileFromTemplate";
import { makeDirsForPath } from "./makeDirsForPath";

export const createComponent: (data: any) => Task = data => {
  const tasks = [
    createFileFromTemplate(
      data,
      "../templates/components/index.ejs",
      `index.js`
    )
  ];
  if (!data.flat) {
    tasks.push(
      createFileFromTemplate(
        data,
        "../templates/components/Component.ejs",
        `${data.name}.js`
      )
    );
  }
  if (data.styled) {
    tasks.push(
      createFileFromTemplate(
        data,
        "../templates/components/ComponentStyled.ejs",
        `${data.name}Styled.js`
      )
    );
  }
  return makeDirsForPath(data.path).chain(_ =>
    tasks.reduce((acc, task) => acc.and(task), of(true))
  );
};
