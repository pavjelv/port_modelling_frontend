import {Image} from "react-konva";
import React from "react";
import useImage from "use-image";
import {ServerModel} from 'app/models/server.model';

const CraneImage = (props: ServerModel) => {
  const [image] = useImage(props.type === "dry" ? "/assets/images/crane-dry.png" : "/assets/images/crane.png");
  return (
    <Image image={image} x={450} y={20 + (150 * props.order)} scale={{x: 0.13, y: 0.13}} id={props.order + ""} />
  );
};

export default CraneImage;
