import { SystemParameters, SystemType } from "./system-type";

export type RequiredSystemParameters = { [key in SystemParameters]: string };

export interface SystemVariablesModel extends RequiredSystemParameters {
    rangeParameter: SystemParameters;
    systemType: SystemType;
    rangeFrom: number;
    rangeTo: number;
    step: number;
}
