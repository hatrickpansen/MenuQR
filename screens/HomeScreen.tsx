import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";

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
  /*gradientOrange: {
    backgroundColor: "rgb(255,71,11)",
    background:
      "linear-gradient(180deg, rgba(255,71,11,0.10407913165266103) 16%, rgba(255,71,11,1) 54%, rgba(255,71,11,1) 100%)",
  },*/
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    textAlign: "center",
    margin: 10,
    color: "#ffffff",
    backgroundColor: "transparent",
  },
});

const HomeScreen = ({ navigation }: any) => {
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
              style={{ height: 60, width: 60 }}
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
        <View style={tw`ios:h-80 android:h-72 `}>
          <LinearGradient
            colors={[
              "rgba(255,71,11,0.002)",
              "rgba(255,71,11,0.2)",
              "rgba(255,71,11,0.4)",
              "rgba(255,71,11,0.7)",
              "rgba(255,71,11,1)",
              "rgba(255,71,11,1)",
            ]}
            style={styles.container}
            start={{ x: 1, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {/*background: rgb(255,71,11); background: linear-gradient(180deg,
          rgba(255,71,11,0.10407913165266103) 16%, rgba(255,71,11,1) 54%,
          rgba(255,71,11,1) 100%);*/}
            {/*<View style={styles.gradientOrange} />*/}
            <View style={tw`px-8 flex pt-24`}>
              <HomeScreenButton
                title="Browse Restaurants"
                onPress={() => navigation.navigate("Menu")}
              />
              <HomeScreenButton
                title="Scan QR"
                onPress={() => navigation.navigate("QR")}
              />
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;
