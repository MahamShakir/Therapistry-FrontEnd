import React, { useEffect } from 'react';
import {View} from 'react-native';
import { Title } from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import { NAVIGATORS, SCREENS } from '../utils/constants';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../sources/TokenSource';

const SplashScreen = (props) => {

    const navigator = useNavigation();
    const dispatch = useDispatch();

    let userReducer = useSelector(state => state.userReducer.login);

    function handleGetTokenError(err) {
      console.error(err);
    }

    useEffect(() => {
      dispatch(getToken(handleGetTokenError));
    }, []);

    useEffect(() => {
      if(userReducer.isSuccess) {
        navigator.reset({
          index: 0,
          routes: [{
              name: NAVIGATORS.HOME_NAVIGATOR
          }]
        })
      } else if(userReducer.isFailed) {
        navigator.reset({
          index: 0,
          routes: [{
              name: SCREENS.LOGIN_SCREEN
          }]
        })
      }
    }, [userReducer.isLoading]);

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