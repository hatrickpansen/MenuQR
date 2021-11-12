import React from "react";
import { ActivityIndicator } from "react-native";
import { styleOrangeColor } from "../styles/customStyles";
const orangeColor = styleOrangeColor.textOrange.color;

const LoadingIndicator = () => {
  return <ActivityIndicator color={orangeColor} size={50} />;
};
export default LoadingIndicator;
