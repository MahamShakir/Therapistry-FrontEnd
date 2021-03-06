import {LOGIN_USER_INIT , LOGIN_USER_SUCCESS , LOGIN_USER_FAILURE, LOGIN_USER_CLEAR} from '../../../utils/constants';

export const loginUserInit = () => {
    return{
        type : LOGIN_USER_INIT
    }
}

export const loginUserSuccess = (payload) => {
    return { 
        type : LOGIN_USER_SUCCESS,
        payload
    }
}

export const loginUserFailure = (payload) => {
    return {
        type : LOGIN_USER_FAILURE,
        payload
    }
}

export const loginUserClear = (payload) => {
    return {
        type : LOGIN_USER_CLEAR,
        payload
    }
}