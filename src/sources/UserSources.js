import axios from 'axios';
import { API_LOGIN, API_PATIENTS, API_THERAPISTS, ROLES} from '../utils/constants'
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
        }).then(res => {
            let payload = res.data;
            const token = res.data["token"];
            AsyncStorage.setItem(
                'token',
                token
            ).then(_ => {
                AsyncStorage.setItem('user', JSON.stringify(res.data)).then(_ => {
                    let role_id = payload.role_id;
                    let url;
                    let userInfo;

                    if(payload.user_role == ROLES.THERAPIST){
                        url = API_THERAPISTS + role_id;
                    }
                    else if(payload.user_role == ROLES.PATIENT){
                        url = API_PATIENTS + role_id;
                    }

                    axios.get(url
                    ).then(res2 => {
                        if(payload.user_role == ROLES.THERAPIST){
                            userInfo = res2.data["therapists"];
                        }
                        else if(payload.user_role == ROLES.PATIENT){
                            userInfo = res2.data["patient"];
                        }
                
                        payload["user_name"] = userInfo.fullName;
                        dispatch(loginUserSuccess(payload));
                    })
                    .catch(err => {
                        dispatch(loginUserFailure(err));
                        errorHandler(err);
                    })

                }).catch((err) => {
                    dispatch(loginUserFailure(err));
                    errorHandler(err);
                });
            }).catch((err) => {
                dispatch(loginUserFailure(err));
                errorHandler(err);
            });
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
        if(checked === ROLES.PATIENT){
            url = API_PATIENTS;
        }
        else if(checked === ROLES.THERAPIST){
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