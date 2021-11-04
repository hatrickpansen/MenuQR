import React, {useState} from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity,Easing, Animated, FlatList} from "react-native";
import imageManager from "./imageManager";
import AllergeneCard from "./AllergeneCard";

const Allergene = (props) => {
    const {allergenes} = props;
    const allergenesImages = imageManager.allergenes;
    const alData = createImageAlRelation();
    const [animatedValue, setAnimatedValue ]= useState(new Animated.Value(1));
    const renderItem = ({ item }) => (
        <View>
            <AllergeneCard name={item.name} image={item.image}  style={styles.card}/>
        </View>
        
      );
    function createImageAlRelation(){
        var data = [];
        var i = 0;
        Object.keys(allergenes).forEach(function(key) {
            if(allergenes[key]){
                Object.keys(allergenesImages).forEach( keyStr => {
                    if(key == keyStr){
                        data[i] = {id: i, name: key, image: allergenesImages[key]}
                    }
                })
                i++;
            }    
        })
        return data;
    }
    
    return(
    <View>
        <Text >
            <Text style={styles.header}>
                Allergenes
            </Text>
        </Text>
        <View  style={styles.al} >
            <FlatList style={styles.al}
                data={alData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal={true}
            /> 
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
    
})

export default Allergene