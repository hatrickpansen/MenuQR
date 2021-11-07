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

const FilterScreen = ({ route, type }) => {
  const navigation = useNavigation();
  const { restaurantID, title } = route.params;
  const newTitle = title + " - Menu";
  let items = [];

  type === ""
    ? (items = data.filter((element) => element.restId === restaurantID))
    : (items = data.filter(
        (element) => element.restId === restaurantID && element.type === type
      ));

  return (
    <View
      style={{
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 0.41,
        elevation: 2,
      }}
    >
      {/*<Text>All foods!</Text>*/}
      <SubMenu items={items} />
      {/*<SubMenu />*/}
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const MenuScreen = ({ route }) => {
  // TODO: take in params from RestaurantCard to load correct restaurant data
  const { restaurantID } = route.params;
  const title = RestaurantsData?.filter(
    (item) => item?.id === restaurantID
  )?.pop()?.title;

  if (title === undefined) {
    return (
      <View style={tw`h-56 flex justify-center `}>
        <Text>Not working</Text>
      </View>
    );
  }
  return (
    <SafeAreaProvider style={tw.style(`pt-10`)}>
      <View style={tw.style(`items-center pb-4`)}>
        <Text
          style={tw.style(`pt-2 text-center`, styleOrangeColor.titleOrange)}
        >
          {/*Restaurant Name Heeeere*/}
          {title === undefined ? "cant find name" : title}
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
                  name="hamburger"
                  size={30}
                  color={focused ? "white" : "black"}
                />
              </View>
            ),
          }}
          children={() => <FilterScreen route={route} type={"food"} />}
        />
        <Tab.Screen
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View>
                <MaterialCommunityIcons
                  name="food-drumstick"
                  size={24}
                  color={focused ? "white" : "black"}
                />
              </View>
            ),
          }}
          name="A La Carte"
          //component={AlacarteScreen}
          children={() => <FilterScreen route={route} type={"snack"} />}
        />
        <Tab.Screen
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <View>
                <Entypo name="drink" size={24} color="black" />
              </View>
            ),
          }}
          name="Drinks"
          //component={DrinksScreen}
          children={() => <FilterScreen route={route} type={"drink"} />}
        />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

const screenOptions = {
  tabBarActiveTintColor: "white",
  tabBarInactiveTintColor: "black",
  tabBarPressOpacity: 1,
  tabBarStyle: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 0.41,

    elevation: 2,
    marginLeft: 12,
    marginRight: 12,
    borderRadius: 10,
  },
  style: {
    borderRadius: 10,
  },
  tabBarIndicatorStyle: {
    backgroundColor: "#FF470B",
    height: "100%",
    borderRadius: 10,
  },
};

export default MenuScreen;
