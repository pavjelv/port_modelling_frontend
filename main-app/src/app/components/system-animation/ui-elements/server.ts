import {Crane, SERVER_STATE} from "./cranes/crane";

const SERVER_FIGURE_SIZE = 60;

export class Server {

  private readonly x: number;
  private readonly y: number;
  private crane: Crane;
  private _customerName: string;
  private _state: SERVER_STATE;
  private currentInterval;

  constructor(private ctx: CanvasRenderingContext2D, x: number, y: number) {
    this.crane = new Crane(ctx);
    this.x = x;
    this.y = y;
  }

  get customerName(): string {
    return this._customerName;
  }

  public serve(customerName: string): void {
    this._customerName = customerName;
    this._state = SERVER_STATE.BUSY;
    // this.draw();
  }

  public animateUnload(): void {
    this.clear();
    if (this.currentInterval) {
      clearInterval(this.currentInterval);
      this.currentInterval = null;
    }
    let size = 1.5;
    this.draw(size);
    this.currentInterval = setInterval(() => {
      this.clear();
      size -= 0.05;
      this.draw(size);
      if (size <= 0.3) {
        clearInterval(this.currentInterval);
      }
    }, 50);
  }

  public free(): void {
    this.clear();
    this._customerName = null;
    this._state = SERVER_STATE.FREE;
    this.draw();
  }

  public reset(): void {
    this._state = SERVER_STATE.IDLE;
    this.draw();
  }

  private draw(size?: number): void {
    this.crane.draw(this.x, this.y, SERVER_FIGURE_SIZE, this._state, size);
  }

  public clear(): void {
    this.crane.clear(this.x, this.y, SERVER_FIGURE_SIZE);
  }
}
