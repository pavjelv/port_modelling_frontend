import { TheoryResultModel } from "./theory-result.model";

export interface TheorySummaryModel {
    result: TheoryResultModel[];
    parameter_range: number[];
    range_from: number;
    range_to: number;
    step: number;
    range_name: string;
}
