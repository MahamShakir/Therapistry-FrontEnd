import React, { useEffect, useReducer, useState } from 'react';
import {View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Appbar, Avatar, List } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { displayPatients } from '../sources/TherapistSources';
import { SCREENS } from '../utils/constants';


const TherapistHomeScreen = () => {
    let [patients, setPatients] = useState([]);
    let [error, setError] = useState("");

    const dispatch = useDispatch();
    const navigator = useNavigation();
    const displayReducer = useSelector(state => state.therapistReducer.displaypatients);

    function handleDisplayFail(err) {
        if(err.response.status == 500) setError("Some Error Occured");
        else {
            setError("You do not have any Registered Patients");
        }
    }

    useEffect(() => {
        dispatch(displayPatients(handleDisplayFail));
    }, []);

    useEffect(() => {
        if(displayReducer.isSuccess == true) {
            setPatients(displayReducer.data.patient);
        }
    }, [displayReducer.isSuccess]);

    return(
        <View>
            <Appbar.Header>
                <Avatar.Icon size={40} icon='qqchat' />
                <Appbar.Content title="Welcome Therapist!" style={{marginLeft:0}} />
                <Appbar.Action icon='calendar-month' onPress={() => { navigator.navigate(SCREENS.CALENDAR_SCREEN)}} />
            </Appbar.Header>


            <List.Section>
                <List.Subheader>Your Patients</List.Subheader>
                    {displayReducer.isSuccess && patients.map((patient) => {
                        return(
                            <List.Item 
                            title={patient.fullName}
                            description = 'Patient'
                            left={props => <List.Icon {...props} icon="account-heart"/>}
                        />)
                    })}
            </List.Section>
       </View>

    )
}
export default TherapistHomeScreen;