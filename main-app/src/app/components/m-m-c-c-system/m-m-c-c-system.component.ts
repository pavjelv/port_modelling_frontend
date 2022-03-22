import { Component, OnInit } from "@angular/core";

@Component({
    selector: "app-m-m-c-c-system",
    templateUrl: "./m-m-c-c-system.component.html",
    styleUrls: ["./m-m-c-c-system.component.less"],
})
export class MMCCSystemComponent implements OnInit {
    public rho = "\\[ \\rho = \\lambda \\bar{S} \\]";

    public pn =
        "\\[ P_n = \\frac{\\frac{\\rho^n}{n!}}{1 + \\rho + \\frac{\\rho^2}{2!} + \\dots + \\frac{\\rho^c}{c!}} \\quad n = 0,1, \\dots, c. \\]";

    public b =
        "\\[ B[c,p] = \\frac{\\frac{\\rho^c}{c!}}{1 + \\rho + \\frac{\\rho^2}{2!} + \\dots + \\frac{\\rho^c}{c!}} \\]";

    public a = "\\[ a = \\frac{\\bar{\\lambda} \\bar{S}}{c} \\]";

    constructor() {}

    ngOnInit(): void {}
}
