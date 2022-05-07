import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-m-m-c-k-system",
    templateUrl: "./m-m-c-k-system.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MMCKSystemComponent {
    public rho = "\\[ \\rho = \\lambda \\bar{S} \\]";

    public p0 = "\\[ P_0 = \\left[ \\sum_{n=0}^{c}\\frac{\\rho^n}{n!} + \\frac{\\rho^c}{c!} \\sum_{n=1}^{K-c}(\\frac{\\rho}{c})^n \\right]^{-1} \\]";

    public pn =
        "\\[ P_n = \\left\\{ " +
        "\\begin{array}{ll} " +
        "\\frac{\\rho^n}{n!}P_0, & \\mbox{if } n\\leq c \\\\ " +
        "\\frac{\\rho^n}{c!} (\\frac{\\rho}{c})^{n-c} P_0, & \\mbox{if } n = c + 1, \\dots, K." +
        "\\end{array} " +
        "\\right. \\]";

    public a = "\\[ a = \\frac{\\bar{\\lambda} \\bar{S}}{c} \\]";

    public qLen = "\\[ \\bar{Q} = \\frac{\\rho^c r P_0}{c!(1-r)^2} [1 + (K-c) r^{K-c+1} - (K-c+1)r^{K-c} ]  \\]";

    public r = "\\[r = \\frac{\\rho}{c}\\]";
}
