import { ChangeDetectionStrategy, Component, HostBinding, ViewEncapsulation } from "@angular/core";
import { ArrivalProcessDataSource, QueueDisciplineDataSource, ServiceProcessDataSource } from "./codes-example.data";

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
    public displayedColumns: string[] = ["symbol", "name", "description"];
    public arrivalProcessDataSource = ArrivalProcessDataSource;
    public serviceProcessDataSource = ServiceProcessDataSource;
    public queueDisciplineDataSource = QueueDisciplineDataSource;

    public selectKendallCharacter(kendallCharacter: KendallCharacters): void {
        this.selectedKendallCharacter = kendallCharacter;
    }
}

enum KendallCharacters {
    A = "A",
    S = "S",
    c = "c",
    K = "K",
    N = "N",
    D = "D",
}
