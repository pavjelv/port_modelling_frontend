import { RequiredSystemParameters } from "../../../model/theory/system-variables.model";
import { TheorySummaryModel } from "../../../model/theory/theory-summary.model";
import { dataModel1 } from "./1";

export interface ExamplesData {
    dataModel: TheorySummaryModel[];
    parameters: RequiredSystemParameters;
}

export const dataModelMapper: Map<string, ExamplesData> = new Map<string, ExamplesData>([
    [
        "1",
        {
            dataModel: dataModel1,
            parameters: {
                serversNum: "2",
                lambda: "1.1",
                mu: "2.1",
                queueLength: "4",
            },
        },
    ],
]);
