import React from "react";
import { View, Text } from "react-native";
import SubMenu from "../components/SubMenu";

const MenuScreen = () => {
  return (
    <View style={{ alignItems: "center" }}>
      <Text>MenuScreen</Text>
      <SubMenu></SubMenu>
    </View>
  );
};

export default MenuScreen;
