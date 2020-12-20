import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Text, Appbar, Paragraph, Button, Card } from 'react-native-paper';
import Timeline from 'react-native-timeline-flatlist';
import { useDispatch, useSelector } from 'react-redux';
import { ROLES } from '../utils/constants';
import { getAppointments } from '../sources/AppointmentSources';
import moment from 'moment';



const ScheduledAppointmentsScreen = () => {
  let [data, setData] = useState([]);
  let [error, setError] = useState("");


  const dispatch = useDispatch();
  const navigator = useNavigation();
  const userReducer = useSelector(state => state.userReducer.login);
  const appointmentsReducer = useSelector(state => state.appointmentsReducer.getappointments);

  function handleDisplayFail(err) {
    if(err.response.status == 500) setError("Some Error Occured");
    else {
        setError("You do not have any Registered Patients");
    }
  }

  useEffect(() => {
    dispatch(getAppointments(handleDisplayFail));
  }, [])

  useEffect(() => {
    let data = [];

    if(appointmentsReducer.isSuccess == true){

      let appointments = appointmentsReducer.data.appointments;
      appointments.sort((a, b) => {
        let date_a = new Date(a.date);
        let date_b = new Date(b.date);

        if(date_a < date_b) return -1;
        else if(date_a > date_b) return 1;
        return 0;
      });

      if(userReducer.data.user_role == ROLES.THERAPIST){
        for(var i = 0; i<appointments.length; i++) {
          var row = {
            "time" : moment(appointments[i].date).format("ddd Do MMM, 'YY"),
            "title" : appointments[i].patient_id.fullName,
            "description" : "at " + moment(appointments[i].date).format("h:mm a")
          }
          data.push(row);
        }
        setData(data);
      }

      else if(userReducer.data.user_role == ROLES.PATIENT){
        for(var i = 0; i<appointments.length; i++){
          var row = {
            "time" : moment(appointments[i].date).format("ddd Do MMM, 'YY"),
            "title" : appointments[i].therapist_id.fullName,
            "description" : "at " + moment(appointments[i].date).format("h:mm a")
          }
          data.push(row);
        }
        setData(data);
      }
    }
  }, [appointmentsReducer.isLoading])


  return (

    <View style={styles.container}>

      <Appbar.Header>
        <Appbar.BackAction onPress={() => {navigator.goBack()}} />
        <Appbar.Content title="Your Appointments" style={{marginLeft:0}} />
      </Appbar.Header>

      {data.length == 0 && <Paragraph style={styles.message}>
        You donot have any scheduled appointments
      </Paragraph>}

      <Timeline 
          style={styles.list}
          data={data}
          circleSize={20}
          circleColor='rgba(0,0,0,0)'
          lineColor='#311B92'
          timeContainerStyle={{minWidth:52}}
          timeStyle={{textAlign: 'center', backgroundColor:'#C5CAE9', color:'#333', padding:5, borderRadius:13, marginTop:30}}
          descriptionStyle={{color:'#311B92'}}
          options={{
            style:{paddingTop:5}
          }}
          innerCircle={'icon'}                   
          separator={false}
        renderFullLine={true}
          columnFormat='two-column'
          renderDetail={function (rowData, sectionID, rowID){
            return (
              <Card>
                <Card.Title title={rowData.title} subtitle={rowData.description} />
              </Card>
            )
          }}
          renderCircle={function (item, index) {
          let circleSize = 9;
          if ([circleSize]) {
            return (
              <View
                style={{
                  width: circleSize,
                  height: circleSize,
                  backgroundColor: '#311B92',
                  borderRadius: circleSize/2,
                  right: 170,
                }}
              />
            );
          }

          return this._renderCircle(item, index);
        }}


        />

       

    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    flex: 1,
    marginTop:30,
    padding: 10
  },
  message: {
    fontStyle: 'italic',
    textAlign: 'center'
  }
})

export default ScheduledAppointmentsScreen;