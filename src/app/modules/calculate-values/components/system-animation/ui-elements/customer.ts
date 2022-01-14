import {Circle} from "./circle";

export enum CUSTOMER_STATE {
  WAITING = "gray",
  LEFT = "red",
  SERVING = "yellow",
  SERVED = "green",
}

const CUSTOMER_FIGURE_SIZE = 25;

export class Customer {

  private circle: Circle;
  private customerName: string;

  constructor(private ctx: CanvasRenderingContext2D, customerName: string) {
    this.circle = new Circle(ctx);
    this.customerName = customerName;
  }

  public drawCustomer(x: number, y: number, state: CUSTOMER_STATE): void {
    this.circle.draw(x, y, CUSTOMER_FIGURE_SIZE, state);
    const prevStyle = this.ctx.fillStyle;
    this.ctx.font = "20pt Calibri";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.customerName, x, y + 10);
    this.ctx.fillStyle = prevStyle;
  }
}
