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
import messaging from '@react-native-firebase/messaging';

import rootReducer from './src/redux/reducers';

import { applyMiddleware, createStore } from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';

import { RootNavigator } from './src/navigation/RootNavigator';

const store = createStore(rootReducer, {}, applyMiddleware(thunk, logger));

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in the background!', remoteMessage);
});

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
