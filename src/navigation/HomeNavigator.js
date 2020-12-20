import React, { useEffect, useState } from  'react';
import { StyleSheet, View } from 'react-native';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { NAVIGATORS, SCREENS, ROLES } from '../utils/constants';
import CreateSlotsScreen from '../components/CreateSlotsScreen';
import TherapistHomeScreen from '../components/TherapistHomeScreen';
import PatientHomeScreen from '../components/PatientHomeScreen';
import ScheduledAppointmentsScreen from '../components/ScheduledAppointmentsScreen';
import RecordingScreen from '../components/RecordingScreen';
import { Drawer, Text, Avatar, Title, ActivityIndicator, Divider } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../sources/UserSources';

const NavigationDrawer = createDrawerNavigator();

export const DrawerScreens = (props) => {

    const dispatch = useDispatch();
    let userReducer = useSelector(state => state.userReducer.login);
    let role;
    let name;
    role = userReducer.data.user_role;
    name = userReducer.data.user_name;

    function logout() {
        dispatch(logoutUser(handleLogoutError));
    }

    function handleLogoutError(err) {
        console.error("Logout error: ", err);
    }

    return (
        <DrawerContentScrollView {...props}>
            { role == ROLES.THERAPIST && <View style={styles.drawerHeader}>
                <Avatar.Image source={require('../images/therapist.png')} size={85} />
                <Title style={styles.text} >Hey {name}!</Title>
            </View>}

            { role == ROLES.PATIENT && <View style={styles.drawerHeader}>
                <Avatar.Image source={require('../images/patient.png')} size={85} />
                <Title style={styles.text} >Hey {name}!</Title>
            </View>}

            <Divider style={styles.divider} />

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

    const navigator = useNavigation();
    let userReducer = useSelector(state => state.userReducer.login);
    let role;

    useEffect(() => {
        if(!userReducer.data) {
            navigator.reset({
                index: 0,
                routes: [{
                    name: SCREENS.LOGIN_SCREEN
                }]
            });
        }
    }, [userReducer.data]);

    if(userReducer.data) {
        role = userReducer.data.user_role;
    
        return(
            <NavigationDrawer.Navigator drawerContent={props => <DrawerScreens {...props} />} initialRouteName={SCREENS.THERAPIST_HOME_SCREEN}>
                {role == ROLES.THERAPIST && <NavigationDrawer.Screen 
                    name={SCREENS.THERAPIST_HOME_SCREEN} 
                    component={TherapistHomeScreen}
                    options={{ drawerLabel: 'Home',
                    drawerIcon: (({focused}) => <Icon name="home-outline" size={25} /> ) }}  />}

                {role == ROLES.THERAPIST && <NavigationDrawer.Screen 
                    name={SCREENS.CREATE_SLOTS_SCREEN} 
                    component={CreateSlotsScreen}
                    options={{ drawerLabel: 'Slots',
                    drawerIcon: (({focused}) => <Icon name="calendar-today" size={25} /> ) }}  />}

                {role == ROLES.PATIENT && <NavigationDrawer.Screen 
                    name={SCREENS.PATIENT_HOME_SCREEN}  
                    component={PatientHomeScreen}
                    options={{ drawerLabel: 'Home',
                    drawerIcon: (({focused}) => <Icon name="home-outline" size={25} /> ) }} />} 

                {role == ROLES.PATIENT && <NavigationDrawer.Screen 
                    name={SCREENS.RECORDING_SCREEN}  
                    component={RecordingScreen}
                    options={{ drawerLabel: 'Record',
                    drawerIcon: (({focused}) => <Icon name="microphone-outline" size={25} /> ) }} />}         

                <NavigationDrawer.Screen  
                    name={SCREENS.SCHEDULED_APPOINTMENTS_SCREEN}
                    component={ScheduledAppointmentsScreen}
                    options={{drawerLabel: 'Your Appointments',
                    drawerIcon: (({focused}) => <Icon name="clock-time-four-outline" size={25} /> )}} />

                
            </NavigationDrawer.Navigator>
        )
    } else {
        return <ActivityIndicator animating={true} style={styles.loader} />
    }
}

const styles = StyleSheet.create({
    drawerHeader: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        margin: 10,
    },
    text: {
        marginTop: 25,
        marginLeft: 10
    },
    loader: {
        alignContent: 'center',
        justifyContent: 'center'
    },
    divider: {
        height: 1,
        marginBottom: 5
    }
})
