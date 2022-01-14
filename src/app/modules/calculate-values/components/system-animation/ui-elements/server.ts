import {Square} from "./square";

export enum SERVER_STATE {
  BUSY = "red",
  FREE = "green"
}

const SERVER_FIGURE_SIZE = 60;

export class Server {

  private square: Square;

  constructor(private ctx: CanvasRenderingContext2D) {
    this.square = new Square(ctx);
  }

  public drawServer(x: number, y: number, state: SERVER_STATE): void {
    this.square.draw(x, y, SERVER_FIGURE_SIZE, state);
  }
}
