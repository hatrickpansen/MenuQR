import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import SubMenu from "../components/SubMenu";
import tw from "tailwind-react-native-classnames";
import { styleOrangeColor } from "../styles/customStyles";
import RestaurantsData from "../db/placeholderDataRestaurants.json";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import data from "../assets/data.json";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import EditButton from "../components/authComponents/EditButton";
import { useIsFocused } from '@react-navigation/native';
const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';

const FilterScreen = ({ route, type, editMode, items }) => {
  const { restaurantID } = route.params;
  let items2 = [];
  

//incooperate later
  type === ""
    ? (items2 = items)
    : (items2 = items.filter(
        (element) =>  element.type === type
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
      <SubMenu items={items2} editMode={editMode}/>
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const MenuScreen = ({ route }) => {
  // TODO: take in params from RestaurantCard to load correct restaurant data
  // Gets data from the json file
  const isFocused = useIsFocused()
  const { restaurantID, auth } = route.params;
  const [editBtnAuth, setEditBtn] = useState(auth);
  const [isEditState, setIsEditState] = useState(false);
  const [dataItems, setDataItems] = useState([]);
  const [dataRests, setDataRests] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingRests, setLoadingRests] = useState(true);
  const [title, setTitle] = useState("title");
  const [address, setAddress] = useState("address");
  const [openingHours, setOpeningHours] = useState("openingHours");

  const fetchItems = async () => {
    const resp = await fetch(baseUrl + "/items/" + restaurantID);
    const data = await resp.json();
    setDataItems(data);
    setLoadingItems(false);
  };
  const fetchRestaurant = async () => {
    const resp = await fetch(baseUrl + '/rest/' + restaurantID);
    const data = await resp.json();
    setDataRests(data);
    setAddress(data.address);
    setTitle(data.title);
    setOpeningHours(data.openingHours);
    setLoadingRests(false);
  };

  useEffect(() => {
    fetchItems();
    fetchRestaurant();
  }, []);
  //triggered when going back to this screen.
  useEffect(() => {
    fetchItems();
    fetchRestaurant();
  }, [isFocused]);

 /*  function dataGetter(what) {
    return RestaurantsData?.filter(
      (item) => item?.id === restaurantID
    )?.pop()?.[what];
  } */
 /*  const title = dataGetter("title");
  const address = dataGetter("address");
  const openingHours = dataGetter("openingHours"); */

 
  if (title === undefined ||loadingItems || loadingRests) {
    return (
      <View style={tw`h-56 flex justify-center `}>
        <Text>Loading</Text>
      </View>
    );
  }
  const callbackFromEditBtn = (childData) => {
    setIsEditState(childData);
  };
  return (
    <SafeAreaProvider style={tw.style(`pt-10`)}>
      <View style={tw.style(`items-center pb-4`)}>
        <Text
          style={tw.style(`pt-2 text-center`, styleOrangeColor.titleOrange)}
        >
          {title === undefined ? "cant find name" : title}
        </Text>
        <Text>Opening hours: {openingHours}</Text>
        <Text>{address}</Text>
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
          children={() => <FilterScreen route={route} type={"food"} editMode={isEditState} items={dataItems} />}
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
          children={() => <FilterScreen route={route} type={"snack"} editMode={isEditState} items={dataItems} />}
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
          children={() => <FilterScreen route={route} type={"drink"} editMode={isEditState} items={dataItems} />}
        />
      </Tab.Navigator>
      <EditButton
        auth={editBtnAuth}
        callback={callbackFromEditBtn}
        editMode={isEditState}
      ></EditButton>
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
