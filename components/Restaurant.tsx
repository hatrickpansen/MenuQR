import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
} from "react-native";

const Restaurant = (props: any) => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={style.name}>{props.name}</Text>
      <TouchableHighlight onPress={() => props.navigation.navigate("Menu")}>
        <Image
          source={{
            uri: props.source,
          }}
          style={{ width: 100, height: 100 }}
        />
      </TouchableHighlight>
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
