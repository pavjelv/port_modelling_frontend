import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {Server, SERVER_STATE} from "./ui-elements/server";
import {Customer, CUSTOMER_STATE} from "./ui-elements/customer";

const WIDTH = 600;
const HEIGHT = 300;
const WIDTH_POINT = WIDTH / 10;
const HEIGHT_POINT = HEIGHT / 5;

@Component({
  selector: "app-system-animation",
  templateUrl: "./system-animation.component.html",
  styleUrls: ["./system-animation.component.less"]
})
export class SystemAnimationComponent implements OnInit {

  @ViewChild("canvas", { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  public width = WIDTH;
  public height = HEIGHT;

  private ctx: CanvasRenderingContext2D;

  constructor() { }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.animate();
  }

  private draw(i: number): void {
    const server = new Server(this.ctx);
    server.drawServer(5 * WIDTH_POINT, 0.5 * HEIGHT_POINT, i % 2 === 0 ? SERVER_STATE.BUSY : SERVER_STATE.FREE);
    server.drawServer(5 * WIDTH_POINT, 2 * HEIGHT_POINT, SERVER_STATE.BUSY);
    server.drawServer(5 * WIDTH_POINT, 3.5 * HEIGHT_POINT, SERVER_STATE.FREE);

    new Customer(this.ctx, "9").drawCustomer(5.5 * WIDTH_POINT, 2.5 * HEIGHT_POINT, CUSTOMER_STATE.SERVING);

    new Customer(this.ctx, "0").drawCustomer(WIDTH_POINT, 2.5 * HEIGHT_POINT, CUSTOMER_STATE.WAITING);
    new Customer(this.ctx, "1").drawCustomer(2 * WIDTH_POINT, 2.5 * HEIGHT_POINT, CUSTOMER_STATE.WAITING);
    new Customer(this.ctx, "3").drawCustomer(3 * WIDTH_POINT, 2.5 * HEIGHT_POINT, CUSTOMER_STATE.WAITING);
    new Customer(this.ctx, "4").drawCustomer(4 * WIDTH_POINT, 2.5 * HEIGHT_POINT, CUSTOMER_STATE.WAITING);

    new Customer(this.ctx, "5").drawCustomer(7 * WIDTH_POINT, 2.5 * HEIGHT_POINT, CUSTOMER_STATE.SERVED);
    new Customer(this.ctx, "6").drawCustomer(8 * WIDTH_POINT, 2.5 * HEIGHT_POINT, CUSTOMER_STATE.SERVED);

    new Customer(this.ctx, "7").drawCustomer(WIDTH_POINT, 4 * HEIGHT_POINT, CUSTOMER_STATE.LEFT);
  }

  private animate(): void {
    const max = 20;
    let x = 0;
    const i = setInterval(() => {
      this.draw(x);
      x++;
      if (x >= max) {
        clearInterval(i);
      }
    }, 1000);
  }

}
