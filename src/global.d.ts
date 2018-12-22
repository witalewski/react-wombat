interface componentData {
  name: string;
  path: string;
  connected: boolean;
  styled: boolean;
  flat: boolean;
  props: string[];
  stateProps: string[];
  actions: string[];
}

interface action {
  name: string;
  params: string[];
  type: string;
}

interface actionsData {
  name: string;
  path: string;
  actions: action[];
  flat: boolean;
}

interface reducerData {
  name: string;
  path: string;
  flat: boolean;
}
