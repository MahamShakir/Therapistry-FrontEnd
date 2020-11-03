/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React  from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './src/components/LoginScreen';
import SplashScreen from './src/components/SplashScreen';
import HomeScreen from './src/components/HomeScreen';
import { SCREENS } from './src/utils/constants';

const Stack = createStackNavigator();


const Main = () => {
  return (
    <NavigationContainer>
      <PaperProvider>
          <Stack.Navigator initialRouteName={SCREENS.SPLASH_SCREEN}>
            <Stack.Screen name={SCREENS.SPLASH_SCREEN} component={SplashScreen} />
            <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={SCREENS.HOME_SCREEN} component={HomeScreen} />
          </Stack.Navigator>
      </PaperProvider>
    </NavigationContainer>
  );
}


export default Main;
