import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from "@angular/core";
import { isPlatformBrowser } from "@angular/common";
import { ELEMENT_DATA } from "./port-data-example";
import {
    p0,
    pnGeqC,
    qLen,
    wTime,
} from "../../model/theory/formulas/m-m-c.system";

@Component({
    selector: "app-system-example",
    templateUrl: "./system-example.component.html",
    styleUrls: ["./system-example.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemExampleComponent implements OnInit {
    public displayedColumns: string[] = ["position", "name", "arrive", "leave"];
    public dataSource = ELEMENT_DATA;
    public isBrowser = false;
    public mmcp0 = p0;
    public mmcpnGeqC = pnGeqC;
    public mmcQlen = qLen;
    public mmcWTime = wTime;

    constructor(@Inject(PLATFORM_ID) private platformId: unknown, private cdr: ChangeDetectorRef) {
        this.isBrowser = isPlatformBrowser(this.platformId);
    }

    ngOnInit(): void {}
}
