import { Component, OnInit } from "@angular/core";
import {
    p0,
    pn,
    pnGeqC,
    pnGeqN,
    qLen,
    wTime,
} from "src/app/model/theory/formulas/m-m-c.system";

@Component({
  selector: "app-m-m-c-system",
  templateUrl: "./m-m-c-system.component.html",
  styleUrls: ["./m-m-c-system.component.less"]
})
export class MMCSystemComponent implements OnInit {

    public p0 = p0;

    public pn = pn;

    public pnGeqN = pnGeqN;

    public qLen = qLen;

    public pnGeqC = pnGeqC;

    public waitTime = wTime;

    constructor() { }

    ngOnInit(): void {
    }

}
