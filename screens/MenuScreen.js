import React, { useEffect } from "react";
import { View, Text } from "react-native";
import SubMenu from "../components/SubMenu";
import data from "../assets/data.json"
import { useNavigation } from "@react-navigation/core";


const MenuScreen = ({ route }) => {
  // TODO: take in params from RestaurantCard to load correct restaurant data
  const navigation = useNavigation();
  const { restaurantID, title } = route.params
  var newTitle = title + " - Menu";
  const items = data.filter(element => element.restId == restaurantID)
  useEffect(() => {
    navigation.setOptions(navigation.setOptions({ title: newTitle }))
  })
  return (
    <View style={{ alignItems: "center" }}>
      <SubMenu items={items}></SubMenu>
    </View>
  );
};

export default MenuScreen;
