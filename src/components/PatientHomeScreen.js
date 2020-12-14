import React, { useEffect, useState } from 'react';
import {View} from 'react-native';
import { Title} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';


const PatientHomeScreen = () => {
    let [therapists, setTherapists] = useState([]);
    let [error, setError] = useState("");

    const dispatch = useDispatch();
    //const displayTherapistReducer = useSelector(state => state.patientReducer.gettherapists)


    return (
        <View style = {{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}>
          <Title>Home Screen</Title>
        </View>
    )
  };
  
  
  
export default PatientHomeScreen;