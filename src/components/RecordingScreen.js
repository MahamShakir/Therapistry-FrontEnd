import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions, ActivityIndicator } from 'react-native';
import { Title, Appbar, IconButton, Paragraph, Subheading} from 'react-native-paper';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { useDispatch, useSelector } from 'react-redux';
import { postMood } from '../sources/MoodSources';


const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordingScreen = (props) => {
    let [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
    let [recordStart, setRecordStart] = useState(false);
    let [error, setError] = useState("");
    let [seconds, setSeconds] = useState("0:00");
    let [processing, setProcessing] = useState(false);

    let postMoodReducer = useSelector(state => state.moodReducer.postmood);

    const textSize = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [5, 10, 5]
    })

    const dispatch = useDispatch();
    const navigator = useNavigation();

    function handlePostFail(err) {
        if(err.response.status == 500) setError("Some Error Occured");
        else {
            setError("Try Again");
        }
        setProcessing(false);
    }

    function handleRecordPress() {
        if(!processing) {
            audioRecorderPlayer.addRecordBackListener((e) => {
                if(!recordStart) setRecordStart(true);
                setSeconds(audioRecorderPlayer.mmssss(
                    Math.floor(e.current_position),
                ));
            })
            audioRecorderPlayer.startRecorder().then(res =>{
                console.log("start", res); 
            });
        }
    }

    function handleCancelPress() {
        audioRecorderPlayer.stopRecorder().then(path => {    
            let ext = path.split(".");
            ext = ext[ext.length-1];
            RNFS.readFile(path,'base64').then(res => {
                setRecordStart(false);
                setSeconds("0:00");
                setProcessing(true);
                dispatch(postMood({res, ext}, handlePostFail))
            }).catch(err => {
                setError(err);
            });
        }).catch(err => {
            setError(err);
        });
        audioRecorderPlayer.removeRecordBackListener(() => {
        })
    }

    useEffect(() => {
        // animate();
        setProcessing(false);
    }, [postMoodReducer.isLoading]);

    

    return (
        <View style={{flex: 1}}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {navigator.goBack()}} />
                <Appbar.Content title="Record Voice" style={{marginLeft:0}} />
            </Appbar.Header>
            <View style={{flex: 1, justifyContent: "flex-end"}}>
                <Title style={{alignSelf: "center", paddingTop: 10, fontFamily: "Arial", fontSize: 25}}>"How are you feeling today?"</Title>
            </View>
            <View style={styles.container}>
                {!recordStart && <IconButton icon='microphone' style={styles.microphone_icon} onPress={handleRecordPress} size={50} />}
                {recordStart && <IconButton icon='microphone-off' style={styles.microphone_icon} onPress={handleCancelPress} size={50} />}
                <Title style={{alignSelf: "center", paddingTop: 10, fontFamily: "Arial"}}>Record time: {seconds}</Title>
                {!processing && <Paragraph>Please record for 5 seconds atleast!</Paragraph>}
                {processing && <Paragraph>Please wait we are processing your audio.</Paragraph>}
            </View>
        </View>
    )
  };
  
const styles = StyleSheet.create({
    container: {
        flex: 2,
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: 20
    },
    microphone_icon: {
        borderColor: "black",
        borderWidth: 2,
        marginTop: 20
    }
})
  
export default RecordingScreen;