import React,{useState,useEffect} from "react";
import {Text,View,TouchableOpacity,StyleSheet,ScrollView,Title,TextInput, } from 'react-native';
import {  Button,  Divider, Card, } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome6'
import DropDownPicker from "react-native-dropdown-picker";
import Styling from "./Styling";
const Insurance=({ Navigation })=>{
    return(
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.container}>
            <Card style={styles.card}>
                <Card.Content>
                   <Text style={styles.heading}>Medical Insurance </Text>
                    
                         <Divider/>
                          <View style={styles.viewStyle}>
                        
               
                            
                                        
                                 <Text style={styles.HeaderStyle}>  Insurance Provider</Text>
                                    <TextInput placeholder="Name"
                                    placeholderTextColor='grey'
                                    mode="outlined"
                                    style={styles.textInputStyle}/>
                                        
                                    <Text style={styles.HeaderStyle}>  Policy Number</Text>
                                    <TextInput placeholder="Policy no."
                                    placeholderTextColor='grey'
                                     mode="outlined"
                                    style={styles.textInputStyle}/>

                                    <Text style={styles.HeaderStyle}>  Contact for Insurance Claims</Text>
                                    <TextInput placeholder="Contact no.."
                                    placeholderTextColor='grey'
                                     mode="outlined"
                                    style={styles.textInputStyle}/>
                                        
                                    <TouchableOpacity style={styles.btnStyle} 
                                    onPress={()=>Navigation.navigate("HomeScreen")}>
                                    <Text style={{textAlign:'center',color:'white',fontWeight:'500',fontSize:14}}>Next</Text>
                                    </TouchableOpacity>
                          </View>
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                    <Card.Content>
                        
                    </Card.Content>
                  </Card>
        </ScrollView>
               

    )
}
export default Insurance
const styles=StyleSheet.create({
    container: {
    padding: 16,
    backgroundColor:'#E5E4E2'//'#F5F7FA'
  
  },
  card: {
    padding: 16,
    borderRadius: 12,
    elevation: 3,
    backgroundColor: "#fff",
    marginBottom:20,
  },
  
  heading: {
    marginBottom: 16,
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop:10,
    color:'#0A66C2',
  },
    viewStyle:{
      flex:1,
    backgroundColor:'white',

    },
    HeaderStyle : {
      fontWeight:'500',
        fontSize:16,
       marginTop:12,
       color:"#333",

    },
//#E5E4E2
    textInputStyle :{
        color:'black',
        backgroundColor:'#F5F5F5',
        padding:10,
        marginTop:5,
        marginBottom:10,
        borderRadius:10,
        height:40,
        width:"100%"
    },
    btnStyle:{
      backgroundColor:"#0A66C2",
      alignSelf:'flex-end',
      textAlign:'center',
      padding:7,
  
      marginBottom:20,
      borderRadius:20,
      height:35,
      width:60,

    },
     dropdown: {
    backgroundColor: "#F5F5F5",
   
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 15,
    
  },
  dropdownContainer: {
    backgroundColor: "##F5F5F5",
    
    borderRadius: 15,
    
  },
})