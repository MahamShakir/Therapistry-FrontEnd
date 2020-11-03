
import { LOGIN_PATIENT_FAILURE, LOGIN_PATIENT_INIT, LOGIN_PATIENT_SUCCESS } from '../../utils/constants';

const initialState = {
    email : '',
    password : '',
    token : ''
}

function reducerforlogin(state = initialState, action) {
    switch(action.type) {
        case LOGIN_PATIENT_INIT:
            
        
        case LOGIN_PATIENT_SUCCESS:


        case LOGIN_PATIENT_FAILURE:

        default:
            return state
    }
}

