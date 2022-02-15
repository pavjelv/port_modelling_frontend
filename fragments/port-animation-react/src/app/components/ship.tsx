import {Shape} from "react-konva";
import React from "react";
import Konva from "konva";
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

  return (
    <Shape
      sceneFunc={(context, shape) => {
        context.beginPath();
        // низ судна
        context.moveTo(0, 200);
        context.lineTo(600, 200);
        context.lineTo(530, 400);
        context.lineTo(55, 400);
        context.lineTo(0, 200);
        // палуба
        context.rect(15, 125, 170, 75);
        context.rect(70, 70, 100, 55);
        // трубы
        context.rect(90, 30, 15, 40);
        context.arc(97, 30, 7, 0, Math.PI, true);
        context.rect(125, 15, 15, 55);
        context.arc(132, 15, 7, 0, Math.PI, true);
        // груз
        context.rect(260, 100, 150, 100);
        context.rect(410, 100, 150, 100);
        context.rect(360, 10, 150, 90);
        context.closePath();
        // (!) Konva specific method, it is very important
        context.fillStrokeShape(shape);
      }}
      fill="#00D2FF"
      stroke="black"
      draggable
      strokeWidth={1}
      onClick={click}
      scale={{x: 0.15, y: 0.15}}
      y={y}
      x={x}
    />
  );
};

export default ShipImage;
