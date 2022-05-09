import { RequiredSystemParameters } from "../../../model/theory/system-variables.model";
import { TheorySummaryModel } from "../../../model/theory/theory-summary.model";
import { infQueueDataModel1, infQueueDataModel2, infQueueDataModel3 } from "./with-inf-queue.data";
import { dataModel1, dataModel2, dataModel3, dataModel4 } from "./with-queue.data";
import { rejectData1, rejectData2, rejectData3 } from "./with-reject.data";

export interface ExamplesData {
    name: string;
    dataModel: TheorySummaryModel[];
    parameters: Partial<RequiredSystemParameters>;
}

export const withRejectDataModelMapper: Map<string, ExamplesData> = new Map<string, ExamplesData>([
    [
        "1",
        {
            name: "Зависимость от &mu;",
            dataModel: rejectData1,
            parameters: {
                serversNum: "5",
                lambda: "9",
            },
        },
    ],
    [
        "2",
        {
            name: "Зависимость от c",
            dataModel: rejectData2,
            parameters: {
                mu: "0.9",
                lambda: "5",
            },
        },
    ],
    [
        "3",
        {
            name: "Зависимость от &lambda;",
            dataModel: rejectData3,
            parameters: {
                serversNum: "2",
                mu: "1.5",
            },
        },
    ],
]);

export const infQueueDataModelMapper: Map<string, ExamplesData> = new Map<string, ExamplesData>([
    [
        "1",
        {
            name: "Зависимость от c",
            dataModel: infQueueDataModel1,
            parameters: {
                mu: "3.7",
                lambda: "11",
            },
        },
    ],
    [
        "2",
        {
            name: "Зависимость от &mu;",
            dataModel: infQueueDataModel2,
            parameters: {
                serversNum: "5",
                lambda: "2.4",
            },
        },
    ],
    [
        "3",
        {
            name: "Зависимость от &lambda;",
            dataModel: infQueueDataModel3,
            parameters: {
                serversNum: "6",
                mu: "0.5",
            },
        },
    ],
]);

export const withQueueDataModelMapper: Map<string, ExamplesData> = new Map<string, ExamplesData>([
    [
        "1",
        {
            name: "Зависимость от c",
            dataModel: dataModel1,
            parameters: {
                lambda: "1.19",
                mu: "0.6",
                queueLength: "4",
            },
        },
    ],
    [
        "2",
        {
            name: "Зависимость от &lambda;",
            dataModel: dataModel2,
            parameters: {
                serversNum: "3",
                mu: "1.05",
                queueLength: "4",
            },
        },
    ],
    [
        "3",
        {
            name: "Зависимость от &mu;",
            dataModel: dataModel3,
            parameters: {
                serversNum: "10",
                lambda: "4",
                queueLength: "5",
            },
        },
    ],
    [
        "4",
        {
            name: "Зависимость от m",
            dataModel: dataModel4,
            parameters: {
                serversNum: "5",
                lambda: "6.8",
                mu: "1.4",
            },
        },
    ],
]);
