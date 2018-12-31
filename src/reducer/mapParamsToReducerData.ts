export const mapParamsToReducerData: (
  name: string,
  basePath: string,
  options: any
) => ReduxReducerPayload = (name, basePath, options) => ({
  name,
  path: options.flat ? basePath : `${basePath}/reducers`,
  flat: Boolean(options.flat)
});
