import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Easing,
  Animated,
} from "react-native";
import { styleOrangeColor } from "../styles/customStyles";

const AllergeneCard = (props) => {
  const [alName, setAlName] = useState(<Text></Text>);
  const { name, image } = props;
  const [isNameVisible, setVisible] = useState(false);
  function clickImage(name) {
    if (!isNameVisible) {
      setAlName(<Text style={styleOrangeColor.textOrange}>{name}</Text>);
      setVisible(true);
    } else {
      setAlName(<Text></Text>);
      setVisible(false);
    }
  }

  return (
    <TouchableOpacity
      style={styles.imgContainer}
      onPress={() => {
        clickImage(name);
      }}
    >
      <Animated.Image source={image} style={[styles.pic]} />
      {alName}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    alignItems: "center",
    flexDirection: "column",
    marginRight: 5,
    justifyContent: "center",
    marginBottom: 5,
  },
  pic: {
    width: 30,
    height: 30,
    opacity: 0.6,
    margin: 5,
  },
});

export default AllergeneCard;
