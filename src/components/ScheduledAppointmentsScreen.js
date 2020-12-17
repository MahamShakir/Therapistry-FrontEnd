import React, { useEffect, useState } from 'react';
import {View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar } from 'react-native-paper';
import Timeline from 'react-native-timeline-flatlist';
import { SCREENS } from '../utils/constants';



const ScheduledAppointmentsScreen = (props) => {
  let data = [
    {time: "9:30", title: "Heya"},
    {time: "9:30", title: "Heya", description: "nigger"},
    {time: "9:30", title: "Heya", description: "nigger"},
  ]

  const navigator = useNavigation();

  

  return (
    <View>
      <Appbar.Header>
        <Appbar.BackAction onPress={() => {navigator.goBack()}} />
        <Appbar.Content title="Your Appointments" style={{marginLeft:0}} />
      </Appbar.Header>



      <Timeline 
          data={data}
        />

    </View>
  )
};
  
export default ScheduledAppointmentsScreen;
