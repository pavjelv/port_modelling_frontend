export interface ChartDataModel {
  id: string;
  xAxisName: string;
  title: string;
  data: Array<[(number|string), (number|null)]>;
}
