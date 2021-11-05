import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, Easing, Animated, FlatList, SectionList } from "react-native";
import imageManager from "./imageManager";
import AllergeneCard from "./AllergeneCard";

const Allergene = (props) => {
    const { allergenes, reset } = props;
    const allergenesImages = imageManager.allergenes;
    const arrow = imageManager.arrows.expandArrow;
    const alData = createImageAlRelation();
    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(1));
    const [flat, setFlat] = useState(<Text></Text>);
    const [isFlatExpanded, setIsFlatExpanded] = useState(false);
    const [spinValue, setSpinValue] = useState(new Animated.Value(0))
    
    useEffect( () => {
       if(reset){
           arrowSpinUp();
           setFlat();
           setIsFlatExpanded(false);
       }
    });

// First set up animation 
    function arrowSpinDown(){
        
            Animated.timing(
                spinValue,
            {
                toValue: 1,
                duration: 300,
                //easing: Easing.linear, // Easing is an additional import from react-native
                useNativeDriver: true  // To make use of native driver for performance
            }
            ).start(()=> {
                
            })
    }

    function arrowSpinUp() {
        Animated.timing(
            spinValue,
        {
            toValue: 0,
            duration: 300,
            //easing: Easing.linear, // Easing is an additional import from react-native
            useNativeDriver: true  // To make use of native driver for performance
        }
        ).start(()=> {
            
        })
    }
    

// Next, interpolate beginning and end values (in this case 0 and 1)
    const spin = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg']
    })

    const renderItem = ({ item }) => (
        <View>
            <AllergeneCard name={item.name} image={item.image} style={styles.card} />
        </View>

    );
    function createImageAlRelation() {
        var data = [];
        var i = 0;
        Object.keys(allergenes).forEach(function (key) {
            if (allergenes[key]) {
                Object.keys(allergenesImages).forEach(keyStr => {
                    if (key == keyStr) {
                        data[i] = { id: i, name: key, image: allergenesImages[key] }
                    }
                })
                i++;
            }
        })
        return data;
    }
    function setList() {
        if (!isFlatExpanded) {
            arrowSpinDown()
            setFlat(<FlatList style={styles.al}
                data={alData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal={true}
            />)
            setIsFlatExpanded(true);

        } else {
            arrowSpinUp()
            setFlat(<Text></Text>);
            setIsFlatExpanded(false);
        }
    }
    function displayAllergenes() {
        setList();
    }

    return (
        <View>
            <TouchableOpacity onPress={displayAllergenes}>
                <View style={styles.alHeader}>
                    <Text style={styles.header}>
                        Allergenes 
                    </Text>
                    <Animated.Image source={arrow} style={[styles.arrowImage, {flexGrow: 0, 
                        transform: [{ rotateX: spin}]} ]}></Animated.Image>
                </View>
            </TouchableOpacity>

            <View style={styles.al} >
                {flat}
            </View>

        </View>
    );

}


const styles = StyleSheet.create({
    header: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#ff4b3a"
    },
    text: {
        fontSize: 20
    },

    al: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginRight: 20

    },
    card: {

    },
    imgContainer: {
        alignItems: "center",
        flexDirection: "column",
        marginRight: 5,
        justifyContent: 'center',
        marginBottom: 5,
    },
    arrowImage: {
        width: 15,
        height: 15,
        marginLeft: 10,
        marginTop: 5,
        opacity: 0.6
    },
    alHeader: {
        flexDirection: "row",
        alignItems: "center",
    }

})

export default Allergene