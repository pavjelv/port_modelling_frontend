// wait - время ожидания в очереди
// l_queue - средняя длина очереди
// p_rej - вероятность отказа
// p_serv - относительная пропускная способность (вероятность обслуживания)
// k - среднее число занятых каналов
// l_sys - среднее число заявок в системе
// t_sys - среднее время пребывания в системе
export interface TheoryResultModel {
    wait: number;
    l_queue: number;
    p_rej: number;
    p_serv: number;
    k: number;
    l_sys: number;
    t_sys: number;
}

export type AvailableSystemCharacteristics = keyof TheoryResultModel;
