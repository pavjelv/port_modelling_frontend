import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from "@angular/core";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: "app-homepage",
  styleUrls: ["./homepage.component.less"],
  templateUrl: "./homepage.component.html",
})
export class HomepageComponent implements OnInit, OnDestroy {
  @ViewChild("queueingSystemTheoryDialog")
  public queueingSystemTheoryDialog: TemplateRef<unknown>;

  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {}

  public openQueueingSystemTheoryDialog(): void {
    this.dialog.open(this.queueingSystemTheoryDialog);
  }

  ngOnDestroy(): void {
    this.dialog.closeAll();
  }
}
