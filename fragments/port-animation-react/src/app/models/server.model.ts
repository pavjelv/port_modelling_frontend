export interface ServerModel {
  order: number;
  type: SERVER_TYPE;
}

export enum SERVER_TYPE {
  CONTAINER = "container",
  CARGO = "cargo",
}
