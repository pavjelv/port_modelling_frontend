import { TheorySummaryModel } from "../../../model/theory/theory-summary.model";

export const dataModel1: TheorySummaryModel[] = [
    {
        result: [
            {
                wait: 0.75077,
                l_queue: 0.7781,
                p_rej: 0.05781,
                p_serv: 0.94219,
                k: 2.17646,
                l_sys: 2.95456,
                t_sys: 2.85077
            },
            {
                wait: 0.23226,
                l_queue: 0.25233,
                p_rej: 0.01238,
                p_serv: 0.98762,
                k: 2.2814,
                l_sys: 2.53373,
                t_sys: 2.33226
            },
            {
                wait: 0.06684,
                l_queue: 0.07334,
                p_rej: 0.00244,
                p_serv: 0.99756,
                k: 2.30435,
                l_sys: 2.37769,
                t_sys: 2.16684
            },
            {
                wait: 0.01786,
                l_queue: 0.01964,
                p_rej: 0.00046,
                p_serv: 0.99954,
                k: 2.30894,
                l_sys: 2.32858,
                t_sys: 2.11786
            },
            {
                wait: 0.00442,
                l_queue: 0.00486,
                p_rej: 8e-05,
                p_serv: 0.99992,
                k: 2.30981,
                l_sys: 2.31467,
                t_sys: 2.10442
            },
            {
                wait: 0.00101,
                l_queue: 0.00111,
                p_rej: 1e-05,
                p_serv: 0.99999,
                k: 2.30997,
                l_sys: 2.31108,
                t_sys: 2.10101
            },
            {
                wait: 0.00021,
                l_queue: 0.00023,
                p_rej: 0.0,
                p_serv: 1.0,
                k: 2.30999,
                l_sys: 2.31023,
                t_sys: 2.10021
            }
        ],
        parameter_range: [
            3.0,
            4.0,
            5.0,
            6.0,
            7.0,
            8.0,
            9.0
        ],
        range_from: 1.0,
        range_to: 10.0,
        step: 1.0,
        range_name: "serversNum"
    }
];
