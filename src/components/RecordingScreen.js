import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Animated, Easing, Dimensions } from 'react-native';
import { Title, Appbar, IconButton} from 'react-native-paper';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';
import { useDispatch } from 'react-redux';
import { postMood } from '../sources/MoodSources';


const audioRecorderPlayer = new AudioRecorderPlayer();

const RecordingScreen = (props) => {
    let [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));
    let [recordStart, setRecordStart] = useState(false);
    let [error, setError] = useState("");

    const textSize = animatedValue.interpolate({
        inputRange: [0, 0.5, 1],
        outputRange: [5, 10, 5]
    })

    const dispatch = useDispatch();
    const navigator = useNavigation();

    function animate() {
        animatedValue.setValue(0);
        Animated.timing(animatedValue, {
          toValue:1,
          duration: 2000,
          easing: Easing.linear
        }).start(() => animate())
    }

    function handlePostFail(err) {
        if(err.response.status == 500) setError("Some Error Occured");
        else {
            setError("Try Again");
        }
    }

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
                dispatch(postMood({res, ext}, handlePostFail))
            }).catch(err => {
                setError(err);
            });
        }).catch(err => {
            setError(err);
        });
    }

    useEffect(() => {
        animate();
    }, [])

    

    return (
        <View style={{flex: 1}}>
            <Appbar.Header>
                <Appbar.BackAction onPress={() => {navigator.goBack()}} />
                <Appbar.Content title="Record Voice" style={{marginLeft:0}} />
            </Appbar.Header>

            <View style={styles.container}>
                {!recordStart && <IconButton icon='microphone' onPress={handleRecordPress} size={50} />}
                {recordStart && <IconButton icon='microphone-off' onPress={handleCancelPress} size={50} />}
            

            {recordStart && <Animated.Text
                style={{
                fontSize: textSize,
                marginBottom: 10,
                color: 'red'}} >
                your voice is recording
            </Animated.Text>}
            </View>
        </View>
    )
  };
  
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        marginLeft: Dimensions.get('screen').width/3
    }
})
  
export default RecordingScreen;