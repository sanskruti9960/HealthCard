import { StyleSheet, Text, View, TouchableOpacity, ScrollView, RefreshControl} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { Button, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FirestoreService from '../Services/FirestoreService';

const MedicalReportPreview = ({ navigation }) => {
 const [userId, setUserId] = useState(null);
 const [medicalInfo, setMedicalInfo] = useState({});
 const [refreshing, setRefreshing] = useState(false);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 const onRefresh = async ()=>{
  setRefreshing(true);
  await fetchMedicalData();

  setTimeout(()=>{
    setRefreshing(false);
  }, 1000);}
 

  useEffect(() => {
    initializeUser();
  }, []);

  const initializeUser = async () => {
    try {
      const id = await FirestoreService.getUserId();
      setUserId(id);
      fetchMedicalData(id);
    } catch (error) {
      console.log('Error initializing user:', error);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchMedicalData();
    });
    
    return () => {
      unsubscribe();
    };
  }, [navigation]);
    
const fetchMedicalData = async(userIdParam = userId)=>{
   if (!userIdParam) return;
   try {
      setLoading(true);
      setError(null);
      
      // Try to fetch from Firestore first
      const userData = await FirestoreService.getUserDataByType(userIdParam, 'medicalInfo');
      if (userData) {
        const { id, userId: uid, dataType, createdAt, updatedAt, ...medicalData } = userData;
        setMedicalInfo(medicalData);
        console.log('Loaded medical data from Firestore for report');
      } else {
        // Fallback to AsyncStorage
        const savedData = await AsyncStorage.getItem('medicalInfo');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          if (parsedData && typeof parsedData === 'object') {
            setMedicalInfo(parsedData);
            console.log('Loaded medical data from AsyncStorage for report');
          } else {
            setMedicalInfo({});
          }
        } else {
          setMedicalInfo({});
        }
      }
    } catch (error) {
      console.log('Error loading medical info:', error);
      setError('Failed to load medical data');
      // Try AsyncStorage as final fallback
      try {
        const savedData = await AsyncStorage.getItem('medicalInfo');
        if (savedData) {
          const parsedData = JSON.parse(savedData);
          setMedicalInfo(parsedData);
        } else {
          setMedicalInfo({});
        }
      } catch (fallbackError) {
        console.log('Final fallback also failed:', fallbackError);
        setMedicalInfo({});
      }
    } finally {
      setLoading(false);
    }
}

  const handleBack = () => {
    navigation.navigate('HomeScreen'); // Replace with actual home screen name
  };

  const getMedicalFields = (medicalInfo) => {
    return [
      ['Medical Conditions', medicalInfo.medicalConditions],
      ['Allergies', medicalInfo.allergies],
      ['Past Surgeries', medicalInfo.pastSurgery],
      ['Chronic Illnesses', medicalInfo.chronicIllnesses],
      ['Family Medical History', medicalInfo.familyMedicalHistory],
    
    ];
  };

  return (
    <View style={styles.viewStyle}>
      <LinearGradient colors={['#0A66C2', '#0A4D92']} style={styles.headerGradient}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.btnStyle} onPress={handleBack}>
            <Icon name="arrow-back" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.header}>Medical Report</Text>
          <View style={styles.btnStyle} />
        </View>
      </LinearGradient>

      <ScrollView
       showsVerticalScrollIndicator={false}
       decelerationRate={'fast'}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                  colors={['#0A66C2']}
                  tintColor="#0A66C2"
                />}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Icon name="medical-services" size={40} color="#FFF" />
          </View>
          <Text style={styles.cardTitle}>Medical Report Card</Text>
          <Text style={styles.cardSubtitle}>Report Details</Text>
        </View>

        <Card style={styles.cardStyle} elevation={4}>
          <Card.Content>
            <View style={styles.container}>
              {loading ? (
                <View style={styles.loadingContainer}>
                  <Text style={styles.loadingText}>Loading medical data...</Text>
                </View>
              ) : error ? (
                <View style={styles.errorContainer}>
                  <Icon name="error" size={24} color="#ff3b30" />
                  <Text style={styles.errorText}>{error}</Text>
                  <TouchableOpacity onPress={fetchMedicalData} style={styles.retryButton}>
                    <Text style={styles.retryText}>Retry</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                getMedicalFields(medicalInfo).map(([label, value], index) => (
                  <View key={label} style={[styles.dataRow, index % 2 === 0 ? styles.evenRow : null]}>
                    <Text style={styles.label}>{label}</Text>
                    <Text style={[styles.value, !value || value === 'N/A' ? styles.noDataText : null]}>
                      {value || 'no data'}
                    </Text>
                  </View>
                ))
              )}
            </View>
          </Card.Content>
        </Card>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.editButton}
            onPress={() => {
              navigation.navigate('MedicalInfo');
            }}
          >
            <Icon name="edit" size={20} color="#0A66C2" />
            <Text style={styles.editButtonText}>Edit Medical Info</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('MultiplePolicy')} style={styles.actionButton}>
            <Text>next</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default MedicalReportPreview;

const styles = StyleSheet.create({
   viewStyle: {
    flex: 1,
    backgroundColor: 'white',
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
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    alignSelf: 'center',
  },
  cardSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    alignSelf: 'center',
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
  noDataText: {
    color: '#ff3b30',
    fontStyle: 'italic',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
  },
  editButtonText: {
    color: '#0A66C2',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  btnStyle: {
    padding: 8,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginVertical: 20,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  loadingContainer: {
    padding: 20,
    alignItems: 'center',
  },
  loadingText: {
    color: '#666',
    fontSize: 16,
    fontStyle: 'italic',
  },
  errorContainer: {
    padding: 20,
    alignItems: 'center',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  retryButton: {
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#0A66C2',
    borderRadius: 6,
  },
  retryText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0A66C2',
    padding: 12,
    borderRadius: 10,
    justifyContent: 'center',
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
