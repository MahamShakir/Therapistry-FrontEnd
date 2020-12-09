import axios from 'axios';
import { API_LOGIN, API_PATIENTS, API_THERAPISTS} from '../utils/constants'
import { 
    loginUserFailure, 
    loginUserInit, 
    loginUserSuccess, 
    signupUserInit, 
    signupUserSuccess, 
    signupUserFailure,
    logoutUserInit,
    logoutUserFailure,
    loginUserClear} 
from '../redux/actions';
import AsyncStorage from '@react-native-community/async-storage';

export const loginUser = ({ email, password }, errorHandler = (err) => { }) => {
    return (dispatch) => {
        dispatch(loginUserInit());
        axios.post(API_LOGIN , {
            email,
            password
        }).then(async res => {
            const token = res.data["token"];
            await AsyncStorage.setItem(
                'token',
                token
            );
            dispatch(loginUserSuccess(res.data));
        })
        .catch(err => {
            dispatch(loginUserFailure(err));
            errorHandler(err);
        });
    }
};

export const signupUser = ({ fullName, email, password, checked}, errorHandler = (err) => { }) => {
    return(dispatch) => {
        dispatch(signupUserInit());
        let url;
        if(checked === 'patient'){
            url = API_PATIENTS;
        }
        else if(checked === 'therapist'){
            url = API_THERAPISTS;
        }
        
        axios.post(url , {
            fullName,
            email,
            password
        }).then(res => {
            dispatch(signupUserSuccess(res.data));
        })
        .catch(err => {
            dispatch(signupUserFailure(err));
            errorHandler(err);
        });

    }
}

export const logoutUser = (errorHandler = (err) => {}) => {
    return (dispatch) => {
        dispatch(logoutUserInit());
        AsyncStorage.removeItem('token', (err) => {
            if(err) {
                dispatch(logoutUserFailure());
                errorHandler(err);
            }
            else {
                dispatch(loginUserClear());
            }
        })
    }
}