import axios from 'axios';
import { API_PATIENTS } from '../utils/constants'
import { getPatientsFailure, getPatientsInit, getPatientsSuccess } from '../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';

export const getPatients = (errorHandler = (err) => { }) => {
    return (dispatch) => {
        dispatch(getPatientsInit());
        axios.get( API_PATIENTS
            //x-auth-token: token
        ).then(res => {
            //save response
            dispatch(getPatientsSuccess(res.data));
        })
        .catch(err => {
            dispatch(getPatientsFailure(err));
            errorHandler(err);
        });
    }
};