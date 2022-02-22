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
        context._context.fillStyle = "#213243";
        context.moveTo(0, 200);
        context.lineTo(600, 200);
        context.lineTo(530, 400);
        context.lineTo(55, 400);
        context.lineTo(0, 200);
        context.fill();
        // палуба
        context.beginPath();
        context._context.fillStyle = "#283749";
        context.rect(15, 125, 170, 75);
        context.fill();
        context.beginPath();
        context._context.fillStyle = "#45596a";
        context.rect(70, 70, 100, 55);
        context.fill();
        // трубы
        context.beginPath();
        context._context.fillStyle = "#223244";
        context.rect(90, 30, 15, 40);
        context.arc(97, 30, 7, 0, Math.PI, true);
        context.rect(125, 15, 15, 55);
        context.arc(132, 15, 7, 0, Math.PI, true);
        context.fill();
        // груз
        context.beginPath();
        context._context.fillStyle = "#e93d33";
        context.rect(260, 100, 150, 100);
        context.fill();
        context.beginPath();
        context._context.fillStyle = "#24a38a";
        context.rect(410, 100, 150, 100);
        context.fill();
        context.beginPath();
        context._context.fillStyle = "#f4ab3e";
        context.rect(360, 10, 150, 90);
        context.fill();
        context.closePath();

        context._context.fillStyle = "white";
        context._context.font = "80px calibri";
        context.fillText(props.name, 200, 320);

        // if we fill context ourselves, we need to mark object boundaries
        context.beginPath();
        context.moveTo(0, 0);
        context.rect(0, 0, 600, 400);
        context.closePath();
        // (!) Konva specific method, it is very important
        context.fillStrokeShape(shape);
      }}
      draggable
      onClick={click}
      scale={{x: 0.15, y: 0.15}}
      y={y}
      x={x}
    />
  );
};

export default ShipImage;
