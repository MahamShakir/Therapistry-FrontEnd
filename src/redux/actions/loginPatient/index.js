import {LOGIN_PATIENT_INIT , LOGIN_PATIENT_SUCCESS , LOGIN_PATIENT_FAILURE} from '../../../utils/constants';

export const loginPatientInit = () => {
    return{
        type : LOGIN_PATIENT_INIT
    }
}

export const loginPatientSuccess = () => {
    return { 
        type : LOGIN_PATIENT_SUCCESS
    }
}

export const loginPatientFailure = () => {
    return {
        type : LOGIN_PATIENT_FAILURE
    }
}
