import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-m-m-c-system",
  templateUrl: "./m-m-c-system.component.html",
  styleUrls: ["./m-m-c-system.component.less"]
})
export class MMCSystemComponent implements OnInit {

    public p0 = "\\[ P_0 = \\left[ \\sum_{n=0}^{c - 1}\\frac{\\rho^n}{n!} + \\frac{\\rho^c}{c!(1-a)} \\right]^{-1} \\]";

    public pn = "\\[ P_n = \\left\\{ " +
        "\\begin{array}{ll} " +
        "\\frac{\\rho^n}{n!}P_0, & \\mbox{if } n\\leq c \\\\ " +
        "\\frac{\\rho^n}{c!c^{n-c}}P_0, & \\mbox{if }  n \\geq c. " +
        "\\end{array} " +
        "\\right. \\]";

    public pnGeqN = "\\[ P\[N\\geq n \] = \\left\\{ " +
        "\\begin{array}{ll} " +
        "P_0 \\left[ \\sum_{k=n}^{c - 1}\\frac{\\rho^k}{k!} + \\frac{\\rho^c}{c!(1-a)} \\right], & \\mbox{if } n<c, \\\\ " +
        "P_0 \\left[ \\frac{a^c a^{n-c}}{c!(1-a)} \\right] = P\[N\\geq c \] a^{n-c}, & \\mbox{if } n\\geq c " +
        "\\end{array} " +
        "\\right. \\]";

    public qLen = "\\[ \\bar{Q} = \\bar{\\lambda} * \\bar{W} = \\frac{\\rho P\[N \\geq c\]}{c(1-a)} \\]";

    constructor() { }

    ngOnInit(): void {
    }

}
