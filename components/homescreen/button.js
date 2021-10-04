import React from "react";
import { Text, TouchableOpacity } from "react-native";
import tw from "tailwind-react-native-classnames";

const HomeScreenButton = ({ title }) => {
  return (
    <TouchableOpacity
      style={tw`h-12 w-full bg-white rounded-full items-center justify-center mb-3 shadow`}
    >
      <Text style={tw`text-lg text-black font-bold`}>{title}</Text>
    </TouchableOpacity>
  );
};
export default HomeScreenButton;
