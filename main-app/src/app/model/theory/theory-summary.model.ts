import { TheoryResultModel } from "./theory-result.model";
import { SystemParameters } from "./system-type";

export interface TheorySummaryModel {
    result: TheoryResultModel[];
    parameter_range: number[];
    range_from: number;
    range_to: number;
    step: number;
    range_name: SystemParameters;
}
