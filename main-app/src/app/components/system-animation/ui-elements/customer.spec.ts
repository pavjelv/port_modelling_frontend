import { Customer } from "./customer";
import { ShipType } from "../../../model/customer-data.model";

describe("Customer", () => {
    let customer: Customer;
    beforeEach(() => {
        const fakeContext = jasmine.createSpyObj("CanvasRenderingContext2D", ["clearRect", "fillStyle", "beginPath", "moveTo", "lineTo", "fill", "fillRect", "fillText"]);
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
        customer.queue(4);
        spyOn(window, "setInterval");
        customer.queue(2);
        expect(window.setInterval).toHaveBeenCalled();
    });

    it("should clear if customer did not leave", () => {
        customer.queue(4);
        spyOn(customer as any, "clear");
        customer.leave(1);
        expect((customer as any).clear).toHaveBeenCalled();
    });

    it("should not do anything if already left", () => {
        customer.leave(1);
        spyOn(customer as any, "clear");
        customer.leave(1);
        expect((customer as any).clear).toHaveBeenCalledTimes(0);
    });
});
