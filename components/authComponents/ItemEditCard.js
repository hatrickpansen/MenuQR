import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Animated,
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  CheckBox,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const screenHeight = Dimensions.get("screen").height;
const screenwidth = Dimensions.get("screen").width;
import ReadMore from "@fawazahmed/react-native-read-more";
import Allergene from "../itemScreenComponents/Allergene";
import { styleOrangeColor } from "../../styles/customStyles";
import AllergeneCard from "../itemScreenComponents/AllergeneCard";
import imageManager from "../imageManager";
import Url from "../../assets/Url";
import DateTimePicker from "@react-native-community/datetimepicker";
const baseUrl = Url.url.url;
const orangeColor = styleOrangeColor.textOrange.color;

const ItemEditCard = ({ item }) => {
  const navigation = useNavigation();
  const [available, setAvailable] = useState(item.available);

  const [startTime, setStartTime] = useState(
    setZeroInfront(available.start.hour) +
      ":" +
      setZeroInfront(available.start.min)
  );
  const [startPickerTime, setStartPickerTime] = useState(new Date());
  const [showStartPicker, setShowStartPicker] = useState(false);

  const [endTime, setEndTime] = useState(
    available.end.hour + ":" + available.end.min
  );
  const [endPickerTime, setEndPickerTime] = useState(new Date());
  const [showEndPicker, setShowEndPicker] = useState(false);

  const allergenesImages = imageManager.allergenes;
  const allAls = createImageAlRelation(allergenesImages);
  const [allergenes, setAllergenes] = useState(item.allergenes);
  const [itemName, setItemName] = useState(item.name);
  const [itemPrice, setItemPrice] = useState(item.price);
  const [itemDesc, setItemDesc] = useState(item.description);
  var data = [];
  function isSelected(alName) {
    if (allergenes.hasOwnProperty(alName)) {
      return allergenes[alName];
    }
  }
  function setSelection(alName, val) {
    let data = {};
    for (let i = 0; i < allAls.length; i++) {
      if (!allergenes.hasOwnProperty(allAls[i]["name"])) {
        if (allAls[i]["name"] == alName) {
          data[allAls[i]["name"]] = val;
        } else {
          data[allAls[i]["name"]] = false;
        }
      } else {
        if (allAls[i]["name"] == alName) {
          data[allAls[i]["name"]] = val;
        } else {
          data[allAls[i]["name"]] = allergenes[allAls[i]["name"]];
        }
      }
    }

    setAllergenes(data);
  }
  async function storeChanges() {
    const rawResponse = await fetch(baseUrl + "/editItem", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
        name: itemName,
        price: itemPrice,
        description: itemDesc,
        allergenes: allergenes,
        restId: item.restId,
        type: item.type,
        image: item.image,
        title: item.title,
        available: available,
      }),
    })
      .then(function (res) {
        return res.text();
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(rawResponse);
  }
  function routeBackToMenu() {
    navigation.navigate("Menu", {
      restaurantID: item.restId,
      auth: true,
    });
  }

  for (let i = 0; i < allAls.length; i++) {
    data.push(
      <View key={allAls[i].id.toString()} style={{ marginRight: 20 }}>
        <View style={styles.alCardContainer}>
          <Animated.Image source={allAls[i].image} style={[styles.pic]} />
          <Text style={(styles.noWrap, styleOrangeColor.textOrange)}>
            {allAls[i].name}
          </Text>
        </View>
        <CheckBox
          value={isSelected(allAls[i].name)}
          onValueChange={(val) => {
            setSelection(allAls[i].name, val);
            return val;
          }}
        />
      </View>
    );
  }
  function onStartPicking(event, date) {
    if (event.type == "dismissed") {
      setShowStartPicker(false);
    } else {
      let hour = setZeroInfront(date.getHours());
      let min = setZeroInfront(date.getMinutes());
      setStartTime(hour + ":" + min);
      setShowStartPicker(false);
      mutateStartAvailable(parseInt(hour), parseInt(min));
    }
  }

  function onEndPicking(event, date) {
    if (event.type == "dismissed") {
      setShowEndPicker(false);
    } else {
      let hour = setZeroInfront(date.getHours());
      let min = setZeroInfront(date.getMinutes());
      setEndTime(hour + ":" + min);
      setShowEndPicker(false);
      mutateEndAvailable(parseInt(hour), parseInt(min));
    }
  }
  function mutateStartAvailable(hour, min) {
    let endHour = available.end.hour;
    let endMin = available.end.min;
    setAvailable({
      start: { hour: hour, min: min },
      end: { hour: endHour, min: endMin },
    });
  }
  function mutateEndAvailable(hour, min) {
    let startHour = available.start.hour;
    let startMin = available.start.min;
    setAvailable({
      start: { hour: startHour, min: startMin },
      end: { hour: hour, min: min },
    });
  }
  function setZeroInfront(number) {
    if (number < 10) {
      return "0" + number;
    } else {
      return number.toString();
    }
  }
  return (
    <View style={styles.outerContainer}>
      <View style={{ flex: 10 }}>
        <ScrollView style={styles.scrollContainer}>
          <View /* styles={styles.container} */>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingTop: 20,
              }}
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <View style={{ flex: 1, marginBottom: 20 }}>
                  <Text style={styles.name}>Item Name</Text>
                </View>
                <View style={{ flex: 1, marginBottom: 20 }}>
                  <Text style={styles.name}>Item Price</Text>
                </View>
                <View style={{ flex: 3, marginBottom: 20 }}>
                  <Text style={styles.name}>Item Description</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.name}>Item Availability</Text>
                </View>
              </View>
              <View style={{ flex: 2 }}>
                <View style={{ flex: 1 }}>
                  <View style={styles.inputView}>
                    <TextInput
                      style={styles.textInput}
                      value={itemName}
                      onChangeText={(val) => setItemName(val)}
                    />
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={[styles.inputView]}>
                    <TextInput
                      style={styles.textInput}
                      value={itemPrice.toString()}
                      keyboardType="numeric"
                      onChangeText={(val) => setItemPrice(val)}
                    />
                    <Text style={{ opacity: 0.5, paddingRight: 5 }}>DKK</Text>
                  </View>
                </View>
                <View style={{ flex: 3 }}>
                  <View style={[styles.inputView, styles.inputViewDesc]}>
                    <TextInput
                      style={[styles.textInput, styles.textInputDesc]}
                      value={itemDesc}
                      keyboardType="default"
                      multiline
                      onChangeText={(val) => setItemDesc(val)}
                    />
                  </View>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.availableContainer}>
                    <View style={styles.timePickContainer}>
                      <Text style={styles.timePickingLabel}>start:</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setShowStartPicker(true);
                        }}
                      >
                        <Text style={styles.timePickingText}>{startTime}</Text>
                      </TouchableOpacity>
                      {showStartPicker && (
                        <DateTimePicker
                          value={startPickerTime}
                          mode="time"
                          display="spinner"
                          is24Hour={true}
                          onChange={(event, date) => {
                            onStartPicking(event, date);
                          }}
                        />
                      )}
                    </View>
                    <View style={styles.timePickContainer}>
                      <Text style={styles.timePickingLabel}>End:</Text>
                      <TouchableOpacity
                        onPress={() => {
                          setShowEndPicker(true);
                        }}
                      >
                        <Text style={styles.timePickingText}>{endTime}</Text>
                      </TouchableOpacity>
                      {showEndPicker && (
                        <DateTimePicker
                          value={endPickerTime}
                          mode="time"
                          display="spinner"
                          is24Hour={true}
                          onChange={(event, date) => {
                            onEndPicking(event, date);
                          }}
                        />
                      )}
                    </View>
                  </View>
                </View>
              </View>
            </View>
            <Text style={styles.name}>{"Allergenes\n"}</Text>
            <View style={styles.alContainer}>{data}</View>
          </View>
        </ScrollView>
      </View>
      <View style={{ flex: 1, height: 20 }}>
        <Button
          title="save changes"
          onPress={async () => {
            storeChanges();
            routeBackToMenu();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    height: "100%",
    width: "100%",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  scrollContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
    paddingVertical: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  availableContainer: {
    flex: 1,
    flexDirection: "row",
    marginLeft: 20,
    marginBottom: 20,
  },
  timePickContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#e1e1e1",
  },
  inputView: {
    backgroundColor: "#e1e1e1",
    borderRadius: 10,
    width: "85%",
    height: 45,
    marginBottom: 20,
    marginLeft: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  secContainer: {
    marginVertical: 20,
    flex: 1,
  },

  image: {
    borderRadius: 125,
    width: 250,
    height: 250,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.0,
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: orangeColor,
  },
  text: {
    color: orangeColor,
  },
  prices: {
    color: orangeColor,
    fontSize: 24,
    fontWeight: "bold",
  },
  description: {
    color: orangeColor,
    fontSize: 24,
  },
  descriptionText: {
    color: orangeColor,
    fontSize: 20,
  },
  readmoreContainer: {
    flex: 1,
  },
  readmoreAndLessbtnStyle: {
    color: orangeColor,
    fontWeight: "bold",
    fontSize: 20,
    opacity: 0.9,
  },
  row: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  inputViewDesc: {
    height: 135,
  },
  textInputDesc: {
    height: 125,
    padding: 2,
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  pic: {
    width: 30,
    height: 30,
    opacity: 0.6,
    margin: 5,
  },
  alCardContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  alContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  noWrap: {
    flexWrap: "nowrap",
  },
  center: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12.5,
  },
  timePickingLabel: {
    color: "black",
    opacity: 0.7,
  },
  timePickingText: {
    color: "#03b1fc",
  },
});

export default ItemEditCard;

function createImageAlRelation(allergenesImages) {
  var data = [];
  let i = 0;
  Object.keys(allergenesImages).forEach((keyStr) => {
    data.push({ id: i, name: keyStr, image: allergenesImages[keyStr] });
    i++;
  });
  return data;
}
