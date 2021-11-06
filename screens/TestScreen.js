// import React, { useState } from "react";
// import {
//   SafeAreaView,
//   View,
//   Text,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
//
// const TestScreen = () => {
//   const [selection, setSelection] = useState(1);
//
//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.btnGroup}>
//         <TouchableOpacity
//           style={[
//             styles.btn,
//             selection === 1 ? { backgroundColor: "#6B7280" } : null,
//           ]}
//           onPress={() => setSelection(1)}
//         >
//           <Text
//             style={[
//               styles.btnText,
//               selection === 1 ? { color: "white" } : null,
//             ]}
//           >
//             Button 1
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.btn,
//             selection === 2 ? { backgroundColor: "#6B7280" } : null,
//           ]}
//           onPress={() => setSelection(2)}
//         >
//           <Text
//             style={[
//               styles.btnText,
//               selection === 2 ? { color: "white" } : null,
//             ]}
//           >
//             Button 2
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.btn,
//             selection === 3 ? { backgroundColor: "#6B7280" } : null,
//           ]}
//           onPress={() => setSelection(3)}
//         >
//           <Text
//             style={[
//               styles.btnText,
//               selection === 3 ? { color: "white" } : null,
//             ]}
//           >
//             Button 3
//           </Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={[
//             styles.btn,
//             selection === 4 ? { backgroundColor: "#6B7280" } : null,
//           ]}
//           onPress={() => setSelection(4)}
//         >
//           <Text
//             style={[
//               styles.btnText,
//               selection === 4 ? { color: "white" } : null,
//             ]}
//           >
//             Button 4
//           </Text>
//         </TouchableOpacity>
//       </View>
//     </SafeAreaView>
//   );
// };
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   btnGroup: {
//     flexDirection: "row",
//     alignItems: "center",
//     borderBottomWidth: 1,
//     borderBottomColor: "#6B7280",
//   },
//   btn: {
//     flex: 1,
//     borderRightWidth: 0.25,
//     borderLeftWidth: 0.25,
//     borderColor: "#6B7280",
//   },
//   btnText: {
//     textAlign: "center",
//     paddingVertical: 16,
//     fontSize: 14,
//   },
// });
//
// module.exports = TestScreen;
////////////////////////////////////////////////////////////////////
// import React from "react";
// import { StyleSheet, Text, View } from "react-native";
// import { ButtonGroup } from "react-native-elements";
//
// export default function App() {
//   const buttons = ["INSERT", "UPDATE", "DELETE"];
//
//   return (
//     <View style={styles.container}>
//       <ButtonGroup
//         buttons={buttons}
//         containerStyle={{ height: 40 }}
//         buttonContainerStyle={{ backgroundColor: "cadetblue" }}
//         textStyle={{ color: "#fff" }}
//       />
//     </View>
//   );
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//   },
// });
//////////////////////////////////////////////////////////////////

// import ButtonToggleGroup from "react-native-button-toggle-group";
// import React from "react";
// import tw from "tailwind-react-native-classnames";
// import { SafeAreaView, Text, View } from "react-native";
//
// function Auto() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>All foods!</Text>
//     </View>
//   );
// }
//
// function Light() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>All foods!</Text>
//     </View>
//   );
// }
//
// function Dark() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>All foods!</Text>
//     </View>
//   );
// }
//
// const TestScreen = () => {
//   const [value, setValue] = React.useState("Light");
//
//   return (
//     <SafeAreaView style={tw.style(`pt-8`)}>
//       <ButtonToggleGroup
//         highlightBackgroundColor={"orange"}
//         highlightTextColor={"white"}
//         inactiveBackgroundColor={"transparent"}
//         inactiveTextColor={"grey"}
//         values={["Auto", "Light", "Dark"]}
//         value={value}
//         onSelect={(val) => setValue(val)}
//         component={{ value }}
//       />
//     </SafeAreaView>
//   );
// };
//
// module.exports = TestScreen;

////////////////////////////////////////////////////////////////////
import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
import { styleOrangeColor } from "../styles/customStyles";

function AllScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>All foods!</Text>
    </View>
  );
}

function AlacarteScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>A La Carte!</Text>
    </View>
  );
}

function DrinksScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Drinks!</Text>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

const TestScreen = () => {
  const screenOptions = {
    tabBarActiveTintColor: "white",
    tabBarInactiveTintColor: "black",
    tabBarPressOpacity: 1,
    tabBarStyle: {
      borderRadius: "30px",
    },
    style: {
      borderRadius: "30px",
    },
    tabBarIndicatorStyle: {
      backgroundColor: "#FF470B",
      height: "100%",
      borderRadius: "30px",
    },
  };

  return (
    <SafeAreaProvider style={tw.style(`pt-10`)}>
      <View style={tw.style(`items-center pb-4`)}>
        <Text
          style={tw.style(`pt-2 text-center`, styleOrangeColor.titleOrange)}
        >
          Restaurant Name Heeeere
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
        <Tab.Screen name="All" component={AllScreen} />
        <Tab.Screen name="A La Carte" component={AlacarteScreen} />
        <Tab.Screen name="Drinks" component={DrinksScreen} />
      </Tab.Navigator>
    </SafeAreaProvider>
  );
};

export default TestScreen;
////////////////////////////////////////////////////////////////////
// import * as React from "react";
// import tw from "tailwind-react-native-classnames";
// import { Text, View } from "react-native";
// import { NavigationContainer } from "@react-navigation/native";
// import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
// import { SafeAreaProvider } from "react-native-safe-area-context/src/SafeAreaContext";
//
// function FeedScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Feed!</Text>
//     </View>
//   );
// }
//
// function NotificationsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Notifications!</Text>
//     </View>
//   );
// }
//
// function ProfileScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
//       <Text>Profile!</Text>
//     </View>
//   );
// }
//
// const Tab = createMaterialTopTabNavigator();
//
// function MyTabs() {
//   return (
//     <Tab.Navigator
//       initialRouteName="Feed"
//       screenOptions={{
//         tabBarActiveTintColor: "#e91e63",
//         tabBarLabelStyle: { fontSize: 12 },
//         tabBarStyle: { backgroundColor: "powderblue" },
//       }}
//     >
//       <Tab.Screen
//         name="Feed"
//         component={FeedScreen}
//         options={{ tabBarLabel: "Home" }}
//       />
//       <Tab.Screen
//         name="Notifications"
//         component={NotificationsScreen}
//         options={{ tabBarLabel: "Updates" }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={ProfileScreen}
//         options={{ tabBarLabel: "Profile" }}
//       />
//     </Tab.Navigator>
//   );
// }
// export default function TestScreen() {
//   return (
//     <SafeAreaProvider style={tw.style(`pt-16`)}>
//       <MyTabs />
//     </SafeAreaProvider>
//   );
// }
