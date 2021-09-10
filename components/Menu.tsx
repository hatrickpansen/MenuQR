import React from "react";
import { Text, ScrollView, View, FlatList } from "react-native";

const Menu = (props) => {
  return (
    <ScrollView>
      <SubMenu name="Menuer"></SubMenu>
      <SubMenu name="Drinks"></SubMenu>
      <SubMenu name="Tilbehør"></SubMenu>
    </ScrollView>
  );
};

const SubMenu = (props) => {
  return (
    <View>
      <Text style={{ fontSize: 24 }}>{props.name}</Text>
      <ScrollView horizontal={true}>
        {/* Add a flatlist with submenu data here (for example drinks) */}
        <Text>
          Burger, Cola, Pommes, Burger, Cola, PommesBurger, Cola, PommesBurger,
          Cola, PommesBurger, Cola, PommesBurger, Cola, Pommes
        </Text>
      </ScrollView>
    </View>
  );
};

export default Menu;
