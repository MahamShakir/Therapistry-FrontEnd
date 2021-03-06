import React , { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, Button, Card, IconButton, List, Modal, Paragraph, Portal, Title} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SCREENS, SLOT_STATUS, SLOt_STATUS} from '../utils/constants';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { putSlots } from '../sources/TherapistSources';
import { getTherapist } from '../sources/TherapistSources';


const CreateSlotsScreen = () => {
    let [date, setDate] = useState(new Date());
    let [time, setTime] = useState(date);
    let [slots, setSlots] = useState([]);
    let [error, setError] = useState("");
    let [status, setStatus] = useState("free");
    let [isDatePickerVisible, setDatePickerVisible] = useState(false);
    let [isTimePickerVisible, setTimePickerVisible] = useState(false);

    const navigator = useNavigation();
    const dispatch = useDispatch();
    const displayAppReducer = useSelector(state => state.therapistReducer.gettherapist);

    function toggleDatePickerView ()  {
        setDatePickerVisible(!isDatePickerVisible);
    }

    function toggleTimePickerView ()  {
        setTimePickerVisible(!isTimePickerVisible);
    }

    function handleDatePick(event, selectedDate) {
        if(event.type == 'dismissed') return;
        else if(selectedDate){
            setDate(selectedDate);
            toggleDatePickerView();
        }
        toggleTimePickerView();
    }

    function handleTimePick(event, selectedTime) {
        if(event.type == 'dismissed') return;
        else if(selectedTime) {
            setDate(prevDate => {
                prevDate.setHours(selectedTime.getHours());
                prevDate.setMinutes(selectedTime.getMinutes());
                return prevDate;
            })
            toggleTimePickerView();
        }
        
        if(event.type == 'set')
            setSlots(prevSlots => [...prevSlots, {date, status}]);
    }


    function handleDisplayFail(err) {
        console.log(err);
        if(err.response.status == 400) setError("Validation Error");
        else {
            setError("Some error occured");
        }
    }

    function handleScheduleUpdate() {
        dispatch(putSlots({slots}, handleDisplayFail));
    }

    useEffect(() => {
        setSlots([]);
        dispatch(getTherapist(handleDisplayFail));
    }, []);

    useEffect(() => {
        if(displayAppReducer.isSuccess == true){
            setSlots(displayAppReducer.data.therapists.slots);
        }
    }, [displayAppReducer.isLoading])

    return(
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {navigator.goBack()}} />
                <Appbar.Content title="Appointment Slots" style={{marginLeft:0}} />
                <Appbar.Action icon="calendar-plus" onPress={toggleDatePickerView}/>
                <Appbar.Action icon="calendar-check" onPress={handleScheduleUpdate} />
            </Appbar.Header>

            {isDatePickerVisible && <DateTimePicker  
                value = {date}
                mode='date'
                onChange={handleDatePick}
            />}
    
            {isTimePickerVisible && <DateTimePicker  
                value = {time}
                mode='time'
                onChange={handleTimePick}
            />}

            <List.Section>
                <List.Accordion title="Your Appointment Slots">
                    {displayAppReducer.isSuccess && slots.map((slot, i) => {
                        return(
                            slot.status == SLOT_STATUS.FREE &&
                            <List.Item 
                                key={i}
                                title={moment(slot.date).format("ddd Do MMM, 'YY")}
                                description={moment(slot.date).format("h:mm a")}
                                left={props => <List.Icon {...props} icon="timetable"/>}
                                right={props => <IconButton icon="close-circle" size={18} onPress={() => {
                                    setSlots(prevSlots => prevSlots.filter((val, index) => index != i));
                                    }
                                } />}
                            />
                        )
                    })}

                    {slots.filter(slot => slot.status === SLOT_STATUS.FREE).length == 0 &&
                        <Paragraph style={styles.message}>No Available Slots</Paragraph>
                    }
                </List.Accordion>

                <List.Accordion title="Your Booked Slots">
                    {displayAppReducer.isSuccess && slots.map((slot, i) => {
                        return(
                            slot.status == SLOT_STATUS.BOOKED &&
                            <List.Item 
                                key={i}
                                title={moment(slot.date).format("ddd Do MMM, 'YY")}
                                description={moment(slot.date).format("h:mm a")}
                                left={props => <List.Icon {...props} icon="timetable"/>}
                            />
                        )
                    })}

                    {slots.filter(slot => slot.status === SLOT_STATUS.BOOKED).length == 0 &&
                        <Paragraph style={styles.message}>No Available Slots</Paragraph>
                    }
                </List.Accordion>

            </List.Section>

        </View>
    )

}

const styles = StyleSheet.create({
    message: {
        fontStyle: 'italic',
        textAlign: 'center'
    }
})

export default CreateSlotsScreen;