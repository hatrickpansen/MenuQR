import React from "react";
import * as Device from "expo-device";
import config from "../config";

function isEmulator() {
  if (Device.osName === "Android") {
    return config.IP_ADDRESS_WITHOUT_PORT_AND_HTTP;
  } else if (Device.osName === "iOS") {
    return config.IP_ADDRESS_WITHOUT_PORT_AND_HTTP;
  } else {
    return config.IP_ADDRESS_WITHOUT_PORT_AND_HTTP;
  }
}

const expoIP = config.IP_ADDRESS_WITHOUT_PORT_AND_HTTP;

export default {
  url: {
    url: Device.isDevice ? expoIP : isEmulator(),
  },
};
