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
    a1: number;
    a2: number;
    b1: number;
    b2: number;
    arrivalDistribution: "poisson" | "uniform";
}
