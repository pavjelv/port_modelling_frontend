import { PrefilledSystemParametersModel } from "../model/prefilled-system-parameters.model";
import { SystemParameters, SystemType } from "../model/theory/system-type";

export type PrefilledSystemParametersListType = Array<{ text: string; value: PrefilledSystemParametersModel }>;

const WithQueueParamsToNameMap: PrefilledSystemParametersListType = [
    {
        text: "Высокая загруженность",
        value: {
            rangeParameter: SystemParameters.SERVERS_NUM,
            step: 1,
            rangeFrom: 1,
            rangeTo: 7,
            serveTime: 2,
            lambda: 0.7,
            queueLength: 5,
        },
    },
];

export const PrefilledSystemParametersMap = new Map<SystemType, PrefilledSystemParametersListType>([[SystemType.WITH_QUEUE, WithQueueParamsToNameMap]]);
