import {Selector} from "testcafe";
import { NavigationPanel } from "../page-models/navigation-panel";
import { DEFAULT_TIMEOUT } from "../constants/constants";

export class ExamplesScenario {
    static readonly toggleTreeButton = Selector(".examples-page-component .mat-icon-button");
    static readonly exampleLink = Selector("#queue-1");
    static readonly exampleView = Selector(".highcharts-view");

    static async openExample(t: TestController) {
        await t.wait(DEFAULT_TIMEOUT);
        await NavigationPanel.navigateToTab("header-examples");
        await t.wait(DEFAULT_TIMEOUT);
        await t
            .expect(ExamplesScenario.toggleTreeButton.exists).ok()
        await t
            .click(ExamplesScenario.toggleTreeButton)
            .expect(ExamplesScenario.exampleLink.visible).ok();
        await t
            .click(ExamplesScenario.exampleLink)
            .expect(ExamplesScenario.exampleView.visible).ok();
    }
}
