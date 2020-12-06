import AsyncStorage from '@react-native-community/async-storage';
import React, { useEffect, useState } from 'react';
import {View} from 'react-native';
import { Title} from 'react-native-paper';



const HomeScreen = (props) => {

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
  
  
  
export default HomeScreen;
