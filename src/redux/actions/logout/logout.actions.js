import {LOGOUT_USER_INIT , LOGOUT_USER_SUCCESS , LOGOUT_USER_FAILURE, LOGOUT_USER_CLEAR} from '../../../utils/constants';

export const logoutUserInit = () => {
    return{
        type : LOGOUT_USER_INIT
    }
}

export const logoutUserFailure = (payload) => {
    return {
        type : LOGOUT_USER_FAILURE,
        payload
    }
}