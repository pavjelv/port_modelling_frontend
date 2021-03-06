
import React from "react";
import { Layer, Stage, Text } from "react-konva";

import CraneImage from "../components/crane";
import ShipImage from "../components/ship";
import { AnimationPropertiesModel, CustomerAnimationDataModel, CustomerState } from "../models/animation-properties.model";
import { CustomerDataModel, ShipType } from "../models/customer-data.model";
import { SCREEN_HEIGHT, SCREEN_WIDTH } from "../models/screen-size.constant";
import { SERVER_TYPE, ServerModel } from "../models/server.model";
import { SimulationResultModel } from "../models/simulation-result.model";
import { SystemVariablesModel } from "../models/system-variables.model";

const processResponse = (response: SimulationResultModel, time: number, systemParams: SystemVariablesModel): AnimationPropertiesModel => {
    const servingCustomers: CustomerAnimationDataModel[] = response.customer_data
        .filter((c) => c.serve !== null && c.serve <= time && (c.leave > time || c.leave === null))
        .map((c, i) => {
            return {
                name: c.name,
                customerState: CustomerState.SERVING,
                type: c.type,
                serverNum: c.type === ShipType.CARGO_SHIP ? c.server_num + systemParams.serversNum : c.server_num,
                color: c.color,
            };
        });
    const allQueuedCustomers: CustomerDataModel[] = response.customer_data
        .filter((c) => c.arrive <= time && (c.serve > time || (c.serve === null && c.leave === null)))
        .sort((c1, c2) => c1.arrive - c2.arrive);
    const cargoQueuedCustomers: CustomerAnimationDataModel[] = allQueuedCustomers
        .filter((c) => c.type === ShipType.CARGO_SHIP)
        .map((c, i) => {
            return {
                name: c.name,
                customerState: CustomerState.WAITING,
                type: c.type,
                queueNum: i,
                color: c.color,
            };
        });
    const containerQueuedCustomers: CustomerAnimationDataModel[] = allQueuedCustomers
        .filter((c) => c.type === ShipType.CONTAINER_SHIP)
        .map((c, i) => {
            return {
                name: c.name,
                customerState: CustomerState.WAITING,
                type: c.type,
                queueNum: i,
                color: c.color,
            };
        });
    const queuedCustomers: CustomerAnimationDataModel[] = [...cargoQueuedCustomers, ...containerQueuedCustomers];

    const servedCustomers: CustomerAnimationDataModel[] = response.customer_data
        .filter((c) => c.serve !== null && c.leave !== null && c.leave <= time)
        .reverse()
        .sort((c1, c2) => c2.leave - c1.leave)
        .map((c, i) => {
            return {
                name: c.name,
                customerState: CustomerState.SERVED,
                type: c.type,
                queueNum: i,
                color: c.color,
            };
        });

    const rejectedCustomers: CustomerAnimationDataModel[] = response.customer_data
        .filter((c) => c.serve === null && c.arrive <= time && c.leave !== null)
        .reverse()
        .sort((c1, c2) => c2.leave - c1.leave)
        .map((c, i) => {
            return {
                name: c.name,
                customerState: CustomerState.LEFT,
                type: c.type,
                color: c.color,
            };
        });

    return {
        servingCustomers,
        rejectedCustomers,
        queuedCustomers,
        servers: createCranes(systemParams),
        servedCustomers,
    };
};

const createCranes = (systemParams: SystemVariablesModel) => {
    const result: ServerModel[] = [];
    let i = 0;
    for (; i < systemParams.serversNum; i++) {
        result.push({
            order: i,
            type: SERVER_TYPE.CONTAINER,
        });
    }
    if (systemParams.needSecondType) {
        for (let j = 0; j < systemParams.cargoServersNum; j++) {
            result.push({
                order: i + j,
                type: SERVER_TYPE.CARGO,
            });
        }
    }
    return result;
};

const PortAnimation = (props: { simulationResult: SimulationResultModel; time: number; systemParams: SystemVariablesModel }) => {
    const [animationProperties, setAnimationProperties] = React.useState<AnimationPropertiesModel>({} as AnimationPropertiesModel);

    React.useEffect(() => {
        if (props.simulationResult) {
            setAnimationProperties(processResponse(props.simulationResult, props.time, props.systemParams));
        }
    }, [props.simulationResult, props.time]);

    return (
        <Stage height={SCREEN_HEIGHT} width={SCREEN_WIDTH} style={{ width: "100%" }}>
            <Layer>
                <Text text={"???????????????? ?????????????? " + (animationProperties?.rejectedCustomers?.length ?? 0)} y={10} x={10} fontSize={15} />
                <Text text={"?????????????????? " + (animationProperties?.servedCustomers?.length ?? 0)} y={30} x={10} fontSize={15} />
                <Text text={"?????????????? ?????????? " + (props?.time ?? 0)} y={50} x={10} fontSize={15} />
                {animationProperties?.servers?.map((crane, _, array) => (
                    <CraneImage key={"" + crane.order} order={crane.order} type={crane.type} serversCount={array.length} />
                ))}
                {animationProperties?.servingCustomers?.map((ship: CustomerAnimationDataModel) => (
                    <ShipImage key={ship.name} color={ship.color} serversCount={animationProperties.servers.length} serverNum={ship.serverNum} name={ship.name} type={ship.type} customerState={ship.customerState} />
                ))}
                {animationProperties?.queuedCustomers?.map((ship: CustomerAnimationDataModel) => (
                    <ShipImage key={ship.name} color={ship.color} serversCount={animationProperties.servers.length} queueNum={ship.queueNum} name={ship.name} type={ship.type} customerState={ship.customerState} />
                ))}
                {animationProperties?.servedCustomers?.map((ship: CustomerAnimationDataModel) => (
                    <ShipImage key={ship.name} color={ship.color} serversCount={animationProperties.servers.length} queueNum={ship.queueNum} name={ship.name} type={ship.type} customerState={ship.customerState} />
                ))}
            </Layer>
        </Stage>
    );
};

export default PortAnimation;
