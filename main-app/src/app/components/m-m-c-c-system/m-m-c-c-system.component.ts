import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-m-m-c-c-system",
    templateUrl: "./m-m-c-c-system.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MMCCSystemComponent {
    public readonly a = "\\[ a = \\frac{\\lambda}{\\mu} \\]";

    public readonly pn = "\\[ P_k = \\frac{a^k}{k!}P_0 \\quad k = 1, \\dots, c. \\]";

    public readonly p0 = "$P_0 = \\frac{a}{\\sum_{k=0}^{c}\\frac{a^k}{k!}}$";

    public readonly b = "\\[ B[c,p] = \\frac{\\frac{a^c}{c!}}{1 + \\rho + \\frac{a^2}{2!} + \\dots + \\frac{a^c}{c!}} \\]";
}
