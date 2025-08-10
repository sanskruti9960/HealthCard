import { StyleSheet, Text, View, TouchableOpacity, Modal, FlatList, ScrollView, Alert, KeyboardAvoidingView, StatusBar, Platform } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Card, Divider, Avatar, TextInput } from 'react-native-paper'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'
import Tooltip from 'react-native-walkthrough-tooltip'


import FirestoreService, { USER_DATA_TYPES } from '../Services/FirestoreService'

const InsuranceSrc1=({navigation, route})=>{
  const [userId, setUserId] = useState(null);
  const [showTip, setShowTip] = useState(true);
  
  useEffect(() => {
    initializeUser();
    loadExistingData();
  }, []);

  const loadExistingData = React.useCallback(async () => {
    try {
      if (route?.params?.policyData && !route?.params?.createNew) {
        setFormState(route.params.policyData);
        console.log('Loaded existing policy data');
      }
    } catch (error) {
      console.log('Error loading policy data:', error);
    }
  }, [route?.params]);

  const initializeUser = React.useCallback(async () => {
    try {
      const id = await FirestoreService.getUserId();
      setUserId(id);
    } catch (error) {
      console.log('Error initializing user:', error);
    }
  }, []);

  const onSubmit = React.useCallback(async (data) => {
    try {
      const savedPolicy = await FirestoreService.saveInsurancePolicy(data);
      setModalVisible(true);
      setTimeout(() => {
        navigation.navigate('InsurancePreview', {
          formState: savedPolicy,
          policyId: savedPolicy.id
        });
      }, 2000);
    } catch (error) {
      console.log('Error saving insurance policy:', error);
    }
  }, [navigation]);
    
  const [modalVisible, setModalVisible] = useState(false);
  
  React.useEffect(() => {
    let tipTimer, modalTimer;
    
    if (showTip) {
      tipTimer = setTimeout(() => {
        setShowTip(false);
      }, 3000);
    }
    
    if (modalVisible) {
      modalTimer = setTimeout(() => {
        setModalVisible(false);
      }, 2000);
    }
    
    return () => {
      if (tipTimer) clearTimeout(tipTimer);
      if (modalTimer) clearTimeout(modalTimer);
    };
  }, [showTip, modalVisible]);
  
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
    if (route?.params?.createNew || !route?.params?.policyData) {
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
    } else if (route?.params?.policyData) {
      // Load existing policy for editing
      setFormState(route.params.policyData);
      setIsEditable(true);
    }
  }, [route?.params]);

  const [showPolicyDropdown, setShowPolicyDropdown] = useState(false);
  const [isCustomPolicyType, setIsCustomPolicyType] = useState(false);
  const policyTypes = [
    'Individual Policy', 
    'Maternity', 
    'Senior Citizen Policy', 
    'Family Floater',
    'Critical Illness', 
    'Personal Accident',
    'Disease-Specific',
    'Other',
  ];

  const handleChange = React.useCallback((field, value) => {
    setFormState((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const handleDropdownPress = React.useCallback(() => {
    if (isEditable) setShowPolicyDropdown(true);
  }, [isEditable]);

  const handleGoBack = React.useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (  
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidStyle}
    >
      <StatusBar backgroundColor="#F8FAFC" barStyle="dark-content" />
      
      <View style={styles.viewStyle}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.btnStyle} onPress={handleGoBack}>
            <Icon name="arrow-back" size={24} color="#2E3A59" />
          </TouchableOpacity>

          <View style={styles.headerIconWrapper}>
            <Avatar.Icon 
              size={60} 
              icon="shield" 
              color="#FFF"
              style={styles.headerAvatar}
            />
          </View>

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
              onPress={() => setIsEditable(!isEditable)}
            >
              <Icon name="edit" size={16} color="#1C75BC" />
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </Tooltip>
        </View>
        
        <View style={styles.heroContainer}>
          <Text style={styles.heroTitle}>Insurance Details</Text>
          <Text style={styles.heroSubtitle}>Enter Your Insurance Details</Text>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false} decelerationRate={"fast"} style={styles.scrollContainer}>
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
                  left={<TextInput.Icon icon={() => <Icon name="business" size={20} color="#1C75BC" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#1C75BC"
                  theme={{roundness:12, colors: { primary: '#1C75BC', background: 'white', } }}
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
                  left={<TextInput.Icon icon={() => <Icon name="phone" size={20} color="#1C75BC" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#1C75BC"
                  theme={{roundness:12, colors: { primary: '#1C75BC', background: 'white' } }}
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
                  left={<TextInput.Icon icon={() => <Icon name="email" size={20} color="#1C75BC" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#1C75BC"
                  theme={{roundness:12, colors: { primary: '#1C75BC', background: 'white' } }}
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
                  left={<TextInput.Icon icon={() => <Icon name="description" size={20} color="#3B82F6" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#3B82F6"
                  theme={{roundness:12, colors: { primary: '#3B82F6', background: 'white' } }}
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
                  left={<TextInput.Icon icon={() => <Icon name="description" size={20} color="#3B82F6" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#3B82F6"
                  theme={{roundness:12, colors: { primary: '#3B82F6', background: 'white' } }}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Policy Type"
                  value={formState.policyType}
                  mode="outlined"
                  disabled={!isEditable}
                  editable={isCustomPolicyType || !isEditable ? isEditable : false}
                  onChangeText={(text) => handleChange('policyType', text)}
                  right={<TextInput.Icon icon="menu-down" onPress={handleDropdownPress} />}
                  left={<TextInput.Icon icon={() => <Icon name="category" size={20} color="#3B82F6" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#3B82F6"
                  theme={{roundness:12, colors: { primary: '#3B82F6', background: 'white' } }}
                  onTouchStart={isCustomPolicyType ? undefined : handleDropdownPress}
                  placeholder={isCustomPolicyType ? "Enter your policy type" : "Select policy type"}
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
                            if (item === 'Other') {
                              setIsCustomPolicyType(true);
                              handleChange('policyType', '');
                            } else {
                              setIsCustomPolicyType(false);
                              handleChange('policyType', item);
                            }
                            setShowPolicyDropdown(false);
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
                  left={<TextInput.Icon icon={() => <Icon name="attach-money" size={20} color="#3B82F6" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#3B82F6"
                  theme={{ roundness:12,colors: { primary: '#3B82F6', background: 'white' } }}
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
                    left={<TextInput.Icon icon={() => <Icon name="event" size={20} color="#3B82F6" />} />}
                    style={styles.dateInput}
                    outlineColor="#E2E8F0"
                    activeOutlineColor="#3B82F6"
                    theme={{roundness:12, colors: { primary: '#3B82F6', background: 'white' } }}
                  />
                </View>
                
                <View style={styles.dateInputWrapper}>
                  <TextInput
                    label="End Date"
                    value={formState.policyEndDate}
                    mode="outlined"
                    disabled={!isEditable}
                    onChangeText={(text) => handleChange('policyEndDate', text)}
                    left={<TextInput.Icon icon={() => <Icon name="event" size={20} color="#3B82F6" />} />}
                    style={styles.dateInput}
                    outlineColor="#E2E8F0"
                    activeOutlineColor="#3B82F6"
                    theme={{roundness:12, colors: { primary: '#3B82F6', background: 'white' } }}
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
                  left={<TextInput.Icon icon={() => <Icon name="person" size={20} color="#3B82F6" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#3B82F6"
                  theme={{roundness:12, colors: { primary: '#3B82F6', background: 'white' } }}
                />
              </View>
              
              <View style={styles.inputContainer}>
                <TextInput
                  label="Nominee Relation"
                  value={formState.nomineeRelation}
                  mode="outlined"
                  disabled={!isEditable}
                  onChangeText={(text) => handleChange('nomineeRelation', text)}
                  left={<TextInput.Icon icon={() => <Icon name="people" size={20} color="#3B82F6" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#3B82F6"
                  theme={{roundness:12, colors: { primary: '#3B82F6', background: 'white' } }}
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
                  left={<TextInput.Icon icon={() => <Icon name="phone" size={20} color="#3B82F6" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#3B82F6"
                  theme={{roundness:12, colors: { primary: '#3B82F6', background: 'white' } }}
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
                  left={<TextInput.Icon icon={() => <Icon name="money" size={20} color="#3B82F6" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#3B82F6"
                  theme={{roundness:12, colors: { primary: '#3B82F6', background: 'white' } }}
                />
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  label="Claim: Cashless Hospital link"
                  value={formState.claimLink}
                  mode="outlined"
                  disabled={!isEditable}
                  onChangeText={(text) => handleChange('claimLink', text)}
                  left={<TextInput.Icon icon={() => <Icon name="local-hospital" size={20} color="#3B82F6" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#3B82F6"
                  theme={{roundness:12, colors: { primary: '#3B82F6', background: 'white' } }}
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
                  left={<TextInput.Icon icon={() => <Icon name="support-agent" size={20} color="#3B82F6" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#3B82F6"
                  theme={{roundness:12, colors: { primary: '#3B82F6', background: 'white' } }}
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
                  left={<TextInput.Icon icon={() => <Icon name="fingerprint" size={20} color="#3B82F6" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#3B82F6"
                  theme={{roundness:12, colors: { primary: '#3B82F6', background: 'white' } }}
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
                  left={<TextInput.Icon icon={() => <Icon name="badge" size={20} color="#3B82F6" />} />}
                  style={styles.paperInput}
                  outlineColor="#E2E8F0"
                  activeOutlineColor="#3B82F6"
                  theme={{roundness:12, colors: { primary: '#3B82F6', background: 'white' } }}
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
                <Icon name="save" size={20} color="#1C75BC" />
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
 
  dateContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 5,
   },
  dateInputWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  dateInput: {
    flex: 1,
  },
  keyboardAvoidStyle:{
    flex:1
  },
  viewStyle: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 5,
  },
  mainHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2E3A59',
    flex: 1,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  heroContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 15,
    marginBottom: 10,
  },
  headerIconWrapper: {
    borderRadius: 25,
   
  },
  headerAvatar: {
    backgroundColor: '#1C75BC',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1E293B',
    marginBottom: 8,
    textAlign: 'center',
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 22,
  },
  scrollContainer: {
    flex: 1,
  },
  sectionCard: {
    marginBottom: 20,
    marginHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  HeaderStyle: {
    fontWeight: '700',
    fontSize: 18,
    color: '#1E293B',
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  divider: {
    backgroundColor: '#E2E8F0',
    height: 2,
    marginBottom: 15,
    borderRadius: 1,
  },
  inputContainer: {
    marginBottom: 8,
    marginTop: 4,
    width: '100%',
  },
  paperInput: {
    backgroundColor: 'white',
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
    backgroundColor: '#E8F4FD',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  editButtonText: {
    color: '#1C75BC',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 2,
  },
  buttonContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  actionButton: {
    flexDirection: 'row',
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
    color: '#1C75BC',
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
    color: '#1C75BC',
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
    backgroundColor: '#1C75BC',
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
