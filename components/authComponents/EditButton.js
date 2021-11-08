import React from "react";
import { Button, View } from "react-native";
import { styleOrangeColor } from "../../styles/customStyles";
const orangeColor = styleOrangeColor.textOrange.color;

const EditButton = ({ auth, callback }) => {
  const sendDataToParent = () => {
    callback(true);
  };
  if (auth) {
    return (
      <Button
        title="Edit"
        color={orangeColor}
        onPress={sendDataToParent}
      ></Button>
    );
  } else {
    return <View></View>;
  }
};

export default EditButton;
