import React from 'react';
import {View} from 'react-native';
import { Title } from 'react-native-paper';



const HomeScreen = (props) => {
  
 
    return (
      <View style = {{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}>
        <Title>Home Screen</Title>
      </View>
    )
  };
  
  
  
export default HomeScreen;

// user=await AsyncStorage.getItem('user)
// role = user.role

// if(role == therapist) shwo this;
// if(role == patient) show this;

// getItem('token')
// if(token == null) go to login;
// if(token found) go to home;