import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

const Restaurant = (props) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={style.name}>{props.name}</Text>
      <Image
        source={{
          uri: props.source,
        }}
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  name: {
    fontSize: 28,
    textAlign: "center",
  },
});

export default Restaurant;
