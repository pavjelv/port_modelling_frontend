export enum CustomerState {
  WAITING = "gray",
  LEFT = "red",
  SERVING = "yellow",
  SERVED = "green",
}

export interface Vessel {
  draw(x: number, y: number, z: number, state: CustomerState, angle?: number): void;
  clear(x: number, y: number, z: number, angle?: number): void;
}
