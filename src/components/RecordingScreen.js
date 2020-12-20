import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {View} from 'react-native';
import { Title, Appbar} from 'react-native-paper';



const RecordingScreen = (props) => {

    const navigator = useNavigation();

    return (
        <View>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {navigator.goBack()}} />
                <Appbar.Content title="Record Voice" style={{marginLeft:0}} />
            </Appbar.Header>

            <Title>MICROPHONE HERE BOIS</Title>
        </View>
    )
  };
  
  
  
export default RecordingScreen;