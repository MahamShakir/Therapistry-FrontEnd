import React, { useEffect, useState } from 'react';
import { View, Animated, Image, Easing } from 'react-native';
import { Title } from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import { NAVIGATORS, SCREENS } from '../utils/constants';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { getToken } from '../sources/TokenSource';

const SplashScreen = (props) => {
  let [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
  
  const scale = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 2]
  })
  const spin = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg' ]
  })
  const translate = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 50]
  })

  const navigator = useNavigation();
  const dispatch = useDispatch();

  let userReducer = useSelector(state => state.userReducer.login);

  function handleGetTokenError(err) {
    console.error(err);
  }

  function animate() {
    animatedValue.setValue(0);
    Animated.timing(animatedValue, {
      toValue:1,
      duration: 2000,
      easing: Easing.linear
    }).start(() => animate())
  }

  useEffect(() => {
    dispatch(getToken(handleGetTokenError));
    //animate();
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
      justifyContent: "center",
      backgroundColor: '#d1c4e9'
    }}>

    <Animated.Image
      style={{
        transform: [{scale:scale}, {rotate:spin}],
        marginTop: 10}}
        source={require('../images/logo.png')} />


    </View>
  )
};

  
  
export default SplashScreen;