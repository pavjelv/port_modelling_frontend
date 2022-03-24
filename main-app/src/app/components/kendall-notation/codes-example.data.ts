interface CodesExampleData {
    symbol: string;
    name: string;
    description: string;
}

export const ArrivalProcessDataSource: CodesExampleData[] = [
    {
        symbol: "M",
        name: "port-modelling-fe.kendall.arrivalExamples.markovian",
        description: "port-modelling-fe.kendall.arrivalExamples.markovianDescription",
    },
];

export const ServiceProcessDataSource: CodesExampleData[] = [
    {
        symbol: "M",
        name: "port-modelling-fe.kendall.serviceExamples.markovian",
        description: "port-modelling-fe.kendall.serviceExamples.markovianDescription",
    },
];

export const QueueDisciplineDataSource: CodesExampleData[] = [
    {
        symbol: "FIFO/FCFS",
        name: "port-modelling-fe.kendall.queueExamples.fifo",
        description: "port-modelling-fe.kendall.queueExamples.fifoDescription",
    },
    {
        symbol: "LIFO/LCFS",
        name: "port-modelling-fe.kendall.queueExamples.lifo",
        description: "port-modelling-fe.kendall.queueExamples.lifoDescription",
    },
    {
        symbol: "SIRO",
        name: "port-modelling-fe.kendall.queueExamples.siro",
        description: "port-modelling-fe.kendall.queueExamples.siroDescription",
    },
    {
        symbol: "PQ",
        name: "port-modelling-fe.kendall.queueExamples.pq",
        description: "port-modelling-fe.kendall.queueExamples.pqDescription",
    },
];
