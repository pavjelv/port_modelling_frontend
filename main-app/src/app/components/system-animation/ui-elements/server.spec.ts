/* eslint-disable  @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call */
import { ServerState } from "./cranes/crane";
import { Server } from "./server";

describe("Server", () => {
    let server: Server;
    beforeEach(() => {
        const fakeContext = jasmine.createSpyObj("CanvasRenderingContext2D", ["clearRect", "fillStyle", "beginPath", "moveTo", "lineTo", "fill"]);
        server = new Server(fakeContext, 10, 20);
    });

    it("should return customer name", () => {
        server.serve("test name");
        expect(server.customerName).toEqual("test name");
    });

    it("should be busy on serve", () => {
        server.serve("test name");
        expect(server.customerName).toEqual("test name");
        expect((server as any)._state).toEqual(ServerState.BUSY);
    });

    it("should be free on free()", () => {
        server.free();
        expect((server as any)._state).toEqual(ServerState.FREE);
    });

    it("should be idle on reset()", () => {
        server.reset();
        expect((server as any)._state).toEqual(ServerState.IDLE);
    });

    it("should clear if animation exists", () => {
        spyOn(window, "clearInterval");
        (server as any).currentInterval = "123";
        server.animateUnload();
        expect(window.clearInterval).toHaveBeenCalled();
    });

    it("should create new interval", () => {
        server.animateUnload();
        expect((server as any).currentInterval).toBeTruthy();
    });
});
