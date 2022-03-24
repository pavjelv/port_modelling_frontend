import {
    AfterViewInit,
    Component,
    HostBinding,
    Inject,
    Input,
    OnInit,
    PLATFORM_ID,
} from "@angular/core";
import * as Highcharts from "highcharts";
import { ChartDataModel } from "../../../../model/chart-data.model";
import {
    isPlatformBrowser,
    ViewportScroller,
} from "@angular/common";


@Component({
    selector: "app-highchart-wrapper",
    templateUrl: "./highchart-wrapper.component.html",
    styleUrls: ["./highchart-wrapper.component.less"],
})
export class HighchartWrapperComponent implements OnInit, AfterViewInit {
    @HostBinding("class.highchart-wrapper") hostClass = true;

    @Input()
    public dataModel: ChartDataModel;

    @Input()
    public needScroll = false;

    Highcharts: typeof Highcharts = Highcharts;

    chartOptions: Highcharts.Options = {
        title: {
            text: "Вероятность обслуживания",
        },
        chart: {
            zoomType: "x",
            width: 650,
        },
        xAxis: {
            title: {
                text: "&lambda;",
            },
        },
        yAxis: {
            title: {
                text: "",
            },
        },
        plotOptions: {
            line: {
                dataLabels: {
                    enabled: true,
                },
            },
        },
        credits: {
            enabled: false,
        },
        series: [],
    };
    constructor(private scroller: ViewportScroller, @Inject(PLATFORM_ID) private platformId: unknown) {
        const isBrowser = isPlatformBrowser(this.platformId);
        if (isBrowser) {
            const theme = require("highcharts/themes/grid-light");
            theme(Highcharts);
        }
    }

    ngOnInit(): void {
        const isMultipleSeries = this.dataModel?.data?.size > 1;
        if (isMultipleSeries) {
            this.chartOptions.plotOptions = {
                line: {
                    dataLabels: {
                        enabled: false,
                    },
                    enableMouseTracking: true,
                },
            };
        }
        this.chartOptions.title.text = this.dataModel?.title;
        (this.chartOptions.xAxis as Highcharts.XAxisOptions).title.text = this.dataModel?.xAxisName;
        this.dataModel?.data.forEach((dm, name) => {
            this.chartOptions.series.push({
                name,
                type: "line",
                data: dm,
            });
        });
    }

    ngAfterViewInit(): void {
        if (this.needScroll) {
            this.scroller.scrollToAnchor(this.dataModel.id);
        }
    }
}
