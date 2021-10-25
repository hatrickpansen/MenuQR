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

const FrontPageScreen = ({ navigation }) => {
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
            <View style={tw`flex-row justify-between py-3`}>
              <Text style={styles.itemStyle}>{item.title}</Text>
              <Text style={styles.itemStyle}>{item.address}</Text>
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
    <SafeAreaView style={tw.style(`flex`, styleOrangeColor.backgroundColor)}>
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

      {/* <View>
        <TextInput
          placeholder="Search for restaurant"
          onChangeText={(text) => setText(text)}
          defaultValue={text}
          textAlign="center"
          style={style.search}
        />
        <RestaurantCard />
        <Button
          title="Go to menu"
          onPress={() => navigation.navigate("Menu")}
        />
      </View>*/}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  itemStyle: {
    padding: 10,
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

export default FrontPageScreen;
