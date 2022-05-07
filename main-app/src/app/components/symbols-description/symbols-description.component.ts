import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "app-symbols-description",
    templateUrl: "./symbols-description.component.html",
    styleUrls: ["./symbols-description.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SymbolsDescriptionComponent {}
