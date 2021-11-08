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
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(1));
  const [alName, setAlName] = useState("");
  const { name, image } = props;
  const [isNameVisible, setVisible] = useState(false);
  function clickImage(name) {
    if (!isNameVisible) {
      setAlName(name);
      setVisible(true);
    } else {
      setAlName("");
      setVisible(false);
    }

    imageAnimation();
  }

  function imageAnimation() {
    Animated.timing(animatedValue, {
      toValue: 2,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start(() => {});
  }
  return (
    <TouchableOpacity
      style={styles.imgContainer}
      onPress={() => {
        clickImage(name);
      }}
    >
      <Animated.Image source={image} style={[styles.pic]} />
      <Text style={styleOrangeColor.textOrange}>{alName}</Text>
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
