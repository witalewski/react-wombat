// import {} from "./global.d"

const getStatePropsAndActions: (options: any) => string[][] = options => {
  let stateProps: string[], actions: string[];
  if (typeof options.connected === "string") {
    [stateProps, actions] = options.connected
      .split("+")
      .map((s: string) => s.split(","));
  }
  stateProps = stateProps || [];
  actions = actions || [];
  return [stateProps, actions];
};

const getProps: (
  options: any,
  stateProps: string[],
  actions: string[]
) => string[] = (options, stateProps, actions) => [
  ...(options.props ? options.props.split(",") : []),
  ...stateProps,
  ...actions
];

const getConnected: (options: any) => boolean = (options: any) =>
  Boolean(options.connected);
const getFlat: (options: any) => boolean = (options: any) =>
  Boolean(options.flat);
const getStyled: (options: any) => boolean = (options: any) =>
  Boolean(options.styled);
const getPath: (options: any, basePath: string, name: string) => string = (
  options,
  basePath,
  name
) => (options.flat ? basePath : `${basePath}/${name}`);

export const mapParamsToComponentData: (
  name: string,
  basePath: string,
  options: string
) => componentData = (name, basePath, options) => {
  const [stateProps, actions]: string[][] = getStatePropsAndActions(options);
  const props: string[] = getProps(options, stateProps, actions);

  const connected: boolean = getConnected(options);
  const flat: boolean = getFlat(options);
  const styled: boolean = getStyled(options);
  const path: string = getPath(options, basePath, name);

  return {
    name,
    path,
    connected,
    styled,
    flat,
    props,
    stateProps,
    actions
  };
};
