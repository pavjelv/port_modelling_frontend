import {Image} from "react-konva";
import React from "react";
import useImage from "use-image";

const CraneImage = (props) => {
  const [image] = useImage("/assets/images/crane.png");
  return (
    <Image image={image} x={450} y={20 + (150 * props.number)} scale={{x: 0.13, y: 0.13}} id={props.number + ""} />
  );
};

export default CraneImage;
