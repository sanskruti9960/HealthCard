import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, StatusBar, RefreshControl } from 'react-native';
import { Card, Avatar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InsurancePreview = ({ navigation, route }) => {
  const { formState } = route.params; // Get the passed form data
  const [refreshing, setRefreshing] = useState(false);
  
  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };
  
  // Only save if not coming from a save operation
  useEffect(() => {
    if (!route.params?.skipSave) {
      const savePolicy = async () => {
        try {
          const existingPoliciesJSON = await AsyncStorage.getItem('insurancePolicies');
          let policies = existingPoliciesJSON ? JSON.parse(existingPoliciesJSON) : [];
          
          const policyObject = {
            id: route.params?.policyId || Date.now(),
            name: formState.policyHolderName || 'Policy Holder',
            policyNumber: formState.policyNumber || 'Unknown',
            insuranceType: formState.policyType || 'Insurance Policy',
            formState: formState
          };
          
          const existingIndex = policies.findIndex(p => p.id === policyObject.id);
          if (existingIndex >= 0) {
            policies[existingIndex] = policyObject;
          } else {
            policies.push(policyObject);
          }
          
          await AsyncStorage.setItem('insurancePolicies', JSON.stringify(policies));
        } catch (error) {
          console.log('Error saving policy:', error);
        }
      };
      
      savePolicy();
    }
  }, [formState, route.params?.skipSave, route.params?.policyId]);

  const handleBack = () => {
    navigation.navigate('MultiplePolicy');
  };
  return (
    <View style={styles.viewStyle}>
      <StatusBar backgroundColor="#0A66C2" barStyle="light-content" />
      <LinearGradient colors={['#0A66C2', '#0A4D92']} style={styles.headerGradient}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.btnStyle} onPress={handleBack}>
            <Icon name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.header}>Insurance Details</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => {
              navigation.navigate('InsuranceSrc1', {
                formState,
                fromPreview: true,
                policyId: route.params?.policyId,
                isEditable: true,
              });
            }}
          >
            <Icon name="edit" size={20} color="#FFF" />
            <Text style={styles.editButtonText}>Edit</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#0A66C2']}
            tintColor="#0A66C2"
          />
        }
      >
        <View style={styles.avatarContainer}>
          <Avatar.Icon 
            size={80} 
            icon="shield" 
            color="#FFF"
            style={styles.avatar}
          />
          <Text style={styles.cardTitle}>Health Insurance Card</Text>
          <Text style={styles.cardSubtitle}>Policy Details</Text>
        </View>

        <Card style={styles.cardStyle} elevation={4}>
          <Card.Content>
            <View style={styles.container}>
              {getOrderedFields(formState).map(([key, value], index) => (
                <View key={key} style={[styles.dataRow, index % 2 === 0 ? styles.evenRow : null]}>
                  <Text style={styles.label}>{formatKey(key)}</Text>
                  <Text style={styles.value}>{value}</Text>
                </View>
              ))}
            </View>
          </Card.Content>
        </Card>
        <View style={styles.buttonContainer}>
          
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('InsuranceSrc1', { isNewPolicy: true })}
          >
           
              <Icon name="add" size={20} color="#0A66C2" />
              <Text style={styles.buttonText}>New Insurance</Text>
            
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => navigation.navigate('MultiplePolicy')}
          >
            
              <Icon name="list" size={20} color="#0A66C2" />
              <Text style={styles.buttonText}>All Policies</Text>
           
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// 🔤 Convert camelCase to readable labels
const formatKey = (key) => {
  return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
};

// 📋 Get fields in specific order with Policy Holder Name before Policy Number
const getOrderedFields = (formState) => {
  const fieldOrder = [
    'companyName',
    'serviceNumber', 
    'emailOfCompany',
    'policyHolderName',  // This will appear before policyNumber
    'policyNumber',
    'policyType',
    'sumInsured',
    'policyStartDate',
    'policyEndDate',
    'nomineeName',
    'nomineeRelation',
    'nomineePhn',
    'claimAmount',
    'claimLink',
    'claimHelpPhn',
    'adharcardNo',
    'pancardNo'
  ];
  
  return fieldOrder
    .filter(key => formState[key] && formState[key].toString().trim() !== '')
    .map(key => [key, formState[key]]);
};

export default InsurancePreview;

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerGradient: {
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    flex: 1,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  avatar: {
    backgroundColor: '#0A66C2',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  container: {
    padding: 10,
  },
  cardStyle: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    marginHorizontal: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },
  dataRow: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  evenRow: {
    backgroundColor: '#F8FAFF',
  },
  label: {
    fontWeight: '600',
    fontSize: 15,
    color: '#444',
    flex: 1,
  },
  value: {
    fontSize: 15,
    color: '#0A66C2',
    fontWeight: '500',
    flex: 1,
    textAlign: 'right',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  editButtonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  btnStyle: {
    padding: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf:'center',
    alignItems:'center'
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
  },
  buttonText: {
    color: '#0A66C2',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 8,
  },
});