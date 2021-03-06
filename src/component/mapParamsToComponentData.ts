import compose from "folktale/core/lambda/compose";

const addStatePropsAndActions: (
  connected: any
) => (data: ReactComponentPayload) => ReactComponentPayload = connected => data => {
  let stateProps: string[] = [],
    actions: string[] = [];
  if (typeof connected === "string") {
    [stateProps, actions] = connected
      .split("+")
      .map((s: string) => s.split(","));
  }
  return {
    ...data,
    stateProps,
    actions
  };
};

const addProps: (
  props: string
) => (data: ReactComponentPayload) => ReactComponentPayload = props => data => ({
  ...data,
  props: [
    ...(props ? props.split(",") : []),
    ...data.stateProps,
    ...data.actions
  ]
});

export const mapParamsToComponentData: (
  name: string,
  basePath: string,
  options: any
) => ReactComponentPayload = (name, basePath, options) =>
  compose(
    addProps(options.props),
    addStatePropsAndActions(options.connected)
  )({
    name,
    path: options.flat ? basePath : `${basePath}/${name}`,
    styled: Boolean(options.styled),
    flat: Boolean(options.flat),
    connected: Boolean(options.connected)
  });
