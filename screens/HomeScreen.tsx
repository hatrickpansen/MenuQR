import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path } from "react-native-svg";

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
import { styleOrangeColor } from "../styles/customStyles";

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
    // <SafeAreaView style={styles.container}>
    <SafeAreaView style={tw.style(`flex bg-black`)}>
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
            <View style={tw`flex justify-center items-center pt-10`}>
              <View style={tw`flex-row flex-wrap pt-4 items-center`}>
                <Svg viewBox="0 0 169 43" fill="none" style={tw`w-64 h-32`}>
                  <Path
                    d="M120.093 8H112.279C111.675 8.00069 111.096 8.24103 110.668 8.66829C110.241 9.09554 110.001 9.67483 110 10.2791V18.093C110.001 18.6973 110.241 19.2765 110.668 19.7038C111.096 20.1311 111.675 20.3714 112.279 20.3721H120.093C120.697 20.3714 121.277 20.1311 121.704 19.7038C122.131 19.2765 122.371 18.6973 122.372 18.093V10.2791C122.371 9.67483 122.131 9.09554 121.704 8.66829C121.277 8.24103 120.697 8.00069 120.093 8V8ZM120.419 18.093C120.418 18.1793 120.384 18.2621 120.323 18.3231C120.262 18.3841 120.179 18.4185 120.093 18.4186H112.279C112.193 18.4185 112.11 18.3841 112.049 18.3231C111.988 18.2621 111.954 18.1793 111.953 18.093V10.2791C111.954 10.1928 111.988 10.11 112.049 10.049C112.11 9.98796 112.193 9.95362 112.279 9.95349H120.093C120.179 9.95362 120.262 9.98796 120.323 10.049C120.384 10.11 120.418 10.1928 120.419 10.2791V18.093ZM120.093 23.6279H112.279C111.675 23.6286 111.096 23.8689 110.668 24.2962C110.241 24.7235 110.001 25.3027 110 25.907V33.7209C110.001 34.3252 110.241 34.9045 110.668 35.3317C111.096 35.759 111.675 35.9993 112.279 36H120.093C120.697 35.9993 121.277 35.759 121.704 35.3317C122.131 34.9045 122.371 34.3252 122.372 33.7209V25.907C122.371 25.3027 122.131 24.7235 121.704 24.2962C121.277 23.8689 120.697 23.6286 120.093 23.6279V23.6279ZM120.419 33.7209C120.418 33.8072 120.384 33.89 120.323 33.951C120.262 34.012 120.179 34.0464 120.093 34.0465H112.279C112.193 34.0464 112.11 34.012 112.049 33.951C111.988 33.89 111.954 33.8072 111.953 33.7209V25.907C111.954 25.8207 111.988 25.7379 112.049 25.6769C112.11 25.6159 112.193 25.5815 112.279 25.5814H120.093C120.179 25.5815 120.262 25.6159 120.323 25.6769C120.384 25.7379 120.418 25.8207 120.419 25.907V33.7209ZM135.721 8H127.907C127.303 8.00069 126.723 8.24103 126.296 8.66829C125.869 9.09554 125.629 9.67483 125.628 10.2791V18.093C125.629 18.6973 125.869 19.2765 126.296 19.7038C126.723 20.1311 127.303 20.3714 127.907 20.3721H135.721C136.325 20.3714 136.904 20.1311 137.332 19.7038C137.759 19.2765 137.999 18.6973 138 18.093V10.2791C137.999 9.67483 137.759 9.09554 137.332 8.66829C136.904 8.24103 136.325 8.00069 135.721 8V8ZM136.047 18.093C136.046 18.1793 136.012 18.2621 135.951 18.3231C135.89 18.3841 135.807 18.4185 135.721 18.4186H127.907C127.821 18.4185 127.738 18.3841 127.677 18.3231C127.616 18.2621 127.582 18.1793 127.581 18.093V10.2791C127.582 10.1928 127.616 10.11 127.677 10.049C127.738 9.98796 127.821 9.95362 127.907 9.95349H135.721C135.807 9.95362 135.89 9.98796 135.951 10.049C136.012 10.11 136.046 10.1928 136.047 10.2791V18.093ZM125.628 29.814V24.6047C125.628 24.3456 125.731 24.0972 125.914 23.914C126.097 23.7308 126.346 23.6279 126.605 23.6279C126.864 23.6279 127.112 23.7308 127.295 23.914C127.478 24.0972 127.581 24.3456 127.581 24.6047V29.814C127.581 30.073 127.478 30.3214 127.295 30.5046C127.112 30.6878 126.864 30.7907 126.605 30.7907C126.346 30.7907 126.097 30.6878 125.914 30.5046C125.731 30.3214 125.628 30.073 125.628 29.814ZM138 27.2093C138 27.4684 137.897 27.7168 137.714 27.9C137.531 28.0831 137.282 28.186 137.023 28.186H132.791V35.0233C132.791 35.2823 132.688 35.5307 132.505 35.7139C132.321 35.8971 132.073 36 131.814 36H126.605C126.346 36 126.097 35.8971 125.914 35.7139C125.731 35.5307 125.628 35.2823 125.628 35.0233C125.628 34.7642 125.731 34.5158 125.914 34.3326C126.097 34.1494 126.346 34.0465 126.605 34.0465H130.837V24.6047C130.837 24.3456 130.94 24.0972 131.123 23.914C131.306 23.7308 131.555 23.6279 131.814 23.6279C132.073 23.6279 132.321 23.7308 132.505 23.914C132.688 24.0972 132.791 24.3456 132.791 24.6047V26.2326H137.023C137.282 26.2326 137.531 26.3355 137.714 26.5186C137.897 26.7018 138 26.9503 138 27.2093ZM138 32.4186V35.0233C138 35.2823 137.897 35.5307 137.714 35.7139C137.531 35.8971 137.282 36 137.023 36C136.764 36 136.516 35.8971 136.333 35.7139C136.149 35.5307 136.047 35.2823 136.047 35.0233V32.4186C136.047 32.1596 136.149 31.9111 136.333 31.7279C136.516 31.5448 136.764 31.4419 137.023 31.4419C137.282 31.4419 137.531 31.5448 137.714 31.7279C137.897 31.9111 138 32.1596 138 32.4186V32.4186Z"
                    fill="#FF470B"
                  />
                  <Path
                    d="M4.92969 36V8.07031H10.3008L19.7734 29.2617L29.0508 8.07031H34.2266V36H29.4414V16.5469L21.8633 36H17.4492L9.71484 16.5469V36H4.92969ZM48.25 15.4922C54.474 15.4922 57.5859 18.6693 57.5859 25.0234C57.5859 25.8698 57.5273 26.7161 57.4102 27.5625H43.7969C43.7969 30.4531 45.9193 31.8984 50.1641 31.8984C52.2344 31.8984 54.3047 31.7031 56.375 31.3125V35.4141C54.5651 35.8047 52.3646 36 49.7734 36C42.3385 36 38.6211 32.5039 38.6211 25.5117C38.6211 18.832 41.8307 15.4922 48.25 15.4922ZM43.7969 23.9688H52.5469V23.8125C52.5469 20.974 51.1146 19.5547 48.25 19.5547C45.5156 19.5547 44.0312 21.026 43.7969 23.9688ZM61.4727 36V15.4922H65.4766L66.1211 18.5C68.0872 16.4948 70.3268 15.4922 72.8398 15.4922C77.6966 15.4922 80.125 18.0182 80.125 23.0703V36H74.9492V23.0703C74.9492 20.8047 73.8229 19.6719 71.5703 19.6719C69.8906 19.6719 68.25 20.3424 66.6484 21.6836V36H61.4727ZM103.484 15.4922V36H99.4414L98.8164 33.3828C96.4596 35.1276 93.9596 36 91.3164 36C87.1237 36 85.0273 33.5195 85.0273 28.5586V15.4922H90.2031V28.4219C90.2031 30.6875 91.1927 31.8203 93.1719 31.8203C94.8516 31.8203 96.5638 31.1497 98.3086 29.8086V15.4922H103.484ZM144.031 35.9609V8.07031H156.727C162.43 8.07031 165.281 10.5638 165.281 15.5508C165.281 18.9232 163.061 21.7161 158.621 23.9297L167.469 36H160.945L152.449 23.832V21.4688C157.397 20.6224 159.871 18.7018 159.871 15.707C159.871 13.6497 158.712 12.6211 156.395 12.6211H149.305V35.9609H144.031Z"
                    fill="#FF470B"
                  />
                </Svg>
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
            <View style={tw`px-8 flex pt-24`}>
              <HomeScreenButton
                title="Continue"
                onPress={() => navigation.navigate("Restaurants")}
              />
              <HomeScreenButton
                title="Scan QR"
                onPress={() => navigation.navigate("QR Scan")}
              />
            </View>
          </LinearGradient>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default HomeScreen;
