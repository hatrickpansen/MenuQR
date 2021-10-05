import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import tw from "tailwind-react-native-classnames";
import { StyleSheet } from "react-native";
import HomeScreenButton from "./components/homescreen/button";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
/*https://docs.expo.dev/versions/latest/sdk/app-loading/*/

const Stack = createNativeStackNavigator();
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 25,
    padding: 15,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  textStyle: {
    color: "white",
    padding: 10,
  },
  textOrange: {
    color: "#FF470B",
  },
  textHeader: {
    fontSize: 54,
    fontFamily: "sansation-bold",
  },
});

export default function App() {
  const getFonts = () =>
    Font.loadAsync({
      "sansation-regular": require("./assets/fonts/Sansation_Regular.ttf"),
      "sansation-bold": require("./assets/fonts/Sansation_Regular.ttf"),
    });

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return <HomeScreen />;
  } else {
    return (
      <AppLoading
        startAsync={getFonts}
        onFinish={() => setFontsLoaded(true)}
        onError={(err) => console.log(err)}
      />
    );
  }
}
