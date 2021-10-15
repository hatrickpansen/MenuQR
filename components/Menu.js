import React from "react";
import { Text, SafeAreaView, FlatList } from "react-native";
import DATA from "../screens/data.json";

const RenderItem = {{ item }} => (
    <
)

const Menu = (props, route) => {
  const { name, menus } = route.params;
  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};
