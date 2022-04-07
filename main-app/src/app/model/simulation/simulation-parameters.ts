export enum SimulationParameters {
    ARRIVAL_DISTRIBUTION = "arrivalDistribution",
    SERVERS_NUM = "serversNum",
    SERVE_TIME = "serveTime",
    LAMBDA = "lambda",
    QUEUE_LENGTH = "queueLength",
    TIME = "time",
}

export enum AdditionalShipTypeParameters {
    SERVE_TIME_CARGO = "serveTimeCargo",
    CARGO_APPEARANCE_PROBABILITY = "cargoAppearanceProbability",
    CARGO_SERVERS_NUM = "cargoServersNum",
}

export enum DistributionsType {
    POISSON = "poisson",
    UNIFORM = "uniform",
}
