import React, { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RestaurantCard from "../components/RestaurantCard";

const FrontPageScreen = ({ navigation }) => {
  const [text, setText] = useState("");
  return (
    <SafeAreaView>
      <View>
        <Image
          style={{ height: 60, width: 60 }}
          source={require("../assets/logo.png")}
          resizeMode="contain"
          resizeMethod="resize"
        />
        <TextInput
          placeholder="Search for restaurant"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
          textAlign="center"
          style={style.search}
        />
        <RestaurantCard />
        <Button
          title="Go to menu"
          onPress={() => navigation.navigate("Menu")}
        />
      </View>
    </SafeAreaView>
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

export default FrontPageScreen;
