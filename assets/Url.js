import React from "react";
import * as Device from "expo-device";
import config from "../config";

function isEmulator() {
  if (Device.osName === "Android") {
    return "http://10.0.2.2:5000";
  } else if (Device.osName === "iOS") {
    return "http://localhost:5000";
  } else {
    return "http://localhost:5000";
  }
}

const expoIP = config.IP_ADDRESS_WITHOUT_PORT_AND_HTTP;

export default {
  url: {
    url: Device.isDevice ? expoIP : isEmulator(),
  },
};
