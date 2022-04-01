export interface SystemVariablesModel {
    serveTime: number;
    lambda: number;
    queueLength: number;
    serversNum: number;
    time: number;
    needSecondType: boolean;
    cargoAppearanceProbability: number;
    serveTimeCargo: number;
    cargoServersNum: number;
    requiredCharacteristics: { key: string, value: string }[];
}
