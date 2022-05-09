import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, OnDestroy, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { takeUntil } from "rxjs/operators";
import { availableSystemCharacteristicsDictionary, systemParametersDictionary } from "../../../dictionaries/available-system-characteristics.dictionary";
import { ChartDataModel, ChartSeriesData } from "../../../model/chart-data.model";
import { SystemParameters, SystemType } from "../../../model/theory/system-type";
import { RxUnsubscribe } from "../../../utils/rx-unsubscribe";
import { ExamplesData, infQueueDataModelMapper, withQueueDataModelMapper } from "../data/data-model.mapper";

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

    constructor(private route: ActivatedRoute, private cdr: ChangeDetectorRef, private translateService: TranslateService) {
        super();
    }

    ngAfterViewInit(): void {
        this.route.url.pipe(takeUntil(this.destroy$)).subscribe((url) => {
            const type: SystemType = String(url[0]) as SystemType;
            const exampleId = String(url[1]);
            if (type && exampleId) {
                let dm: ExamplesData;
                switch (type) {
                    case SystemType.WITH_QUEUE:
                        dm = withQueueDataModelMapper.get(exampleId);
                        break;
                    case SystemType.INFINITE_QUEUE:
                        dm = infQueueDataModelMapper.get(exampleId);
                        break;
                    default:
                        dm = withQueueDataModelMapper.get(exampleId);
                }
                this.processDataModel(dm, type);
                this.cdr.detectChanges();
            }
        });
    }

    private processDataModel(data: ExamplesData, type: SystemType): void {
        const width = window.getComputedStyle(this.chartsStepElement?.nativeElement).width;
        this.chartWidth = parseInt(width.replace("px", ""), 10) / 2 - 30;

        const dm = data.dataModel[0];
        this.charts = [];
        [...availableSystemCharacteristicsDictionary]
            .filter(([key]) => (type === SystemType.INFINITE_QUEUE ? key !== "p_serv" && key !== "p_rej" && key !== "k" : true))
            .forEach(([key, characteristic]) => {
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
