export interface RangeParameterData {
    rangeFrom: number;
    rangeTo: number;
    step: number;
}

export interface SystemCharacteristicTableModel {
    id: string;
    lambda?: RangeParameterData;
    serversNum?: RangeParameterData;
    serveTime?: RangeParameterData;
    queueLength?: RangeParameterData;
}
