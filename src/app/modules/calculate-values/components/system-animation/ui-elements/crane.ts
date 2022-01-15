export enum SERVER_STATE {
  BUSY = "red",
  FREE = "green",
  IDLE = "gray",
}

export class Crane {
  constructor(protected ctx: CanvasRenderingContext2D) {}

  public draw(x: number, y: number, z: number, state: SERVER_STATE): void {
    const p = z / 5;
    const ctx = this.ctx;

    this.ctx.fillStyle = "orange";
    // bottom of the crane
    ctx.beginPath();
    ctx.moveTo(x + p * 3.5, y + p * 4);
    ctx.lineTo(x + p * 5, y + p * 4);
    ctx.lineTo(x + p * 5, y + p * 5);
    ctx.lineTo(x + p * 3, y + p * 5);
    ctx.lineTo(x + p * 3, y + p * 4.5);
    ctx.lineTo(x + p * 3.5, y + p * 4.5);
    ctx.lineTo(x + p * 3.5, y + p * 4);

    // vertical beam
    ctx.moveTo(x + p * 4, y + p * 4);
    ctx.lineTo(x + p * 4.5, y + p * 4);
    ctx.lineTo(x + p * 4.5, y + p * 0.5);
    ctx.lineTo(x + p * 4, y + p * 0.5);
    ctx.lineTo(x + p * 4, y + p * 4);

    // horizontal beam
    ctx.moveTo(x + p * 4, y + p);
    ctx.lineTo(x, y + p);
    ctx.lineTo(x, y + p * 1.5);
    ctx.lineTo(x + p * 0.5, y + p * 1.5);
    ctx.lineTo(x + p * 0.5, y + p * 1.75);
    ctx.lineTo(x + p * 0.75, y + p * 1.75);
    ctx.lineTo(x + p * 0.75, y + p * 2.5);
    ctx.lineTo(x + p, y + p * 2.5);
    ctx.lineTo(x + p, y + p * 1.75);
    ctx.lineTo(x + p * 1.25, y + p * 1.75);
    ctx.lineTo(x + p * 1.25, y + p * 1.5);
    ctx.lineTo(x + p * 4, y + p * 1.5);
    ctx.fill();

    if (state === SERVER_STATE.BUSY) {
      // cargo
      ctx.fillStyle = "black";
      ctx.fillRect(x + p * 0.5, y + p * 2.5, p * 0.75, p * 0.5);
    }
  }

  public clear(x: number, y: number, z: number): void {
    this.ctx.clearRect(x, y, z, z);
  }
}
