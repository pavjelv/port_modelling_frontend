import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, OnDestroy, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { takeUntil } from "rxjs/operators";
import { availableSystemCharacteristicsDictionary, systemParametersDictionary } from "../../../dictionaries/available-system-characteristics.dictionary";
import { ChartDataModel, ChartSeriesData } from "../../../model/chart-data.model";
import { SystemParameters } from "../../../model/theory/system-type";
import { RxUnsubscribe } from "../../../utils/rx-unsubscribe";
import { dataModelMapper, ExamplesData } from "../data/data-model.mapper";

@Component({
    selector: "app-highchart-view",
    templateUrl: "./highchart-view.component.html",
    styleUrls: ["./highchart-view.component.less"],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HighchartViewComponent extends RxUnsubscribe implements AfterViewInit, OnDestroy {
    @HostBinding("class.highcharts-view") hostClass = true;

    @ViewChild("chartsStepElement")
    public chartsStepElement: ElementRef<HTMLDivElement>;

    public charts: ChartDataModel[] = [];
    public parameters: Map<string, string> = new Map<string, string>();
    public chartWidth = 700;
    public url = "0";

    constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef, private translateService: TranslateService) {
        super();
    }

    ngAfterViewInit(): void {
        this.route.url.pipe(takeUntil(this.destroy$)).subscribe((url) => {
            this.url = url[0]?.path;
            if (this.url) {
                const dm = dataModelMapper.get(this.url);
                this.processDataModel(dm);
                this.cdr.detectChanges();
            }
        });
    }

    private processDataModel(data: ExamplesData): void {
        const width = window.getComputedStyle(this.chartsStepElement?.nativeElement).width;
        this.chartWidth = parseInt(width.replace("px", ""), 10) / 2 - 30;

        const dm = data.dataModel[0];
        this.charts = [];
        availableSystemCharacteristicsDictionary.forEach((characteristic, key) => {
            const chartData = new Map<string, ChartSeriesData>([["series", dm.result.map((value, i) => [dm.parameter_range[i], value[key]]) as ChartSeriesData]]);
            this.charts.push({
                id: key,
                xAxisName: this.translateService.instant(systemParametersDictionary.get(dm.range_name)),
                title: characteristic,
                data: chartData,
            });
        });
        this.parameters = new Map();
        Object.entries(data.parameters).forEach(([key, value]: [SystemParameters, string]) => {
            this.parameters.set(this.translateService.instant(systemParametersDictionary.get(key)), value);
        });
        this.cdr.markForCheck();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }
}
