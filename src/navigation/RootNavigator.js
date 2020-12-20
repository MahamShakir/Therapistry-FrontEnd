import React from 'react'; 
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from '../components/LoginScreen';
import SplashScreen from '../components/SplashScreen';
import SignupScreen from '../components/SignupScreen';
import ConversationsScreen from '../components/ConversationsScreen';
import MoodScreen from '../components/MoodScreen';
import { SCREENS, NAVIGATORS } from '../utils/constants';
import { HomeNavigator } from './HomeNavigator';


const Stack = createStackNavigator();

export const RootNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName = {SCREENS.SPLASH_SCREEN}>
            <Stack.Screen name={SCREENS.SPLASH_SCREEN} component={SplashScreen} />
            <Stack.Screen name={SCREENS.LOGIN_SCREEN} component={LoginScreen} />
            <Stack.Screen name={SCREENS.SIGNUP_SCREEN} component={SignupScreen} />
            <Stack.Screen name={SCREENS.CONVERSATIONS_SCREEN} component={ConversationsScreen} />
            <Stack.Screen name={SCREENS.MOOD_SCREEN} component={MoodScreen} />
            <Stack.Screen options={{headerShown:false}} name={NAVIGATORS.HOME_NAVIGATOR} component={HomeNavigator} />
        </Stack.Navigator>
    )
}
