import { TheorySummaryModel } from "../../../model/theory/theory-summary.model";
import { dataModel1 } from "./1";
import { RequiredSystemParameters } from "../../../model/theory/system-variables.model";

export interface ExamplesData {
    dataModel: TheorySummaryModel[];
    parameters: RequiredSystemParameters;
}

export const dataModelMapper: Map<string, ExamplesData> = new Map<string, ExamplesData>([
    [
        "1", {
            dataModel: dataModel1,
            parameters: {
                serversNum: "2",
                lambda: "1.1",
                serveTime: "2.1",
                queueLength: "4",
            }
        }
    ],
]);
