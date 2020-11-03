import React, { useEffect } from 'react';
import {View} from 'react-native';
import { Title } from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import { SCREENS } from '../utils/constants';

const SplashScreen = (props) => {
  
    const navigator = useNavigation();

    useEffect(() => {
      setTimeout(() => {
        navigator.navigate(SCREENS.LOGIN_SCREEN);
      }, 3000);
    }, []);

    return (
      <View style = {{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Title>Therapistry B|</Title>
      </View>
    )
  };
  
  
  
export default SplashScreen;