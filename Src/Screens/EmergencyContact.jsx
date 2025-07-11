import React,{useState,useEffect} from "react";
import {Text,View,TouchableOpacity,StyleSheet,ScrollView,Title,TextInput, } from 'react-native';
import Styling from "./Styling";
import { useForm as useFormContext } from "./FormContext";
import { useForm, Controller } from "react-hook-form";

const EmergencyContact = ({ navigation }) => {
  const { formData, handleChange } =useFormContext();
   const { control, handleSubmit, formState: { errors } } = useForm( );
  
  const onSubmit = (data) => {
  Object.keys(data).forEach((key) => handleChange(key, data[key]));

  navigation.navigate('MedicalInfo');
};

  
    return(
        <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.container}>
             <View style={styles.viewStyle}>
                  
                    <Text style={styles.heading}>Emergency Contacts </Text>
                    <Styling/>
            

                 {/* Emergency Contact Name */}
        <Text style={styles.HeaderStyle}>Emergency Contact Name</Text>
        <Controller
          control={control}
          name="emergencyName"
         defaultValue={formData.emergencyName}
          rules={{ required: "Contact name is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Full Name"
              placeholderTextColor="grey"
              style={styles.textInputStyle}
              onBlur={onBlur}
              value={value}
              onChangeText={(text) => {
                onChange(text);
                handleChange("emergencyName", text);
              }}
            />
          )}
        />
        {errors.emergencyName && (
          <Text style={styles.error}>{errors.emergencyName.message}</Text>
        )}

        {/* Emergency Contact Number */}
        <Text style={styles.HeaderStyle}>Emergency Contact Number</Text>
        <Controller
          control={control}
          name="emergencyPhone"
          defaultValue={formData.emergencyPhone}
          rules={{
            required: "Phone number is required",
            // pattern: {
            //   value: /^[0-9]{10}$/,
            //   message: "Enter a valid 10-digit number",
            // },
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="grey"
              style={styles.textInputStyle}
              onBlur={onBlur}
              value={value}
              keyboardType="phone-pad"
              onChangeText={(text) => {
                onChange(text);
                handleChange("emergencyPhone", text);
              }}
            />
          )}
        />
        {errors.emergencyPhone && (
          <Text style={styles.error}>{errors.emergencyPhone.message}</Text>
        )}


               <Text style={styles.HeaderStyle}> Emergency Contact Relation</Text>
            

                 <Controller
                  control={control}
                   name="emergencyRelation"
                  defaultValue={formData.emergencyRelation} 
                   render={({ field: { onChange, onBlur, value } }) => (
                   <TextInput
                    style={styles.textInputStyle}
                     placeholder="eg: Wife,Brother,Father"
                      placeholderTextColor="grey"
                       value={value}
                       onBlur={onBlur}
                        onChangeText={(text) => {
                onChange(text);
                handleChange("emergencyRelation", text);
              }} />
                     )}
                     />
                

               

      <View style={styles.buttonRow}>
          <TouchableOpacity
            style={styles.btnStyle}
            onPress={() => navigation.navigate("PersonalDetails")}>
            <Text style={styles.btnTextLeft}>Previous</Text>
          </TouchableOpacity>

          
          <TouchableOpacity style={styles.btnStyle} 
            onPress={handleSubmit(onSubmit)}>
            <Text style={styles.btnTextRight}>Next</Text>
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
})