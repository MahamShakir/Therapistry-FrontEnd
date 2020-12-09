import React, { useEffect, useState } from  'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { SCREENS } from '../utils/constants';
import TherapistHomeScreen from '../components/TherapistHomeScreen'
import { Drawer } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {ROLES} from "../utils/constants"
import { logoutUser } from '../sources/UserSources';

const NavigationDrawer = createDrawerNavigator();

export const DrawerScreens = (props) => {

    const dispatch = useDispatch();
    const navigator = useNavigation();

    let loginReducer = useSelector(state => state.userReducer.login);

    function logout() {
        dispatch(logoutUser(handleLogoutError));
    }

    function handleLogoutError(err) {
        console.error("Logout error: ", err);
    }

    useEffect(() => {
        if(!loginReducer.data) {
            navigator.reset({
                index: 0,
                routes: [{
                    name: SCREENS.LOGIN_SCREEN
                }]
            });
        }
    }, [loginReducer.data]);
    

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
        <NavigationDrawer.Navigator initialRouteName={SCREENS.THERAPIST_HOME_SCREEN} drawerContent={props => <DrawerScreens {...props} />}>
            {role==ROLES.THERAPIST && <NavigationDrawer.Screen name={SCREENS.THERAPIST_HOME_SCREEN} component={TherapistHomeScreen}  />}
        </NavigationDrawer.Navigator>
    )
}
