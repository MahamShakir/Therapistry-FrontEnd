import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Title, Button, List, Appbar, Avatar, Portal, Modal} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { getTherapists } from '../sources/PatientSources';
import moment from 'moment';


const PatientHomeScreen = () => {
    let [therapists, setTherapists] = useState([]);
    let [slots, setSlots] = useState([]);
    let [error, setError] = useState("");
    let [isVisible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const navigator = useNavigation();
    const displayTherapistReducer = useSelector(state => state.patientReducer.gettherapists)

    function handleDisplayFail(err) {
        if(err.response.status == 500) setError("Some Error Occured");
        else {
            setError("You do not have any Registered Patients");
        }
    }

    function toggleModal() {
        setVisible(!isVisible);
    }

    // function handleTherapistPress(i) {
    //     setSlots(therapists[i].slots);
    //     toggleModal();
    // }

    useEffect(() => {
        dispatch(getTherapists(handleDisplayFail));
    }, []);

    useEffect(() => {
        if(displayTherapistReducer.isSuccess == true) {
            setTherapists(displayTherapistReducer.data.therapists);
        }
    }, [displayTherapistReducer.isLoading]);

    return (
        <View>
            <Appbar.Header>
                <TouchableOpacity onPress={() => navigator.dispatch(DrawerActions.openDrawer())}><Avatar.Icon icon="menu" size={50} /></TouchableOpacity>
                <Appbar.Content title="Welcome Patient!" style={{marginLeft:0}} />
            </Appbar.Header>
        
            <List.Section>
                <List.Subheader>Therapists</List.Subheader>
                    {displayTherapistReducer.isSuccess && therapists.map((therapist, i) => {
                        return(
                            <List.Item 
                                key={i}
                                onPress={toggleModal}
                                title={therapist.fullName}
                                description="Therapist"
                                left={props => <List.Icon {...props} icon="account-heart" />}
                            />
                        )
                    })}
            </List.Section>

            <Portal>
                <Modal visible={isVisible} onDismiss={toggleModal} contentContainerStyle={styles.modalStyle}>
                    <List.Section>
                        <List.Subheader>Available Slots</List.Subheader>
                        {slots.map((slot, j) => {
                            return(
                                <List.Item 
                                    key={j}
                                    title={moment(slot.date).format("DD Do MMMM, YYYY")}
                                    description={moment(slot.date).format("h:mm a")}
                                    left={props => <List.Icon {...props} icon="timetable"/>}
                                />
                            )
                        })}
                    </List.Section>
                </Modal>
            </Portal>
        </View>
    )
  };
  
const styles = StyleSheet.create({
    modalStyle : {
        backgroundColor: 'white',
        padding: 10
    }
})
  
export default PatientHomeScreen;