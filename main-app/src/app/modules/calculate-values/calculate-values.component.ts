import { ChangeDetectionStrategy, Component, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { systemTypeDictionary } from "../../dictionaries/system-type.dictionary";

@Component({
    selector: "app-calculate-values",
    templateUrl: "./calculate-values.component.html",
    styleUrls: ["./calculate-values.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None,
})
export class CalculateValuesComponent {
    systems = [...systemTypeDictionary.entries()].map(([key, value]) => {
        return {
            id: key,
            value,
        };
    });

    public selectedValue = this.systems[0].id;

    constructor(private router: Router, private route: ActivatedRoute) {}

    public onContinueClicked(): void {
        this.router.navigate(["form"], { relativeTo: this.route, queryParams: { systemType: this.selectedValue } }).then();
    }
}
