import axios from 'axios';
import React, {useState} from 'react'
import { Text, View, StyleSheet , Image } from 'react-native';
import {Button, TextInput, RadioButton} from 'react-native-paper';

import {useNavigation} from '@react-navigation/native';
import { SCREENS } from '../utils/constants';



const SignupScreen = (props) => {
   // const dispatch = useDispatch();
    let [name, setName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [checked, setChecked] = useState(null);
    


    const navigator = useNavigation();

    function onPress(){
        axios.post('https://therapistry.herokuapp.com/login', {
            email,
            password
        }).then(res => {
            console.log(res.data['token'] + 'hi');
            if(res.data['token']){
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
                label='Name'
                mode='outlined'
                placeholder='Enter Name'
                onChangeText = {(name) => setName(name)}
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
            <View>
                <RadioButton
                    value="patient"
                    status={ checked === 'patient' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('patient')}
                />
                <RadioButton
                    value="therapist"
                    status={ checked === 'therapist' ? 'checked' : 'unchecked' }
                    onPress={() => setChecked('therapist')}
                 />
             </View>

            <Button mode='contained' style={styles.button} onPress={onPress}>
            Submit  
            </Button>
    
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
        roundness: 8
    },
    logo : {
        width: '10%',
        height: '10%',
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



export default SignupScreen;