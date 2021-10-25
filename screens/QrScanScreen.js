import React, { useState, useEffect } from "react";
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Camera } from "expo-camera";
import tw from "tailwind-react-native-classnames";
import MyText from "../components/myText";
import { styleOrangeColor } from "../styles/customStyles";

const QrScanScreen = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Please scan qr");

  const styles = StyleSheet.create({
    headerLogo: {
      backgroundColor: "#E5E5E5",
      width: Dimensions.get("screen").width,
      height: Dimensions.get("screen").height,
    },
  });

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
      /*navigation.navigate("QR Scan");*/
    })();
  };

  // Ask for camera permission when the app loads
  useEffect(() => {
    askForCameraPermission();
  }, []);

  //What happens when we scan a barcode or QR code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("type: " + type + "" + "Data: " + data);
  };

  //if user dont have permission ask them:
  //hasPermission === null if they never asked to give permission before (first time users)
  //hasPermission === false if they gave access before but removed the access to the camera
  if (hasPermission === false || hasPermission === null) {
    return (
      <View>
        <View style={tw.style(`pt-8 px-20`, styles.headerLogo)}>
          <View style={tw`flex justify-center items-center`}>
            <Image
              style={{ height: 220, width: 220 }}
              source={require("../assets/permissionLogo.png")}
              resizeMode="contain"
              resizeMethod="resize"
            />
          </View>
          <View
            style={tw.style(`h-1 w-1/3 my-10`, {
              backgroundColor: "#FA4A0C",
            })}
          />
          <MyText style={tw.style(`pt-2`, styleOrangeColor.textOrange)}>
            If you wish to continue
          </MyText>
          <View style={tw`flex justify-center items-center`}>
            <MyText
              style={tw.style(`py-5 ios:pt-12 ios:pb-20 text-base w-4/5`)}
            >
              &bull; Please give us permission to use your camera and location
            </MyText>
            <TouchableOpacity
              onPress={() => askForCameraPermission()}
              style={tw.style(
                `h-12 w-full rounded-full items-center justify-center mb-3 shadow-md`,
                styleOrangeColor.backgroundColor
              )}
            >
              <MyText style={tw`text-base text-white font-bold`}>
                Give Permission
              </MyText>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  //return the barcode scanner view
  return (
    <View style={tw.style(``)}>
      <View style={tw`flex justify-center items-center`}>
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={tw.style(`h-96`, { width: Dimensions.get("screen").width })}
        />
        {scanned && <Text>{text}</Text>}
        {!scanned && <Text>Looking for QR CODE</Text>}

        {scanned && (
          <View>
            <Text>{text}</Text>
            <Button
              title={"Scan again?"}
              onPress={() => setScanned(false)}
              color="tomato"
            />
            <TouchableOpacity
              onPress={() => setScanned(false)}
              style={tw.style(
                `h-12 w-full rounded-full items-center justify-center mb-3 shadow-md px-12`,
                styleOrangeColor.backgroundColor
              )}
            >
              <MyText style={tw`text-base text-white font-bold`}>
                Scan again
              </MyText>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};
export default QrScanScreen;
