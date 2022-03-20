export enum ShipType {
    SHIP = "ship",
    CARGO_SHIP = "container",
}

export interface CustomerDataModel {
    name: string;
    arrive: number;
    leave: number;
    serve: number;
    type: ShipType;
}
