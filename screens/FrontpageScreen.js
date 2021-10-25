import React, { useEffect, useState } from "react";
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
} from "react-native";

/*
import { SafeAreaView } from "react-native-safe-area-context";
*/
/*import RestaurantCard from "../components/RestaurantCard";*/
import { SearchBar } from "react-native-elements";
import tw from "tailwind-react-native-classnames";

const FrontPageScreen = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((responseJson) => {
        setFilteredDataSource(responseJson);
        setMasterDataSource(responseJson);
      })
      .catch((error) => {
        console.error(error);
      });
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
      <View style={tw`py-4 px-2`}>
        <View style={tw`flex bg-gray-500 rounded-2xl overflow-hidden`}>
          <View>
            <Image
              style={{ width: "100%" }}
              source={require("../assets/food1.jpg")}
              resizeMode="contain"
              resizeMethod="resize"
            />
          </View>

          <Text style={styles.itemStyle} onPress={() => getItem(item)}>
            {item.id}
            {". "}
            {item.title.charAt(0).toUpperCase() + item.title.slice(1)}
            {/*Make first letter in word Uppercase*/}
          </Text>
        </View>
      </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 0.4,
          width: "100%",
          backgroundColor: "#FF470B",
        }}
      />
    );
  };

  const getItem = (item) => {
    // Function for click on an item
    alert("Id : " + item.id + " Title : " + item.title);
  };
  return (
    <SafeAreaView>
      <SafeAreaView style={{ flex: 1 }}>
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
            data={filteredDataSource}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={ItemView}
          />
        </View>
      </SafeAreaView>
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
