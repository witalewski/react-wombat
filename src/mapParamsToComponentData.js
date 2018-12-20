const getStatePropsAndActions = options => {
  let stateProps, actions;
  if (typeof options.connected === "string") {
    [stateProps, actions] = options.connected.split("+").map(s => s.split(","));
  }
  stateProps = stateProps || [];
  actions = actions || [];
  return [stateProps, actions];
};

const getProps = (options, stateProps, actions) => [
  ...(options.props ? options.props.split(",") : []),
  ...stateProps,
  ...actions
];

const getConnected = options => Boolean(options.connected);
const getFlat = options => Boolean(options.flat);
const getStyled = options => Boolean(options.styled);
const getPath = (options, basePath, name) =>
  options.flat ? basePath : `${basePath}/${name}`;

const mapParamsToComponentData = (name, basePath, options) => {
  const [stateProps, actions] = getStatePropsAndActions(options);
  const props = getProps(options, stateProps, actions);

  const connected = getConnected(options);
  const flat = getFlat(options);
  const styled = getStyled(options);
  const path = getPath(options, basePath, name);

  return {
    name,
    path,
    connected,
    styled,
    props,
    stateProps,
    actions,
    flat
  };
};

module.exports = mapParamsToComponentData;
