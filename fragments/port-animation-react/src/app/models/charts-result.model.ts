import { SimulationResultModel } from "app/models/simulation-result.model";

export interface ChartsResultModel {
    parameter_range: number[];
    result: SimulationResultModel[];
}
