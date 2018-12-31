export const mapParamsToActionsData: (
  name: string,
  basePath: string,
  options: any
) => ReduxActionsPayload = (name, basePath, options) => ({
  name,
  path: options.flat ? basePath : `${basePath}/actions`,
  flat: options.flat,
  actions: options.actions.split(",").map(action => {
    const [name, ...params] = action.split(":");
    return {
      name,
      params,
      type: name.match(/([A-Z]?[a-z]+)/g).map(s => s.toUpperCase()) .join("_")
    };
  })
});
