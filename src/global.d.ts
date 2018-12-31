interface Payload {
  name: string;
  path: string;
}

interface ReactComponentPayload extends Payload {
  connected: boolean;
  styled: boolean;
  flat: boolean;
  props: string[];
  stateProps: string[];
  actions: string[];
}

interface ReduxAction {
  name: string;
  params: string[];
  type: string;
}

interface ReduxActionsPayload extends Payload {
  actions: ReduxAction[];
  flat: boolean;
}

interface ReduxReducerPayload extends Payload {
  flat: boolean;
}
