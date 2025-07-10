import  React,{useState,useEffect} from "react";
import {Text,View,TouchableOpacity,StyleSheet,ScrollView,Title, } from 'react-native';
import {  Button,  Divider, Card,TextInput, } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { useForm } from "./FormContext";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import Styling from "./Styling";


const PersonalDetails = ({ navigation }) => {
  const { formData, handleChange } = useForm();


    // const [formData,setFormData] = React.useState({
    //     fullName:"",
    //     age:"",
    //     gender:"",
    //     bloodGrp:"",
    //     EmergencyContactName:"",
    //     EmergencyContactPhn:"",
    //     medicalConditions: "",
    //      allergies: "",
    //      medications: "",
    //      pastSurgery: "",
    //     doctorName: "",
    //     doctorPhone: "",
    //     insuranceProviderName: "",
    //     policyNumber: "",
    //     disability:"",
    
    // })
    //     const handleChange = (name, value) => {
    //     setFormData({ ...formData, [name]: value });
    // }
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
            
             {/* <Icon name="user-circle" size={40} color="#0A66C2" alignSelf='center' />*/}
             <Text style={styles.heading}>User Details</Text> 

             <Styling/>

            <Divider/>
            <View style={styles.viewStyle}>
                   
                  
            
            <Text style={styles.HeaderStyle}>Full Name</Text>
            {/* <Ionicons name="person-circle-outline" size={25} color="grey" alignSelf='center' style={styles.iconStyle}/>
               */}
            <TextInput 
                placeholder='Full Name'
                placeholderTextColor='grey'
                mode="outlined"
                value={formData.fullName}
                onChangeText={text=> handleChange('fullName',text)}
                left={<TextInput.Icon icon="account"  />}style={{ marginBottom: 16 ,height:45}}/>

              <Text style={styles.HeaderStyle}>Phone Number</Text>

               <TextInput
                    placeholder="Phone Number"
                    placeholderTextColor="grey"
                    mode="outlined"
                    value={formData.phone}
                    onChangeText={text => handleChange('phone', text) } 
                    left={<TextInput.Icon icon="phone"  />}style={{marginBottom:16,height:45}}
                  />

               {/* <Icon name="phone-alt" size={20} color="grey" alignSelf='center' style={styles.iconStyle}/>
             
            <TextInput placeholder="Phone Number"
                placeholderTextColor='grey'
                mode="outlined"
             style={styles.textInputStyle}/> */}

              <Text style={styles.HeaderStyle}>Birth Date</Text>
              {/* <Ionicons name="calendar-outline" size={25} color="grey" alignSelf='center' style={styles.iconStyle}/> */}
             
            <TextInput placeholder="DD-MON-YEAR"
                placeholderTextColor='grey'
                mode="outlined" 
                value={formData.birthdate}
             onChangeText={text => handleChange('birthDate', text)}
                    left={<TextInput.Icon icon="calendar"  />}style={styles.textInputStyle} /> 
              
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
              zIndexInverse={3000}
            />
            {/* <TextInput placeholder="blood group"
                placeholderTextColor='grey'
                mode="outlined"
             style={styles.textInputStyle}/> */}


             <View style={{flexDirection:'row',flexWrap:'wrap',alignSelf:'centre',marginLeft:30,}}>

              <TouchableOpacity
                style={styles.btnStyle}
                onPress={() => navigation.navigate('EmergencyContact')}>

              <Text style={{textAlign:'center',color:'white',fontWeight:'500',}}>Skip</Text>
            </TouchableOpacity>

             <TouchableOpacity
              style={styles.btnStyle}
              onPress={() => navigation.navigate('EmergencyContact')}>

           <Text style={{textAlign:'center',color:'white',fontWeight:'500',}}>Next</Text>
           </TouchableOpacity>

</View>

               

               <Divider/>

               
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
    fontSize: 24,
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
        color: 'black',            // ✅ Text color inside input
          backgroundColor: 'transperent',  // ✅ Required for borderRadius to work
          borderRadius: 60,          // ✅ Rounded corners
          marginBottom: 0,
          height: 45,
          width: '100%',
          paddingHorizontal: 10,
          borderWidth:0,
    },
    btnStyle:{
      backgroundColor:"#0A66C2",
      alignSelf:'flex-end',
      textAlign:'center',
      padding:7,
      margin:25,
  
      marginBottom:40,
      borderRadius:15,
      height:35,
      width:70,

    },
     dropdown: {
    backgroundColor: "#F5F5F5",
   
    borderRadius: 5,
    marginTop: 4,
    marginBottom: 10,
    
  },
  dropdownContainer: {
    backgroundColor: "##F5F5F5",
    
    borderRadius: 15,
    
  },
})