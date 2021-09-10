import React from "react";
import {
  Text,
  ScrollView,
  View,
  FlatList,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  StyleSheet,
} from "react-native";

const Menu = (props: any) => {
  return (
    <ScrollView>
      <SubMenu name="Menuer"></SubMenu>
      <SubMenu name="Drinks"></SubMenu>
      <SubMenu name="Tilbehør"></SubMenu>
    </ScrollView>
  );
};

const SubMenu = (props: any) => {
  return (
    <View>
      <Text style={{ fontSize: 24, marginLeft: 15, marginTop: 5 }}>
        {props.name}
      </Text>
      <ScrollView horizontal={true}>
        {/* Add a flatlist with submenu data here (for example drinks) */}
        <SubMenuItem source="https://www.hvadimad.dk/wp-content/uploads/2019/10/mcdonalds-cheese-burger.jpg" />
        <SubMenuItem source="https://www.hvadimad.dk/wp-content/uploads/2019/10/mcdonalds-cheese-burger.jpg" />
        <SubMenuItem source="https://www.hvadimad.dk/wp-content/uploads/2019/10/mcdonalds-cheese-burger.jpg" />
        <SubMenuItem source="https://www.hvadimad.dk/wp-content/uploads/2019/10/mcdonalds-cheese-burger.jpg" />
        <SubMenuItem source="https://www.hvadimad.dk/wp-content/uploads/2019/10/mcdonalds-cheese-burger.jpg" />
        <SubMenuItem source="https://www.hvadimad.dk/wp-content/uploads/2019/10/mcdonalds-cheese-burger.jpg" />
        <SubMenuItem source="https://www.hvadimad.dk/wp-content/uploads/2019/10/mcdonalds-cheese-burger.jpg" />
        <SubMenuItem source="https://www.hvadimad.dk/wp-content/uploads/2019/10/mcdonalds-cheese-burger.jpg" />
        <SubMenuItem source="https://www.hvadimad.dk/wp-content/uploads/2019/10/mcdonalds-cheese-burger.jpg" />
        <SubMenuItem source="https://www.hvadimad.dk/wp-content/uploads/2019/10/mcdonalds-cheese-burger.jpg" />
        <SubMenuItem source="https://www.hvadimad.dk/wp-content/uploads/2019/10/mcdonalds-cheese-burger.jpg" />
        <SubMenuItem source="https://www.hvadimad.dk/wp-content/uploads/2019/10/mcdonalds-cheese-burger.jpg" />
      </ScrollView>
    </View>
  );
};

const SubMenuItem = (props: any) => {
  return (
    <View>
      <Image
        source={{
          uri: props.source,
        }}
        style={SubMenuItemStyle.image}
      />
    </View>
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
});

export default Menu;
