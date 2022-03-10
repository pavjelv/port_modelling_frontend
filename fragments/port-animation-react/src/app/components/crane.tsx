import {Image} from 'react-konva';
import React from 'react';
import useImage from 'use-image';
import {SERVER_TYPE, ServerModel} from 'app/models/server.model';

const imageHeight = 1130;
const screenHeight = 500;

const calculateCraneScale = (serversCount: number) => {
  const serversCountScale = serversCount === 1 ? serversCount * 2 : serversCount / 1.5;
  // reduce the size of the crane depending on it's count
  return screenHeight / (imageHeight * 2 * serversCountScale);
};

export const calculateCraneHeight = (serversCount: number) => {
   return calculateCraneScale(serversCount) * imageHeight;
};

export const calculateCraneYCoordinate = (serversCount: number, order: number) => {
  return 20 + screenHeight / serversCount * order;
};

const CraneImage = (props: ServerModel & {serversCount: number}) => {
  const [image] = useImage(props.type === SERVER_TYPE.CARGO ? "/assets/images/crane-dry.png" : "/assets/images/crane.png");
  // reduce the size of the crane depending on it's count
  const scale = calculateCraneScale(props.serversCount);
  const y = calculateCraneYCoordinate(props.serversCount, props.order);
  return (
    // <Image image={image} x={450} y={20 + (y * props.order)} scale={{x: scale, y: scale}} id={props.order + ""} />
    <Image image={image} x={450} y={y} scale={{x: scale, y: scale}} id={props.order + ""} />
  );
};

export default CraneImage;
