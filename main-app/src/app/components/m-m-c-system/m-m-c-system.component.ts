import { ChangeDetectionStrategy, Component } from "@angular/core";
import { p0, pn, pnGeqC, qLen, wTime } from "src/app/model/theory/formulas/m-m-c.system";

@Component({
    selector: "app-m-m-c-system",
    templateUrl: "./m-m-c-system.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MMCSystemComponent {
    public p0 = p0;

    public pn = pn;

    public qLen = qLen;

    public pnGeqC = pnGeqC;

    public waitTime = wTime;
}
