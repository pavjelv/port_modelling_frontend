import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID} from "@angular/core";
import {Color, Label} from "ng2-charts";
import {ChartDataSets, ChartOptions, ChartType} from "chart.js";
import {isPlatformBrowser} from "@angular/common";

export interface PeriodicElement {
  name: string;
  position: number;
  arrive: string;
  leave: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: "Меркс Джафна", arrive: "02.04.2019 04:22", leave: "04.04.2019 11:19"},
  {position: 2, name: "Энни", arrive: "02.04.2019 04:30", leave: "03.04.2019 23:44"},
  {position: 3, name: "Сормовский-53", arrive: "02.04.2019 04:50", leave: "03.04.2019 11:31"},
  {position: 4, name: "Газпромнефть Зюйд-Ист", arrive: "02.04.2019 09:09", leave: "05.04.2019 19:59"},
  {position: 5, name: "Леди Нора", arrive: "02.04.2019 09:15", leave: "05.04.2019 11:14"},
  {position: 6, name: "Газпромнефть Зюйд", arrive: "02.04.2019 15:00", leave: "03.04.2019 10:37"},
  {position: 7, name: "Василий Шукшин", arrive: "02.04.2019 19:25", leave: "05.04.2019 21:55"},
];

@Component({
  selector: "app-system-example",
  templateUrl: "./system-example.component.html",
  styleUrls: ["./system-example.component.less"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SystemExampleComponent implements OnInit {
  public displayedColumns: string[] = ["position", "name", "arrive", "leave"];
  public dataSource = ELEMENT_DATA;
  public withRefuseData: ChartDataSets[] = [{
      data: [
        0.067,
        0.13,
        0.20,
        0.26,
        0.33,
        0.39,
        0.45,
        0.51,
        0.57,
        0.63,
        0.68,
        0.73,
        0.77,
        0.81,
        0.85,
        0.89,
        0.91,
        0.94,
        0.96,
        0.97,
        0.99],
      label: "Вероятность обслуживания",
    },
  ];
  public withQueueData: ChartDataSets[] = [{
    data: [
      0.07,
      0.14,
      0.21,
      0.29,
      0.36,
      0.43,
      0.50,
      0.57,
      0.64,
      0.70,
      0.77,
      0.82,
      0.87,
      0.91,
      0.94,
      0.96,
      0.98,
      0.99],
    label: "Вероятность обслуживания. Максимальная длина очереди 6",
  },
  ];
  public queueLengthData: ChartDataSets[] = [{
    data: [
      5.92,
      5.83,
      5.73,
      5.60,
      5.45,
      5.26,
      5.02,
      4.73,
      4.38,
      3.96,
      3.47,
      2.94,
      2.38,
      1.89,
      1.36,
      0.95,
      0.63,
      0.41,
    ],
    label: "Средняя длина очереди. Максимальная длина очереди 6",
  },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartWithQueueLabels: Label[] = [];
  // @ts-ignore
  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: "black",
      backgroundColor: "rgba(0,239,141,0.62)",
    },
  ];
  public queueLengthChartColors: Color[] = [
    {
      borderColor: "black",
      backgroundColor: "rgba(83,56,225,0.87)",
    },
  ];
  public lineChartLegend = true;
  public lineChartType: ChartType = "line";
  public lineChartPlugins = [];
  public isBrowser = false;

  constructor(@Inject(PLATFORM_ID) private platformId: unknown,
              private cdr: ChangeDetectorRef) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    for (let i = 1; i <= this.withRefuseData[0].data.length; i++) {
      this.lineChartLabels.push(i + "");
    }
    for (let i = 1; i <= this.withQueueData[0].data.length; i++) {
      this.lineChartWithQueueLabels.push(i + "");
    }
    this.cdr.detectChanges();
  }
}
