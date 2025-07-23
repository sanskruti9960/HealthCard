import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList, 
   KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
const MedicationModal = () => {

  const navigation = useNavigation();
  // navigate to medication card
  const schedulepg = () => {
    navigation.navigate('Setschedulepg');
  };

  // State to manage modal visibility and medication name
  const [modalVisible, setModalVisible] = useState(false);
  const [medicationName, setMedicationName] = useState('');

  // State to manage type selection modal and selected types
  const [typeModalselectedTypes, setTypeModalselectedTypes] = useState(false);
  const [selectedType, setSelectedType] = useState([]);
  const [tempTypeSelection, setTempTypeSelection] = useState([]);
const [text, setText] = useState('Select type');
  const typeOptions = ['Tablet', 'Syrup', 'Capsule', 'Injection', 'Drops','Lotion', 'topical', 'Device','Foam','Ointment', 'Cream', 'Patch','softgel capsule',
    'pill','Gel','powder','spray','inhaler','Gummy','Insulin','suppository','other'
  ];

  // strenght of the medicine

  const [selectedStrength, setSelectedStrength] = useState('');
  const [modalVisiblestrength, setModalVisiblestrength] = useState(false);

  const isFormComplete = medicationName.trim() !== '' && selectedType !== '' && selectedStrength.trim() !== ''; // for checking if form is complete

  return (
    <View style={styles.container}>
      {/* medication open modal */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openButton}>
        <Text style={styles.openButtonText}>
          {medicationName ? medicationName : 'Enter Medication Name'}
        </Text>
      </TouchableOpacity>

      {/* medication  Modal */}
      <Modal
        transparent
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.label}>Medication name</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. Paracetamol"
              placeholderTextColor="#999"
              value={medicationName}
              onChangeText={setMedicationName}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  console.log('Saved:', medicationName);
                  setModalVisible(false);
                }}
                style={styles.saveButton}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* select type box */}

      <View style={{ marginTop: 5 , height: 62, width: '100%', justifyContent: 'center' }}>
        {/* Select Type Card */}
        <TouchableOpacity
          onPress={() => {
            setTempTypeSelection(selectedType); // prefill with previous selection
            setTypeModalselectedTypes(true);
          }}
          style={styles.openButton}
          
        >
         
              (<Text style={styles.openButtonText}>{text}</Text>)

          {selectedType ? (
            <View style={styles.pillContainer}>
              <View style={styles.pill}>
                <Text style={styles.pillText}>{selectedType}</Text>
              </View>
            </View>
          ) : null}
        </TouchableOpacity>



      </View>
      {/* Type Selection Modal */}

      <Modal
        visible={typeModalselectedTypes}
        transparent
        animationType="slide"
        onRequestClose={() => setTypeModalselectedTypes(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.label}>Select Type</Text>

            <FlatList
              data={typeOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isSelected = tempTypeSelection === item;
                return (
                  <TouchableOpacity
                    onPress={() => setTempTypeSelection(item)}
                    style={[
                      styles.itemButton,
                      isSelected && styles.itemSelected,
                      { flexDirection: 'row', alignItems: 'center' },
                    ]}
                  >
                    {/* Radio Button Circle */}
                    <View style={{ flexDirection:'row',flexWrap:'wrap',alignContent:"center",paddingVertical:6}}>
                    <View style={styles.radioWrapper}>
                      {isSelected && <View style={styles.radioDot} />} </View>

                    <Text style={styles.itemText}>
                      {item}
                    </Text>
                    </View>


                  </TouchableOpacity>
                );
              }}

            />

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => setTypeModalselectedTypes(false)} style={styles.cancelButton}>
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setSelectedType(tempTypeSelection);
                  setTypeModalselectedTypes(false);
                  setText("Type"); // Update the text state with selected type
                }}
                style={styles.saveButton}
              >
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

  {/* strenght of medicine */}

      <TouchableOpacity
        onPress={() => setModalVisiblestrength(true)}
        style={[
          styles.strengthBox,
          selectedStrength && styles.strengthBoxExpanded,
        ]}
      >
        <Text style={styles.labelstrength}>Strength</Text>
        <Text
          style={[
            styles.valueText,
            selectedStrength && styles.valueTextSelected,
          ]}
        >
          {selectedStrength || 'Set strength'}
        </Text>
      </TouchableOpacity>

      {/* Modal to choose strength */}
           <SetStrengthModal
        visible={modalVisiblestrength}
        onCancel={() => setModalVisiblestrength(false)}
        onSave={(val) => {
          setSelectedStrength(val);
          setModalVisiblestrength(false);
        }}
      />

      <Text style={{color:'#888', margin:10 }}>Look for this information on the medication label or packaging</Text>

   
