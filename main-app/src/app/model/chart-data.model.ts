export type ChartSeriesData = Array<[number | string, number | null]>;

export interface ChartDataModel {
    id: string;
    xAxisName: string;
    title: string;
    data: Map<string, ChartSeriesData>;
}
