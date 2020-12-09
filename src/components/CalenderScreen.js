import React , { useState } from 'react';
import { View } from 'react-native';
import { Appbar, Button, Title} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { SCREENS } from '../utils/constants';
import DateTimePickerModal from '@react-native-community/datetimepicker';



const CalendarScreen = () => {
    let [date, setDate] = useState(new Date());
    let [isPickerVisible, setIsPickerVisible] = useState(false);

    function handlePickerView ()  {
        setIsPickerVisible(!isPickerVisible);
    }

    const navigator = useNavigation();


    return(
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {navigator.reset({
                    index: 0,
                    routes: [{
                        name: SCREENS.THERAPIST_HOME_SCREEN
                    }]
                })}} />
                <Appbar.Content title="Calendar" style={{marginLeft:0}} />
            </Appbar.Header>

            <Title>Schedule An Appointment</Title>

            <Button onPress={handlePickerView}>Select Date</Button>
           
        

        </View>
    )

}

export default CalendarScreen;