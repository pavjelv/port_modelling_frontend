import {
    Component,
    HostBinding,
    OnInit,
} from "@angular/core";

@Component({
    selector: "app-common-header",
    styleUrls: ["common-header.component.less"],
    templateUrl: "./common-header.component.html",
})
export class CommonHeaderComponent implements OnInit {
    @HostBinding("class.common-header") hostClass = true;

    constructor() {}

    ngOnInit(): void {}
}
