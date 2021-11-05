import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import SubMenu from "../components/SubMenu";
import tw from "tailwind-react-native-classnames";
import { styleOrangeColor } from "../styles/customStyles";
import RestaurantsData from "../components/browseRestaurants/placeholderDataRestaurants.json";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

function AllScreen() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 0,
      }}
    >
      {/*<Text>All foods!</Text>*/}
      <SubMenu> </SubMenu>
    </View>
  );
}

function AlacarteScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>A La Carte!</Text>
    </View>
  );
}

function DrinksScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Drinks!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

const MenuScreen = ({ route }: any) => {
  // TODO: take in params from RestaurantCard to load correct restaurant data
  //   const { id, title, address, openingHours} = route.params;

  const screenOptions = {
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "black",
    tabBarPressOpacity: 1,
    tabBarStyle: {
      borderRadius: "30",
    },
    style: {
      borderRadius: "30",
    },
    tabBarIndicatorStyle: {
      backgroundColor: "#FF470B",
      height: "100%",
      borderRadius: "30",
    },
  };

  return (
    <SafeAreaProvider style={tw.style(`pt-10`)}>
      <View style={tw.style(`items-center pb-4`)}>
        <Text
          style={tw.style(`pt-2 text-center`, styleOrangeColor.titleOrange)}
        >
          Restaurant Name Heeeere
        </Text>
        <Text>Opening hours:</Text>
        <Text>Address:</Text>
      </View>
      <Tab.Navigator
        screenOptions={screenOptions}
        timingConfig={{
          duration: 0, // will disable the animation
        }}
      >
        <Tab.Screen name="All" component={AllScreen} />
        <Tab.Screen name="A La Carte" component={AlacarteScreen} />
        <Tab.Screen name="Drinks" component={DrinksScreen} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default MenuScreen;
