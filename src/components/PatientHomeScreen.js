import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView, Image} from 'react-native';
import { Title, Button, List, Appbar, Avatar, Portal, Modal, IconButton, Divider, Snackbar, Paragraph} from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { getTherapists } from '../sources/TherapistSources';
import { bookAppointment } from '../sources/AppointmentSources';
import moment from 'moment';
import { SLOT_STATUS, SCREENS } from '../utils/constants';



const PatientHomeScreen = () => {
    let [therapists, setTherapists] = useState([]);
    let [slots, setSlots] = useState([]);
    let [therapists_id, setTherapistsID] = useState("");
    let [name, setName] = useState("");
    let [error, setError] = useState("");
    let [isSnackVisible, setSnackVisible] = useState(false);
    let [isVisible, setVisible] = useState(false);

    const dispatch = useDispatch();
    const navigator = useNavigation();
    const displayTherapistReducer = useSelector(state => state.therapistReducer.gettherapists);

    const bookAppointmentReducer = useSelector(state => state.appointmentsReducer.bookappointment);
    
    function handleDisplayFail(err) {
        if(err.response.status == 500) setError("Some Error Occured");
        else {
            setError("Authorization Failed");
        }
    }

    function toggleModal() {
        setVisible(!isVisible);
    }

    function hideSnack() {
        setSnackVisible(false);
    }

    function handleTherapistPress(i) {
        setName(therapists[i].fullName);
        setTherapistsID(therapists[i]._id);
        setSlots(therapists[i].slots);
        toggleModal();
    }

    function handleBookSlot(slot_id) {
        dispatch(bookAppointment({therapists_id, slot_id}, handleDisplayFail));

    }

    useEffect(() => {
        dispatch(getTherapists(handleDisplayFail));
    }, []);

    useEffect(() => {
        if(displayTherapistReducer.isSuccess == true) {
            setTherapists(displayTherapistReducer.data.therapists);
        }
    }, [displayTherapistReducer.isLoading]);

    useEffect(() => {
        if(bookAppointmentReducer.isSuccess == true) {
            setSlots(bookAppointmentReducer.data.modifiedTheropist.slots);
        }
    }, [bookAppointmentReducer.isLoading]);

    return (
        <View>
            <Appbar.Header>
                <TouchableOpacity onPress={() => navigator.dispatch(DrawerActions.openDrawer())}><Avatar.Icon icon="menu" size={50} /></TouchableOpacity>
                <Appbar.Content title="Welcome Patient!" style={{marginLeft:0}} />
                <Appbar.Action icon='calendar-clock' onPress={() => { navigator.navigate(SCREENS.SCHEDULED_APPOINTMENTS_SCREEN)}} />
            </Appbar.Header>

        <ScrollView>
            <List.Section>
                <List.Subheader>Therapists</List.Subheader>
                    {displayTherapistReducer.isSuccess && therapists.map((therapist, i) => {
                        return(
                            <List.Item 
                                key={i}
                                onPress={() => handleTherapistPress(i)}
                                title={therapist.fullName}
                                description="Therapist"
                                left={props => <List.Icon {...props} icon="account-heart" />}
                            />
                        )
                    })}

                    {therapists.length == 0 && <Paragraph style={styles.message}>
                        No Therapists Available
                    </Paragraph> }
            </List.Section>
        </ScrollView>

            <Portal>
                <Modal visible={isVisible} onDismiss={toggleModal} contentContainerStyle={styles.modalStyle}>
                    <ScrollView>
                    <List.Section>
                        <List.Subheader> {name}'s Available Slots</List.Subheader>
                        <Divider style={{height: 3}} />
                        {slots.map((slot, j) => {
                            return(
                                slot.status == SLOT_STATUS.FREE &&
                                <List.Item 
                                    key={j}
                                    title={moment(slot.date).format("ddd Do MMM, 'YY")}
                                    description={moment(slot.date).format("h:mm a")}
                                    left={props => <List.Icon {...props} icon="timetable"/>}
                                    right={props => <IconButton {...props} icon="calendar-check" onPress={() => handleBookSlot(j)} />}
                                />
                            )
                        })}
                    </List.Section>
                    </ScrollView>

                    {slots.filter(slot => slot.status == SLOT_STATUS.FREE).length == 0 && <Image 
                        source={require('../images/no_data.png')}
                        style={styles.image}
                        />}

                </Modal>
                <Snackbar visible={bookAppointmentReducer.isLoading} 
                duration={900}
                action={{
                    label: "OK",
                    onPress: () => {hideSnack}
                }}
                onDismiss={hideSnack} >You Confirmed An Appointment</Snackbar>
            </Portal>
        </View>
    )
  };
  
const styles = StyleSheet.create({
    modalStyle : {
        backgroundColor: 'white',
        padding: 5,
        margin: 20
    },
    image: {
        marginLeft: 65
    },
    message: {
        fontStyle: 'italic',
        textAlign: 'center'
    }
})
  
export default PatientHomeScreen;