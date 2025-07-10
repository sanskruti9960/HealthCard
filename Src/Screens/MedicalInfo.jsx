import React,{useState,useEffect} from "react";
import {Text,View,TouchableOpacity,StyleSheet,ScrollView,Title,TextInput, } from 'react-native';
import {  Button,  Divider, Card, } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome6'
import DropDownPicker from "react-native-dropdown-picker";
import Styling from "./Styling";
import FormContext from "./FormContext";
//import { useForm } from "./FormContext";
import { useForm, Controller } from "react-hook-form";

const MedicalInfo = ({ navigation }) => {
  const { formData, handleChange } = useForm();

  const { control, handleSubmit, formState: { errors } } = useForm();

const onSubmit = (data) => {
  console.log(data);
  navigation.navigate('NextScreenName'); // replace with actual next screen name
};


    return(
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.container}>
           <View style={styles.viewStyle}>
                    <Text style={styles.heading}>Medical Information </Text>
                    
                         <Divider/>
                          <View style={styles.viewStyle}>
                        
                                <Styling/>

                          <Text style={styles.HeaderStyle}>  Existing Medical Condition</Text>
                              <Controller
                                control={control}
                                name="condition"
                                rules={{ required: "Medical condition is required" }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                  <TextInput
                                    style={styles.textInputStyle}
                                    placeholder="e.g. Asthma, Diabetes"
                                    placeholderTextColor="grey"
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={onChange}
                                  />
                                )}
                              />
               {errors.condition && <Text style={{ color: 'red', marginLeft: 20 }}>{errors.condition.message}</Text>}

                                 <Text style={styles.HeaderStyle}>  Allergies</Text>
                                 <Controller
                                 control={control}
                                 name="Allergies"
                                 render={({ field: { onChange, onBlur, value } }) => (
                                 <TextInput
                                      style={styles.textInputStyle}
                                      placeholder="eg: Pollen,Milk,Dust"
                                      placeholderTextColor="grey"
                                      value={value}
                                      onBlur={onBlur}
                                      onChangeText={onChange}
                                    />
                                  )}
                                    />

                                <Text style={styles.HeaderStyle}>  Past Surgeries</Text>
                                <Controller
                                  control={control}
                                  name="surgeries"
                                  render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                      style={styles.textInputStyle}
                                      placeholder="If any"
                                      placeholderTextColor="grey"
                                      value={value}
                                      onBlur={onBlur}
                                      onChangeText={onChange}
                                    />
                                  )}
                                    />
               
                          </View>
                          <Divider/>
                
        {/* made 2nd card for medical information */}
            
        <Text style={styles.heading}>Medical Insurance </Text>
                                            
        <Divider/>
      <View style={styles.viewStyle}>
                         
        {/* Insurance Provider */}
        <Text style={styles.HeaderStyle}>Insurance Provider</Text>
        <Controller
          control={control}
          name="insuranceProvider"
          rules={{ required: "Provider is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Name"
              placeholderTextColor="grey"
              style={styles.textInputStyle}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.insuranceProvider && (
          <Text style={styles.error}>{errors.insuranceProvider.message}</Text>
        )}
                                                                

      {/* Policy Number (Optional) */}
        <Text style={styles.HeaderStyle}>Policy Number</Text>
        <Controller
          control={control}
          name="policyNumber"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Policy no."
              placeholderTextColor="grey"
              style={styles.textInputStyle}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />

        {/* Contact for Insurance Claims (Optional) */}
        <Text style={styles.HeaderStyle}>Contact for Insurance Claims</Text>
        <Controller
          control={control}
          name="insuranceContact"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Contact no."
              placeholderTextColor="grey"
              style={styles.textInputStyle}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />


       <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate("EmergencyContact")}
          >
            <Text style={styles.btnTextLeft}>Previous</Text>
          </TouchableOpacity>

          {/* <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate("")}>
            <Text style={styles.btnText}>Skip</Text>
          </TouchableOpacity> */}

          <TouchableOpacity style={styles.btnStyle} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.btnTextRight}>Next</Text>
          </TouchableOpacity>
                        </View>
                        </View>
                        
                    </View>
                  
        </ScrollView>
               

    )
}
export default MedicalInfo
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
        alignSelf:'center',
    },
    btnStyle:{
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
     error: {
    color: "red",
    marginBottom: 10,
    marginLeft: 25,
  },
  btnText: {
    textAlign: "center",
    color: "#0A66C2",
    fontWeight: "bold",
  },
  btnTextLeft: {
    textAlign: "center",
    color: "#0A66C2",
    fontWeight: "bold",
    marginLeft: -10,
  },
  btnTextRight: {
    textAlign: "center",
    color: "#0A66C2",
    fontWeight: "bold",
    fontSize: 14,
    marginRight: -10,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "center",
  },
})