import { ChangeDetectionStrategy, Component, HostBinding } from "@angular/core";

@Component({
    selector: "app-common-header",
    styleUrls: ["./common-header.component.less"],
    templateUrl: "./common-header.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CommonHeaderComponent {
    @HostBinding("class.common-header") hostClass = true;
}
