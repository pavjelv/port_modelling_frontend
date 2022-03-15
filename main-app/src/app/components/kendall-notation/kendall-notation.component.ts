import {ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation} from "@angular/core";

@Component({
    selector: "app-kendall-notation-component",
    templateUrl: "./kendall-notation.component.html",
    styleUrls: ["./kendall-notation.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class KendallNotationComponent {

    @HostBinding("class.kendall-notation") hostClass = true;

    public KendallCharacters = KendallCharacters;
    public selectedKendallCharacter: KendallCharacters = this.KendallCharacters.A;

    public selectKendallCharacter(kendallCharacter: KendallCharacters): void {
        this.selectedKendallCharacter = kendallCharacter;
    }
}

enum KendallCharacters {
    A = "A",
    B = "B",
    c = "c",
    K = "K",
    n = "n",
    D = "D"
}
