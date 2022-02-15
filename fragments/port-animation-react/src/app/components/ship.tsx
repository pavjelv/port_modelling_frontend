import {Image} from "react-konva";
import React from "react";
import Konva from "konva";
import useImage from "use-image";
import {CustomerAnimationDataModel, CustomerState} from "app/models/animation-properties.model";
import KonvaEventObject = Konva.KonvaEventObject;

const ShipImage = (props: CustomerAnimationDataModel) => {
  const click = (e: KonvaEventObject<MouseEvent>) => {
    const ship = e.target;
    ship.to({
      x: 420,
      y: 60 + (150 * props.serverNum),
      duration: 4,
    });
  };

  const y = props.customerState === CustomerState.SERVING ? 60 + (150 * props.serverNum) :
            props.customerState === CustomerState.WAITING ? 210 :
            props.customerState === CustomerState.SERVED  ? 60 : 0;

  const x = props.customerState === CustomerState.SERVING ? 420 :
            props.customerState === CustomerState.WAITING ? 70 * props.queueNum :
            props.customerState === CustomerState.SERVED  ? 600 : 0;

  const [image] = useImage("http://localhost:8080/assets/images/ship1.png");
  return (
    <Image
      image={image}
      onClick={click}
      scale={{x: 0.5, y: 0.5}}
      y={y}
      x={x}
    />
  );
};

export default ShipImage;
