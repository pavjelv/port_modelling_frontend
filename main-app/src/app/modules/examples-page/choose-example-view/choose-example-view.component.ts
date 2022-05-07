import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-choose-example-view",
    templateUrl: "./choose-example-view.component.html",
    styleUrls: ["./choose-example-view.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChooseExampleViewComponent {}
