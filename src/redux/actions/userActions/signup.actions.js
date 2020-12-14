import {SIGNUP_USER_INIT , SIGNUP_USER_SUCCESS , SIGNUP_USER_FAILURE} from '../../../utils/constants';

export const signupUserInit = () => {
    return{
        type : SIGNUP_USER_INIT
    }
}

export const signupUserSuccess = (payload) => {
    return { 
        type : SIGNUP_USER_SUCCESS,
        payload
    }
}

export const signupUserFailure = (payload) => {
    return {
        type : SIGNUP_USER_FAILURE,
        payload
    }
}