<View style={{ flex: 1, justifyContent: 'flex-end' }}>
  <TouchableOpacity
    style={{
      backgroundColor: isFormComplete ? '#1c75bc' : '#b0cde4', // faded blue when disabled
      borderRadius: 20,
      padding: 10,
      margin: 20,
    }}
    disabled={!isFormComplete} // disable press when form is incomplete
    onPress={() => {
      if (isFormComplete) schedulepg();
      
    }}
  >
    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18, textAlign: 'center' }}>
      Next
    </Text>
  </TouchableOpacity>
</View>


    </View>
  );
};

export default MedicationModal;


const units = ['mg', 'mcg', 'g', 'mL', '%'];

const SetStrengthModal = ({ visible, onCancel, onSave }) => {
  const [strengthValue, setStrengthValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('mg');
  const [unitDropdownVisible, setUnitDropdownVisible] = useState(false);

  const handleSave = () => {
    if (strengthValue !== '') {
      onSave(`${strengthValue} ${selectedUnit}`);
      setStrengthValue('');
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onCancel}
    >
      <KeyboardAvoidingView
        style={styles.modalBackground}
        behavior={Platform.OS === 'android' ? 'padding' : undefined}
      >
        <View style={styles.modalstrenghtContainer}>
          <Text style={styles.label}>Set strength</Text>

          <View style={styles.inputRow}>
            <TextInput
              style={styles.inputstrenght}
              keyboardType="numeric"
              value={strengthValue}
              onChangeText={setStrengthValue}
              placeholder="Enter value"
              placeholderTextColor="#888"
            />
            <TouchableOpacity
              onPress={() => setUnitDropdownVisible(!unitDropdownVisible)}
              style={styles.unitButton}
            >
              <Text style={styles.unitText}>{selectedUnit}</Text>
            </TouchableOpacity>
          </View>

          {unitDropdownVisible && (
            <View style={styles.dropdown}>
              <FlatList
                data={units}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedUnit(item);
                      setUnitDropdownVisible(false);
                    }}
                    style={styles.dropdownItem}
                  >
                    <Text
                      style={[
                        styles.dropdownText,
                        item === selectedUnit && styles.selectedUnit,
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          <View style={styles.actions}>
            <TouchableOpacity onPress={onCancel}>
              <Text style={styles.cancelTextstrenght}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleSave}>
              <Text
                style={[
                  styles.saveTextstrenght,
                  strengthValue === '' && { color: '#888' },
                ]}
                disabled={strengthValue === ''}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // white mode
    padding: 15,
    marginTop: 20,
  },
  openButton: {
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 16,
    marginBottom: 20,
      elevation: 5,
  },
  openButtonText: {
    color: 'black',
    fontSize: 16,
    paddingLeft: 5,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 20,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
      maxHeight: '80%',
      
  },
  label: {
    color: '#333',
    marginBottom: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f2f2f2',
    color: '#000',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  cancelButton: {
    padding: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  cancelText: {
    color: '#888',
    fontSize: 16,
  },
  saveButton: {
   
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveText: {
    color: '#1c75bc', // blue accent
    fontSize: 16,
    fontWeight: 'bold',
  },
  pillContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pill: {
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
  },
  pillText: {
    color: '#1c75bc',
    fontSize: 14,
    fontWeight: '500',
    marginLeft:-5
  },
  radioWrapper: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#1c75bc', // blue accent
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 20,

  },

  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 5,
    backgroundColor: '#1c75bc', 
    padding: 2, // blue accent
  },
  itemText :{
    fontSize: 16,
    marginLeft: 10,
    
  },

  //  strengthBox
    strengthBox: {
    backgroundColor: '#f2f2f2',
    borderRadius: 14,
    padding: 14,
    marginTop: 5,
        elevation: 5,
  },
  strengthBoxExpanded: {
    paddingVertical: 18,
  },
  labelstrength: {
    color: 'black',
     fontSize: 16,
    paddingLeft: 5,
    marginBottom: 4,
  },
  valueText: {
    color: '#888',
    fontSize: 16,
    paddingLeft: 5,
  },
  valueTextSelected: {
    color: '#1c75bc', // green when selected
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
  },
  modalstrenghtContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 16,
    maxHeight: '80%',
    width: '90%',
    marginHorizontal: '5%',
    marginBottom: 20,
    elevation: 5,
  },
   inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 5,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#f2f2f2',
  },
  inputstrenght: {
    flex: 1,
    color: '#1c75bc', // blue accent
    fontSize: 16,
    paddingVertical: 10,
  },
  unitButton: {
    paddingHorizontal: 12,
    justifyContent: 'center',
  },
  unitText: {
    color: 'black',
    fontSize: 16,
  },
  dropdown: {
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    marginTop: 8,
     elevation: 5,
    borderRadius: 10,
    maxHeight: 160,
  },
  dropdownItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  dropdownText: {
    color: 'black',
    fontSize: 16,
  },
  selectedUnit: {
    color: '#1c75bc', // blue accent
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  cancelTextstrenght: {
    color: '#aaa',
    fontSize: 16,
  },
  saveTextstrenght: {
    color: '#1c75bc', // blue accent
    fontSize: 16,
    fontWeight: 'bold',
  },
});

