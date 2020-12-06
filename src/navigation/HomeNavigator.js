import React, { useEffect, useState } from  'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NAVIGATORS, SCREENS } from '../utils/constants';
import LoginScreen from '../components/LoginScreen';
import TherapistHomeScreen from '../components/TherapistHomeScreen'
import { Drawer } from 'react-native-paper';
import AsyncStorage from '@react-native-community/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserClear } from '../redux/actions/login';
import { useNavigation } from '@react-navigation/native';
import {ROLES} from "../utils/constants"

const NavigationDrawer = createDrawerNavigator();

export const DrawerScreens = (props) => {

    const dispatch = useDispatch();
    const navigator = useNavigation();

    let userReducer = useSelector(state => state.userReducer.login);

    function logout() {
        (async () => {
            await AsyncStorage.removeItem('token');
            dispatch(loginUserClear());
        })();
    }

    useEffect(() => {
        if(!userReducer.isLoggedIn) {
            navigator.reset({
                index: 0,
                routes: [{
                    name: SCREENS.LOGIN_SCREEN
                }]
            });
        }
    }, [userReducer.isLoggedIn]);
    

    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <Drawer.Item
                icon="logout"
                label="Logout"
                onPress={logout}
            />
        </DrawerContentScrollView>
    )
}

export const HomeNavigator = () => {

    let userReducer = useSelector(state => state.userReducer.login);
    let role;
    if(userReducer.isSuccess) role = userReducer.data.user_role;
    
    return(
        <NavigationDrawer.Navigator initialRouteName={SCREENS.HOME_SCREEN} drawerContent={props => <DrawerScreens {...props} />}>
            {role==ROLES.THERAPIST && <NavigationDrawer.Screen name={SCREENS.THERAPIST_HOME_SCREEN} component={TherapistHomeScreen}  />}
        </NavigationDrawer.Navigator>
    )
}
