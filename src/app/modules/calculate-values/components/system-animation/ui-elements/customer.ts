import {CUSTOMER_STATE, Ship} from "./ship";
import {getRandomColor} from "./color-generation.helper";

const CUSTOMER_FIGURE_SIZE = 40;

export class Customer {

  private ship: Ship;
  public readonly customerName: string;
  private readonly widthPoint: number;
  private readonly heightPoint: number;
  private x = 0;
  private y = 0;
  private _state: CUSTOMER_STATE;

  constructor(private ctx: CanvasRenderingContext2D, customerName: string, widthPoint: number, heightPoint: number) {
    this.ship = new Ship(ctx, getRandomColor());
    this.customerName = customerName;
    this.widthPoint = widthPoint;
    this.heightPoint = heightPoint;
  }

  get state(): CUSTOMER_STATE {
    return this._state;
  }

  public queue(order: number): void {
    this.clear();
    this.x = this.widthPoint * (4 - order);
    this.y = this.heightPoint * 2.35;
    this._state = CUSTOMER_STATE.WAITING;
    this.draw();
  }

  private draw(): void {
    this.ship.draw(this.x, this.y, CUSTOMER_FIGURE_SIZE, this.state);
  }

  public leave(order: number): void {
    this.clear();
    this.x = this.widthPoint * (5 - order);
    this.y = this.heightPoint * 3.85;
    this._state = CUSTOMER_STATE.LEFT;
    this.draw();
  }

  public success(order: number): void {
    this.clear();
    this.x = this.widthPoint * (7 + order);
    this.y = this.heightPoint * 2.35;
    this._state = CUSTOMER_STATE.SERVED;
    this.draw();
  }

  public serve(serverNumber: number): void {
    this.clear();
    let serverLocation = 0.85;
    switch (serverNumber) {
      case 0:
        serverLocation = 0.85;
        break;
      case 1:
        serverLocation = 2.35;
        break;
      case 2:
        serverLocation = 3.85;
        break;
      default:
        break;
    }
    this.x = this.widthPoint * 4.8;
    this.y = this.heightPoint * serverLocation;
    this._state = CUSTOMER_STATE.SERVING;
    this.draw();
  }

  private clear(): void {
    // this.circle.clear(this.x, this.y, CUSTOMER_FIGURE_SIZE);
  }
}
