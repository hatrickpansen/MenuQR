import React, {useState, useEffect} from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, StyleSheet, button, SafeAreaView, Platform } from 'react-native';
import ItemEditCard from "../components/authComponents/ItemEditCard"
const baseUrl = Platform.OS === 'android' ? 'http://10.0.2.2:5000' : 'http://localhost:5000';



const ItemEditScreen = ({route}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const {id} = route.params;
    useEffect(() => {
        fetchData();
    }, [])
    const fetchData = async () => {
        const resp = await fetch(baseUrl + "/item/" + id);
        const data = await resp.json();
        setData(data);
        setLoading(false);
      };
      if(loading){
          return (<SafeAreaView>
            <Text>Loading..</Text>
            
        </SafeAreaView>
        )
      } else {
        return(
            <SafeAreaView>
                
                <ItemEditCard item={data}></ItemEditCard>
            </SafeAreaView>
    
        ) 
      }
    
    
}

export default ItemEditScreen;
