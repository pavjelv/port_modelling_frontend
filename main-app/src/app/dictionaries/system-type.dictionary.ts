import {SystemType} from "../model/theory/system-type";

export const SystemTypeDictionary = new Map<SystemType, string>([
  [SystemType.INFINITE_QUEUE, "Многоканальная СМО с бесконечной очередью"],
  [SystemType.WITH_REJECT, "Многоканальная СМО с отказами"],
  [SystemType.WITH_QUEUE, "Многоканальная СМО с ограниченной очередью"],
]);
