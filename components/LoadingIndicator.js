import React, { useState, useEffect } from "react";
import { ActivityIndicator } from "react-native";
import { styleOrangeColor } from "../styles/customStyles";
const orangeColor = styleOrangeColor.textOrange.color;

const LoadingIndicator = ({ animating }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  useEffect(() => {
    if (animating != undefined) {
      setIsAnimating(animating);
    }
  });
  return (
    <ActivityIndicator animating={isAnimating} color={orangeColor} size={50} />
  );
};
export default LoadingIndicator;
