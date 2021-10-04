import React, { useState } from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import styles from "../styles/homescreen";
import tw from "tailwind-react-native-classnames";

import * as data from "./data.json";
const image = { uri: "https://reactjs.org/logo-og.png" };

const HomeScreen = ({ navigation }: any) => {
  const [text, setText] = useState("");
  return (
    <SafeAreaView style={tw`bg-white w-full h-full`}>
      <View style={tw`p-4 android:pt-2 bg-gray-900 flex-row `}>
        {/*<Image
          style={{
            width: "100%",
            height: 100,
            resizeMode: "contain",
          }}
          source={require("../assets/logo.png")}
        />*/}
      </View>
    </SafeAreaView>
  );
};

/*const style = StyleSheet.create({
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
});*/

export default HomeScreen;
