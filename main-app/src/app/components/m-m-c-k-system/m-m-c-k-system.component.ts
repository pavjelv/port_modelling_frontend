import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-m-m-c-k-system",
    templateUrl: "./m-m-c-k-system.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MMCKSystemComponent {
    public readonly a = "\\[ a = \\frac{\\lambda}{\\mu}\\]";

    public readonly pk = "\\[ P_k = \\frac{\\frac{a^k}{k!}}{\\sum_{k=0}^{n}\\frac{a^k}{k!} + \\frac{a^n}{n!} \\sum_{s=1}^{m} {(\\frac{a}{n})}^s} \\quad (0 \\leq k \\leq n) \\]";

    public readonly pns = "\\[ P_{n+s} = \\frac{\\frac{a^n}{n!}{(\\frac{a}{n})}^s}{\\sum_{k=0}^{n}\\frac{a^k}{k!} + \\frac{a^n}{n!} \\sum_{s=1}^{m} {(\\frac{a}{n})}^s} \\]";

    public readonly qLen = "\\[ m_s = \\sum_{s=1}^{m} SP_{n+s} \\]";
}
