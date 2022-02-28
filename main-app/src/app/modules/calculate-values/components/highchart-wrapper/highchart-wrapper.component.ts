import { Component, OnInit } from "@angular/core";
import * as Highcharts from "highcharts";

@Component({
  selector: "app-highchart-wrapper",
  templateUrl: "./highchart-wrapper.component.html",
  styleUrls: ["./highchart-wrapper.component.less"]
})
export class HighchartWrapperComponent implements OnInit {
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {
    title: {
      text: "Вероятность обслуживания",
    },
    xAxis: {
      title: {
        text: "&lambda;"
      },
    },
    credits: {
      enabled: false,
    },
    series: [
      { type: "line", data: [] }
    ],
  };
  constructor() { }

  ngOnInit(): void {
  }

}
