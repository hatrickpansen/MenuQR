import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, FlatList, Dimensions, View, Image } from "react-native";
import DATA from "../assets/data.json";
import ListItem from "./ListItem";
const { width, height } = Dimensions.get("screen");
import tw from "tailwind-react-native-classnames";

const SubMenu = (props) => {
  const dimensions = Dimensions.get("window");
  const screenWidth = dimensions.width;
  return (
    <View style={tw.style(`pt-4`)}>
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <ListItem item={item} navigation={props.navigation} />
        )}
        keyExtractor={(item) => item.id.toString()}
        style={{
          width: screenWidth,
        }}
      />
    </View>
  );
};

const SubMenuStyle = StyleSheet.create({
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
  flatList: {
    padding: 10,
    paddingTop: StatusBar.currentHeight || 42,
  },
});

export default SubMenu;
