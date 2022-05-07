import { ChangeDetectionStrategy, Component, OnDestroy, TemplateRef, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "app-homepage",
    styleUrls: ["./homepage.component.less"],
    templateUrl: "./homepage.component.html",
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent implements OnDestroy {
    @ViewChild("queueingSystemTheoryDialog")
    public queueingSystemTheoryDialog: TemplateRef<unknown>;

    constructor(private dialog: MatDialog) {}

    public openQueueingSystemTheoryDialog(): void {
        this.dialog.open(this.queueingSystemTheoryDialog);
    }

    ngOnDestroy(): void {
        this.dialog.closeAll();
    }
}
