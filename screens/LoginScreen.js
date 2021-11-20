import React, { useState, useEffect, useRef } from "react";
import { styleOrangeColor } from "../styles/customStyles";
import tw from "tailwind-react-native-classnames";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import LoadingIndicator from "../components/LoadingIndicator";

import { useNavigation } from "@react-navigation/core";
import Url from "../assets/Url";
const baseUrl = Url.url.url;
export default function LoginScreen() {
  const [isEmailInputError, setIsEmailInputError] = useState(false);
  const [isPasswordInputError, setIsPasswordInputError] = useState(false);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const loginBtn = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailPlace, setEmailPlace] = useState("Email");
  const [passPlace, setPassPlace] = useState("Password");
  const navigation = useNavigation();
  const [errorMessage, setErrorMessage] = useState();
  const [errorSecondMessage, setErrorSecondMessage] = useState();
  var abortController = new AbortController();
  var abortSignal = abortController.signal;

  const abort = () => {
    setTimeout(() => {
      abortController.abort();
      if (navigation.getState().index == 1) {
        if (isLoading) {
          setErrorMessage("Can't contact Server");
        }
      }
    }, 5000);
  };

  async function authenticate() {
    abort();
    const rawResponse = await fetch(baseUrl + "/login", {
      abortSignal,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then(function (res) {
        return res.json();
      })
      .catch((err) => {
        console.log("networking issue when trying to login");
        return undefined;
      });
    console.log(rawResponse);
    return rawResponse;
  }

  async function onLoginPress() {
    setErrorMessage();
    let count = 0;
    if (email.trim() == "" || password.trim() == "") {
      if (email.trim() == "") {
        setIsEmailInputError(true);
        setErrorMessage("You must specify an email");
      }
      if (password.trim() == "") {
        setIsPasswordInputError(true);
        setErrorSecondMessage("You must specify a password");
      }
      return;
    }
    setIsLoading(true);
    let obj = await authenticate();
    if (obj != undefined) {
      if (obj.auth) {
        setIsLoading(false);
        setEmail("");
        setPassword("");
        setErrorSecondMessage("");
        if (emailInput.current != null || passwordInput.current != null) {
          emailInput.current.clear();
          passwordInput.current.clear();
        }
        navigation.navigate("Menu", {
          restaurantID: obj.restId,
          auth: obj.auth,
        });
      } else if (!obj.auth) {
        setErrorMessage("Wrong login");
        setErrorSecondMessage("");
        setIsLoading(false);
      }
    }
  }

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

      <View
        style={[styles.inputView, isEmailInputError && styles.redInputView]}
      >
        <TextInput
          ref={emailInput}
          style={styles.TextInput}
          placeholder={emailPlace}
          placeholderTextColor="#003f5c"
          keyboardType="email-address"
          selectionColor={styleOrangeColor.textOrange.color}
          selectTextOnFocus={true}
          returnKeyType="next"
          onChangeText={(email) => {
            setEmail(email);
            setIsEmailInputError(false);
          }}
          onSubmitEditing={() => {
            passwordInput.current.focus();
          }}
        />
      </View>

      <View
        style={[styles.inputView, isPasswordInputError && styles.redInputView]}
      >
        <TextInput
          ref={passwordInput}
          style={styles.TextInput}
          placeholder={passPlace}
          placeholderTextColor="#003f5c"
          secureTextEntry={true}
          selectionColor={styleOrangeColor.textOrange.color}
          selectTextOnFocus={true}
          returnKeyType="go"
          onChangeText={(password) => {
            setPassword(password);
            setIsPasswordInputError(false);
          }}
          onSubmitEditing={() => {
            onLoginPress();
          }}
        />
      </View>

      <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
      </TouchableOpacity>
      <LoadingIndicator animating={isLoading} />
      <Text style={styles.errorText}>{errorMessage}</Text>
      <Text style={styles.errorText}>{errorSecondMessage}</Text>

      <TouchableOpacity
        ref={loginBtn}
        style={styles.loginBtn}
        onPress={() => {
          onLoginPress();
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
    borderWidth: 5,
    borderColor: "#e1e1e1",
    alignItems: "center",
  },
  redInputView: {
    backgroundColor: "#e1e1e1",
    borderRadius: 30,
    width: "70%",
    height: 45,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#eb4034",
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
  errorText: {
    color: "red",
    fontWeight: "bold",
  },
});
