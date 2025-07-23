import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Dimensions,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
   Modal,
   Pressable,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import RemainderSetupScreen from './ReminderSetupScreen';

export default function SetScheduleScreen() {
  const [selectedOption, setSelectedOption] = useState('');
  const [customDays, setCustomDays] = useState("X");
  const [selectedWeekDays, setSelectedWeekDays] = useState([1]);

  const ITEM_HEIGHT = 50;
  const numbers = Array.from({ length: 29 }, (_, i) => i + 2); // 2 to 30
  const weekDays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const weekDayLabels = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];


  const frequencyOptions = [
    'Every day',
    `Every ${customDays} days`,
    'Every week',
  ];

  const handleScroll = (event) => {
    const offsetY = event.nativeEvent.contentOffset.y;
    const index = Math.round(offsetY / ITEM_HEIGHT);
    setCustomDays(numbers[index]);
  };
  //  for week days selection
  const handleWeekDayPress = (index) => {
    if (selectedWeekDays.includes(index)) {
      setSelectedWeekDays(selectedWeekDays.filter(i => i !== index));
    } else {
      if (selectedWeekDays.length >= 6) {
        Alert.alert('Limit Reached', 'You can only select up to 6 days.');
        return;
      }
      setSelectedWeekDays([...selectedWeekDays, index]);
    }
  };

  const renderRadio = (label, index) => (
    <TouchableOpacity
      key={label}
      style={styles.radioContainer}
onPress={() => {
  const normalizedLabel = label.includes('days') ? 'Every X days' : label;
  setSelectedOption(normalizedLabel);

  // Reset customDays if 'Every X days' is unselected
  if (normalizedLabel !== 'Every X days') {
    setCustomDays('X');
  }

  // Reset week selection if 'Every week' is unselected
  if (normalizedLabel !== 'Every week') {
    setSelectedWeekDays([1]); // default to Monday
  }
}}
 >
      <View style={[
        styles.radioCircle,
        selectedOption === (label.includes('days') ? 'Every X days' : label) && styles.radioCircleSelected
      ]}>
        {selectedOption === (label.includes('days') ? 'Every X days' : label) && <View style={styles.selectedRb} />}
      </View>
      <Text style={[
        styles.radioText,
        selectedOption === (label.includes('days') ? 'Every X days' : label) && styles.radioTextSelected
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

//  it is of set time and dose 
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [timeInputs, setTimeInputs] = useState([]);
const [tabletCounts, setTabletCounts] = useState([]);
const [showTimePickerIndex, setShowTimePickerIndex] = useState(null);
const [customDoseCount, setCustomDoseCount] = useState(5); // default for custom
const [isDoseConfigured, setIsDoseConfigured] = useState(false);

  // Sample options — you’ll replace with your own later
  const options = ['Once', 'Twice', '3 times', '4th time', 'Custom'];

 const toggleOption = (option) => {
  if (selectedOptions.includes(option)) {
    setSelectedOptions([]); // deselect if already selected
  } else {
    setSelectedOptions([option]); // allow only one selection
  }
};

const handleSubmit = () => {
  let count = 1;

  if (selectedOptions.includes('Once')) {
    count = 1;
  } else if (selectedOptions.includes('Twice')) {
    count = 2;
  } else if (selectedOptions.includes('3 times')) {
    count = 3;
  } else if (selectedOptions.includes('4th time')) {
    count = 4;
  } else if (selectedOptions.includes('Custom')) {
    count = customDoseCount;
  }

  // Generate default times (can be adjusted later by user)
  const newTimes = Array(count).fill('8:00 AM');
  const newTablets = Array(count).fill(1);
  setTimeInputs(newTimes);
  setTabletCounts(newTablets);
  setModalVisible(false);
  setIsDoseConfigured(true);
};


const onChangeTime = (event, selectedDate, index) => {
  setShowTimePickerIndex(null);
  if (selectedDate) {
    const hours = selectedDate.getHours();
    const minutes = selectedDate.getMinutes();
    const formattedTime = `${hours % 12 || 12}:${minutes.toString().padStart(2, '0')} ${hours >= 12 ? 'PM' : 'AM'}`;

    const newTimes = [...timeInputs];
    newTimes[index] = formattedTime;
    setTimeInputs(newTimes);
  }
};

const increaseTablet = (index) => {
  const newCounts = [...tabletCounts];
  newCounts[index]++;
  setTabletCounts(newCounts);
};

const decreaseTablet = (index) => {
  const newCounts = [...tabletCounts];
  if (newCounts[index] > 1) {
    newCounts[index]--;
    setTabletCounts(newCounts);
  }
};

  return (
    <View style={styles.container}>
        <KeyboardAvoidingView
    style={{ flex: 1 }}
    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
  >
    <ScrollView
      contentContainerStyle={{ paddingBottom: 40 }}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
    >
    
      <Text style={styles.subtitle}>How often do you take Paraa?</Text>
<View style={styles.card}>  
      {frequencyOptions.map(renderRadio)}
</View>
      {selectedOption === 'Every X days' && (
        <View style={styles.pickerWrapper}>
          <Text style={styles.pickerLabel}>Select interval in days:</Text>
          <FlatList
            data={numbers}
            keyExtractor={(item) => item.toString()}
             nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
            snapToInterval={ITEM_HEIGHT}
            decelerationRate="fast"
            onScroll={handleScroll}
            scrollEventThrottle={16}
            contentContainerStyle={{
              paddingVertical: (ITEM_HEIGHT * 3 - ITEM_HEIGHT) / 2,
            }}
            getItemLayout={(data, index) => ({
              length: ITEM_HEIGHT,
              offset: ITEM_HEIGHT * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={[styles.dayOption, { height: ITEM_HEIGHT }]}>
                <Text
                  style={[
                    styles.dayOptionText,
                    customDays === item && styles.dayOptionTextSelected,
                  ]}
                >
                  {item}
                </Text>
              </View>
            )}
          />
        </View>
      )}

      {selectedOption === 'Every week' && (
        <View style={styles.weeklyWrapper}>
          <Text style={{ fontSize: 14, color: '#1c75bc', marginTop: 4, marginLeft: 10 }}>
            Selected: {selectedWeekDays.map(i => weekDayLabels[i]).join(', ')}
          </Text>
           <View style={styles.weekRow}>
            {weekDays.map((day, index) => {
              const isSelected = selectedWeekDays.includes(index);
              return (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.weekDay,
                    isSelected && styles.weekDaySelected,
                  ]}
                  onPress={() => handleWeekDayPress(index)}
                >
                  <Text
                    style={[
                      styles.weekDayText,
                      isSelected && styles.weekDayTextSelected,
                      day === 'S' && (index === 0 || index === 5) && styles.redSundayText,
                    ]}
                  >
                    {day}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      )}
 
   {/* it is of set time and dose */}
   <Text style={{color:"grey", margin:5,fontWeight:"bold"}}>Set time and dosage</Text>
<View style={styles.card}>
      {!isDoseConfigured ? (
  <>
   <Text style={styles.description}>
        Set this medication's dosage and get reminders to take it at specific times.
      </Text>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Set time and dosage</Text>
      </TouchableOpacity> 
  </>
) : null}


      {/* Modal for multiple choice */}
      <Modal
  visible={modalVisible}
  animationType="slide"
  transparent={true}
  onRequestClose={() => setModalVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>How many times a day?</Text>
      <ScrollView>
        {options.map((option, index) => (
          <Pressable
            key={index}
            style={[
              styles.option,
              selectedOptions.includes(option) && styles.optionSelected,
            ]}
            onPress={() => toggleOption(option)}
          >
            <Text style={styles.optionText}>{option}</Text>
          </Pressable>
        ))}
        {selectedOptions.includes('Custom') && (
  <View style={{ marginTop: 10 }}>
    <Text style={{ fontSize: 16, marginBottom: 6 }}>How many times a day?</Text>
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {[...Array(10)].map((_, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => setCustomDoseCount(i + 1)}
          style={{
            padding: 10,
            backgroundColor: customDoseCount === i + 1 ? '#1c75bc' : '#ddd',
            marginRight: 10,
            borderRadius: 20,
          }}
        >
          <Text style={{ color: customDoseCount === i + 1 ? '#fff' : '#000' }}>
            {i + 1}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  </View>
)}

      </ScrollView>

      {/* Button Row */}
      <View style={styles.modalButtonRow}>
        <TouchableOpacity
          style={[styles.cancelButton]}
          onPress={() => setModalVisible(false)}
        >
          <Text style={styles.cancelButtonText}>Cancel</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.saveButton]}
          onPress={handleSubmit} // you'll define this function
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

{isDoseConfigured && selectedOptions.length > 0 && timeInputs.length > 0 && (
  <View style={{ marginTop: 20 }}>
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <Text style={styles.modalTitle}>{selectedOptions.join(', ')}</Text>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Text style={{ color: '#1c75bc', fontWeight: 'bold' }}>Edit</Text>
      </TouchableOpacity>
    </View>

{timeInputs.map((time, index) => (
  <View key={index} style={styles.timeRow}>
    
    {/* User can tap on this to edit the time */}
    <TouchableOpacity onPress={() => setShowTimePickerIndex(index)}>
      <Text style={styles.timeText}>Time {index + 1}: {time}</Text>
    </TouchableOpacity>

    {/* Time picker appears when that index is active */}
    {showTimePickerIndex === index && (
      <DateTimePicker
        mode="time"
        value={new Date()}
        display={Platform.OS === 'ios' ? 'spinner' : 'default'}
        onChange={(event, selectedDate) => onChangeTime(event, selectedDate, index)}
      />
    )}

    <View style={styles.tabletControl}>
      <TouchableOpacity onPress={() => decreaseTablet(index)} style={styles.tabletButton}>
        <Text style={styles.tabletBtnText}>-</Text>
      </TouchableOpacity>

      <Text style={styles.tabletCount}>{tabletCounts[index]}</Text>

      <TouchableOpacity onPress={() => increaseTablet(index)} style={styles.tabletButton}>
        <Text style={styles.tabletBtnText}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
))}

</View>
)}
    </View>

       {/* remainder of the screen  */}

      <RemainderSetupScreen  />
 </ScrollView>
  </KeyboardAvoidingView>
      <TouchableOpacity style={styles.nextButton}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
}

const ITEM_HEIGHT = 50;

const styles = StyleSheet.create({

  container:
  { flex: 1, padding: 20, backgroundColor: '#fff' },

  subtitle:
  { fontSize: 18, marginBottom: 20, fontWeight: '600', color: '#222' },

  radioContainer:
  { flexDirection: 'row', alignItems: 'center', marginBottom: 15, paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8 },

  radioCircle:
  { height: 22, width: 22, borderRadius: 11, borderWidth: 2, borderColor: '#ccc', alignItems: 'center', justifyContent: 'center' },

  radioCircleSelected:
  { borderColor: '#1c75bc' },

  selectedRb:
  { width: 12, height: 12, borderRadius: 6, backgroundColor: '#1c75bc' },

  radioText:
  { marginLeft: 12, fontSize: 16, color: '#555' },

  radioTextSelected:
  { color: '#1c75bc', fontWeight: 'bold' },

  pickerWrapper:
  { backgroundColor: '#f4f6fa', marginVertical: 15, borderRadius: 12, height: ITEM_HEIGHT * 4, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3 },

  pickerLabel:
  { fontSize: 16, fontWeight: '500', marginTop: 10, marginLeft: 10, color: '#333' },

  dayOption:
  { justifyContent: 'center', alignItems: 'center' },

  dayOptionText:
  { fontSize: 20, color: 'rgba(28, 117, 188, 0.3)' },

  dayOptionTextSelected:
  { fontSize: 24, fontWeight: 'bold', color: '#1c75bc' },

  weeklyWrapper:
  { marginVertical: 20, backgroundColor: '#f4f6fa', borderRadius: 12, padding: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 3 },

  weekRow:
  { flexDirection: 'row', justifyContent: 'space-around', marginTop: 12 },

  weekDay:
  { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },

  weekDaySelected:
  { borderWidth: 2, borderColor: '#1c75bc' },

  weekDayText:
  { fontSize: 16, fontWeight: '600', color: '#000' },

  weekDayTextSelected:
  { color: '#1c75bc', fontWeight: 'bold' },

  redSundayText:
  { color: 'red' },

  infoBox:
  { backgroundColor: '#eef7ee', padding: 15, borderRadius: 10, marginBottom: 20 },

  infoText:
  { color: '#333', fontSize: 14, textAlign: 'center' },

  nextButton:
  { backgroundColor: '#1c75bc', paddingVertical: 14, borderRadius: 25, alignItems: 'center', marginTop: 10, width: '85%', alignSelf: 'center' },

  nextButtonText:
  { color: '#fff', fontSize: 16, fontWeight: 'bold' },

  card:
  { backgroundColor: 'white', borderRadius: 16, padding: 16, marginBottom: 20, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 3, width: '100%', alignSelf: 'center' },

  description:
  { fontSize: 16, color: '#333', marginBottom: 16, textAlign: 'center' },

  button:
  { backgroundColor: '#1c75bc', paddingVertical: 12, borderRadius: 50, alignItems: 'center', width: '70%', alignSelf: 'center' },

  buttonText:
  { color: 'white', fontWeight: '600', fontSize: 16 },

  modalOverlay:
  { flex: 1, backgroundColor: '#00000088', justifyContent: 'center', paddingHorizontal: 20 },

  modalContainer:
  { backgroundColor: 'white', borderRadius: 16, padding: 20, maxHeight: '80%' },

  modalTitle:
  { fontSize: 18, fontWeight: '600', marginBottom: 12, textAlign: 'center', color: '#222' },

  option:
  { paddingVertical: 12, paddingHorizontal: 16, borderRadius: 8, marginBottom: 8, backgroundColor: '#f0f0f0' },

  optionSelected:
  { backgroundColor: '#b3d3ee' },

  optionText:
  { color: '#000', fontSize: 16 },

  modalButtonRow:
  { flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 },

  cancelButton:
  { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 25, flex: 1, marginRight: 10 },

  saveButton:
  { paddingVertical: 10, paddingHorizontal: 20, borderRadius: 25, flex: 1, marginLeft: 10 },

  cancelButtonText:
  { color: '#888', fontSize: 18, textAlign: 'center', fontWeight: '600' },

  saveButtonText:
  { color: '#1c75bc', fontSize: 18, textAlign: 'center', fontWeight: '600' },

  timeRow:
  { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#eee' },

  timeText:
  { fontSize: 16, color: '#333' },

  tabletControl:
  { flexDirection: 'row', alignItems: 'center' },

  tabletButton:
  { borderRadius: 16, padding: 6, marginHorizontal: 4 },

  tabletBtnText:
  { color: '#1c75bc', fontSize: 16, fontWeight: 'bold' },

  tabletCount:
  { fontSize: 16, color: '#333' },

});
