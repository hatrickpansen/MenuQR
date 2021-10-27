import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import MenuScreen from "./screens/MenuScreen";

import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { NavigationContainer } from "@react-navigation/native";
import ItemScreen from "./screens/ItemScreen";
import RestaurantsScreen from "./screens/RestaurantsScreen";
import QrScanScreen from "./screens/QrScanScreen";
/*https://docs.expo.dev/versions/latest/sdk/app-loading/*/

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
          <Stack.Screen name="Restaurants" component={RestaurantsScreen} />
          <Stack.Screen
            name="Menu"
            component={MenuScreen}
            options={{ title: "Menu", headerShown: true }}
          />
          <Stack.Screen
            name="QR Scan"
            component={QrScanScreen}
            options={{ title: "QR Scan", headerShown: true}}
          />
          <Stack.Screen name="Item" component={ItemScreen} />
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
