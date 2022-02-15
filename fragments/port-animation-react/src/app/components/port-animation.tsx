import React from "react";
import {Stage, Layer} from "react-konva";

import {SystemVariablesModel} from "app/models/system-variables.model";
import ShipImage from "app/components/ship";
import CraneImage from "app/components/crane";



const processResponse = (response: unknown) => {
  console.log(response);
};

const PortAnimation = (props: {systemVariables: SystemVariablesModel}) => {
  const [cranes] = React.useState([]);
  const [, setError] = React.useState(null);
  const [, setIsLoaded] = React.useState(false);
  const [ships] = React.useState([]);
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
          (result) => {
            setIsLoaded(true);
            processResponse(result);
          },
          (err: unknown) => {
            setIsLoaded(true);
            setError(err);
          }
        );
    }
  });

  return (
    <Stage width={800} height={500} >
      <Layer>
        {cranes.map((crane) => (
          <CraneImage key={"" + crane.order} number={crane.order}/>
        ))}
        {ships.map((ship) => (
          <ShipImage craneNumber={ship}/>
        ))}
      </Layer>
    </Stage>
  );
};

export default PortAnimation;
