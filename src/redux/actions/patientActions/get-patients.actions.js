import {GET_PATIENTS_INIT , GET_PATIENTS_SUCCESS , GET_PATIENTS_FAILURE} from '../../../utils/constants';

export const getPatientsInit = () => {
    return{
        type : GET_PATIENTS_INIT
    }
}

export const getPatientsSuccess = (payload) => {
    return { 
        type : GET_PATIENTS_SUCCESS,
        payload
    }
}

export const getPatientsFailure = (payload) => {
    return {
        type : GET_PATIENTS_FAILURE,
        payload
    }
}
