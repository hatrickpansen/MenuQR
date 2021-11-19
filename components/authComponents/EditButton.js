import React, { useState } from "react";
import { Button, View, TouchableOpacity, StyleSheet, Text } from "react-native";
import { styleOrangeColor } from "../../styles/customStyles";
const orangeColor = styleOrangeColor.textOrange.color;

const EditButton = ({ auth, callback, editMode }) => {
  const [btnText, setBtnText] = useState("Edit");
  const [isEditMode, setIsEditMode] = useState(editMode);
  const sendDataToParent = () => {
    if (isEditMode) {
      callback(false);
      setIsEditMode(false);
      setBtnText("Edit");
    } else if (!isEditMode) {
      callback(true);
      setIsEditMode(true);
      setBtnText("Save Changes");
    }
  };
  if (auth) {
    return (
      <View stlyes={styles.container}>
        <TouchableOpacity onPress={sendDataToParent} style={styles.touchable}>
          <Text style={styles.text}>{btnText}</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return <View></View>;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
    width: "100%",
  },
  text: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 20,
  },
  touchable: {
    backgroundColor: "#0E9594",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
});
export default EditButton;
