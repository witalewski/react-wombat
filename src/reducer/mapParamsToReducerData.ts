export const mapParamsToReducerData: (
  name: string,
  basePath: string,
  options: any
) => reducerData = (name, basePath, options) => ({
  name,
  path: options.flat ? basePath : `${basePath}/reducers`,
  flat: Boolean(options.flat)
});
