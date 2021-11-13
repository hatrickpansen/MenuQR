import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import ItemScreen from "./screens/ItemScreen";
import RestaurantsScreen from "./screens/RestaurantsScreen";
import QrScanScreen from "./screens/QrScanScreen";
import TestScreen from "./screens/TestScreen";
import ItemEditScreen from "./screens/ItemEditScreen";
import { Icon } from "react-native-elements";
import tw from "tailwind-react-native-classnames";
import LoginScreen from "./screens/LoginScreen";
/*https://docs.expo.dev/versions/latest/sdk/app-loading/*/

console.log(
  "Using current ip: " + process.env.IP_ADDRESS_WITHOUT_PORT_AND_HTTP
);

const Stack = createNativeStackNavigator();

export default function App() {
  const getFonts = () =>
    Font.loadAsync({
      "sansation-regular": require("./assets/fonts/Sansation/Sansation_Regular.ttf"),
      "sansation-bold": require("./assets/fonts/Sansation/Sansation_Regular.ttf"),
      "roboto-regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
      "roboto-bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    });

  const [fontsLoaded, setFontsLoaded] = useState(false);

  if (fontsLoaded) {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="Restaurants"
            component={RestaurantsScreen}
            options={headerOptions}
          />
          <Stack.Screen
            name="Menu"
            component={MenuScreen}
            options={headerOptions}
          />
          <Stack.Screen
            name="QR Scan"
            component={QrScanScreen}
            options={headerOptions}
          />
          <Stack.Screen
            name="Item"
            component={ItemScreen}
            options={headerOptions}
          />
          <Stack.Screen
            name="Test"
            component={TestScreen}
            options={headerOptions}
          />
          <Stack.Screen
            name="login"
            component={LoginScreen}
            options={headerOptions}
          />
          <Stack.Screen
            name="ItemEdit"
            component={ItemEditScreen}
            options={headerOptions}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <AppLoading
          startAsync={getFonts}
          onFinish={() => setFontsLoaded(true)}
          onError={(err) => console.log(err)}
        />
      </NavigationContainer>
    );
  }
}

const headerOptions = {
  title: "",
  headerShown: true,
  headerTransparent: true,
  ...Platform.select({
    android: {
      headerShadowVisible: false,
    },
  }),
  headerBackTitleVisible: false,
  headerTintColor: "#FF470B",
};
