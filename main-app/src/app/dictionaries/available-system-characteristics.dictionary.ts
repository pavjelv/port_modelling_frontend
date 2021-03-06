import { SystemParameters } from "../model/theory/system-type";
import { AvailableSystemCharacteristics } from "../model/theory/theory-result.model";

export const availableSystemCharacteristicsDictionary = new Map<AvailableSystemCharacteristics, string>([
    ["l_sys", "Среднее число заявок в системе"],
    ["t_sys", "Среднее время пребывания в системе"],
    ["l_queue", "Среднее число заявок в очереди"],
    ["k", "Среднее число занятых каналов"],
    ["wait", "Время ожидания в очереди"],
    ["p_rej", "Вероятность отказа"],
    ["p_serv", "Относительная пропускная способность"],
]);

export const systemParametersDictionary = new Map<SystemParameters, string>([
    [SystemParameters.SERVERS_NUM, "port-modelling-fe.calculateValues.serversNum"],
    [SystemParameters.MU, "port-modelling-fe.calculateValues.mu"],
    [SystemParameters.LAMBDA, "port-modelling-fe.calculateValues.lambda"],
    [SystemParameters.QUEUE_LENGTH, "port-modelling-fe.calculateValues.queueLength"],
]);
