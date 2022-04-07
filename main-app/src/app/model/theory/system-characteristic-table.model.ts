import { SystemParameters } from "./system-type";
import { AvailableSystemCharacteristics } from "./theory-result.model";

export interface RangeParameterData {
    rangeFrom: number;
    rangeTo: number;
    step: number;
}

export type SystemParametersRange = { [k in SystemParameters]?: RangeParameterData };

export interface SystemCharacteristicTableModel extends SystemParametersRange {
    id: AvailableSystemCharacteristics;
    value: string;
}
