import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { arrivalProcessDataSource, queueDisciplineDataSource, serviceProcessDataSource } from "./codes-example.data";

@Component({
    selector: "app-kendall-notation-component",
    templateUrl: "./kendall-notation.component.html",
    styleUrls: ["./kendall-notation.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class KendallNotationComponent {
    @HostBinding("class.kendall-notation") hostClass = true;

    public kendallCharacters = KendallCharacters;
    public selectedKendallCharacter: KendallCharacters = this.kendallCharacters.A;
    public displayedColumns: string[] = ["symbol", "name", "description"];
    public arrivalProcessDataSource = arrivalProcessDataSource;
    public serviceProcessDataSource = serviceProcessDataSource;
    public queueDisciplineDataSource = queueDisciplineDataSource;

    public selectKendallCharacter(kendallCharacter: KendallCharacters): void {
        this.selectedKendallCharacter = kendallCharacter;
    }
}

enum KendallCharacters {
    A = "A",
    S = "S",
    // eslint-disable-next-line @typescript-eslint/naming-convention
    c = "c",
    K = "K",
    N = "N",
    D = "D",
}
