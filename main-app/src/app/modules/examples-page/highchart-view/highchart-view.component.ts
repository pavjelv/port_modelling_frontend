import {
    Component,
    OnDestroy,
    OnInit,
} from "@angular/core";
import { ChartDataModel } from "../../../model/chart-data.model";
import { ActivatedRoute } from "@angular/router";
import { RxUnsubscribe } from "../../../utils/rx-unsubscribe";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: "app-highchart-view",
  templateUrl: "./highchart-view.component.html",
  styleUrls: ["./highchart-view.component.less"]
})
export class HighchartViewComponent extends RxUnsubscribe implements OnInit, OnDestroy {

    public charts: ChartDataModel[] = [];
    public chartWidth = 700;
    public url = "0";

    constructor(private route: ActivatedRoute) {
        super();
    }

    ngOnInit(): void {
        this.route.url.pipe(takeUntil(this.destroy$)).subscribe((url) => {
            this.url = url[0]?.path;
            console.log(url);
        });
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
