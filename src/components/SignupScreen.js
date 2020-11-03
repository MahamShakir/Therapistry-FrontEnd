import axios from 'axios';
import React, {useState} from 'react';
import { Text, View, StyleSheet , Image } from 'react-native';
import {Button, TextInput, RadioButton, IconButton, Paragraph} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import { SCREENS } from '../utils/constants';

const SignupScreen = (props) => {
   // const dispatch = useDispatch();
    let [fullName, setFullName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [checked, setChecked] = useState(null);
    let [error, setError] = useState("");
    
    const navigator = useNavigation();

    function onPress(){
        if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
            setError("Email should be of the form a@b.com");
            return;
        } else if(password.length <= 6) {
            setError("Please enter a password with 6 or more characters");
            return;
        } else if(fullName.length < 1) {
            setError("Please enter your full name.");
            return;
        }
        if(checked === 'patient'){
            axios.post('https://therapistry.herokuapp.com/patients' , {
                fullName,
                email,
                password
            }).then(res => {
                console.log(res.data['success']);
                if(res.data['success'] === 'true'){
                    setError("patient created successfully");
                    navigator.navigate(SCREENS.LOGIN_SCREEN);
                }
                else{
                    setError("Error creating patient, try again.");
                }
            })
        }
        else if(checked === 'therapist'){
            axios.post('https://therapistry.herokuapp.com/therapists' , {
                fullName,
                email,
                password
            }).then(res => {
                if(res.data['success'] === 'true'){
                    setError("Therapist created successfully.");
                    navigator.navigate(SCREENS.LOGIN_SCREEN);
                }
                else{
                    setError("Error creating therapist, try again.");
                }
            })

        }
        else 
            setError('Please fill in all the fields.');
    }


    return(

        <View style={styles.container}>

            <Image source = {require('../images/logo.png')}
                    style = {styles.logo}
              />
            
            <TextInput
                label='Full Name'
                mode='outlined'
                placeholder='Enter Name'
                onChangeText = {(fullName) => setFullName(fullName)}
                />

            <TextInput
                label='Email'
                mode='outlined'
                placeholder='Enter Email'
                onChangeText = {(email) => setEmail(email)}
                />
   
            <TextInput
                label='Password'
                placeholder='Enter Password'
                mode = 'outlined'
                secureTextEntry={true}
                onChangeText = {(password) => setPassword(password)}
                />
            <View style = {styles.container}>

                <View  style = {styles.radioOption1}>
            
                    <RadioButton
                        value="patient"
                        status={ checked === 'patient' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('patient')}
                    />
                    <IconButton icon = "account-star" color = "#4B0082"/>
                    <Text>Patient</Text>
                </View>

                <View style = {styles.radioOption2}>
                    <RadioButton
                        value="therapist"
                        status={ checked === 'therapist' ? 'checked' : 'unchecked' }
                        onPress={() => setChecked('therapist')}
                    />
                    <IconButton icon = "account-heart" color = "#4B0082"/>
                    <Text>Therapist</Text>
                </View>
            </View>

            <Paragraph style={{color: 'red'}}>{error}</Paragraph>

            <Button mode='contained' style={styles.button} onPress={onPress}>
            Sign Up  
            </Button>
    
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        justifyContent :'center',
        flex: 13,
        padding: 10,
        backgroundColor: '#B39DDB'
    },
    button : {
        marginTop:15,
        marginLeft: '25%',
        padding: 5,
        width:'50%',
    },
    logo : {
        width: '20%',
        height: '20%',
       
    },
 
    radioOption1: {
        flex : 1,
        flexDirection : 'row', 
        alignItems: 'center',
    },

    radioOption2: {
        flex : 1,
        flexDirection : 'row',
        alignItems: 'center',
    }
})



export default SignupScreen;