// import React, { useEffect } from "react";
// import { View, Text } from "react-native";
// import SubMenu from "../components/SubMenu";
// import data from "../assets/data.json";
// import { useNavigation } from "@react-navigation/core";
//
// const MenuScreen = ({ route }) => {
//   // TODO: take in params from RestaurantCard to load correct restaurant data
//   const navigation = useNavigation();
//   const { restaurantID, title } = route.params;
//   var newTitle = title + " - Menu";
//   const items = data.filter((element) => element.restId == restaurantID);
//   useEffect(() => {
//     navigation.setOptions(navigation.setOptions({ title: newTitle }));
//   });
//   return (
//     <View style={{ alignItems: "center" }}>
//       <SubMenu items={items}></SubMenu>
//     </View>
//   );
// };
//
// export default MenuScreen;

import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import SubMenu from "../components/SubMenu";
import tw from "tailwind-react-native-classnames";
import { styleOrangeColor } from "../styles/customStyles";
import RestaurantsData from "../components/browseRestaurants/placeholderDataRestaurants.json";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useNavigation } from "@react-navigation/core";
import data from "../assets/data.json";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";

const AllScreen = ({ route }) => {
  const navigation = useNavigation();
  const { restaurantID, title } = route.params;
  const newTitle = title + " - Menu";
  const items = data.filter((element) => element.restId === restaurantID);
  // useEffect(() => {
  //   navigation.setOptions(navigation.setOptions({ title: newTitle }));
  // });
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingTop: 60,
        borderBottomColor: "gray",
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;",
      }}
    >
      {/*<Text>All foods!</Text>*/}
      <SubMenu items={items} />
      {/*<SubMenu />*/}
    </View>
  );
};

const AlacarteScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>A La Carte!</Text>
    </View>
  );
};

const DrinksScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Drinks!</Text>
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const MenuScreen = ({ route }) => {
  // TODO: take in params from RestaurantCard to load correct restaurant data
  //   const { id, title, address, openingHours} = route.params;
  const { restaurantID, title } = route.params;

  return (
    <SafeAreaProvider style={tw.style(`pt-10`)}>
      <View style={tw.style(`items-center pb-4`)}>
        <Text
          style={tw.style(`pt-2 text-center`, styleOrangeColor.titleOrange)}
        >
          {/*Restaurant Name Heeeere*/}
          {title}
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
        <Tab.Screen
          name="All"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View>
                <MaterialCommunityIcons
                  name="food"
                  size={32}
                  color={focused ? "white" : "black"}
                />
              </View>
            ),
          }}
          children={() => <AllScreen route={route} />}
        />
        <Tab.Screen name="A La Carte" component={AlacarteScreen} />
        <Tab.Screen name="Drinks" component={DrinksScreen} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

const screenOptions = {
  tabBarActiveTintColor: "white",
  tabBarInactiveTintColor: "black",
  tabBarPressOpacity: 1,
  tabBarStyle: {
    borderRadius: "30",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;",
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

export default MenuScreen;
