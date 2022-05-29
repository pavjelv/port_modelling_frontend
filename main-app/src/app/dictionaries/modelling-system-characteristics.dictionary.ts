export const modellingSystemCharacteristicsDictionary = new Map<string, string>([
    ["wait_system_time", "Среднее время пребывания в системе"],
    ["average_queue_len", "Среднее число заявок в очереди"],
    ["idle_probability", "Вероятность простоя"],
    ["wait_queue_time", "Среднее время ожидания в очереди"],
    ["left_customers_number", "Количество судов, покинувших систему"],
    ["all_busy_probability", "Вероятность того, что все каналы заняты"],
    ["total_cost", "Общая стоимость работы"],
    ["wait_cost", "Общая стоимость ожидания судов"],
    ["idle_server_cost", "Общая стоимость простоя причалов"],
]);
