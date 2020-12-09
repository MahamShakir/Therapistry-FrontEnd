import React, { useEffect } from 'react';
import {View} from 'react-native';
import { Title } from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import { NAVIGATORS, SCREENS } from '../utils/constants';
import AsyncStorage from '@react-native-community/async-storage';

const SplashScreen = (props) => {
  
    const navigator = useNavigation();

    useEffect(() => {
      AsyncStorage.getItem('token', (err, token) => {
        if(err) console.log("Login error: ", err);
        else {
          if(token){
            navigator.reset({
              index: 0,
              routes: [{
                  name: NAVIGATORS.HOME_NAVIGATOR,
              }]
            })
          }
          else{
            navigator.reset({
              index: 0,
              routes: [{
                  name: SCREENS.LOGIN_SCREEN
              }]
            })
          }
        }
      });
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