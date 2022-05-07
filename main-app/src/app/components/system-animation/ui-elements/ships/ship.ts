/* eslint-disable no-mixed-operators */
import { CustomerState } from "./vessel";

export class Ship {
    constructor(protected ctx: CanvasRenderingContext2D, private color: string, private name: string) {}

    public draw(x: number, y: number, z: number, state: CustomerState, angle?: number): void {
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
        ctx.lineTo(x + (p * 3) / 4, y + p * 2.5);
        ctx.lineTo(x + (p * 3) / 4, y + p * 2);
        ctx.lineTo(x + (p * 5) / 4, y + p * 2);
        ctx.lineTo(x + (p * 5) / 4, y + p * 2.5);
        ctx.lineTo(x + p * 1.5, y + p * 2.5);
        ctx.lineTo(x + p * 1.5, y + p * 4);
        ctx.fill();

        if (state !== CustomerState.SERVED) {
            this.fillCargo(x, y, z, state);
        }

        ctx.fillStyle = "white";
        ctx.font = "10px calibri";
        ctx.fillText(this.name, x + p * 0.7, y + p * 4.95);

        if (angle) {
            ctx.translate(x + z / 2, y + z / 2);
            ctx.rotate(-angle);
            ctx.translate(-x - z / 2, -y - z / 2);
        }
    }

    private fillCargo(x: number, y: number, z: number, state: CustomerState): void {
        const ctx = this.ctx;
        const p = z / 5;
        ctx.fillStyle = "black";

        ctx.beginPath();
        // first cargo line
        ctx.fillRect(x + p * 1.6, y + p * 3.5, p, p * 0.5);
        ctx.fillRect(x + p * 2.7, y + p * 3.5, p, p * 0.5);
        ctx.fillRect(x + p * 3.8, y + p * 3.5, p, p * 0.5);

        if (state !== CustomerState.SERVING) {
            // second cargo line
            ctx.fillRect(x + p * 1.6, y + p * 2.9, p, p * 0.5);

            ctx.fillRect(x + p * 2.7, y + p * 2.9, p, p * 0.5);
        }

        ctx.fill();
    }

    public clear(x: number, y: number, z: number, angle?: number): void {
        // this.ctx.clearRect(x, y, z, z);
        const p = z / 5;
        const ctx = this.ctx;

        if (angle) {
            ctx.translate(x + z / 2, y + z / 2);
            ctx.rotate(angle);
            ctx.translate(-x - z / 2, -y - z / 2);
        }

        ctx.clearRect(x, y + p * 1.9, p * 5, p * 3.2);
        // ctx.clearRect(x + p * 0.5, y + p * 2, p, p * 2);
        // ctx.clearRect(x + p * 1.6, y + p * 3.4, p * 3, p * 2);

        if (angle) {
            ctx.translate(x + z / 2, y + z / 2);
            ctx.rotate(-angle);
            ctx.translate(-x - z / 2, -y - z / 2);
        }
    }
}
