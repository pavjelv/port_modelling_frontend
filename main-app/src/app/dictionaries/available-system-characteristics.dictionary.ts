import {SystemParameters} from "../model/theory/system-type";

export const AvailableSystemCharacteristicsDictionary = new Map<string, string>([
  ["l_sys", "Среднее число заявок в системе"],
  ["t_sys", "Среднее время пребывания в системе"],
  ["l_queue", "Среднее число заявок в очереди"],
  ["k", "Среднее число занятых каналов"],
  ["wait", "Время ожидания в очереди"],
  ["p_rej", "Вероятность отказа"],
  ["p_serv", "Относительная пропускная способность"],
]);

export const SystemParametersDictionary = new Map<string, string>([
  [SystemParameters.SERVERS_NUM, "Количество каналов (n)"],
  [SystemParameters.SERVE_TIME, "Время обслуживания (t)"],
  [SystemParameters.LAMBDA, "Интенсивность потока заявок (&lambda;)"],
  [SystemParameters.QUEUE_LENGTH, "Максимальная длина очереди (m)"],
]);
