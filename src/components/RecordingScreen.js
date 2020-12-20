import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Title, Appbar, IconButton} from 'react-native-paper';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordingScreen = (props) => {
    let [recordStart, setRecordStart] = useState(false);

    const navigator = useNavigation();

    function handleRecordPress() {
        setRecordStart(true);
        audioRecorderPlayer.startRecorder().then(res =>{
            console.log("start", res); 
        });
    }

    function handleCancelPress() {
        setRecordStart(false);
        audioRecorderPlayer.stopRecorder().then(path => {    
            let ext = path.split(".");
            ext = ext[ext.length-1];
            RNFS.readFile(path,'base64').then(res => {
                AsyncStorage.getItem('token').then(token => {
                    axios.post("https://therapistry.herokuapp.com/mood/save-mood", {
                        audio: {
                            mime: "audio/"+ext,
                            data: res
                        }
                    }, {
                        headers: {
                            "x-auth-token": token
                        }
                    }).then(res => {
                        console.log("PAGAL HOGAYA");
                    })
                });
            });
        });
    }

    return (
        <View style={{flex: 1}}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {navigator.goBack()}} />
                <Appbar.Content title="Record Voice" style={{marginLeft:0}} />
            </Appbar.Header>

            <View style={styles.container}>
                {!recordStart && <IconButton icon='microphone' onPress={handleRecordPress} />}
                {recordStart && <IconButton icon='microphone-off' onPress={handleCancelPress} />}
            </View>
        </View>
    )
  };
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: "center",
        justifyContent: "center"
    }
})
  
export default RecordingScreen;