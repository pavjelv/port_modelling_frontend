import {Selector} from "testcafe";
import { DEFAULT_TIMEOUT } from "../constants/constants";

export class HomepageScenario {
    static readonly headlineLink = Selector(".headline__hint :first-child");
    static readonly infoDialog = Selector("mat-dialog-container");
    static readonly closeDialogButton = Selector("mat-dialog-actions button");

    static async openInfoPopover(t: TestController, title?: string) {
        await t.wait(DEFAULT_TIMEOUT);
        await t
            .expect(HomepageScenario.headlineLink.exists).ok();
        await t
            .click(HomepageScenario.headlineLink)
            .expect(HomepageScenario.infoDialog.exists).ok();
        await t
            .expect(HomepageScenario.closeDialogButton.exists).ok();
        await t
            .click(HomepageScenario.closeDialogButton)
            .expect(HomepageScenario.infoDialog.exists).notOk();
    }

    // static async fillCreationForm(t: TestController, name: string) {
    //     await t
    //         .typeText(HomepageScenario.productTitleInput, name)
    //         .typeText(HomepageScenario.productDescriptionInput, "Test Description")
    //         .typeText(HomepageScenario.productParticipantsInput, "1")
    //         .typeText(HomepageScenario.productPriceInput, "1000")
    // }
}
