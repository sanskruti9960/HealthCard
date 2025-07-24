import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, ScrollView, Alert, KeyboardAvoidingView, StatusBar, Platform } from 'react-native'
import React, { useState } from 'react'
import { Card, Divider, Avatar, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import Tooltip from 'react-native-walkthrough-tooltip'
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage'

const InsuranceSrc1=({navigation, route})=>{
  const [showTip, setShowTip] = useState(true);
  
  // Hide tooltip after 5 seconds
  React.useEffect(() => {
    if (showTip) {
      const timer = setTimeout(() => {
        setShowTip(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showTip]);

  const onSubmit = async (data) => {
    try {
      const existingPolicies = await AsyncStorage.getItem('insurancePolicies');
      let policies = existingPolicies ? JSON.parse(existingPolicies) : [];
      
      const policyObject = {
        id: route?.params?.policyId || Date.now() + Math.random(),
        name: data.policyHolderName || data.companyName || 'Policy Holder',
        policyNumber: data.policyNumber || 'N/A',
        insuranceType: data.policyType || 'General Insurance',
        formState: data
      };
      
      // Check if editing existing policy
      if (route?.params?.fromPreview && route?.params?.policyId) {
        const existingIndex = policies.findIndex(p => p.id === route.params.policyId);
        if (existingIndex >= 0) {
          policies[existingIndex] = policyObject;
        } else {
          policies.push(policyObject);
        }
      } else {
        // New policy
        policies.push(policyObject);
      }
      
      await AsyncStorage.setItem('insurancePolicies', JSON.stringify(policies));
      setModalVisible(true);
      
      // Navigate to preview with policy data
      setTimeout(() => {
        navigation.navigate('InsurancePreview', { 
          formState: data,
          policyId: policyObject.id,
          skipSave: true 
        });
      }, 2000);
    } catch (error) {
      console.log('Error saving policy:', error);
    }
  };
    
  const [modalVisible, setModalVisible] = useState(false);
  
  React.useEffect(() => {
    if (modalVisible) {
      const timer = setTimeout(() => {
        setModalVisible(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [modalVisible]);
  
  const [isEditable, setIsEditable] = useState(false);
  
  const [formState, setFormState] = useState({
    companyName: '',
    serviceNumber: '',
    emailOfCompany: '',
    policyHolderName: '',
    policyNumber: '',
    policyType: '',
    sumInsured: '',
    policyEndDate: '',
    policyStartDate: '',
    nomineeName: '',
    nomineeRelation: '',
    nomineePhn: '',
    claimAmount: '',
    claimLink: '',
    claimHelpPhn: '',
    adharcardNo: '',
    pancardNo: '',
  });

  React.useEffect(() => {
    if (route?.params?.formState && route.params?.fromPreview) {
      setFormState(route.params.formState);
      setIsEditable(true);
    } else if (!route?.params?.fromPreview) {
      // Clear form for new policy creation
      setFormState({
        companyName: '',
        serviceNumber: '',
        emailOfCompany: '',
        policyHolderName: '',
        policyNumber: '',
        policyType: '',
        sumInsured: '',
        policyEndDate: '',
        policyStartDate: '',
        nomineeName: '',
        nomineeRelation: '',
        nomineePhn: '',
        claimAmount: '',
        claimLink: '',
        claimHelpPhn: '',
        adharcardNo: '',
        pancardNo: '',
      });
      setIsEditable(true);
    }
  }, [route?.params]);

  const [showPolicyDropdown, setShowPolicyDropdown] = useState(false);
  const policyTypes = [
    'Individual Policy', 
    'Maternity', 
    'Senior Citizen Policy', 
    'Family Floater',
    'Critical Illness', 
    'Personal Accident',
    'Disease-Specific',
  ];

  const handleChange = (field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (  
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidStyle}
    >
      <StatusBar backgroundColor="#0A66C2" barStyle="light-content" />
      
      <View style={styles.viewStyle}>
        <LinearGradient colors={['#0A66C2', '#0A4D92']} style={styles.headerGradient}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.goBack()}>
              <Icon name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>

            <Text style={styles.mainHeading}>INSURANCE CARD</Text>

            <Tooltip
              isVisible={showTip}
              content={<Text style={styles.tooltipText}>Tap here to edit form fields</Text>}
              placement="bottom"
              onClose={() => setShowTip(false)}
              contentStyle={styles.tooltipContent}
              arrowSize={{ width: 16, height: 8 }}
            >
              <TouchableOpacity 
                style={styles.editButtonHeader} 
                onPress={()=>setIsEditable(true)}
              >
                <Icon name="edit" size={16} color="#FFF" />
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </Tooltip>
          </View>
          
          <View style={styles.avatarContainer}>
            <Avatar.Icon 
              size={60} 
              icon="shield" 
              color="#FFF"
              style={styles.avatar}
            />
            <Text style={styles.cardSubtitle}>Enter Your Insurance Details</Text>
          </View>
        </LinearGradient>
        
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollContainer}>
          <Card style={styles.sectionCard} elevation={2}>
            <Card.Content>
              <Text style={styles.HeaderStyle}>INSURANCE PROVIDER</Text>
              <Divider style={styles.divider}/>
              
              <View style={styles.inputContainer}>
                <TextInput
                  label="Company Name"
                  value={formState.companyName}
                  mode="outlined"
                  disabled={!isEditable}
                  onChangeText={(text) => handleChange('companyName', text)}
                  left={<TextInput.Icon icon={() => <Icon name="business" size={20} color="#0A66C2" />} />}
                  style={styles.paperInput}
                  outlineColor="#0A66C2"
                  activeOutlineColor="#0A66C2"
                  theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white', } }}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <TextInput
                  label="Customer Service Number"
                  value={formState.serviceNumber}
                  mode="outlined"
                  disabled={!isEditable}
                  keyboardType="numeric"
                  onChangeText={(text) => handleChange('serviceNumber', text)}
                  left={<TextInput.Icon icon={() => <Icon name="phone" size={20} color="#0A66C2" />} />}
                  style={styles.paperInput}
                  outlineColor="#0A66C2"
                  activeOutlineColor="#0A66C2"
                  theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white' } }}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Email/website of company"
                  value={formState.emailOfCompany}
                  mode="outlined"
                  disabled={!isEditable}
                  keyboardType="email-address"
                  onChangeText={(text) => handleChange('emailOfCompany', text)}
                  left={<TextInput.Icon icon={() => <Icon name="email" size={20} color="#0A66C2" />} />}
                  style={styles.paperInput}
                  outlineColor="#0A66C2"
                  activeOutlineColor="#0A66C2"
                  theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white' } }}
                />
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.sectionCard} elevation={2}>
            <Card.Content>
              <Text style={styles.HeaderStyle}>POLICY DETAILS</Text>
              <Divider style={styles.divider}/>

               <View style={styles.inputContainer}>
                <TextInput
                  label="Policy Holder Name"
                  value={formState.policyHolderName}
                  mode="outlined"
                  disabled={!isEditable}
                  keyboardType="default"
                  onChangeText={(text) => handleChange('policyHolderName', text)}
                  left={<TextInput.Icon icon={() => <Icon name="description" size={20} color="#0A66C2" />} />}
                  style={styles.paperInput}
                  outlineColor="#0A66C2"
                  activeOutlineColor="#0A66C2"
                  theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white' } }}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Policy Number"
                  value={formState.policyNumber}
                  mode="outlined"
                  disabled={!isEditable}
                  keyboardType="numeric"
                  onChangeText={(text) => handleChange('policyNumber', text)}
                  left={<TextInput.Icon icon={() => <Icon name="description" size={20} color="#0A66C2" />} />}
                  style={styles.paperInput}
                  outlineColor="#0A66C2"
                  activeOutlineColor="#0A66C2"
                  theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white' } }}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Policy Type"
                  value={formState.policyType}
                  mode="outlined"
                  disabled={!isEditable}
                  onChangeText={(text) => handleChange('policyType', text)}
                  right={<TextInput.Icon icon="menu-down" onPress={() => {
                    if (isEditable) setShowPolicyDropdown(true);
                  }} />}
                  left={<TextInput.Icon icon={() => <Icon name="category" size={20} color="#0A66C2" />} />}
                  style={styles.paperInput}
                  outlineColor="#0A66C2"
                  activeOutlineColor="#0A66C2"
                  theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white' } }}
                  onTouchStart={() => {
                    if (isEditable) setShowPolicyDropdown(true);
                  }}
                />
              </View>

              <Modal visible={showPolicyDropdown} transparent animationType='slide'>
                <TouchableOpacity style={styles.modalOverlay} onPress={() => setShowPolicyDropdown(false)}>
                  <View style={styles.modalContent}>
                    <FlatList
                      data={policyTypes}
                      keyExtractor={(item) => item}
                      renderItem={({item}) => (
                        <TouchableOpacity 
                          style={styles.dropdownItem} 
                          onPress={() => {
                            handleChange('policyType', item)
                            setShowPolicyDropdown(false)
                          }}
                        >
                          <Text style={styles.dropdownItemText}>{item}</Text>
                        </TouchableOpacity>
                      )}
                    />
                  </View>
                </TouchableOpacity>
              </Modal>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Sum Insured Amount"
                  value={formState.sumInsured}
                  mode="outlined"
                  disabled={!isEditable}
                  keyboardType="numeric"
                  onChangeText={(text) => handleChange('sumInsured', text)}
                  left={<TextInput.Icon icon={() => <Icon name="attach-money" size={20} color="#0A66C2" />} />}
                  style={styles.paperInput}
                  outlineColor="#0A66C2"
                  activeOutlineColor="#0A66C2"
                  theme={{ roundness:15,colors: { primary: '#0A66C2', background: 'white' } }}
                />
              </View>

              <View style={styles.dateContainer}>
                <View style={styles.dateInputWrapper}>
                  <TextInput
                    label="Start Date"
                    value={formState.policyStartDate}
                    mode="outlined"
                    disabled={!isEditable}
                    onChangeText={(text) => handleChange('policyStartDate', text)}
                    left={<TextInput.Icon icon={() => <Icon name="event" size={20} color="#0A66C2" />} />}
                    style={styles.dateInput}
                    outlineColor="#0A66C2"
                    activeOutlineColor="#0A66C2"
                    theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white' } }}
                  />
                </View>
                
                <View style={styles.dateInputWrapper}>
                  <TextInput
                    label="End Date"
                    value={formState.policyEndDate}
                    mode="outlined"
                    disabled={!isEditable}
                    onChangeText={(text) => handleChange('policyEndDate', text)}
                    left={<TextInput.Icon icon={() => <Icon name="event" size={20} color="#0A66C2" />} />}
                    style={styles.dateInput}
                    outlineColor="#0A66C2"
                    activeOutlineColor="#0A66C2"
                    theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white' } }}
                  />
                </View>
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.sectionCard} elevation={2}>
            <Card.Content>
              <Text style={styles.HeaderStyle}>NOMINEE DETAILS</Text>
              <Divider style={styles.divider}/>
              
              <View style={styles.inputContainer}>
                <TextInput
                  label="Nominee Name"
                  value={formState.nomineeName}
                  mode="outlined"
                  disabled={!isEditable}
                  onChangeText={(text) => handleChange('nomineeName', text)}
                  left={<TextInput.Icon icon={() => <Icon name="person" size={20} color="#0A66C2" />} />}
                  style={styles.paperInput}
                  outlineColor="#0A66C2"
                  activeOutlineColor="#0A66C2"
                  theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white' } }}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <TextInput
                  label="Nominee Relation"
                  value={formState.nomineeRelation}
                  mode="outlined"
                  disabled={!isEditable}
                  onChangeText={(text) => handleChange('nomineeRelation', text)}
                  left={<TextInput.Icon icon={() => <Icon name="people" size={20} color="#0A66C2" />} />}
                  style={styles.paperInput}
                  outlineColor="#0A66C2"
                  activeOutlineColor="#0A66C2"
                  theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white' } }}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <TextInput
                  label="Nominee Phone Number"
                  value={formState.nomineePhn}
                  mode="outlined"
                  disabled={!isEditable}
                  keyboardType="numeric"
                  onChangeText={(text) => handleChange('nomineePhn', text)}
                  left={<TextInput.Icon icon={() => <Icon name="phone" size={20} color="#0A66C2" />} />}
                  style={styles.paperInput}
                  outlineColor="#0A66C2"
                  activeOutlineColor="#0A66C2"
                  theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white' } }}
                />
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.sectionCard} elevation={2}>
            <Card.Content>
              <Text style={styles.HeaderStyle}>CLAIM INFO</Text>
              <Divider style={styles.divider}/>
            
              <View style={styles.inputContainer}>
                <TextInput
                  label="Claim Amount"
                  value={formState.claimAmount}
                  mode="outlined"
                  disabled={!isEditable}
                  keyboardType="numeric"
                  onChangeText={(text) => handleChange('claimAmount', text)}
                  left={<TextInput.Icon icon={() => <Icon name="money" size={20} color="#0A66C2" />} />}
                  style={styles.paperInput}
                  outlineColor="#0A66C2"
                  activeOutlineColor="#0A66C2"
                  theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white' } }}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Claim: Cashless Hospital link"
                  value={formState.claimLink}
                  mode="outlined"
                  disabled={!isEditable}
                  onChangeText={(text) => handleChange('claimLink', text)}
                  left={<TextInput.Icon icon={() => <Icon name="local-hospital" size={20} color="#0A66C2" />} />}
                  style={styles.paperInput}
                  outlineColor="#0A66C2"
                  activeOutlineColor="#0A66C2"
                  theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white' } }}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="HelpLine no."
                  value={formState.claimHelpPhn}
                  mode="outlined"
                  disabled={!isEditable}
                  keyboardType="numeric"
                  onChangeText={(text) => handleChange('claimHelpPhn', text)}
                  left={<TextInput.Icon icon={() => <Icon name="support-agent" size={20} color="#0A66C2" />} />}
                  style={styles.paperInput}
                  outlineColor="#0A66C2"
                  activeOutlineColor="#0A66C2"
                  theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white' } }}
                />
              </View>
            </Card.Content>
          </Card>

          <Card style={styles.sectionCard} elevation={2}>
            <Card.Content>
              <Text style={styles.HeaderStyle}>OTHER DETAILS</Text>
              <Divider style={styles.divider}/>
          
              <View style={styles.inputContainer}>
                <TextInput
                  label="Adharcard Number"
                  value={formState.adharcardNo}
                  mode="outlined"
                  keyboardType="numeric"
                  disabled={!isEditable}
                  onChangeText={(text) => handleChange('adharcardNo', text)}
                  left={<TextInput.Icon icon={() => <Icon name="fingerprint" size={20} color="#0A66C2" />} />}
                  style={styles.paperInput}
                  outlineColor="#0A66C2"
                  activeOutlineColor="#0A66C2"
                  theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white' } }}
                />
              </View>
          
              <View style={styles.inputContainer}>
                <TextInput
                  label="Pancard Number"
                  value={formState.pancardNo}
                  mode="outlined"
                  keyboardType="numeric"
                  disabled={!isEditable}
                  onChangeText={(text) => handleChange('pancardNo', text)}
                  left={<TextInput.Icon icon={() => <Icon name="badge" size={20} color="#0A66C2" />} />}
                  style={styles.paperInput}
                  outlineColor="#0A66C2"
                  activeOutlineColor="#0A66C2"
                  theme={{roundness:15, colors: { primary: '#0A66C2', background: 'white' } }}
                />
              </View>
            </Card.Content>
          </Card>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.actionButton}
              onPress={() => { 
                onSubmit(formState); 
                setIsEditable(false);  
              }}
            >
                <Icon name="save" size={20} color="#0A66C2" />
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
          </View>

          <Modal
            visible={modalVisible}
            transparent
            animationType="fade"
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}> ✅Data Saved Successfully </Text>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  )
}

export default InsuranceSrc1

const styles=StyleSheet.create({
  paperInput: {
    backgroundColor: '#f0f2f4ff',
    width: '100%',
    marginVertical: 1,
    height:40,
    borderWidth:0,
    borderRadius:50,
    labelColor: '#0A66C2',
    

    
    
  },
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
    
  },
  dateInputWrapper: {
    width: '48%',
    
    
  },
  dateInput: {
    backgroundColor: '#f0f2f4ff',
    height: 40,
  },
  keyboardAvoidStyle:{
    flex:1
  },
  viewStyle: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerGradient: {
    paddingTop: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  mainHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    flex: 1,
    textAlign: 'center',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  avatar: {
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#FFF',
    marginTop: 5,
    opacity: 0.9,
  },
  scrollContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  sectionCard: {
    marginBottom: 15,
    borderRadius: 12,
    elevation: 2,
    backgroundColor: '#FFF',
  },
  HeaderStyle: {
    fontWeight: '600',
    fontSize: 16,
    color: '#0A66C2',
    marginBottom: 8,
  },
  divider: {
    backgroundColor: '#E0E0E0',
    height: 1,
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 8,
    marginTop: 4,
    width: '100%',
  },
  textInputWithIcon: {
    flex: 1,
    color: '#333',
    marginLeft: 10,
    fontSize: 14,
  },
  icon: {
    marginRight: 8,
    color: '#0A66C2',
  },
  editButtonHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  buttonContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  actionButton: {
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'center',
    alignItems: 'center',
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: '#0A66C2',
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 8,
    alignSelf: 'center',
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    color: '#0A66C2',
    fontWeight: '600',
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 15,
    width: '80%',
    maxHeight: '70%',
    overflow: 'hidden',
    elevation: 5,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  dropdownItemText: {
    fontSize: 16,
    color: '#333',
  },
  tooltipContent: {
    backgroundColor: '#0A66C2',
    padding: 8,
    borderRadius: 8,
    width: 180,
  },
  tooltipText: {
    color: '#FFF',
    fontSize: 14,
    textAlign: 'center',
  },
  btnStyle: {
    padding: 8,
  },
})