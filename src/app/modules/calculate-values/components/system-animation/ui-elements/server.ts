import {Customer} from "./customer";
import {Crane, SERVER_STATE} from "./crane";

const SERVER_FIGURE_SIZE = 60;

export class Server {

  private readonly x: number;
  private readonly y: number;
  private crane: Crane;
  private _customer: Customer;
  private _state: SERVER_STATE;

  constructor(private ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.crane = new Crane(ctx);
    this.x = x;
    this.y = y;
  }

  get customer(): Customer {
    return this._customer;
  }

  public serve(customer: Customer): void {
    this._customer = customer;
    this._state = SERVER_STATE.BUSY;
    this.draw();
  }

  public free(): void {
    this._customer = null;
    this._state = SERVER_STATE.FREE;
    this.draw();
  }

  public reset(): void {
    this._state = SERVER_STATE.IDLE;
    this.draw();
  }

  private draw(): void {
    // const img = new Image();
    // img.onload = () => {
    //   this.ctx.drawImage(img, this.x, this.y, 57, 55);
    // };
    // img.src = "/assets/pictures/cranes/crane.webp";
    this.crane.draw(this.x, this.y, SERVER_FIGURE_SIZE, this._state);
  }

  public clear(): void {
    // this.square.clear(this.x, this.y, SERVER_FIGURE_SIZE);
  }
}
