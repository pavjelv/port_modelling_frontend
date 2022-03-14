import React from 'react';
import {Layer, Stage, Text} from 'react-konva';

import ShipImage from 'app/components/ship';
import CraneImage from 'app/components/crane';
import {SERVER_TYPE, ServerModel} from 'app/models/server.model';
import {AnimationPropertiesModel, CustomerAnimationDataModel, CustomerState} from 'app/models/animation-properties.model';
import {SimulationResultModel} from 'app/models/simulation-result.model';
import {SystemVariablesModel} from 'app/models/system-variables.model';
import {SCREEN_HEIGHT, SCREEN_WIDTH} from 'app/models/screen-size.constant';
import {CustomerDataModel, ShipType} from 'app/models/customer-data.model';

const processResponse = (response: SimulationResultModel, time: number, systemParams: SystemVariablesModel): AnimationPropertiesModel => {
  const servingCustomers: CustomerAnimationDataModel[] = response.customer_data
    .filter((c) => c.serve !== null && c.serve <= time && (c.leave > time || c.leave === null))
    .map((c, i) => {
      return {
        name: c.name,
        customerState: CustomerState.SERVING,
        type: c.type,
        serverNum: c.type === ShipType.CARGO_SHIP ? (c.server_num + systemParams.serversNum) : c.server_num,
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

const PortAnimation = (props: {simulationResult: SimulationResultModel, time: number, systemParams: SystemVariablesModel}) => {
  const [animationProperties, setAnimationProperties] = React.useState<AnimationPropertiesModel>({} as AnimationPropertiesModel);

  React.useEffect(() => {
    if (props.simulationResult) {
      setAnimationProperties(processResponse(props.simulationResult, props.time, props.systemParams));
    }
  }, [props.simulationResult, props.time]);

  return (
    <Stage height={SCREEN_HEIGHT} width={SCREEN_WIDTH} style={{width: "100%"}}>
      <Layer>
        <Text text={"Покинуло систему " + (animationProperties?.rejectedCustomers?.length ?? 0)} y={10} x={10} fontSize={15}/>
        <Text text={"Обслужено " + (animationProperties?.servedCustomers?.length ?? 0)} y={30} x={10} fontSize={15}/>
        <Text text={"Текущее время " + (props?.time ?? 0)} y={50} x={10} fontSize={15}/>
        {animationProperties?.servers?.map((crane, _, array) => (
          <CraneImage key={"" + crane.order} order={crane.order} type={crane.type} serversCount={array.length}/>
        ))}
        {animationProperties?.servingCustomers?.map((ship: CustomerAnimationDataModel) => (
          <ShipImage key={ship.name} serversCount={animationProperties.servers.length} serverNum={ship.serverNum} name={ship.name} type={ship.type} customerState={ship.customerState}/>
        ))}
        {animationProperties?.queuedCustomers?.map((ship: CustomerAnimationDataModel) => (
          <ShipImage key={ship.name} serversCount={animationProperties.servers.length} queueNum={ship.queueNum} name={ship.name} type={ship.type} customerState={ship.customerState}/>
        ))}
        {animationProperties?.servedCustomers?.map((ship: CustomerAnimationDataModel) => (
          <ShipImage key={ship.name} serversCount={animationProperties.servers.length} queueNum={ship.queueNum} name={ship.name} type={ship.type} customerState={ship.customerState}/>
        ))}
      </Layer>
    </Stage>
  );
};

export default PortAnimation;
