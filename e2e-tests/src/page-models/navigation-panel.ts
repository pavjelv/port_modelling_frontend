import {Selector, t} from "testcafe";

export class NavigationPanel {
    static readonly navigationItems = Selector(".common-header-mat-toolbar-content a");

    public static async navigateToTab(tabName: string) {
        await t
            .click(NavigationPanel.navigationItems.withText(tabName));
    }
}
