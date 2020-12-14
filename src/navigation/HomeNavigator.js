import React, { useEffect, useState } from  'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NAVIGATORS, SCREENS, ROLES } from '../utils/constants';
import CalendarScreen from '../components/CalendarScreen';
import TherapistHomeScreen from '../components/TherapistHomeScreen';
import PatientHomeScreen from '../components/PatientHomeScreen';
import { Drawer } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
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
        <NavigationDrawer.Navigator drawerContent={props => <DrawerScreens {...props} />} initialRouteName={SCREENS.THERAPIST_HOME_SCREEN}>
            {role == ROLES.THERAPIST && <NavigationDrawer.Screen name={SCREENS.THERAPIST_HOME_SCREEN} component={TherapistHomeScreen}  />}
            {role == ROLES.THERAPIST && <NavigationDrawer.Screen name={SCREENS.CALENDAR_SCREEN} component={CalendarScreen}  />}
            {role == ROLES.PATIENT && <NavigationDrawer.Screen name={SCREENS.PATIENT_HOME_SCREEN} component={PatientHomeScreen} />}
        </NavigationDrawer.Navigator>
    )
}
