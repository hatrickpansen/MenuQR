import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, button, SafeAreaView } from 'react-native';
import ItemEditCard from "../components/authComponents/ItemEditCard"


const ItemEditScreen = ({route}) => {
    const {item} = route.params;
    console.log("edit: " + item);
    return(
        <SafeAreaView>
        <ItemEditCard item={item}></ItemEditCard>
        </SafeAreaView>

    ) 
}

export default ItemEditScreen;
