import { StyleSheet, Text, View ,FlatList} from 'react-native'
import React from 'react'

const Econtact = () => {
    const emergencyContacts = [
  { id: '1', name: 'Ramesh Sharma', relation: 'Father', phone: '+91 9876543210' },
  { id: '2', name: 'Sita Sharma', relation: 'Mother', phone: '+91 9876543211' },
  { id: '3', name: 'Family Doctor', relation: 'Doctor', phone: '+91 9876543222' },
];
  return (
    <View>
     <FlatList
      data={emergencyContacts}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => (
    <View>
      <Text style={Style.cardTitle}>{item.relation}</Text>
      <Text style={Style.cardValue}>Name: {item.name}</Text>
      <Text style={Style.cardValue}>Phone: {item.phone}</Text>
    </View>
  )}
     
     />
    </View>
  )
}

export default Econtact;

const Style = StyleSheet.create({

cardTitle: {
  fontSize: 16,
  fontWeight: 'bold',
  marginBottom: 2,
  color: '#b30000',
},
cardValue:{
  
  color: '#333', 
}

})