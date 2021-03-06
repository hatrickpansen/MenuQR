import React, { useRef, useState } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  View,
  Dimensions,
  RefreshControl,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";

import { SearchBar, Overlay } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import { styleOrangeColor } from "../styles/customStyles";
import { useFocusEffect } from "@react-navigation/native";
import placeholderDataRestaurants from "../db/placeholderDataRestaurants.json";
import FlatListItem from "../components/browseRestaurants/flatListRestaurant";

const RestaurantsScreen = /* async */ ({ navigation }) => {
  const [visible, setVisible] = useState(false);
  const toggleOverlay = () => {
    setVisible(!visible);
  };
  const scrollY = useRef(new Animated.Value(0)).current; //remember initial value

  const [search, setSearch] = useState("");
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);

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

  const [refreshing, setRefreshing] = React.useState(false);

  const wait = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };

  //focus screen on everytime page is rendered
  useFocusEffect(
    React.useCallback(() => {
      setFilteredDataSource(placeholderDataRestaurants);
      setMasterDataSource(placeholderDataRestaurants);
    }, [])
  );

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setFilteredDataSource(placeholderDataRestaurants);
    setMasterDataSource(placeholderDataRestaurants);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  if (search === "") {
    return (
      <SafeAreaView style={tw.style(`flex`)}>
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
          <Text
            style={tw.style(
              `px-2 text-2xl font-bold bg-gray-100 pt-3`,
              styleOrangeColor.textOrange
            )}
          >
            &#128293; Featured &#128293;
          </Text>

          <RestaurantCategory category={"featured"} navigation={navigation} />
          <Text
            style={tw.style(
              `px-2 text-2xl font-bold bg-gray-100 text-gray-800 pt-3`
            )}
          >
            New
          </Text>
          <RestaurantCategory category={"recent"} navigation={navigation} />
        </View>
      </SafeAreaView>
    );
  }

  if (filteredDataSource.length <= 0) {
    return (
      <SafeAreaView style={tw.style(`flex`)}>
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
          <TouchableOpacity
            onPress={() => setSearch("")}
            style={tw.style(
              {
                top: 66,
                left: 0,
                width: "100%",
                height: "100%",
                position: "absolute",
                zIndex: 10,
                backgroundColor: "white",
              },
              `opacity-90`
            )}
          >
            <View
              style={tw.style(`flex items-center justify-center h-48`, {
                width: Dimensions.get("screen").width,
              })}
            >
              <Text style={tw`text-center text-lg font-semibold text-gray-400`}>
                Not found
              </Text>
            </View>
          </TouchableOpacity>
          <View style={tw``}>
            <Text
              style={tw.style(
                `px-2 text-2xl font-bold bg-gray-100 pt-3`,
                styleOrangeColor.textOrange
              )}
            >
              &#128293; Featured &#128293;
            </Text>

            <RestaurantCategory category={"featured"} navigation={navigation} />
            <Text
              style={tw.style(
                `px-2 text-2xl font-bold bg-gray-100 text-gray-800 pt-3`
              )}
            >
              New
            </Text>
            <RestaurantCategory category={"recent"} navigation={navigation} />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (search !== "") {
    return (
      <SafeAreaView style={tw.style(`flex`)}>
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
          <SearchListRestaurants
            scrollY={scrollY}
            refreshing={refreshing}
            onRefresh={onRefresh}
            filteredDataSource={filteredDataSource}
            navigation={navigation}
          />
        </View>
      </SafeAreaView>
    );
  }
};

const SearchListRestaurants = ({
  scrollY,
  refreshing,
  onRefresh,
  filteredDataSource,
  navigation,
}) => {
  return (
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
          <FlatListItem
            item={item}
            index={index}
            scrollY={scrollY}
            navigation={navigation}
          />
        );
      }}
    />
  );
};

const RestaurantCategory = ({ category, navigation }) => {
  //const [restaurants, setRestaurants] = useState();
  const restaurants = placeholderDataRestaurants.filter(
    (element) => element[category] == true
  );
  const scrollY = useRef(new Animated.Value(0)).current;
  return (
    <View style={tw` bg-gray-100`}>
      <FlatList
        data={restaurants}
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        /*ItemSeparatorComponent={ItemSeparatorView}*/
        renderItem={({ item, index }) => {
          //make small animation
          return (
            <FlatListItem
              item={item}
              index={index}
              scrollY={scrollY}
              navigation={navigation}
            />
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    ...Platform.select({
      android: {
        paddingTop: Dimensions.get("window").height * 0.11,
      },
    }),
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
