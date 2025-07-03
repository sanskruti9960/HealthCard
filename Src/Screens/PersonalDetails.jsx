import React,{useState,useEffect} from "react";
import {Text,View,TouchableOpacity,StyleSheet,ScrollView,Title,TextInput, } from 'react-native';
import {  Button,  Divider, Card, } from "react-native-paper";
import Icon from 'react-native-vector-icons/FontAwesome6'

import DropDownPicker from "react-native-dropdown-picker";
const PersonalDetails=()=>{
    const [formData,setFormData] = React.useState({
        fullName:"",
        age:"",
        gender:"",
        bloodGrp:"",
        EmergencyContactName:"",
        EmergencyContactPhn:"",
        medicalConditions: "",
         allergies: "",
         medications: "",
         pastSurgery: "",
        doctorName: "",
        doctorPhone: "",
        insuranceProviderName: "",
        policyNumber: "",
        disability:"",
    
    })
        const handleChange = (name, value) => {
        setFormData({ ...formData, [name]: value });
    }
    // Gender Dropdown
  const [genderOpen, setGenderOpen] = useState(false);
  const [genderItems, setGenderItems] = useState([
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
  ])

  // Blood Group Dropdown
  const [bloodOpen, setBloodOpen] = useState(false);
  const [bloodItems, setBloodItems] = useState([
    { label: "A+", value: "A+" },
    { label: "A-", value: "A-" },
    { label: "B+", value: "B+" },
    { label: "B-", value: "B-" },
    { label: "O+", value: "O+" },
    { label: "O-", value: "O-" },
    { label: "AB+", value: "AB+" },
    { label: "AB-", value: "AB-" },
  ])
    
    
    return(
      <ScrollView nestedScrollEnabled={true} contentContainerStyle={styles.container}>
        <Card style={styles.card}>
          <Card.Content>
             
             <Text style={styles.heading}>User Details</Text>

            <Divider/>
            <View style={styles.viewStyle}>
                   
                  
            
            <Text style={styles.HeaderStyle}> Full Name</Text>
            <TextInput placeholder="Full Name"
                placeholderTextColor='grey'
                mode="outlined"
                 style={styles.textInputStyle}/>

             <Text style={styles.HeaderStyle}>Phone Number</Text>
            <TextInput placeholder="Phone Number"
                placeholderTextColor='grey'
                mode="outlined"
             style={styles.textInputStyle}/>

              <Text style={styles.HeaderStyle}>Birth Date</Text>
            <TextInput placeholder="DD-MON-YEAR"
                placeholderTextColor='grey'
                mode="outlined"
             style={styles.textInputStyle}/>

             <Text style={styles.HeaderStyle}>Gender</Text>
             
             <DropDownPicker //dropdown for selection of grnder
              open={genderOpen}
              value={formData.gender}
              items={genderItems}
              setOpen={setGenderOpen}
              setValue={(callback) =>
                handleChange("gender", callback(formData.gender))
              }
              setItems={setGenderItems}
              placeholder="Select Gender"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              zIndex={3000}
              zIndexInverse={1000}
            />
            {/* <TextInput placeholder=" Gender"
                placeholderTextColor='grey'
                mode="outlined"
             style={styles.textInputStyle}/> */}

             <Text style={styles.HeaderStyle}>Blood Group</Text>
            
             <DropDownPicker //dropdown for blood group
              open={bloodOpen}
              value={formData.bloodGrp}
              items={bloodItems}
              setOpen={setBloodOpen}
              setValue={(callback) =>
                handleChange("bloodGrp", callback(formData.bloodGrp))
              }
              setItems={setBloodItems}
              placeholder="Select Blood Group"
              style={styles.dropdown}
              dropDownContainerStyle={styles.dropdownContainer}
              zIndex={2000}
              zIndexInverse={1000}
            />
            {/* <TextInput placeholder="blood group"
                placeholderTextColor='grey'
                mode="outlined"
             style={styles.textInputStyle}/> */}

             <TouchableOpacity style={styles.btnStyle}>
                  <Text style={{textAlign:'center',color:'white',fontWeight:'500'}}>Next</Text>
               </TouchableOpacity>


               

               <Divider/>

               <Text style={styles.heading}>Emergency Contacts </Text>
               <Text style={styles.HeaderStyle}> Emergency Contact Name</Text>
            <TextInput placeholder="Full Name"
                placeholderTextColor='grey'
                mode="outlined"
                 style={styles.textInputStyle}/>

                 <Text style={styles.HeaderStyle}> Emergency contact Number</Text>
            <TextInput placeholder="Phone Number"
                placeholderTextColor='grey'
                mode="outlined"
                 style={styles.textInputStyle}/>

               <Text style={styles.HeaderStyle}> Emergency Contact Relation</Text>
            <TextInput placeholder="Brother/Wife/father"
                placeholderTextColor='grey'
                mode="outlined"
                 style={styles.textInputStyle}/>

                 <TouchableOpacity style={styles.btnStyle}>
                  <Text style={{textAlign:'center',color:'white',fontWeight:'500'}}>Next</Text>
               </TouchableOpacity>


                 <Divider/>
                 <Text style={styles.heading}>Medical Information </Text>

                  <Text style={styles.HeaderStyle}>  Existing Medical Condition</Text>
            <TextInput placeholder="eg: Asthma,Diabeties,blood pressure"
                placeholderTextColor='grey'
                mode="outlined"
                 style={styles.textInputStyle}/>

                 <Text style={styles.HeaderStyle}>  Allergies</Text>
            <TextInput placeholder="eg: Pollen,Milk,Dust"
                placeholderTextColor='grey'
                mode="outlined"
                 style={styles.textInputStyle}/>

                 <Text style={styles.HeaderStyle}>  Past Surgeries</Text>
            <TextInput placeholder=""
                placeholderTextColor='grey'
                mode="outlined"
                 style={styles.textInputStyle}/>

                 <TouchableOpacity style={styles.btnStyle}>
                  <Text style={{textAlign:'center',color:'white',fontWeight:'500'}}>Next</Text>
               </TouchableOpacity>


                 <Divider/>
                 <Text style={styles.heading}>Medical Insurance </Text>

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

                 <TouchableOpacity style={styles.btnStyle}>
                  <Text style={{textAlign:'center',color:'white',fontWeight:'500',fontSize:14}}>Next</Text>
               </TouchableOpacity>

             </View>
        </Card.Content>

      </Card>
      </ScrollView>
       
    )
}

export default PersonalDetails
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
        borderColor:'grey',
        borderWidth:1,
        padding:10,
        marginTop:5,
        marginBottom:10,
        borderRadius:20,
        height:40,
        width:"100%"
    },
    btnStyle:{
      backgroundColor:"#0A66C2",
      alignSelf:'flex-end',
      padding:13,
      marginBottom:20,
      borderRadius:20,
      height:45,
      width:60,

    },
     dropdown: {
    backgroundColor: "#F5F5F5",
    borderColor: "gery",
    borderWidth: 1,
    borderRadius: 25,
    marginTop: 5,
    marginBottom: 15,
    
  },
  dropdownContainer: {
    backgroundColor: "##F5F5F5",
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 15,
    
  },
})