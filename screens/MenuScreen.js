import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
} from "react-native";
import SubMenu from "../components/SubMenu";
import tw from "tailwind-react-native-classnames";
import { styleOrangeColor } from "../styles/customStyles";
import RestaurantsData from "../db/placeholderDataRestaurants.json";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import data from "../assets/data.json";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import EditButton from "../components/authComponents/EditButton";
import { useIsFocused } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/core";
import Url from "../assets/Url";
import LoadingIndicator from "../components/LoadingIndicator";
import { color } from "react-native-elements/dist/helpers";
import PlusBtn from "../components/authComponents/PlusBtn";
import { getItems } from "../components/ItemBuffer";
import UpdateVisibleMultipleItems from "../assets/fetchMethods/updateMultipleItems";
import fetchAvailableItems from "../assets/fetchMethods/fetchAvailableItems";
import { FontAwesome5 } from "@expo/vector-icons";
const baseUrl = Url.url.url;
//

const FilterScreen = ({ route, type, editMode, items }) => {
  const { restaurantID } = route.params;
  let items2 = [];
  //incooperate later
  type === ""
    ? (items2 = items)
    : (items2 = items.filter((element) => element.type === type));

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
      <SubMenu items={items2} editMode={editMode} />
    </View>
  );
};

const Tab = createMaterialTopTabNavigator();

const MenuScreen = ({ route }) => {
  // TODO: take in params from RestaurantCard to load correct restaurant data
  // Gets data from the json file
  const isFocused = useIsFocused();
  const [errorMessage, setErrorMessage] = useState();
  const { restaurantID, auth } = route.params;
  const [editBtnAuth, setEditBtn] = useState(auth);
  const [isEditState, setIsEditState] = useState(false);
  const [dataItems, setDataItems] = useState([]);
  const [dataRests, setDataRests] = useState([]);
  const [loadingItems, setLoadingItems] = useState(true);
  const [loadingRests, setLoadingRests] = useState(true);
  const [shouldSaveVisible, setShouldSaveVisible] = useState(false);
  const [title, setTitle] = useState("title");
  const [address, setAddress] = useState("address");
  const [openingHours, setOpeningHours] = useState("openingHours");
  var abortController = new AbortController();
  var abortSignal = abortController.signal;
  const abort = () => {
    setTimeout(() => {
      abortController.abort();
      setErrorMessage("Can't contact Server");
    }, 5000);
  };

  const fetchItems = async () => {
    abort();
    const resp = await fetch(baseUrl + "/items/" + restaurantID, {
      abortSignal,
    });
    const data = await resp.json();
    setDataItems(data);
    setLoadingItems(false);
  };
  const fetchRestaurant = async () => {
    abort();
    const resp = await fetch(baseUrl + "/rest/" + restaurantID, {
      abortSignal,
    }).catch((error) => {
      console.error(error);
    });
    const statusCode = resp.status;
    console.log("menuScreen fetch: " + statusCode);
    if (statusCode == 200) {
      const data = await resp.json();
      setDataRests(data);
      setAddress(data.address);
      setTitle(data.title);
      setOpeningHours(data.openingHours);
      setLoadingRests(false);
    }
  };
  async function getAvailableItems() {
    abort();
    const data = await fetchAvailableItems(restaurantID, abortSignal);
    setDataItems(data);
    setLoadingItems(false);
  }

  useEffect(() => {
    if (auth) {
      fetchItems();
      fetchRestaurant();
    } else {
      getAvailableItems();
      fetchRestaurant();
    }
  }, []);
  //triggered when going back to this screen.
  useEffect(() => {
    if (auth) {
      fetchItems();
      fetchRestaurant();
    } else {
      getAvailableItems();
      fetchRestaurant();
    }
  }, [isFocused]);

  /*  function dataGetter(what) {
    return RestaurantsData?.filter(
      (item) => item?.id === restaurantID
    )?.pop()?.[what];
  } */
  /*  const title = dataGetter("title");
  const address = dataGetter("address");
  const openingHours = dataGetter("openingHours"); */

  if (title === undefined || loadingItems || loadingRests) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingIndicator></LoadingIndicator>
        <Text style={{ color: styleOrangeColor.textOrange.color }}>
          {errorMessage}
        </Text>
      </View>
    );
  }
  async function callbackFromEditBtn(childData) {
    setIsEditState(childData);
    setShouldSaveVisible(childData);
    //this shoudl be an api call to post changes on many items.
    let response;
    if (!childData) {
      response = await UpdateVisibleMultipleItems(getItems());
    }

    console.log(response);
  }
  return (
    <SafeAreaProvider style={tw.style(`pt-10`)}>
      <View style={tw.style(`items-center pb-4`)}>
        <Text
          style={tw.style(`pt-2 text-center`, styleOrangeColor.titleOrange)}
        >
          {title === undefined ? "cant find name" : title}
        </Text>
        <View style={{ flexDirection: "row", marginVertical: 10 }}>
          <View style={{ marginRight: 10 }}>
            <FontAwesome5 name="clock" size={20} color="#FF470B" />
          </View>
          <Text>{openingHours}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <View style={{ marginRight: 10 }}>
            <FontAwesome5 name="map-marker-alt" size={20} color="#FF470B" />
          </View>
          <Text>{address}</Text>
        </View>
        <View style={styles.plusBtn}>
          <PlusBtn isEditMode={isEditState} restId={restaurantID}></PlusBtn>
        </View>
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
          children={() => (
            <FilterScreen
              route={route}
              type={"food"}
              editMode={isEditState}
              items={dataItems}
              save={shouldSaveVisible}
            />
          )}
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
          children={() => (
            <FilterScreen
              route={route}
              type={"snack"}
              editMode={isEditState}
              items={dataItems}
              save={shouldSaveVisible}
            />
          )}
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
          children={() => (
            <FilterScreen
              route={route}
              type={"drink"}
              editMode={isEditState}
              items={dataItems}
              save={shouldSaveVisible}
            />
          )}
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
const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  plusBtn: {
    position: "absolute",
    left: "80%",
    top: "50%",
    zIndex: 10,
  },
});

export default MenuScreen;
