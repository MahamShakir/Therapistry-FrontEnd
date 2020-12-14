import React, {useEffect, useState} from 'react'
import { Text, View, StyleSheet , Image, TouchableOpacity } from 'react-native';
import {Button, Paragraph, TextInput} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import { NAVIGATORS, SCREENS } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../sources/UserSources';


const LoginScreen = (props) => {
    let [email, setEmail] = useState("p100@p100.com");
    let [password, setPassword] = useState("p100abcde");
    let [error, setError] = useState("");

    const navigator = useNavigation();
    
    const dispatch = useDispatch();
    const loginReducer = useSelector(state => state.userReducer.login);

    function handleLoginFail(err) {
        if(err.response.status == 401) setError("Invalid Credentials");
        else {
            setError("Some error occured");
        }
    }

    function onPress(){

        if(!(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))) {
            setError("Email should be of the form a@b.com");
        } else if(password.length <= 6) {
            setError("Please enter a password with 6 or more characters");
        } else {
            dispatch(loginUser({email, password}, handleLoginFail));
        }
    }

    useEffect(() => {
        if(loginReducer.isSuccess == true) {
            navigator.reset({
                index: 0,
                routes: [{
                    name: NAVIGATORS.HOME_NAVIGATOR
                }]
            })
        }
    }, [loginReducer.isLoading]);

    return(
        <View style={styles.container}>

            <Image source = {require('../images/logo.png')}
                    style = {styles.logo}
            />


            <TextInput
                label='Email'
                mode='outlined'
                placeholder='Enter Email'
                defaultValue={email}
                onChangeText = {(email) => setEmail(email)}
                />
   
            <TextInput
                label='Password'
                placeholder='Enter Password'
                mode = 'outlined'
                defaultValue={password}
                secureTextEntry={true}
                onChangeText = {(password) => setPassword(password)}
                />
            
            <Paragraph style={{color: 'red'}}>{error}</Paragraph>

            <Button mode='contained' style={styles.button} onPress={onPress} loading={loginReducer.isLoading} disabled={loginReducer.isLoading}>
            Log In  
            </Button>
            <View style={styles.signup}> 
                <Text  style = {{color: '#FFFFFF'}}>Don't Have An Account Yet?</Text>
                <TouchableOpacity onPress = {() => navigator.navigate(SCREENS.SIGNUP_SCREEN)}><Text style = {{color: '#FFFFFF' , fontWeight: 'bold', fontSize: 16}}>  Sign Up!</Text></TouchableOpacity>
            </View>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
        justifyContent :'center',
        flexGrow: 1,
        padding: 10,
        backgroundColor: '#B39DDB'
    },
    button : {
        marginTop:15,
        marginLeft: '25%',
        padding: 5,
        width:'50%',
        borderRadius: 8
    },
    logo : {
        width: '50%',
        height: '50%',
        marginLeft : '25%'
    },
    signup: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',


    }
})




export default LoginScreen;
