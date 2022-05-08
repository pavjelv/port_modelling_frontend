import { cleanup, render, screen } from "@testing-library/react";
import React from "react";
import renderer from "react-test-renderer";

import ShipImage from "../src/app/components/ship";
import { CustomerState } from "../src/app/models/animation-properties.model";
import { ShipType } from "../src/app/models/customer-data.model";

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
// unmount and cleanup DOM after the test is finished.
describe("Ship Image Component", () => {
    afterEach(cleanup);

    it("renders without crashing", () => {
        const shipName = "NAME";
        render(<ShipImage color={"13"} serversCount={2} serverNum={1} name={shipName} type={ShipType.CONTAINER_SHIP} customerState={CustomerState.LEFT} />);

        expect(screen.getAllByTitle(shipName)).toBeDefined();
    });
});
