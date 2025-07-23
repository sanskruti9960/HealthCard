import  React,{useState,useEffect} from "react";
import {Text,View,TouchableOpacity,StyleSheet,ScrollView,Title,TextInput,KeyboardAvoidingView, Platform,FlatList } from 'react-native';
import {  Button,  Divider, Card, } from "react-native-paper";
import DropDownPicker from "react-native-dropdown-picker";
import { useForm as useFormContext } from "./FormContext";
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LottieView from 'lottie-react-native';
import Styling from "./Styling";
import { useForm, Controller } from "react-hook-form";


const PersonalDetails = ({ navigation }) => {
  const { formData, handleChange } =useFormContext();

   const { control, handleSubmit, formState: { errors } } = useForm();
  
  const onSubmit = (data) => {
  Object.keys(data).forEach((key) => handleChange(key, data[key]));
  
  navigation.navigate('EmergencyContact');
};

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
//       <KeyboardAvoidingView
//   style={{ flex: 1 }}
//   behavior={Platform.OS === 'ios' ? 'padding' : undefined}
// >
//   <ScrollView
//     contentContainerStyle={styles.container}
//     keyboardShouldPersistTaps="handled"
//   >
<FlatList
    data={[]} // No data to render in list itself
    style={styles.flatList}
  contentContainerStyle={styles.flatListContent}
  ListHeaderComponent={
    <View style={styles.viewStyle}>
            
             <Text style={styles.heading}>User Details</Text> 

             <Styling/>
           
            <Text style={styles.HeaderStyle}>Full Name :</Text>
           
            
                <Controller
                  control={control}
                    name="fullName"
                    defaultValue={formData.fullName}
                      rules={{ required: "Full name is required" }}
                      render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={styles.textInputStyle}
                         placeholder="Name"
                         placeholderTextColor="grey"
                         value={value}
                         onBlur={onBlur}
                         onChangeText={(text) => {
                            onChange(text);
                            handleChange("fullName", text);
                          }} />
                 )}
            />
      {errors.fullName && <Text style={{ color: 'red', marginLeft: 20 }}>{errors.fullName.message}</Text>}
                
                                                 
         {/* Phone Number */}
        <Text style={styles.HeaderStyle}>Phone Number :</Text>
        <Controller
          control={control}
          name="phone"
          defaultValue={formData.phone}
          rules={{ required: "Phone number is required" }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.textInputStyle}
              placeholder="Phone no."
              placeholderTextColor="grey"
              keyboardType="phone-pad"
              value={value}
              onBlur={onBlur}
              onChangeText={(text) => {
                  onChange(text);
                  handleChange("phone", text);
                }}
            />
          )}
        />
        {errors.phone && <Text style={styles.error}>{errors.phone.message}</Text>}
              {/* Birth Date */}
        <Text style={styles.HeaderStyle}>Birth Date :</Text>
        <Controller
          control={control}
          name="birthDate"
          defaultValue={formData.birthDate}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="DD-MON-YEAR"
              placeholderTextColor="grey"
              style={styles.textInputStyle}
              value={value}
              onBlur={onBlur}
             onChangeText={(text) => {
                onChange(text);
                handleChange("birthDate", text);
              }}
            />
          )}
        />

           
              <Text style={styles.HeaderStyle}>Gender :</Text>
             
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
           

             <Text style={styles.HeaderStyle}>Blood Group :</Text>
            
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
              scrollViewProps={{
                  nestedScrollEnabled: true,
                  keyboardShouldPersistTaps: 'handled',
                }}
              zIndex={2000}
              zIndexInverse={3000}
            />
           
             <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btnStyle} onPress={handleSubmit(onSubmit)}>
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>
        </View>

    <Divider/>

               
             
   </View>
      
//   </ScrollView>
// </KeyboardAvoidingView>
 }
    keyExtractor={(item, index) => index.toString()}
    keyboardShouldPersistTaps="handled"
  />
)
    
}

export default PersonalDetails
const styles=StyleSheet.create({
    container: {
    padding: 16,
    backgroundColor: "white",
  },
  viewStyle: {
    flex: 1,
    backgroundColor: "white",
  },
  heading: {
    marginBottom: 16,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    color: "#0A66C2",
  },
  HeaderStyle: {
    fontWeight: "500",
    fontSize: 16,
    marginTop: 12,
    color: "#333",
    marginBottom: 10,
    marginLeft: 20,
  },
  textInputStyle: {
    color: "black",
    backgroundColor: "#F5F5F5",
    borderRadius: 10,
    marginBottom: 15,
    height: 45,
    width: "90%",
    paddingHorizontal: 10,
    borderWidth: 0,
    alignSelf: "center",
  },
  error: {
    color: "red",
    marginLeft: 25,
    marginBottom: 10,
  },
  btnStyle: {
    backgroundColor:"white",
      
      textAlign:'center',
      padding:7,
      marginTop:25,
      marginBottom:40,
      borderRadius:15,
      height:35,
      width:70,

  },
  btnText: {
    textAlign: "center",
    color: "#0A66C2",
    fontWeight: "bold",
    marginRight:-210,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "center",
  },
  dropdown: {
    backgroundColor: "#F5F5F5",
    borderWidth: 0,
    borderRadius: 10,
    marginTop: 4,
    width: "90%",
    alignSelf: "center",
    marginBottom: 15,
  },
  dropdownContainer: {
    backgroundColor: "#F5F5F5",
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    borderRadius: 15,
    maxHeight: 320,
  },
  flatList: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatListContent: {
    padding: 16,
    paddingBottom: 40,
  },
})