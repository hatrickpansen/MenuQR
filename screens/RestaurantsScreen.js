import React, { useEffect, useState } from "react";
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
} from "react-native";

/*
import { SafeAreaView } from "react-native-safe-area-context";
*/
/*import RestaurantCard from "../components/RestaurantCard";*/
import { SearchBar } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { styleOrangeColor } from "../styles/customStyles";
import Svg, { Path } from "react-native-svg";

const RestaurantsScreen = ({ navigation }) => {
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

  useEffect(() => {
    return () => {
      setFilteredDataSource(placeholderDataResturants);
      setMasterDataSource(placeholderDataResturants);
      console.log("working fetch useffect");
    };
  }, []);

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

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <TouchableOpacity onPress={() => getItem(item)}>
        <View style={tw`py-4 px-2 shadow bg-gray-100`}>
          <View
            style={tw`flex bg-white rounded-2xl shadow-2xl overflow-hidden`}
          >
            <View>
              <Image
                style={{ width: "100%", height: 100 }}
                source={require("../assets/food1.jpg")}
                resizeMode="cover"
                resizeMethod="resize"
              />
            </View>
            <View style={tw`flex-row justify-between p-3 items-center`}>
              <Text
                style={tw.style(`font-medium`, styleOrangeColor.textOrange)}
              >
                {item.title}
              </Text>
              <View style={tw`flex-row items-center`}>
                <Svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <Path
                    d="M9 1.5C6.0975 1.5 3.75 3.8475 3.75 6.75C3.75 10.6875 9 16.5 9 16.5C9 16.5 14.25 10.6875 14.25 6.75C14.25 3.8475 11.9025 1.5 9 1.5ZM9 8.625C7.965 8.625 7.125 7.785 7.125 6.75C7.125 5.715 7.965 4.875 9 4.875C10.035 4.875 10.875 5.715 10.875 6.75C10.875 7.785 10.035 8.625 9 8.625Z"
                    fill="#FF470B"
                  />
                </Svg>
                <Text style={tw.style(`font-medium pl-1`)}>{item.address}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
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

  const getItem = (item) => {
    // Function for click on an item
    alert("Id : " + item.id + " Title : " + item.title);
  };

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

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
        <FlatList
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
          renderItem={ItemView}
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
