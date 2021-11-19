import React, { useState, useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

const VisibleBtn = ({ callback, visible, editMode }) => {
  const [isVisible, setIsVisible] = useState(visible);
  const nameVisible = "visibility";
  const nameNotVisible = "visibility-off";
  const [isEditMode, setIsEditMode] = useState(editMode);
  useEffect(() => {
    setIsEditMode(editMode);
  });
  function onPressBtn() {
    let data = { isVisible: !isVisible };
    callback(data);
    setIsVisible(!isVisible);
  }
  if (isEditMode) {
    return (
      <TouchableOpacity onPress={onPressBtn}>
        <MaterialIcons
          style={{ opacity: isVisible ? 1 : 0.4 }}
          name={isVisible ? nameVisible : nameNotVisible}
          size={30}
          color="#0E9594"
        />
      </TouchableOpacity>
    );
  } else {
    return <View></View>;
  }
};

export default VisibleBtn;
