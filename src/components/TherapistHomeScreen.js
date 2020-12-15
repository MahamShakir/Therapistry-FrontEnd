import React, { useEffect, useState } from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native'
import { Appbar, Avatar, List, Button, IconButton } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getPatients } from '../sources/PatientSources';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import { SCREENS } from '../utils/constants';


const TherapistHomeScreen = () => {
    let [patients, setPatients] = useState([]);
    let [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigator = useNavigation();
    const displayReducer = useSelector(state => state.patientReducer.getpatients);
    
    function handleDisplayFail(err) {
        if(err.response.status == 500) setError("Some Error Occured");
        else {
            setError("You do not have any Registered Patients");
        }
    }

    useEffect(() => {
        dispatch(getPatients(handleDisplayFail));
    }, []);

    useEffect(() => {
        if(displayReducer.isSuccess == true) {
            setPatients(displayReducer.data.patient);
        }
    }, [displayReducer.isSuccess]);

    function handleOnChatPress(i) {
        navigator.navigate(SCREENS.CONVERSATIONS_SCREEN, {
            conversation_with: patients[i]._id
        })
    }

    return(
        <View>
            <Appbar.Header>
                <TouchableOpacity onPress={() => navigator.dispatch(DrawerActions.openDrawer())}><Avatar.Icon icon="menu" size={50} /></TouchableOpacity>
                <Appbar.Content title="Welcome Therapist!" style={{marginLeft:0}} />
                <Appbar.Action icon='calendar-month' onPress={() => { navigator.navigate(SCREENS.CALENDAR_SCREEN)}} />
            </Appbar.Header>


            <List.Section>
                <List.Subheader>Your Patients</List.Subheader>
                    {displayReducer.isSuccess && patients.map((patient, i) => {
                        return(
                                <List.Item 
                                key={i}
                                title={patient.fullName}
                                description = 'Patient'
                                left={props => <List.Icon {...props} icon="account-heart"/>}
                                right={props => <View style={styles.list_item}>
                                                    <IconButton 
                                                        {...props} icon="chat" 
                                                        onPress={() => handleOnChatPress(i)}
                                                    />
                                                    <IconButton 
                                                        {...props} icon="format-list-bulleted" 
                                                        onPress={() => navigator.navigate(SCREENS.MOOD_SCREEN)}
                                                    />
                                                </View>}
                                />
                                
                                
                        )
                    })}
            </List.Section>
       </View>

    )
}

const styles = StyleSheet.create({
    list_item: {
        flex: 1,
        flexDirection : "row",
        justifyContent: "flex-end"
    }
})

export default TherapistHomeScreen;
