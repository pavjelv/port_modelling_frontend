import {CUSTOMER_STATE, Ship} from "./ship";
import {getRandomColor} from "./color-generation.helper";
import {Server} from "./server";

const CUSTOMER_FIGURE_SIZE = 40;

export class Customer {

  private ship: Ship;
  public readonly customerName: string;
  private readonly widthPoint: number;
  private readonly heightPoint: number;
  private x = 0;
  private y = 0;
  private queueNum = 4;
  private serverNum = 0;
  private server: Server;
  private currentInterval;
  private _state: CUSTOMER_STATE;

  constructor(private ctx: CanvasRenderingContext2D, customerName: string, widthPoint: number, heightPoint: number) {
    this.ship = new Ship(ctx, getRandomColor(), customerName);
    this.customerName = customerName;
    this.widthPoint = widthPoint;
    this.heightPoint = heightPoint;
  }

  get state(): CUSTOMER_STATE {
    return this._state;
  }

  public queue(order: number): void {
    this.clear();
    if (!this._state) {
      this.queueNum = 4 + order;
    }
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = null;
    }
    if (this.queueNum > order) {
      let dx = this.queueNum;
      this.x = this.widthPoint * (4 - dx);
      this.currentInterval = setInterval(() => {
        this.clear();
        dx -= 0.1;
        this.x = this.widthPoint * (4 - dx);
        this.draw();
        if (dx <= order) {
          clearInterval(this.currentInterval);
        }
      }, 50);
    }
    this.y = this.heightPoint * 2.35;
    this.queueNum = order;
    this._state = CUSTOMER_STATE.WAITING;
    this.draw();
  }

  private draw(angle?: number): void {
    this.ship.draw(this.x, this.y, CUSTOMER_FIGURE_SIZE, this.state, angle);
  }

  public leave(order: number): void {
    if (this._state === CUSTOMER_STATE.LEFT) {
      return;
    }
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = null;
    }
    this.clear();
    let dx = 0.3;
    let dy = 3;
    this.x = this.widthPoint * dx - order * this.widthPoint / 2;
    this.y = this.heightPoint * dy;
    this._state = CUSTOMER_STATE.LEFT;
    this.draw();

    let angle = 0;
    this.currentInterval = setInterval(() => {
      this.clear(angle);
      dx += 0.1;
      angle = 0;
      if (dx > 2) {
        angle = Math.PI / 4;
        dy += 0.1;
      }
      this.x = this.widthPoint * dx - order * this.widthPoint / 2;
      this.y = this.heightPoint * dy;
      if (dx >= 4) {
        clearInterval(this.currentInterval);
      }
      this.draw(angle);
    }, 50);
  }

  public success(order: number): void {
    if (this._state === CUSTOMER_STATE.SERVED) {
      return;
    }
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = null;
    }
    this.clear();
    let dx = 4.8;
    let serverLocation = 0.85;
    switch (this.serverNum) {
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

    let dy = serverLocation;

    this.x = this.widthPoint * dx;
    this.y = this.heightPoint * dy;
    this._state = CUSTOMER_STATE.SERVED;
    this.draw();
    let angle = 0;
    this.currentInterval = setInterval(() => {
      this.clear(angle);
      dx += 0.1;
      angle = 0;
      if (dx < 5.5) {
        if (this.serverNum === 2 && dy > 2.25) {
          angle = -Math.PI / 4;
          dy -= 0.1;
        } else if (this.serverNum === 0 && dy < 2.35) {
          angle = Math.PI / 4;
          dy += 0.1;
        }
      }
      this.x = this.widthPoint * dx;
      this.y = this.heightPoint * dy;
      if (dx >= 10) {
        clearInterval(this.currentInterval);
      }
      this.draw(angle);
    }, 50);
  }

  public serve(serverNumber: number, server: Server): void {
    if (this.state === CUSTOMER_STATE.SERVING) {
      this.server.animateUnload();
      return;
    }
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = null;
    }
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
    this.serverNum = serverNumber;
    this.server = server;
    let dx = 0.8;
    let dy = 2.35;
    if (this.queueNum) {
      dx = 4 - this.queueNum;
    }
    this.x = this.widthPoint * dx;
    this.y = this.heightPoint * dy;
    this._state = CUSTOMER_STATE.WAITING;
    let angle = 0;
    this.draw();
    this.currentInterval = setInterval(() => {
      this.clear(angle);
      angle = 0;
      dx += 0.1;
      if (dx > 3) {
        if (serverNumber === 0 && dy > serverLocation) {
          angle = -Math.PI / 4;
          dy -= 0.1;
        } else if (serverNumber === 2 && dy < serverLocation) {
          angle = Math.PI / 4;
          dy += 0.1;
        }
      }
      this.x = this.widthPoint * dx;
      this.y = this.heightPoint * dy;
      if (dx >= 4.8) {
        clearInterval(this.currentInterval);
        this._state = CUSTOMER_STATE.SERVING;
        server.animateUnload();
      }
      this.draw(angle);
    }, 50);
  }

  private clear(angle?: number): void {
    this.ship.clear(this.x, this.y, CUSTOMER_FIGURE_SIZE, angle);
  }
}
