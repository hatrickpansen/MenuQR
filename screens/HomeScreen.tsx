import React, { useState } from "react";
import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Button,
  Image,
  FlatList,
} from "react-native";
import * as data from "./data.json";

const HomeScreen = ({ navigation }: any) => {
  const [text, setText] = useState("");
  return (
    <View>
      <Text style={style.title}>MenuQR</Text>
      <TextInput
        placeholder="Search for restaurant"
        onChangeText={(text) => setText(text)}
        defaultValue={text}
        textAlign="center"
        style={style.search}
      />
      <Button
        title="Go to menu"
        onPress={() =>
          navigation.navigate("Menu", {
            hello: "pat",
            hi: "pat",
          })
        }
      />
      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        renderItem={({item, index}) => {
          return <View>
        }}
      />
    </View>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 76,
    textAlign: "center",
    color: "#000",
  },
  search: {
    fontSize: 24,
    textAlign: "center",
    shadowColor: "black",
    borderWidth: 3,
    borderRadius: 25,
    backgroundColor: "white",
    opacity: 0.25,
    margin: "auto",
  },
});

export default HomeScreen;
