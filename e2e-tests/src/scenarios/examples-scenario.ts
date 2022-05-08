import {Selector} from "testcafe";
import { NavigationPanel } from "../page-models/navigation-panel";
import { DEFAULT_TIMEOUT } from "../constants/constants";

export class ExamplesScenario {
    static readonly toggleTreeButton = Selector(".examples-page-component .mat-icon-button");
    static readonly exampleLink = Selector("mat-tree-node");
    static readonly exampleView = Selector(".highcharts-view");

    static async openExample(t: TestController, title?: string) {
        await t.wait(DEFAULT_TIMEOUT);
        await NavigationPanel.navigateToTab("Примеры");
        await t.wait(DEFAULT_TIMEOUT);
        await t
            .expect(ExamplesScenario.toggleTreeButton.exists).ok()
        await t
            .click(ExamplesScenario.toggleTreeButton)
            .expect(ExamplesScenario.exampleLink.withText(title ?? "1").visible).ok();
        await t
            .click(ExamplesScenario.exampleLink.withText("1").find("a"))
            .expect(ExamplesScenario.exampleView.visible).ok();
    }
}
