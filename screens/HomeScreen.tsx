import React, { useState, Component } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Button,
} from "react-native";
import Restaurant from "../components/Restaurant";
import Menu from "../components/Menu";

const HomeScreen = (props: any) => {
  const [text, setText] = useState("");

  return (
    <ScrollView>
      <Text style={style.title}>MenuQR</Text>
      <TextInput
        placeholder="Search for restaurant"
        onChangeText={(text) => setText(text)}
        defaultValue={text}
        textAlign="center"
      />
      <Restaurant
        name="McD"
        source="http://ringstedoutlet.dk/wp-content/uploads/mcd.jpg"
        navigation={props.navigation}
      ></Restaurant>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  title: {
    fontSize: 76,
    textAlign: "center",
    color: "#000",
  },
});

export default HomeScreen;
