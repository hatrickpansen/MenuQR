import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { styleOrangeColor } from "../styles/customStyles";
import tw from "tailwind-react-native-classnames";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import data from "../db/users.json";

import { useNavigation } from "@react-navigation/core";

export default function LoginScreen() {
  const [authenticated, setAuthenticated] = useState(false);
  const [id, setId] = useState(-1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailPlace, setEmailPlace] = useState("Email");
  const [passPlace, setPassPlace] = useState("Password");
  const navigation = useNavigation();

  return (
    <View style={[styles.container, tw` bg-gray-100`]}>
      <View style={styles.imageContainer}>
        <Image
          style={{ height: 150, width: 150 }}
          source={require("../assets/logo.png")}
          resizeMode="contain"
          resizeMethod="resize"
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder={emailPlace}
          placeholderTextColor="#003f5c"
          keyboardType="email-address"
          selectionColor={styleOrangeColor.textOrange.color}
          selectTextOnFocus={true}
          onChangeText={(email) => setEmail(email)}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          style={styles.TextInput}
          placeholder={passPlace}
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          selectionColor={styleOrangeColor.textOrange.color}
          selectTextOnFocus={true}
          onChangeText={(password) => setPassword(password)}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.loginBtn}
        onPress={() => {
          for (let i = 0; i < data.length; i++) {
            console.log(data[i].email);
            console.log(email.trim().toLowerCase());
            if (
              data[i].email === email.trim().toLowerCase() &&
              password === data[i].password
            ) {
              setAuthenticated(true);
              setId(data[i].id);
              navigation.navigate("Menu", {
                restaurantID: data[i].restId,
                auth: data[i].auth,
              });
            }
          }
        }}
      >
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  image: {
    marginBottom: 40,
  },

  inputView: {
    backgroundColor: "#e1e1e1",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,

    alignItems: "center",
  },

  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },

  forgot_button: {
    height: 30,
    marginBottom: 30,
    color: styleOrangeColor.textOrange.color,
  },

  loginBtn: {
    width: "80%",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    backgroundColor: styleOrangeColor.textOrange.color,
  },
  imageContainer: {
    marginBottom: 30,
  },
  loginText: {
    color: "#fff",
  },
});
