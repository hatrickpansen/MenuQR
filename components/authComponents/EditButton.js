import React from "react";
import { Button, View } from "react-native";
import { styleOrangeColor } from "../../styles/customStyles";
const orangeColor = styleOrangeColor.textOrange.color;

const EditButton = ({ auth, callBack }) => {
  console.log("auth: ");
  if (auth) {
    return <Button title="Edit" color={orangeColor}></Button>;
  } else {
    return <View></View>;
  }
};

export default EditButton;
