import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import GoogleFit, { Scopes } from 'react-native-google-fit';
import { initGoogleFit } from '../Screen/Utilfit';

const Dashboard = () => {
  const [weekData, setWeekData] = useState([]);
  const [selectedDay, setSelectedDay] = useState(null);

useEffect(() => {
  const initialize = async () => {
    try {
      await initGoogleFit(); // only runs once & no popup if already authorized
      fetchStepsData();
    } catch (err) {
      console.error('Init failed:', err.message);
    }
  };

  initialize();
}, []);

  const renderBars = (type, title) => {
    const maxBarHeight = 100;
    const maxValue = Math.max(...weekData.map(item => item[type]));

    const colorMap = {
      steps: { selected: '#4A90E2', default: '#D0E3FA' },     // Blue
      min: { selected: '#8B5CF6', default: '#E5D8FA' },       // Violet
      kcal: { selected: '#FBBF24', default: '#FEF3C7' },      // Yellow
    };

    return (

      <View style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: '700', marginBottom: 8 }}>{title}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', height: maxBarHeight + 30 }}>
          {weekData.map((item, index) => {
            const value = item[type];
            const isSelected = selectedDay === item.day;
            const barHeight = (value / maxValue) * maxBarHeight;

            const label =
              type === 'steps' ? `${item.steps} steps` :
                type === 'min' ? `${item.min} min` :
                  `${item.kcal} kcal`;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => setSelectedDay(item.day)}
                style={{ alignItems: 'center', marginHorizontal: 4 }}
              >
                {isSelected && (
                  <Text style={{ fontSize: 12, fontWeight: '600', color: '#000', marginBottom: 2 }}>
                    {label}
                  </Text>
                )}
                <View
                  style={{
                    width: 20,
                    height: barHeight,
                    backgroundColor: isSelected ? colorMap[type].selected : colorMap[type].default,
                    borderRadius: 4,
                  }}
                />
                <Text style={{ fontSize: 10, marginTop: 4, color: isSelected ? '#000' : '#777' }}>{item.day}</Text>
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={{ height: 1, backgroundColor: '#eee', marginTop: 8 }} />
      </View>
    );
  };

  return (
    <View style={{ padding: 16 }}>
      <View style={{ backgroundColor: '#fff', borderRadius: 20, padding: 16, elevation: 3 }}>
        {renderBars('steps', 'Steps')}
        {renderBars('min', 'Minutes')}
        {renderBars('kcal', 'Calories')}
      </View>
      <TouchableOpacity onPress={async () => {
        const data = await fetchTodayFitnessData();
        console.log('Today’s Fitness:', data);
        alert(`Steps: ${data.steps}, Kcal: ${data.kcal}, Time: ${data.minutes} mins`);
      }}>
        <Text>Check Fitness Data</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Dashboard;