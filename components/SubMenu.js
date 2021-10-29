import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, FlatList, Dimensions, View, Image } from "react-native";
import ListItem from "./ListItem";
const { width, height } = Dimensions.get("screen");

const SubMenu = (props) => {
  const dimensions = Dimensions.get("window");
  const screenWidth = dimensions.width;
  console.log(props.items);
  return (
    <View>
      <FlatList
        data={props.items}
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
