import React from "react";
import * as Device from "expo-device";

function isEmulator() {
  if (Device.osName === "Android") {
    return "http://10.0.2.2:5000";
  } else if (Device.osName === "iOS") {
    return "http://localhost:5000";
  } else {
    return "http://localhost:5000";
  }
}

export default {
  url: {
    url: Device.isDevice ? "http://192.168.0.45:5000" : isEmulator(),
  },
};
