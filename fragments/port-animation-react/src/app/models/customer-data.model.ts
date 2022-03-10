export enum ShipType {
  CARGO_SHIP = "ship",
  CONTAINER_SHIP = "container",
}

export interface CustomerDataModel {
  name: string;
  arrive: number;
  leave: number;
  serve: number;
  type: ShipType;
}
