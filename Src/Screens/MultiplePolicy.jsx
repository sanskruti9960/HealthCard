import { StyleSheet, 
  Text, 
  TouchableOpacity, 
  View, FlatList,
  ScrollView,
  SafeAreaView,
  ImageBackground,
  StatusBar,
  Modal,
  Alert,
  RefreshControl, } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Button, Card, FAB } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const MultiplePolicy = () => {
  const navigation=useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  
  const [policies, setPolicies] = useState([])
  
  
  // ✅ Define the function first
  const loadPolicies = async () => {
    try {
      const savedPolicies = await AsyncStorage.getItem('insurancePolicies');
      if (savedPolicies !== null) {
        setPolicies(JSON.parse(savedPolicies));
      }
    } catch (error) {
      console.log('Error loading policies:', error);
    }
  };
  
  const onRefresh = async () => {
    setRefreshing(true);
    await loadPolicies();
    setRefreshing(false);
  };

  useEffect(() => {
    loadPolicies();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadPolicies();
    });

    return unsubscribe;
  }, [navigation]);

  const handleAddPolicy = () => {
    navigation.navigate('InsuranceSrc1');
  };

  const handleViewPolicy = (policy) => {
    navigation.navigate('InsurancePreview', { 
      formState: policy.formState,
      policyId: policy.id,
      skipSave: true 
    });
  };

  const handleLongPress = (policy) => {
    setSelectedPolicy(policy);
    setModalVisible(true);
  };

  const handleDeletePolicy = async () => {
    if (selectedPolicy) {
      const updatedPolicies = policies.filter(policy => policy.id !== selectedPolicy.id);
      setPolicies(updatedPolicies);
      
      try {
        await AsyncStorage.setItem('insurancePolicies', JSON.stringify(updatedPolicies));
      } catch (error) {
        console.log('Error saving policies:', error);
      }
      
      setModalVisible(false);
      setSelectedPolicy(null);
    }
  };

  return (
    <SafeAreaView style={styles.viewStyle1}>
      <StatusBar backgroundColor="#0A66C2" barStyle="light-content" />
      <LinearGradient colors={['#0A66C2', '#0A4D92']} style={styles.headerGradient}>
          <View style={styles.headerContainer}>
            <TouchableOpacity style={styles.btnStyle} onPress={() => navigation.navigate("HomeScreen")}>
              <Icon name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <Text style={styles.header}>My Insurance Policies</Text>
          </View>
      </LinearGradient>
      <ImageBackground 
        source={{uri: 'https://img.freepik.com/free-vector/abstract-blue-geometric-shapes-background_1035-17545.jpg'}} 
        style={styles.backgroundImage}
        imageStyle={{opacity: 0.15}}
      >


        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>{policies.length}</Text>
            <Text style={styles.statLabel}>Total Policies</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>Active</Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>

        <Card style={styles.card2}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Your Policies</Text>
            <FlatList
              data={policies}
              renderItem={({ item }) => (
                <Card 
                  style={styles.container} 
                  onPress={() => handleViewPolicy(item)}
                  onLongPress={() => handleLongPress(item)}
                >
                  <Card.Content style={styles.policyCard}>
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons 
                        name={item.insuranceType.toLowerCase().includes('health') ? 'medical-bag' : 'shield-account'} 
                        size={30} 
                        color="#0A66C2" 
                      />
                    </View>
                    <View style={styles.policyDetails}>
                      <Text style={styles.policyName}>{item.name}</Text>
                      <Text style={styles.policyType}>{item.insuranceType}</Text>
                      <Text style={styles.policyNumber}>Policy #: {item.policyNumber}</Text>
                    </View>
                    <Icon name="chevron-right" size={24} color="#0A66C2" />
                  </Card.Content>
                </Card>
              )}
              keyExtractor={(item) => item.id.toString()}
              contentContainerStyle={{ paddingBottom: 20 }}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#0A66C2']}
                  tintColor="#0A66C2"
                />
              }
            />
          </Card.Content>
        </Card>
      </ImageBackground>

      <FAB style={styles.fab} icon="plus" color='white' onPress={handleAddPolicy} />
      
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Delete Policy</Text>
            <Text style={styles.modalText}>Are you sure you want to delete this policy?</Text>
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.deleteButton]} 
                onPress={handleDeletePolicy}
              >
                <Icon name="delete" size={18} color="#FFF" />
                <Text style={styles.buttonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default MultiplePolicy;

const styles = StyleSheet.create({
  viewStyle1: {
    flex: 1,
    backgroundColor: 'white',
  },
  backgroundImage: {
    flex: 1,
    padding: 10,
  },
  headerGradient: {
    paddingTop: 10,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    elevation: 4,
    marginBottom: 15,
    width: '100%',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 15,
  },
  btnStyle: {
    padding: 8,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: '500',
    padding: 5,
    color: 'white',
    textAlign: 'left',
  },
  container: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderLeftWidth: 4,
    borderLeftColor: '#0A66C2',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#0A66C2',
    elevation: 8,
  },
  card2: {
    borderRadius: 15,
    padding: 0,
    width: '100%',
    backgroundColor: 'white',
    elevation: 4,
    flex: 1,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 15,
    width: '48%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0A66C2',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  policyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
  },
  iconContainer: {
    backgroundColor: '#e6f0fa',
    padding: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  policyDetails: {
    flex: 1,
  },
  policyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  policyType: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  policyNumber: {
    fontSize: 12,
    color: '#888',
    marginTop: 2,
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
    padding: 20,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    minWidth: 100,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#a39a9aff',
  },
  deleteButton: {
    backgroundColor: '#ff3b30',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginLeft: 5,
  },
});