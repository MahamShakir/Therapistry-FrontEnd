import React, { useState , useEffect} from 'react';
import { Text, View, StyleSheet , Image, Dimensions } from 'react-native';
import {Button, TextInput, RadioButton, IconButton, Paragraph, Appbar} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import { useDispatch , useSelector } from 'react-redux';
import { SCREENS } from '../utils/constants';
import { signupUser } from '../sources/UserSources';

const SignupScreen = (props) => {
    let [fullName, setFullName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [checked, setChecked] = useState(null);
    let [error, setError] = useState("");
    
    const navigator = useNavigation();
    const dispatch = useDispatch();

    const signupReducer = useSelector( state => state.userReducer.signup);

    function handleSignupFail(err) {
        if(err.response.status == 400) 
            setError("User Exists");
        else
            setError("Some Error occured");
    }

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

        else{
            dispatch(signupUser({fullName, email, password, checked}, handleSignupFail));
        }
    }

    useEffect(() => {
        if(signupReducer.isSuccess == true) {
            navigator.navigate(SCREENS.LOGIN_SCREEN);
        }
    }, [signupReducer.isSuccess]);


    return(

        <View style={styles.container}>

            <Appbar.Header>
                <Appbar.BackAction onPress={() => {navigator.goBack()}} />
                <Appbar.Content title="Signup" style={{marginLeft:0}} />
            </Appbar.Header>

            <Image source = {require('../images/logo.png')}
                    style = {styles.logo}
              />
            
            <TextInput
                style={{paddingLeft:10, paddingRight:10}}
                label='Full Name'
                mode='outlined'
                placeholder='Enter Name'
                onChangeText = {(fullName) => setFullName(fullName)}
                />

            <TextInput
                style={{padding:10}}    
                label='Email'
                mode='outlined'
                placeholder='Enter Email'
                onChangeText = {(email) => setEmail(email)}
                />
   
            <TextInput
                style={{paddingLeft:10, paddingRight:10}}
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

            <Button mode='contained' style={styles.button} onPress={onPress} loading={signupReducer.isLoading} disabled={signupReducer.isLoading}>
            Sign Up  
            </Button>
    
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        justifyContent :'center',
        flex: 13,
        backgroundColor: '#B39DDB'
    },
    button : {
        marginBottom:15,
        marginLeft: '25%',
        padding: 5,
        width:'50%',
    },
    logo : {
        width: '20%',
        height: '20%',
        marginLeft: Dimensions.get('screen').width/3
    },
 
    radioOption1: {
        flex : 1,
        flexDirection : 'row', 
        alignItems: 'center',
        padding:10
    },

    radioOption2: {
        flex : 1,
        flexDirection : 'row',
        alignItems: 'center',
        padding:10
    }
})



export default SignupScreen;