import React from "react";
import { StyleSheet, FlatList, Dimensions } from "react-native";
import DATA from "../assets/data.json";
import ListItem from "./ListItem";

const SubMenu = (props) => {
  const dimensions = Dimensions.get("window");
  const screenWidth = dimensions.width;
  return (
    <FlatList
      data={DATA}
      renderItem={({ item }) => (
        <ListItem item={item} navigation={props.navigation} />
      )}
      keyExtractor={(item) => item.id}
      //horizontal={true}
      style={{
        width: screenWidth,
      }}
    />
  );
};

const SubMenuItemStyle = StyleSheet.create({
  image: {
    borderRadius: 20,
    width: 100,
    height: 100,
    marginLeft: 15,
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
  },
});

export default SubMenu;
