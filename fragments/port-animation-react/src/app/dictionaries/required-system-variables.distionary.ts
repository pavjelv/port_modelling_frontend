import { RequiredSystemVariables } from "app/models/system-variables.model";

export const SystemParametersDictionary = new Map<keyof RequiredSystemVariables | "serversNumCargo", string>([
    ["serversNum", "Количество причалов контейнера"],
    ["serversNumCargo", "Количество причалов сухогруза"],
    ["lambda", "Интенсивность потока судов"],
    ["queueLength", "Максимальная длина очереди"],
]);
