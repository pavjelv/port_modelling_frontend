import { SystemType } from "../model/theory/system-type";

export const systemTypeDictionary = new Map<SystemType, string>([
    [SystemType.WITH_QUEUE, "port-modelling-fe.systemType.withQueue"],
    [SystemType.INFINITE_QUEUE, "port-modelling-fe.systemType.infiniteQueue"],
    [SystemType.WITH_REJECT, "port-modelling-fe.systemType.withReject"],
]);
