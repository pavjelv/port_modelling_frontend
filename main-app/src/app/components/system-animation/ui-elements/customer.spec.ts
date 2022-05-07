import { Customer } from "./customer";
import { ShipType } from "../../../model/customer-data.model";

describe("Customer", () => {
    let customer: Customer;
    beforeAll(() => {
        jasmine.clock().install();
    });

    afterAll(() => {
        jasmine.clock().uninstall();
    });

    beforeEach(() => {
        const fakeContext = jasmine.createSpyObj("CanvasRenderingContext2D", ["clearRect", "fillStyle", "beginPath", "moveTo", "lineTo", "fill", "fillRect", "fillText", "translate", "rotate"]);
        customer = new Customer(fakeContext, ShipType.CARGO_SHIP, "name", 10, 20);
    });

    it("should set queue num", () => {
        customer.queue(1);
        expect((customer as any).queueNum).toEqual(1);
    });

    it("should clear if animation exists", () => {
        spyOn(window, "clearInterval");
        (customer as any).currentInterval = "123";
        customer.queue(2);
        expect(window.clearInterval).toHaveBeenCalled();
    });

    it("should animate if queue is big", () => {
        spyOn(customer as any, "draw");
        customer.queue(4);
        jasmine.clock().tick(500);
        expect((customer as any).draw).toHaveBeenCalled();
    });

    it("should clear if customer did not leave", () => {
        customer.queue(4);
        spyOn(customer as any, "clear");
        customer.leave(1);
        expect((customer as any).clear).toHaveBeenCalled();
    });

    it("should end animation after leave", () => {
        spyOn(window, "clearInterval");
        customer.leave(1);
        jasmine.clock().tick(5000);
        expect(window.clearInterval).toHaveBeenCalled();
    });

    it("should animate on leave", () => {
        spyOn(customer as any, "draw");
        customer.leave(1);
        jasmine.clock().tick(500);
        expect((customer as any).draw).toHaveBeenCalled();
    });

    it("should not do anything if already left", () => {
        customer.leave(1);
        spyOn(customer as any, "clear");
        customer.leave(1);
        expect((customer as any).clear).toHaveBeenCalledTimes(0);
    });

    it("should not do anything if already served", () => {
        customer.success(1);
        spyOn(customer as any, "clear");
        customer.success(1);
        expect((customer as any).clear).toHaveBeenCalledTimes(0);
    });

    it("should animate unload with timeout", () => {
        const fakeServer = jasmine.createSpyObj("Server", ["animateUnload"]);
        customer.serve(1, fakeServer);
        jasmine.clock().tick(5000);
        expect(fakeServer.animateUnload).toHaveBeenCalledTimes(1);
    });

    it("should animate unload if already serving", () => {
        const fakeServer = jasmine.createSpyObj("Server", ["animateUnload"]);
        customer.serve(1, fakeServer);
        jasmine.clock().tick(5000);
        customer.serve(1, fakeServer);
        expect(fakeServer.animateUnload).toHaveBeenCalledTimes(2);
    });
});
