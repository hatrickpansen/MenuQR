import React, { useState, useEffect, useRef } from "react";
import {
  ScrollView,
  Animated,
  View,
  Image,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "@react-native-community/checkbox";

const screenHeight = Dimensions.get("screen").height;
const screenwidth = Dimensions.get("screen").width;
import ReadMore from "@fawazahmed/react-native-read-more";
import Allergene from "../itemScreenComponents/Allergene";
import { styleOrangeColor } from "../../styles/customStyles";
import AllergeneCard from "../itemScreenComponents/AllergeneCard";
import imageManager from "../imageManager";
import Url from "../../assets/Url";
import DateTimePicker from "@react-native-community/datetimepicker";
import ItemDeleteBtn from "./ItemDeleteBtn";
const baseUrl = Url.url.url;
const orangeColor = styleOrangeColor.textOrange.color;

const ItemEditCard = ({ item, isNew }) => {
  const navigation = useNavigation();
  const [isFocusName, setIsFocusName] = useState(false);
  const [isFocusPrice, setIsFocusPrice] = useState(false);
  const [isFocusDesc, setIsFocusDesc] = useState(false);

  const nameInput = useRef(null);
  const priceInput = useRef(null);
  const descriptionInput = useRef(null);

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
    if (isNew) {
      const rawResponse = await fetch(baseUrl + "/newItem", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: itemName,
          price: itemPrice,
          description: itemDesc,
          allergenes: allergenes,
          restId: item.restId,
          type: item.type,
          image: item.image,
          title: item.title,
          available: available,
          visible: item.visible,
        }),
      })
        .then(function (res) {
          return res.text();
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(rawResponse);
    } else {
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
          visible: item.visible,
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
  }
  function routeBackToMenu() {
    console.log(item);
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
          disabled={false}
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

  function callBackDeleteBtn(childData) {
    if (childData) {
      //deleteitem
      deleteItemFetch();
      //route to menu
      routeBackToMenu();
    }
  }

  async function deleteItemFetch() {
    const rawResponse = await fetch(baseUrl + "/deleteItem", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: item.id,
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

  return (
    <View style={styles.outerContainer}>
      <View style={{ flex: 10 }}>
        <ScrollView style={styles.scrollContainer}>
          <View /* styles={styles.container} */>
            {item.image != null && (
              <Image
                style={styles.image}
                source={{
                  uri: item.image,
                }}
              />
            )}
            {item.image == null && (
              <Image style={styles.image} source={imageManager.defaultItem} />
            )}
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
                  <View style={styles.inputView}>
                    <Text style={styles.name}>Item Name</Text>

                    <TextInput
                      style={[
                        styles.textInput,
                        isFocusName && styles.textInputFocus,
                      ]}
                      ref={nameInput}
                      placeholder="Dish name"
                      value={itemName}
                      onChangeText={(val) => setItemName(val)}
                      onSubmitEditing={() => {
                        priceInput.current.focus();
                        setIsFocusName(false);
                      }}
                      onBlur={() => {
                        setIsFocusName(false);
                      }}
                      onFocus={(event) => {
                        setIsFocusName(true);
                        setIsFocusPrice(false);
                        setIsFocusDesc(false);
                      }}
                    />
                  </View>
                </View>
                <View style={{ flex: 1, marginBottom: 20 }}>
                  <View style={[styles.inputView]}>
                    <Text style={styles.name}>Item Price</Text>

                    <TextInput
                      style={[
                        styles.textInput,
                        isFocusPrice && styles.textInputFocus,
                      ]}
                      value={itemPrice != undefined ? itemPrice.toString() : ""}
                      ref={priceInput}
                      placeholder="price"
                      keyboardType="numeric"
                      onChangeText={(val) => setItemPrice(val)}
                      onBlur={() => {
                        setIsFocusPrice(false);
                      }}
                      onSubmitEditing={() => {
                        descriptionInput.current.focus();
                        setIsFocusPrice(false);
                      }}
                      onFocus={(event) => {
                        setIsFocusName(false);
                        setIsFocusPrice(true);
                        setIsFocusDesc(false);
                      }}
                    />
                    <Text style={{ opacity: 0.5, paddingRight: 5 }}>DKK</Text>
                  </View>
                </View>
                <View style={{ flex: 2.5, marginBottom: 20 }}>
                  <View style={[styles.inputView, styles.inputViewDesc]}>
                    <Text style={styles.name}>Item Description</Text>
                    <TextInput
                      style={[
                        styles.textInput,
                        styles.textInputDesc,
                        isFocusDesc && styles.textInputDescFocus,
                      ]}
                      value={itemDesc}
                      ref={descriptionInput}
                      placeholder="Dish Description"
                      keyboardType="default"
                      multiline
                      onChangeText={(val) => setItemDesc(val)}
                      onBlur={() => {
                        setIsFocusDesc(false);
                      }}
                      onFocus={(event) => {
                        setIsFocusName(false);
                        setIsFocusPrice(false);
                        setIsFocusDesc(true);
                      }}
                    />
                  </View>
                </View>
                <View style={{ flex: 2.5 }}>
                  <View style={styles.availableContainer}>
                    <Text style={styles.name}>Item Availability</Text>

                    <View style={styles.timePickContainer}>
                      <Text style={styles.timePickingLabel}>start:</Text>
                      <View style={styles.DateTimePickerContainer}>
                        <TouchableOpacity
                          onPress={() => {
                            setShowStartPicker(true);
                          }}
                        >
                          <Text style={styles.timePickingText}>
                            {startTime}
                          </Text>
                        </TouchableOpacity>
                        {showStartPicker && (
                          <DateTimePicker
                            value={startPickerTime}
                            mode="time"
                            display="default"
                            is24Hour={true}
                            onChange={(event, date) => {
                              onStartPicking(event, date);
                            }}
                          />
                        )}
                      </View>
                    </View>
                    <View style={styles.timePickContainer}>
                      <Text style={styles.timePickingLabel}>End:</Text>

                      <View style={styles.DateTimePickerContainer}>
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
                            display="default"
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
            </View>
            <View style={{ marginHorizontal: 10 }}>
              <Text style={styles.name}>{"Allergenes\n"}</Text>
              <View style={styles.alContainer}>{data}</View>
            </View>
          </View>
          <ItemDeleteBtn callBack={callBackDeleteBtn} />
        </ScrollView>
      </View>
      <View style={{ flex: 1, paddingBottom: 10 }}>
        <Button
          title="save changes"
          color="#0E9594"
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
    marginBottom: 5,
    paddingVertical: 0,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  availableContainer: {
    flex: 1,
    flexDirection: "column",
    marginBottom: 20,
    marginHorizontal: 10,
  },
  timePickContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    //justifyContent: "center",
    borderBottomColor: "#e1e1e1",
    borderLeftColor: "rgba(255, 255, 255, 0.0)",
    borderRightColor: "rgba(255, 255, 255, 0.0)",
    borderTopColor: "rgba(255, 255, 255, 0.0)",
    borderWidth: 3,
  },
  DateTimePickerContainer: {
    padding: 10,
    /* margin: 10, */
  },
  inputView: {
    borderBottomColor: "#e1e1e1",
    borderLeftColor: "rgba(255, 255, 255, 0.0)",
    borderRightColor: "rgba(255, 255, 255, 0.0)",
    borderTopColor: "rgba(255, 255, 255, 0.0)",
    borderWidth: 3,
    width: "95%",
    height: 45,
    marginBottom: 20,
    marginHorizontal: 10,
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
  textInputDescFocus: {
    height: 125,
    padding: 2,
    borderRadius: 5,
    width: "auto",
    flex: 1,
    //padding: 0,
    paddingLeft: 5,
    marginLeft: 20,
    backgroundColor: "#fff",
  },
  textInput: {
    height: 50,
    flex: 1,
    padding: 10,
    marginLeft: 20,
  },
  textInputFocus: {
    height: 30,
    borderRadius: 5,
    width: "auto",
    flex: 1,
    padding: 0,
    paddingLeft: 5,
    marginLeft: 20,
    backgroundColor: "#fff",
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
