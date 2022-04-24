import { SystemSummary } from "app/models/simulation-result.model";

export const ModellingSystemCharacteristicsDictionary = new Map<Exclude<keyof SystemSummary, "name">, string>([
    ["wait_system_time", "Среднее время пребывания в системе"],
    ["average_queue_len", "Среднее число заявок в очереди"],
    ["idle_probability", "Вероятность простоя"],
    ["wait_queue_time", "Среднее время ожидания в очереди"],
    ["reject_probability", "Вероятность отказа"],
    ["left_customers_number", "Количество судов, покинувших систему"],
    ["served_customers_number", "Количество обслуженных судов"],
    ["all_busy_probability", "Вероятность того, что все каналы заняты"],
]);
