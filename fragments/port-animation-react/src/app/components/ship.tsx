import Konva from "konva";
import React from "react";
import { Shape } from "react-konva";

import { CustomerAnimationDataModel, CustomerState } from "../models/animation-properties.model";
import { ShipType } from "../models/customer-data.model";
import { SCREEN_HEIGHT } from "../models/screen-size.constant";

import { calculateCraneHeight, calculateCraneYCoordinate } from "./crane";

import KonvaEventObject = Konva.KonvaEventObject;

const ShipImage = (props: CustomerAnimationDataModel) => {
    const click = (e: KonvaEventObject<MouseEvent>) => {
        const ship = e.target;
        if (props.serverNum) {
            ship.to({
                x: 420,
                y: 100 + 150 * props.serverNum,
                duration: 4,
            });
        }
    };

    const shipHeight = 400;
    const shipWidth = 600;

    const craneHeight = calculateCraneHeight(props.serversCount);
    const craneYPosition = calculateCraneYCoordinate(props.serversCount, props.serverNum);

    // ship height three times less than crane height
    const yPosition = craneYPosition + (craneHeight * 2) / 3;
    const scale = craneHeight / (shipHeight * 3);
    const actualWidth = scale * shipWidth;
    const actualHeight = scale * shipHeight;

    const queuePosition = props.type === ShipType.CARGO_SHIP ? (SCREEN_HEIGHT * 2) / 3 - actualHeight : SCREEN_HEIGHT / 3 - actualHeight;

    const y =
        props.customerState === CustomerState.SERVING ? yPosition : props.customerState === CustomerState.WAITING ? queuePosition : props.customerState === CustomerState.SERVED ? queuePosition : 0;

    const x =
        props.customerState === CustomerState.SERVING
            ? 425 + props.serversCount * 2
            : props.customerState === CustomerState.WAITING
            ? 350 - actualWidth * props.queueNum - 20 * props.queueNum
            : props.customerState === CustomerState.SERVED
            ? 600 + actualWidth * props.queueNum + 20 * props.queueNum
            : 0;

    return (
        <Shape
            sceneFunc={(context, shape) => {
                if (props.type === ShipType.CONTAINER_SHIP) {
                    context.beginPath();
                    // ?????? ??????????
                    // context._context.fillStyle = "#213243";
                    context._context.fillStyle = props.color;
                    context.moveTo(0, 200);
                    context.lineTo(600, 200);
                    context.lineTo(530, 400);
                    context.lineTo(55, 400);
                    context.lineTo(0, 200);
                    context.fill();
                    // ????????????
                    context.beginPath();
                    context._context.fillStyle = "#283749";
                    context.rect(15, 125, 170, 75);
                    context.fill();
                    context.beginPath();
                    context._context.fillStyle = "#45596a";
                    context.rect(70, 70, 100, 55);
                    context.fill();
                    // ??????????
                    context.beginPath();
                    context._context.fillStyle = "#223244";
                    context.rect(90, 30, 15, 40);
                    context.arc(97, 30, 7, 0, Math.PI, true);
                    context.rect(125, 15, 15, 55);
                    context.arc(132, 15, 7, 0, Math.PI, true);
                    context.fill();
                    // ????????
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
                    // ?????? ??????????
                    // context._context.fillStyle = "#421b9f";
                    context._context.fillStyle = props.color;
                    context.moveTo(0, 255);
                    context.lineTo(600, 255);
                    context.lineTo(530, 400);
                    context.lineTo(55, 400);
                    context.lineTo(0, 255);
                    context.fill();
                    // ????????????
                    context.beginPath();
                    context._context.fillStyle = "#283749";
                    context.rect(15, 125, 70, 130);
                    context.fill();
                    // ????????
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
            scale={{ x: scale, y: scale }}
            y={y}
            x={x}
            title={props.name}
        />
    );
};

export default ShipImage;
