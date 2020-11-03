import axios from 'axios';
import React, {useState} from 'react'
import { Text, View, StyleSheet , Image } from 'react-native';
import {Button, TextInput} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import { SCREENS } from '../utils/constants';



const LoginScreen = (props) => {
   // const dispatch = useDispatch();
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");

    const navigator = useNavigation();

    function onPress(){
        axios.post('https://therapistry.herokuapp.com/login', {
            email,
            password
        }).then(res => {
            console.log(res.data['token'] + 'hi');
            if(res.data['user_role'] === 'Patient'){
                navigator.navigate(SCREENS.HOME_SCREEN);
            }

             })
    }


    return(

        <View style={styles.container}>

            <Image source = {require('../images/logo.png')}
                    style = {styles.logo}
              />


            <TextInput
                label='Email'
                mode='outlined'
                placeholder='Enter Username'
                onChangeText = {(email) => setEmail(email)}
                />
   
            <TextInput
                label='Password'
                placeholder='Enter Password'
                mode = 'outlined'
                secureTextEntry={true}
                onChangeText = {(password) => setPassword(password)}
                />

            <Button theme={{ roundness: 8}} mode='contained' style={styles.button} onPress={onPress}>
            Submit  
            </Button>
            <View style={styles.signup}> 
                <Text  style = {{color: '#FFFFFF'}}>Don't Have An Account Yet?</Text>
                <Text style = {{color: '#FFFFFF' , fontWeight: 'bold', fontSize: 16}}>  Sign Up!</Text>
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
        marginVertical: '15%'

    }
})


export default LoginScreen;
