import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
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
import HomeScreenButton from "../components/homescreen/button";

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

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        style={{
          width: Dimensions.get("screen").width,
          height: Dimensions.get("screen").height,
        }}
        source={require("../assets/backgroundimage.png")}
      >
        <View style={styles.container}>
          <View
            style={tw`flex-row flex-wrap justify-between pt-8 px-4 items-center`}
          >
            <Image
              style={{ height: 60, width: 60, resizeMode: "contain" }}
              source={require("../assets/logo.png")}
              resizeMode="contain"
              resizeMethod="resize"
            />
            <Image
              style={{ height: 20, width: 20, resizeMode: "contain" }}
              source={require("../assets/user.png")}
              resizeMode="contain"
              resizeMethod="resize"
            />
          </View>
          <View>
            <View style={tw`flex justify-center items-center pt-16`}>
              <View style={tw`flex-row flex-wrap pt-4 items-center`}>
                <Text
                  style={tw.style(
                    "font-bold",
                    styles.textOrange,
                    styles.textHeader
                  )}
                >
                  Menu
                </Text>
                <Image
                  style={tw.style(``, {
                    height: 38,
                    resizeMode: "contain",
                  })}
                  source={require("../assets/qr.png")}
                  resizeMode="contain"
                  resizeMethod="resize"
                />
                <Text
                  style={tw.style(
                    "font-bold",
                    styles.textOrange,
                    styles.textHeader
                  )}
                >
                  R
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View style={tw`h-52`}>
          <View style={tw``} />
          <View style={tw`px-8 flex`}>
            <HomeScreenButton title="Browse Restaurants" />
            <HomeScreenButton title="Scan QR" />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;
