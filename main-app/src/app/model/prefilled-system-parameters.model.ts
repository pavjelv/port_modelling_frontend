import { SystemParameters } from "./theory/system-type";

export interface PrefilledSystemParametersModel {
    rangeParameter: SystemParameters;
    step: number;
    rangeFrom: number;
    rangeTo: number;
    serversNum?: number;
    serveTime?: number;
    lambda?: number;
    queueLength?: number;
}
