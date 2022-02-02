import {Component, ElementRef, Inject, Input, OnChanges, OnInit, PLATFORM_ID, SimpleChanges, ViewChild} from "@angular/core";
import {Server} from "./ui-elements/server";
import {Customer} from "./ui-elements/customer";
import {SimulationService} from "../../services/simulation.service";
import {first} from "rxjs/operators";
import {SimulationResultModel} from "../../model/simulation/simulation-result.model";
import {isPlatformBrowser} from "@angular/common";
import {SimulationVariablesModel} from "../../model/simulation/simulation-variables.model";

const WIDTH = 600;
const HEIGHT = 300;
const WIDTH_POINT = WIDTH / 10;
const HEIGHT_POINT = HEIGHT / 5;

@Component({
  selector: "app-system-animation",
  templateUrl: "./system-animation.component.html",
  styleUrls: ["./system-animation.component.less"]
})
export class SystemAnimationComponent implements OnInit, OnChanges {

  @ViewChild("canvas", { static: true })
  canvas: ElementRef<HTMLCanvasElement>;

  @ViewChild("craneCanvas", { static: true })
  craneCanvas: ElementRef<HTMLCanvasElement>;

  @Input() variables: SimulationVariablesModel;

  public isBrowser = false;

  public width = WIDTH;
  public height = HEIGHT;

  private ctx: CanvasRenderingContext2D;
  private craneCtx: CanvasRenderingContext2D;

  private model: SimulationResultModel;
  private customers: Customer[];
  private servers: Server[];
  public currentTime = 0;

  constructor(private simulationService: SimulationService,
              @Inject(PLATFORM_ID) private platformId: unknown) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.ctx = this.canvas.nativeElement.getContext("2d");
    this.craneCtx = this.craneCanvas.nativeElement.getContext("2d");
    this.animate();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.variables && !changes.variables.isFirstChange()) {
      this.currentTime = 0;
      this.animate();
    }
  }

  private animate(): void {
    this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    this.craneCtx.clearRect(0, 0, WIDTH, HEIGHT);

    const server1 = new Server(this.craneCtx, 5 * WIDTH_POINT, 0.5 * HEIGHT_POINT);
    server1.reset();

    const server2 = new Server(this.craneCtx, 5 * WIDTH_POINT, 2 * HEIGHT_POINT);
    server2.reset();

    const server3 = new Server(this.craneCtx, 5 * WIDTH_POINT, 3.5 * HEIGHT_POINT);
    server3.reset();

    this.servers = [server1, server2, server3];

    this.simulationService.getModellingResult(this.variables).pipe(first()).subscribe((result) => {
      this.model = result;
      this.customers = this.model.customer_data.map((c) => new Customer(this.ctx, c.type, c.name, WIDTH_POINT, HEIGHT_POINT));
      this.onTimeChange(0);
      // const i = setInterval(() => {
      //   this.onTimeChange(this.currentTime);
      //   this.currentTime = this.currentTime + 1;
      //   if (this.currentTime >= this.time) {
      //     clearInterval(i);
      //   }
      // }, 4000);
    });
  }

  public onTimeChange(x: number): void {
    // this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
    // this.servers.forEach((s) => s.reset());

    const servedCustomers = this.model.customer_data
      .filter((c) => c.serve !== null && c.leave <= x)
      .reverse()
      .filter((_, i) => i < 3);
    servedCustomers.sort((c1, c2) => c2.leave - c1.leave);
    servedCustomers.forEach((c, i) => {
      const cust = this.customers.find((customer) => customer.customerName === c.name);
      this.servers.find((s) => s.customerName === cust.customerName)?.free();
      cust.success(i);
    });

    const servingCustomers = this.model.customer_data
      .filter((c) => c.serve !== null && c.serve <= x && c.leave > x);
    servingCustomers.forEach((c) => {
      const cust = this.customers.find((customer) => customer.customerName === c.name);
      let index = this.servers.findIndex((s) => s.customerName === cust.customerName);
      if (index === -1) {
        index = this.servers.findIndex((s) => !s.customerName);
      }
      this.servers[index].serve(cust.customerName);
      cust.serve(index, this.servers[index]);
    });

    const queuedCustomers = this.model.customer_data
      .filter((c) => c.arrive <= x && c.serve > x)
      .filter((_, i) => i < 4);
    queuedCustomers.sort((c1, c2) => c1.arrive - c2.arrive || c1.serve - c2.serve);
    queuedCustomers.forEach((c, i) => {
      const cust = this.customers.find((customer) => customer.customerName === c.name);
      this.servers.find((s) => s.customerName === cust.customerName)?.free();
      cust.queue(i + 1);
    });

    const rejectedCustomers = this.model.customer_data
      .filter((c) => c.serve === null && c.arrive <= x)
      .reverse()
      .filter((_, i) => i < 4);
    rejectedCustomers.sort((c1, c2) => c2.leave - c1.leave);
    rejectedCustomers.forEach((c, i) => this.customers.find((customer) => customer.customerName === c.name)?.leave(i + 1));
  }

}
