import { SystemVariablesModel } from "../theory/system-variables.model";

export interface SimulationVariablesModel extends Omit<SystemVariablesModel, "rangeParameter" | "systemType"> {
    time: number;
    requiredCharacteristics: { key: string, value: string }[];
}
