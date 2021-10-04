import { StatusBar } from "expo-status-bar";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";
import tw from "tailwind-react-native-classnames";
import {
  View,
  Text,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Dimensions,
  Alert,
  Button,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import HomeScreenButton from "./components/homescreen/button";

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
});

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
        }}
        source={require("./assets/backgroundimage.png")}
      >
        <View style={styles.container}>
          <View
            style={tw`flex-row flex-wrap justify-between pt-4 px-4 items-center`}
          >
            <Image
              style={{ height: 60, width: 60, resizeMode: "contain" }}
              source={require("./assets/logo.png")}
              resizeMode="contain"
              resizeMethod="resize"
            />
            <Image
              style={{ height: 20, width: 20, resizeMode: "contain" }}
              source={require("./assets/user.png")}
              resizeMode="contain"
              resizeMethod="resize"
            />
          </View>
          <View>
            <View style={tw`flex justify-center items-center`}>
              <View style={tw`flex-row flex-wrap pt-4 items-center`}>
                <Text style={tw.style("text-4xl font-bold", styles.textOrange)}>
                  Menu
                </Text>
                <Image
                  style={{ height: 30, resizeMode: "contain" }}
                  source={require("./assets/qr.png")}
                  resizeMode="contain"
                  resizeMethod="resize"
                />
                <Text style={tw.style("text-4xl font-bold", styles.textOrange)}>
                  R
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={tw`h-48`}>
          <View style={tw`px-8 flex`}>
            <HomeScreenButton title="Browse Restaurants" />
            <HomeScreenButton title="Scan QR" />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}
