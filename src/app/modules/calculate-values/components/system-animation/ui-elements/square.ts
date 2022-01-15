export class Square {
  constructor(protected ctx: CanvasRenderingContext2D) {}

  public draw(x: number, y: number, z: number, color: string): void {
    const prevStyle = this.ctx.fillStyle;
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, z, z);
    this.ctx.fillStyle = prevStyle;
  }

  public clear(x: number, y: number, z: number): void {
    this.ctx.clearRect(x, y, z, z);
  }
}
