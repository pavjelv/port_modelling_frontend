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
  public readonly customerName: string;
  private readonly widthPoint: number;
  private readonly heightPoint: number;
  private x = 0;
  private y = 0;
  private _state: CUSTOMER_STATE;

  constructor(private ctx: CanvasRenderingContext2D, customerName: string, widthPoint: number, heightPoint: number) {
    this.circle = new Circle(ctx);
    this.customerName = customerName;
    this.widthPoint = widthPoint;
    this.heightPoint = heightPoint;
  }

  get state(): CUSTOMER_STATE {
    return this._state;
  }

  public queue(order: number): void {
    this.clear();
    this.x = this.widthPoint * (5 - order);
    this.y = this.heightPoint * 2.5;
    this._state = CUSTOMER_STATE.WAITING;
    this.draw();
  }

  private draw(): void {
    this.circle.draw(this.x, this.y, CUSTOMER_FIGURE_SIZE, this.state);
    const prevStyle = this.ctx.fillStyle;
    this.ctx.font = "20pt Calibri";
    this.ctx.fillStyle = "black";
    this.ctx.textAlign = "center";
    this.ctx.fillText(this.customerName, this.x, this.y + 10);
    this.ctx.fillStyle = prevStyle;
  }

  public leave(order: number): void {
    this.clear();
    this.x = this.widthPoint * (5 - order);
    this.y = this.heightPoint * 4;
    this._state = CUSTOMER_STATE.LEFT;
    this.draw();
  }

  public success(order: number): void {
    this.clear();
    this.x = this.widthPoint * (7 + order);
    this.y = this.heightPoint * 2.5;
    this._state = CUSTOMER_STATE.SERVED;
    this.draw();
  }

  public serve(serverNumber: number): void {
    this.clear();
    let serverLocation = 1;
    switch (serverNumber) {
      case 0:
        serverLocation = 1;
        break;
      case 1:
        serverLocation = 2.5;
        break;
      case 2:
        serverLocation = 4;
        break;
      default:
        break;
    }
    this.x = this.widthPoint * 5.5;
    this.y = this.heightPoint * serverLocation;
    this._state = CUSTOMER_STATE.SERVING;
    this.draw();
  }

  private clear(): void {
    // this.circle.clear(this.x, this.y, CUSTOMER_FIGURE_SIZE);
  }
}
