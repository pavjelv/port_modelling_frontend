import {Shape} from 'react-konva';
import React from 'react';
import Konva from 'konva';
import {CustomerAnimationDataModel, CustomerState} from 'app/models/animation-properties.model';
import {ShipType} from 'app/models/customer-data.model';
import {calculateCraneHeight, calculateCraneYCoordinate} from 'app/components/crane';
import KonvaEventObject = Konva.KonvaEventObject;
import {SCREEN_HEIGHT} from 'app/models/screen-size.constant';

const ShipImage = (props: CustomerAnimationDataModel) => {
  const click = (e: KonvaEventObject<MouseEvent>) => {
    const ship = e.target;
    if (props.serverNum) {
      ship.to({
        x: 420,
        y: 100 + (150 * props.serverNum),
        duration: 4,
      });
    }
  };

  const shipHeight = 400;
  const shipWidth = 600;

  const craneHeight = calculateCraneHeight(props.serversCount);
  const craneYPosition = calculateCraneYCoordinate(props.serversCount, props.serverNum);

  // ship height three times less than crane height
  const yPosition = craneYPosition + craneHeight * 2 / 3;
  const scale = craneHeight / (shipHeight * 3);
  const actualWidth = scale * shipWidth;
  const actualHeight = scale * shipHeight;

  const queuePosition = props.type === ShipType.CARGO_SHIP
                        ? (SCREEN_HEIGHT * 2 / 3 - actualHeight)
                        : (SCREEN_HEIGHT / 3 - actualHeight);


  const y = props.customerState === CustomerState.SERVING ? yPosition :
            props.customerState === CustomerState.WAITING ? queuePosition :
            props.customerState === CustomerState.SERVED  ? queuePosition : 0;

  const x = props.customerState === CustomerState.SERVING ? 425 :
            props.customerState === CustomerState.WAITING ? (350 - actualWidth * props.queueNum - (20 * props.queueNum)) :
            props.customerState === CustomerState.SERVED  ? (600 + actualWidth * props.queueNum + (20 * props.queueNum)) : 0;

  return (
    <Shape
      sceneFunc={(context, shape) => {
        if (props.type === ShipType.CONTAINER_SHIP) {
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
        } else {
          context.beginPath();
          // низ судна
          context._context.fillStyle = "#421b9f";
          context.moveTo(0, 255);
          context.lineTo(600, 255);
          context.lineTo(530, 400);
          context.lineTo(55, 400);
          context.lineTo(0, 255);
          context.fill();
          // палуба
          context.beginPath();
          context._context.fillStyle = "#283749";
          context.rect(15, 125, 70, 130);
          context.fill();
          // груз
          context.beginPath();
          context.moveTo(100, 255);
          context._context.fillStyle = "#f4ab3e";
          context.quadraticCurveTo(230, 80, 550, 255);
          context.fill();
          context.closePath();

          context._context.fillStyle = "white";
          context._context.font = "80px calibri";
          context.fillText(props.name, 200, 350);

        }


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
      scale={{x: scale, y: scale}}
      y={y}
      x={x}
    />
  );
};

export default ShipImage;
