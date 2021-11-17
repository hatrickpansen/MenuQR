import React, {useState, useEffect} from 'react';
import { Image, Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import imageManager from '../imageManager';
import {styleOrangeColor} from "../../styles/customStyles"
import ModalDropdown from 'react-native-modal-dropdown';
import { useNavigation } from "@react-navigation/core";
import { Entypo } from "@expo/vector-icons";

const PlusBtn = ({isEditMode, restId}) => {
    const [isVisible, setIsVisible] = useState(isEditMode);
    const navigation = useNavigation();
    useEffect(()=> {
        setIsVisible(isEditMode);
    })

    if(!isVisible){
        return <View></View>
    } else if (isVisible){
        return (
            <View>
        
        <ModalDropdown dropdownTextStyle={styles.dropDownText} dropdownStyle={styles.dropDown} options={["Add Dish"]}
            dropdownTextHighlightStyle={styles.dropDownTextHigh} onSelect={ (index, value)=>{
                if(value == "Add Dish"){
                    navigation.navigate("ItemEdit", {isNew: true, restId: restId});
                }
            }}
        >
           <View><Entypo size={40} name= "circle-with-plus" color="#0E9594" /></View>
        
        </ModalDropdown>
        
        
        
    </View>) }
    
}

const styles = StyleSheet.create({
    image: {
        backgroundColor: "black",
    },
    dropDown: {
        height: "11.5%",
        marginVertical: -50,
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderRadius: 20,
        backgroundColor: "#0E9594",
    },
    dropDownText: {
        borderRadius: 20,
        marginBottom: 5,
        alignItems: "center",
        fontSize: 20,         
    },
    dropDownTextHigh: {
       
    },
})

export default PlusBtn;