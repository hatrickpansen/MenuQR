import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { StyleSheet, FlatList, Dimensions, View, Image } from "react-native";
import ListItem from "./ListItem";
const { width, height } = Dimensions.get("screen");
import tw from "tailwind-react-native-classnames";
import { addItem } from "./ItemBuffer";

const SubMenu = (props) => {
  const dimensions = Dimensions.get("screen");
  const screenWidth = dimensions.width;

  function callbackVisibility(childData){
    console.log(childData);
    for (let i = 0; i < props.items.length; i++) {
      if(childData.id == props.items[i].id){
        props.items[i].id = childData.id;
        props.items[i].visible = childData.visible;
        addItem(props.items[i]);
      } 
    } 
  }
 


  return (
    <View style={tw.style(``)}>
      <FlatList
        data={props.items}
        renderItem={({ item }) => (
          <ListItem item={item} navigation={props.navigation} editMode={props.editMode} callback={callbackVisibility} />
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
