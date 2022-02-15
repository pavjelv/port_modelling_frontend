import React from "react";
import {Layer, Stage} from "react-konva";

import {SystemVariablesModel} from "app/models/system-variables.model";
import ShipImage from "app/components/ship";
import CraneImage from "app/components/crane";
import {ServerModel} from "app/models/server.model";
import {Slider} from "antd";
import {AnimationPropertiesModel, CustomerAnimationDataModel, CustomerState} from "app/models/animation-properties.model";
import {SimulationResultModel} from "app/models/simulation-result.model";


const processResponse = (response: SimulationResultModel, time: number): AnimationPropertiesModel => {
  console.log(response);
  const servingCustomers: CustomerAnimationDataModel[] = response.customer_data
    .filter((c) => c.serve !== null && c.serve <= time && c.leave > time)
    .map((c, i) => {
      return {
        name: c.name,
        customerState: CustomerState.SERVING,
        type: c.type,
        serverNum: i,
      };
  });
  const queuedCustomers: CustomerAnimationDataModel[] = response.customer_data
    .filter((c) => c.arrive <= time && c.serve > time)
    .filter((_, i) => i < 4)
    .sort((c1, c2) => c1.arrive - c2.arrive || c1.serve - c2.serve)
    .map((c, i) => {
      return {
        name: c.name,
        customerState: CustomerState.WAITING,
        type: c.type,
        queueNum: i,
      };
    });
  const servedCustomers: CustomerAnimationDataModel[] = response.customer_data
    .filter((c) => c.serve !== null && c.leave <= time)
    .reverse()
    .filter((_, i) => i < 3)
    .sort((c1, c2) => c2.leave - c1.leave)
    .map((c) => {
      return {
        name: c.name,
        customerState: CustomerState.SERVED,
        type: c.type,
      };
    });

  const rejectedCustomers: CustomerAnimationDataModel[] = response.customer_data
    .filter((c) => c.serve === null && c.arrive <= time)
    .reverse()
    .filter((_, i) => i < 4)
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
    servers: createCranes(),
    servedCustomers,
  };
};

const createCranes = () => {
  const result: ServerModel[] = [];
  for (let i = 0; i < 3; i++) {
    result.push({
      order: i,
      type: "default",
    });
  }
  return result;
};

const PortAnimation = (props: {systemVariables: SystemVariablesModel}) => {
  const [animationProperties, setAnimationProperties] = React.useState<AnimationPropertiesModel>({} as AnimationPropertiesModel);
  const [response, setResponse] = React.useState<SimulationResultModel>(null);
  const [time, setTime] = React.useState(0);
  const marks = { 0: "0", 20: "20" };
  let queryParams = "";
  if (props.systemVariables) {
    Object.entries(props.systemVariables)?.forEach(([k, v]: [string, string]) => {
      queryParams += `${k}=${encodeURIComponent(v)}&`;
    });
  }

  React.useEffect(() => {
    if (queryParams) {
      fetch(`http://localhost:4200/api/calculate/modelling/poisson/?${queryParams}`)
        .then(res => res.json())
        .then(
          (result: SimulationResultModel) => {
            setResponse(result);
            setAnimationProperties(processResponse(result, time));
          },
          (err: unknown) => {
            console.error(err);
          }
        );
    }
  }, [props]);

  React.useEffect(() => {
    if (response) {
      setAnimationProperties(processResponse(response, time));
    }
  }, [time]);

  return (
    <>
      <Stage height={500} width={800} style={{width: "100%"}}>
        <Layer>
          {animationProperties?.servers?.map((crane) => (
            <CraneImage key={"" + crane.order} number={crane.order}/>
          ))}
          {animationProperties?.servingCustomers?.map((ship: CustomerAnimationDataModel) => (
            <ShipImage key={ship.name} serverNum={ship.serverNum} name={ship.name} type={ship.type} customerState={ship.customerState}/>
          ))}
          {animationProperties?.queuedCustomers?.map((ship: CustomerAnimationDataModel) => (
            <ShipImage key={ship.name} queueNum={ship.queueNum} name={ship.name} type={ship.type} customerState={ship.customerState}/>
          ))}
          {animationProperties?.servedCustomers?.map((ship: CustomerAnimationDataModel) => (
            <ShipImage key={ship.name} queueNum={ship.queueNum} name={ship.name} type={ship.type} customerState={ship.customerState}/>
          ))}
        </Layer>
      </Stage>
      <Slider tipFormatter={null} min={0} max={20} marks={marks} onChange={(v) => setTime(v)}/>
    </>
  );
};

export default PortAnimation;
