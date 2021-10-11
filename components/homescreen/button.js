import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";
import MyText from "../myText";

const HomeScreenButton = ({ title, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={tw`h-12 w-full bg-white rounded-full items-center justify-center mb-3 shadow`}
    >
      <MyText style={tw`text-lg text-black font-bold`}>{title}</MyText>
    </TouchableOpacity>
  );
};
export default HomeScreenButton;
