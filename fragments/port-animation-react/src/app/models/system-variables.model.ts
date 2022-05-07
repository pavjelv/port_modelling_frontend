export interface RequiredSystemVariables {
    lambda: number;
    queueLength: number;
    serversNum: number;
}

export interface SystemVariablesModel extends RequiredSystemVariables{
    serveTime: number;
    time: number;
    needSecondType: boolean;
    cargoAppearanceProbability: number;
    serveTimeCargo: number;
    cargoServersNum: number;
    waitCost: number;
    idleCost: number;
    requiredCharacteristics: { key: string, value: string }[];
    a1: number;
    a2: number;
    b1: number;
    b2: number;
    arrivalDistribution: "poisson" | "uniform";
}
