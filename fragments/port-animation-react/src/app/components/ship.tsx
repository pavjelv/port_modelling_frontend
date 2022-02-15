import {Image} from "react-konva";
import React from "react";
import Konva from "konva";
import KonvaEventObject = Konva.KonvaEventObject;
import useImage from "use-image";

const ShipImage = (props) => {
  const click = (e: KonvaEventObject<MouseEvent>) => {
    const ship = e.target;
    ship.to({
      x: 420,
      y: 60 + (150 * props.craneNumber),
      duration: 4,
    });
  };

  const [image] = useImage("http://localhost:8080/assets/images/ship1.png");
  return (
    <Image image={image} onClick={click} scale={{x: 0.5, y: 0.5}} draggable/>
  );
};

export default ShipImage;
