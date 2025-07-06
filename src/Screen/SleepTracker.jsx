import React, { useState } from 'react';
import { View,Text } from 'react-native';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

const getSleepStatus = (hours) => {
  if (hours >= 7.5) return { text: 'Good sleep', color: 'green' };
  if (hours >= 6) return { text: 'Average \n sleep', color: 'orange' };
  return { text: 'Poor sleep', color: 'red' };
};

const SleepTracker = () => {
  const [sleepHours, setSleepHours] = useState(6);

  const fill = Math.min((sleepHours / 8) * 100, 100);
  const { text, color } = getSleepStatus(sleepHours);

  return (
    <View style={{ alignItems: 'center', marginTop: 7 }}>

      <AnimatedCircularProgress
        size={120}
        width={12}
        fill={fill}
        tintColor={color}
        backgroundColor="#ddd"
        lineCap="round"
        rotation={0}
      >
        {() => (
          <View style={{ alignItems: 'center' }}>
            <Text style={{ color, fontSize: 15, fontWeight: 'bold' ,textAlign:"center"}}>{text}</Text>
              <View style={{flexDirection:'row'}}>
                    <Text style={{color:'#E6A72F',fontSize:15,fontWeight:"bold"}}>{sleepHours}</Text>
                    <Text style={{color:'grey',fontSize:14}}> Hrs</Text>
                    </View> 
          </View>
        )}
      </AnimatedCircularProgress>
    </View>
  );
};

export default SleepTracker;
