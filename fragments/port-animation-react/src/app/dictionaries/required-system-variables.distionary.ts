import { RequiredSystemVariables } from "app/models/system-variables.model";

export const SystemParametersDictionary = new Map<keyof RequiredSystemVariables, string>([
    ["serversNum", "Количество причалов"],
    ["lambda", "Интенсивность потока судов"],
    ["queueLength", "Максимальная длина очереди"],
]);
