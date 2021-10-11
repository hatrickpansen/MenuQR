import React from "react";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  text: {
    fontFamily: "roboto-regular",
  },
});

const MyText = (props) => {
  return (
    <Text style={styles.text} {...props}>
      {props.children}
    </Text>
  );
};
export default MyText;
