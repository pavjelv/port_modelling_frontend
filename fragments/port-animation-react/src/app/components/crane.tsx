import {Image} from "react-konva";
import React from "react";
import useImage from "use-image";
import {ServerModel} from 'app/models/server.model';

const CraneImage = (props: ServerModel & {serversCount: number}) => {
  // const scale = 1 / (props.serversCount * 3)
  // const y = 150 - props.serversCount * 10;
  const [image] = useImage(props.type === "dry" ? "/assets/images/crane-dry.png" : "/assets/images/crane.png");
  return (
    // <Image image={image} x={450} y={20 + (y * props.order)} scale={{x: scale, y: scale}} id={props.order + ""} />
    <Image image={image} x={450} y={20 + (150 * props.order)} scale={{x: 0.13, y: 0.13}} id={props.order + ""} />
  );
};

export default CraneImage;
