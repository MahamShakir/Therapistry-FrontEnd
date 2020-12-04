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
import SignupScreen from './src/components/SignupScreen';
import { SCREENS } from './src/utils/constants';

import rootReducer from './src/redux/reducers';

import { applyMiddleware, createStore } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { RootNavigator } from './src/navigation/RootNavigator';


const Stack = createStackNavigator();
const store = createStore(rootReducer, {}, applyMiddleware(thunk, logger));

const Drawer = createDrawerNavigator();

const Main = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PaperProvider>
            <RootNavigator />
        </PaperProvider>
      </NavigationContainer>
    </Provider>
  );
}


export default Main;
