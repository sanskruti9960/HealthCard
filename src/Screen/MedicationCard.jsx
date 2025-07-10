import React, { useState } from 'react';
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList
} from 'react-native';

const MedicationModal = () => {
  // State to manage modal visibility and medication name
  const [modalVisible, setModalVisible] = useState(false);
  const [medicationName, setMedicationName] = useState('');

  // State to manage type selection modal and selected types
  const [typeModalselectedTypes, setTypeModalselectedTypes] = useState(false);
  const [selectedType, setSelectedType] = useState([]);
  const [tempTypeSelection, setTempTypeSelection] = useState([]);

  const typeOptions = ['Tablet', 'Syrup', 'Capsule', 'Injection', 'Drops','Lotion', 'topical', 'Device','Foam','Ointment', 'Cream', 'Patch','softgel capsule',
    'pill','Gel','powder','spray','inhaler','Gummy','Insulin','suppository','other'
  ];
const [text, setText] = useState('Select type');
  return (
    <View style={styles.container}>
      {/* Button to open modal */}
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.openButton}>
        <Text style={styles.openButtonText}>
          {medicationName ? medicationName : 'Enter Medication Name'}
        </Text>
      </TouchableOpacity>

      {/* Modal */}
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

    </View>
  );
};

export default MedicationModal;

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
    borderRadius: 20,
    marginBottom: 20,
  },
  openButtonText: {
    color: 'black',
    fontSize: 16,
    paddingLeft: 10,
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
    backgroundColor: '#007AFF',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  saveText: {
    color: '#fff',
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
    color: 'blue',
    fontSize: 14,
    fontWeight: '500',
  },
  radioWrapper: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginBottom: 20,

  },

  radioDot: {
    width: 12,
    height: 12,
    borderRadius: 5,
    backgroundColor: 'black',
  },
  itemText :{
    fontSize: 16,
  },
  


});
