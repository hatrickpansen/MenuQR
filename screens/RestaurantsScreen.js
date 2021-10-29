import React, { useEffect, useRef, useState } from "react";
import placeholderDataResturants from "../components/browseRestaurants/placeholderDataRestaurants.json";
import {
  ActivityIndicator,
  SafeAreaView,
  Alert,
  FlatList,
  Text,
  StyleSheet,
  View,
  TextInput,
  Button,
  Dimensions,
  Image,
  RefreshControl,
  TouchableOpacity,
  Animated,
} from "react-native";

/*
import { SafeAreaView } from "react-native-safe-area-context";
*/
/*import RestaurantCard from "../components/RestaurantCard";*/
import { SearchBar } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { styleOrangeColor } from "../styles/customStyles";
import Svg, { Path } from "react-native-svg";
import { useFocusEffect } from "@react-navigation/native";
import FlatListRestaurant from "../components/browseRestaurants/flatListRestaurant";

/*export const scrollY = useRef(new Animated.Value(0)).current; //remember initial value*/

const RestaurantsScreen = ({ navigation }) => {
  const scrollY = useRef(new Animated.Value(0)).current; //remember initial value

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  /*useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);*/

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={tw.style({
          height: 0.4,
          width: "100%",
          backgroundColor: "#FF470B",
        })}
      />
    );
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  //focus screen on everytime page is rendered
  useFocusEffect(
    React.useCallback(() => {
      setFilteredDataSource(placeholderDataResturants);
      setMasterDataSource(placeholderDataResturants);
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setFilteredDataSource(placeholderDataResturants);
    setMasterDataSource(placeholderDataResturants);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <SafeAreaView style={tw.style(`flex bg-black`)}>
      <View
        style={tw.style(styles.container, {
          height: Dimensions.get("screen").height,
        })}
      >
        <SearchBar
          containerStyle={tw.style(`bg-gray-50 border border-gray-200`)}
          inputContainerStyle={tw.style(`bg-gray-50`)}
          style={tw.style(`bg-gray-50`)}
          round={false}
          searchIcon={{ size: 24 }}
          onChangeText={(text) => searchFilterFunction(text)}
          onClear={(text) => searchFilterFunction("")}
          placeholder="Search for restaurant"
          value={search}
        />
        <Animated.FlatList
          style={tw.style(`bg-gray-100`, { marginBottom: 50 })}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          refreshControl={
            <RefreshControl
              tintColor="white"
              style={styleOrangeColor.backgroundColor}
              // style={tw`bg-gray-500`}
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
          data={filteredDataSource}
          keyExtractor={(item, index) => index.toString()}
          /*ItemSeparatorComponent={ItemSeparatorView}*/
          renderItem={({ item, index }) => {
            //make small animation
            return (
              <FlatListRestaurant
                item={item}
                index={index}
                scrollY={scrollY}
                navigation={navigation}
              />
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  search: {
    fontSize: 24,
    textAlign: "center",
    shadowColor: "black",
    borderWidth: 3,
    borderRadius: 18,
    backgroundColor: "white",
    opacity: 0.25,
    margin: "auto",
  },
});

export default RestaurantsScreen;
