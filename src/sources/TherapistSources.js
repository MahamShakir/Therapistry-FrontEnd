import axios from 'axios';
import { API_PATIENTS , API_GET_MY_PATIENTS} from '../utils/constants'
import { getPatientsFailure, getPatientsInit, getPatientsSuccess } from '../redux/actions/therapistActions';
import AsyncStorage from '@react-native-community/async-storage';

export const displayPatients = (errorHandler = (err) => { }) => {
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