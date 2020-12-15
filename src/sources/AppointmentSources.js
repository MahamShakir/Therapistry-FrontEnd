import axios from 'axios';
import {API_THERAPISTS, API_APPOINTMENTS, CONFIRM_SLOT } from '../utils/constants';
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

        // decide url based on user.role

        axios.get( API_THERAPISTS + user.role_id
        ).then(res => {
            dispatch(getAppointmentsSuccess(res.data));
        })
        .catch(err => {
            dispatch(getAppointmentsFailure(err));
            errorHandler(err);
        })
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