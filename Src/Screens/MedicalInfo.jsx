import React,{useState,useEffect} from "react";
import {Text,View,TouchableOpacity,StyleSheet,ScrollView,Title,TextInput, } from 'react-native';
import {  Button,  Divider, Card, } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome6'
import DropDownPicker from "react-native-dropdown-picker";
import Styling from "./Styling";
import { useForm as useFormContext } from "./FormContext";
import { useForm, Controller } from "react-hook-form";

const MedicalInfo = ({ navigation }) => {
  const { formData, handleChange } = useFormContext();

  const { control, handleSubmit, formState: { errors } } = useForm();

const onSubmit = (data) => {
  Object.keys(data).forEach((key) => handleChange(key, data[key]));
  navigation.navigate('HomeScreen'); // replace with your preview screen
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
                                name="medicalConditions"
                                defaultValue={formData.medicalConditions}
                                rules={{ required: "Medical condition is required" }}
                                render={({ field: { onChange, onBlur, value } }) => (
                                  <TextInput
                                    style={styles.textInputStyle}
                                    placeholder="e.g. Asthma, Diabetes/None"
                                    placeholderTextColor="grey"
                                    value={value}
                                    onBlur={onBlur}
                                    onChangeText={(text) => {
                                      onChange(text);
                                      handleChange("medicalConditions", text);
                                    }}
                                  />
                                )}
                              />
               {errors.medicalConditions && <Text style={{ color: 'red', marginLeft: 20 }}>{errors.medicalConditions.message}</Text>}

                                 <Text style={styles.HeaderStyle}>  Allergies</Text>
                                 <Controller
                                 control={control}
                                 name="allergies"
                                 defaultValue={formData.allergies}
                                 render={({ field: { onChange, onBlur, value } }) => (
                                 <TextInput
                                      style={styles.textInputStyle}
                                      placeholder="eg: Pollen,Milk,Dust"
                                      placeholderTextColor="grey"
                                      value={value}
                                      onBlur={onBlur}
                                      onChangeText={(text) => {
                                      onChange(text);
                                      handleChange("allergies", text);
                                    }}
                                    />
                                  )}
                                    />

                                <Text style={styles.HeaderStyle}>  Past Surgeries</Text>
                                <Controller
                                  control={control}
                                  name="pastSurgery"
                                  defaultValue={formData.pastSurgery}
                                  render={({ field: { onChange, onBlur, value } }) => (
                                    <TextInput
                                      style={styles.textInputStyle}
                                      placeholder="If any"
                                      placeholderTextColor="grey"
                                      value={value}
                                      onBlur={onBlur}
                                       onChangeText={(text) => {
                                      onChange(text);
                                      handleChange("pastSurgery", text);
                                    }}
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
          defaultValue={formData.insuranceProvider}
          rules={{ required: "Provider is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Name"
              placeholderTextColor="grey"
              style={styles.textInputStyle}
              onBlur={onBlur}
              value={value}
              onChangeText={(text) => {
                  onChange(text);
                  handleChange("insuranceProvider", text);
                 }}

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
          defaultValue={formData.policyNumber}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Policy no."
              placeholderTextColor="grey"
              style={styles.textInputStyle}
              onBlur={onBlur}
              value={value}
               onChangeText={(text) => {
                  onChange(text);
                  handleChange("policyNumber", text);
                 }}

            />
          )}
        />

        {/* Contact for Insurance Claims (Optional) */}
        <Text style={styles.HeaderStyle}>Contact for Insurance Claims</Text>
        <Controller
          control={control}
          name="insuranceContact"
          defaultValue={formData.insuranceContact}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Contact no."
              placeholderTextColor="grey"
              style={styles.textInputStyle}
              onBlur={onBlur}
              value={value}
              onChangeText={(text) => {
        onChange(text);
        handleChange("insuranceContact", text);
      }}
            />
          )}
        />


       <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate("EmergencyContact")}>
            <Text style={styles.btnTextLeft}>Previous</Text>
          </TouchableOpacity>


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
    marginLeft: -150,
  },
  btnTextRight: {
    textAlign: "center",
    color: "#0A66C2",
    fontWeight: "bold",
    fontSize: 14,
    marginRight: -150,
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "center",
  },
})