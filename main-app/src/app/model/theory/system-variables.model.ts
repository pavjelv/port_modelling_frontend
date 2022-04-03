import { SystemParameters, SystemType } from "./system-type";

export interface RequiredSystemParameters {
    serversNum: string;
    lambda: string;
    serveTime: string;
    queueLength?: string;
}

export interface SystemVariablesModel extends RequiredSystemParameters{
    rangeParameter: SystemParameters;
    systemType: SystemType;
    rangeFrom: number;
    rangeTo: number;
    step: number;
}
