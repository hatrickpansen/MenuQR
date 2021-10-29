import React from "react";
import { View, Text } from "react-native";
import SubMenu from "../components/SubMenu";
import data from "../assets/data.json"

const MenuScreen = ({route}) => {
  // TODO: take in params from RestaurantCard to load correct restaurant data
  const {restaurantID} = route.params
  const items = data.filter(element => element.restId==restaurantID)
  console.log(items)
  return (
    <View style={{ alignItems: "center" }}>
      <SubMenu items={items}></SubMenu>
    </View>
  );
};

export default MenuScreen;
