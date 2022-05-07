import { SystemVariablesModel } from "../theory/system-variables.model";

export interface SimulationVariablesModel extends Exclude<SystemVariablesModel, "rangeParameter" | "systemType"> {
    time: number;
    requiredCharacteristics: Array<{ key: string; value: string }>;
    a1: number;
    a2: number;
    b1: number;
    b2: number;
    arrivalDistribution: "poisson" | "uniform";
}
