export enum CUSTOMER_STATE {
  WAITING = "gray",
  LEFT = "red",
  SERVING = "yellow",
  SERVED = "green",
}

export class Ship {
  constructor(protected ctx: CanvasRenderingContext2D, private color: string) {}

  public draw(x: number, y: number, z: number, state: CUSTOMER_STATE, angle?: number): void {
    const p = z / 5;
    const ctx = this.ctx;

    if (angle) {
      ctx.translate(x + z / 2, y + z / 2);
      ctx.rotate(angle);
      ctx.translate(-x - z / 2, -y - z / 2);
    }

    ctx.fillStyle = this.color;
    // bottom of the ship
    ctx.beginPath();
    ctx.moveTo(x, y + p * 4);
    ctx.lineTo(x + p * 5, y + p * 4);
    ctx.lineTo(x + p * 4, y + p * 5);
    ctx.lineTo(x + p / 2, y + p * 5);
    ctx.lineTo(x, y + p * 4.5);
    ctx.lineTo(x, y + p * 4);

    // top of the ship
    ctx.moveTo(x + p / 2, y + p * 4);
    ctx.lineTo(x + p / 2, y + p * 2.5);
    ctx.lineTo(x + p * 3 / 4, y + p * 2.5);
    ctx.lineTo(x + p * 3 / 4, y + p * 2);
    ctx.lineTo(x + p * 5 / 4, y + p * 2);
    ctx.lineTo(x + p * 5 / 4, y + p * 2.5);
    ctx.lineTo(x + p * 1.5, y + p * 2.5);
    ctx.lineTo(x + p * 1.5, y + p * 4);
    ctx.fill();

    if (state !== CUSTOMER_STATE.SERVED) {
      this.fillCargo(x, y, z, state);
    }

    if (angle) {
      ctx.translate(x + z / 2, y + z / 2);
      ctx.rotate(-angle);
      ctx.translate(-x - z / 2, -y - z / 2);
    }
  }

  private fillCargo(x: number, y: number, z: number, state: CUSTOMER_STATE): void {
    const ctx = this.ctx;
    const p = z / 5;
    ctx.fillStyle = "black";

    ctx.beginPath();
    // first cargo line
    ctx.moveTo(x + p * 1.6, y + p * 4);
    ctx.lineTo(x + p * 1.6, y + p * 3.5);
    ctx.lineTo(x + p * 2.6, y + p * 3.5);
    ctx.lineTo(x + p * 2.6, y + p * 4);

    ctx.moveTo(x + p * 2.7, y + p * 4);
    ctx.lineTo(x + p * 2.7, y + p * 3.5);
    ctx.lineTo(x + p * 3.7, y + p * 3.5);
    ctx.lineTo(x + p * 3.7, y + p * 4);

    ctx.moveTo(x + p * 3.8, y + p * 4);
    ctx.lineTo(x + p * 3.8, y + p * 3.5);
    ctx.lineTo(x + p * 4.8, y + p * 3.5);
    ctx.lineTo(x + p * 4.8, y + p * 4);

    if (state !== CUSTOMER_STATE.SERVING) {
      // second cargo line
      ctx.moveTo(x + p * 1.6, y + p * 3.4);
      ctx.lineTo(x + p * 1.6, y + p * 2.9);
      ctx.lineTo(x + p * 2.6, y + p * 2.9);
      ctx.lineTo(x + p * 2.6, y + p * 3.4);

      ctx.moveTo(x + p * 2.7, y + p * 3.4);
      ctx.lineTo(x + p * 2.7, y + p * 2.9);
      ctx.lineTo(x + p * 3.7, y + p * 2.9);
      ctx.lineTo(x + p * 3.7, y + p * 3.4);
    }

    ctx.fill();
  }

  public clear(x: number, y: number, z: number): void {
    this.ctx.clearRect(x, y, z, z);
  }
}
