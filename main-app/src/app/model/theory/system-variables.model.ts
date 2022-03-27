import { SystemParameters, SystemType } from "./system-type";

export interface SystemVariablesModel {
    serveTime: number;
    lambda: number;
    queueLength: number;
    serversNum: number;
    rangeParameter: SystemParameters;
    systemType: SystemType;
    rangeFrom: number;
    rangeTo: number;
    step: number;
}
