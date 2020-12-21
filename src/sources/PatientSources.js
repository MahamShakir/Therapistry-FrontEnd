import axios from 'axios';
import { API_THERAPISTS, ROLES } from '../utils/constants'
import { getPatientsFailure, getPatientsInit, getPatientsSuccess } from '../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';

export const getPatients = (errorHandler = (err) => { }) => {
    return (dispatch, getState) => {
        dispatch(getPatientsInit());
        let user = getState().userReducer.login.data

        AsyncStorage.getItem('token').then(token => {
            axios.get( API_THERAPISTS + ROLES.PATIENT + '/' + user.role_id, {
                headers : {
                    "x-auth-token" : token
                } 
            }
            ).then(res => {
                //save response
                dispatch(getPatientsSuccess(res.data));
            })
            .catch(err => {
                dispatch(getPatientsFailure(err));
                errorHandler(err);
            })
        }).catch(err => {
            dispatch(getPatientsFailure(err));
            errorHandler(err)
        });
    }
};