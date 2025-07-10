import React,{useState,useEffect} from "react";
import {Text,View,TouchableOpacity,StyleSheet,ScrollView,Title,TextInput, } from 'react-native';
import {  Button,  Divider, Card, } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome6'
import DropDownPicker from "react-native-dropdown-picker";
import Styling from "./Styling";
import FormContext from "./FormContext";
import { useForm, Controller } from "react-hook-form";

const EmergencyContact = ({ navigation }) => {
  const { formData, handleChange } = useForm();
   const { control, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
    console.log(data);
    navigation.navigate('MedicalInfo'); // replace with actual screen name
  };
  
    return(
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.container}>
             <View style={styles.viewStyle}>
                  
                    <Text style={styles.heading}>Emergency Contacts </Text>
                    <Styling/>
                    
                          
                            
               {/* <Text style={styles.HeaderStyle}> Emergency Contact Name</Text>
            <TextInput placeholder="Full Name"
                placeholderTextColor='grey'
                mode="outlined"
                 style={styles.textInputStyle}/>

                 <Text style={styles.HeaderStyle}> Emergency contact Number</Text>
            <TextInput placeholder="Phone Number"
                placeholderTextColor='grey'
                mode="outlined"
                 style={styles.textInputStyle}/> */}


                 {/* Emergency Contact Name */}
        <Text style={styles.HeaderStyle}>Emergency Contact Name</Text>
        <Controller
          control={control}
          name="contactName"
          rules={{ required: "Contact name is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="grey"
              style={styles.textInputStyle}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.contactName && (
          <Text style={styles.error}>{errors.contactName.message}</Text>
        )}

        {/* Emergency Contact Number */}
        <Text style={styles.HeaderStyle}>Emergency Contact Number</Text>
        <Controller
          control={control}
          name="contactNumber"
          rules={{
            required: "Phone number is required",
            pattern: {
              value: /^[0-9]{10}$/,
              message: "Enter a valid 10-digit number",
            },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="grey"
              style={styles.textInputStyle}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="phone-pad"
            />
          )}
        />
        {errors.contactNumber && (
          <Text style={styles.error}>{errors.contactNumber.message}</Text>
        )}


               <Text style={styles.HeaderStyle}> Emergency Contact Relation</Text>
            

                 <Controller
                  control={control}
                   name="Relation"
                   render={({ field: { onChange, onBlur, value } }) => (
                   <TextInput
                    style={styles.textInputStyle}
                     placeholder="eg: Wife,Brother,Father"
                      placeholderTextColor="grey"
                       value={value}
                       onBlur={onBlur}
                        onChangeText={onChange} />
                     )}
                     />
                

               

      <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate("PersonalDetails")}
          >
            <Text style={{ textAlign: "center", color: "#0A66C2", fontWeight: "bold",marginLeft:-150, }}>
              Previous
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate("MedicalInfo")}
          >
            <Text style={{ textAlign: "center", color: "#0A66C2", fontWeight: "500" }}>
              Skip
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.btnStyle} onPress={handleSubmit(onSubmit)}>
            <Text style={{ textAlign: "center", color: "#0A66C2", fontWeight: "bold",marginRight:-150, }}>
              Next
            </Text>
          </TouchableOpacity>



</View>

                          
                </View>

           
        </ScrollView>
               

    )
}
export default EmergencyContact
const styles=StyleSheet.create({
    container: {
    padding: 16,
    backgroundColor:'white'//'#F5F7FA'
  
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
       marginBottom:10,
       margin:20

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
        width:"90%",
        alignSelf:'center'
    },
    error: {
    color: "red",
    marginLeft: 25,
    marginBottom: 10,
  },
  btnStyle: {
    backgroundColor:"white",
      alignSelf:'flex-end',
      textAlign:'center',
      padding:7,
      margin:13,
      marginTop:40,
      marginBottom:40,
      borderRadius:15,
      height:35,
      width:70,
  },
  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "center",
    marginTop: 40,
  },
})