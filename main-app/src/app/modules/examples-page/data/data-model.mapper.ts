import { RequiredSystemParameters } from "../../../model/theory/system-variables.model";
import { TheorySummaryModel } from "../../../model/theory/theory-summary.model";
import { infQueueDataModel1, infQueueDataModel2, infQueueDataModel3 } from "./with-inf-queue.data";
import { dataModel1, dataModel2, dataModel3 } from "./with-queue.data";

export interface ExamplesData {
    name: string;
    dataModel: TheorySummaryModel[];
    parameters: Partial<RequiredSystemParameters>;
}

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
]);
