import { TheoryResultModel } from "./theory-result.model";

export interface TheorySummaryModel {
    result: TheoryResultModel[];
    parameter_range: number[];
}
