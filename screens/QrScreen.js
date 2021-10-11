import React from "react";
import MyText from "../components/myText";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import { styleOrangeColor } from "../styles/customStyles";
import HomeScreenButton from "../components/homescreen/button";

const styles = StyleSheet.create({
  headerLogo: {
    backgroundColor: "#E5E5E5",
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height,
  },
});

const QrScreen = () => {
  return (
    <View>
      <View style={tw.style(`pt-8 px-20`, styles.headerLogo)}>
        <View style={tw`flex justify-center items-center`}>
          <Image
            style={{ height: 220, width: 220 }}
            source={require("../assets/permissionLogo.png")}
            resizeMode="contain"
            resizeMethod="resize"
          />
        </View>
        <View
          style={tw.style(`h-1 w-1/3 my-10`, {
            backgroundColor: "#FA4A0C",
          })}
        />
        <MyText style={tw.style(`pt-2`, styleOrangeColor.textOrange)}>
          If you wish to continue
        </MyText>
        <View style={tw`flex justify-center items-center`}>
          <MyText style={tw.style(`py-5 ios:pt-12 ios:pb-20 text-base w-4/5`)}>
            &bull; Please give us permission to use your camera and location
          </MyText>
          <TouchableOpacity
            style={tw.style(
              `h-12 w-full rounded-full items-center justify-center mb-3 shadow-md`,
              styleOrangeColor.backgroundColor
            )}
          >
            <MyText style={tw`text-base text-white font-bold`}>
              Give Permission
            </MyText>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export default QrScreen;
