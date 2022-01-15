export class Circle {
  constructor(protected ctx: CanvasRenderingContext2D) {}

  public draw(x: number, y: number, radius: number, color: string): void {
    const prevStyle = this.ctx.fillStyle;
    this.ctx.beginPath();
    this.ctx.arc(x, y, radius, 0, Math.PI * 2, true);
    this.ctx.closePath();
    this.ctx.fillStyle = color;
    this.ctx.fill();
    this.ctx.fillStyle = prevStyle;
  }

  public clear(x: number, y: number, z: number): void {
    this.ctx.clearRect(x - z, y - z, z * 2, z * 2);
  }
}
