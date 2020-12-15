import axios from 'axios';
import { API_APPOINTMENTS, CONFIRM_SLOT, ROLES } from '../utils/constants';
import { 
    getAppointmentsFailure, 
    getAppointmentsInit, 
    getAppointmentsSuccess,
    bookAppointmentFailure,
    bookAppointmentInit,
    bookAppointmentSuccess } from '../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';

export const getAppointments = (errorHandler = (err) => { }) => {
    return(dispatch, getState) => {
        dispatch(getAppointmentsInit());
        let user = getState().userReducer.login.data;
        let url;
        if(user.user_role == ROLES.THERAPIST)
            url = API_APPOINTMENTS + ROLES.THERAPIST + "/" + user.role_id;
        else if (user.user_role == ROLES.PATIENT)
            url = API_APPOINTMENTS + ROLES.PATIENT + "/" + user.role_id;

        AsyncStorage.getItem('token'
        ).then(token => {
            axios.get(url , {
                headers : {
                    "x-auth-token" : token
                } 
            }
            ).then(res => {
                dispatch(getAppointmentsSuccess(res.data));
            })
            .catch(err => {
                dispatch(getAppointmentsFailure(err));
                errorHandler(err);
            });
        })
        .catch(err => errorHandler(err));
    }
}

export const bookAppointment = ({therapists_id, slot_id}, errorHandler = (err) => { }) => {
    return(dispatch) => {
        dispatch(bookAppointmentInit());
        let API_BOOK_APPOINTMENT = API_APPOINTMENTS + therapists_id + "/" + slot_id + CONFIRM_SLOT;

        AsyncStorage.getItem('token'
        ).then(token => {
            axios.post( API_BOOK_APPOINTMENT , {
                therapists_id,
                slot_id
            }, {
                headers : {
                    "x-auth-token" : token
                }
            }
            ).then(res => {
                dispatch(bookAppointmentSuccess(res.data));
            })
            .catch(err => {
                dispatch(bookAppointmentFailure(err));
                errorHandler(err);
            })
        })
        .catch(err => errorHandler(err));
    }
}