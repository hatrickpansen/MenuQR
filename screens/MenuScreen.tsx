import React from "react";
import { View, Text } from "react-native";
import SubMenu from "../components/SubMenu";

const MenuScreen = ({}: any) => {
  // TODO: take in params from RestaurantCard to load correct restaurant data
  return (
    <View style={{ alignItems: "center" }}>
      <SubMenu></SubMenu>
    </View>
  );
};

export default MenuScreen;
