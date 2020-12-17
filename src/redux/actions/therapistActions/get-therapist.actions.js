import {GET_THERAPIST_INIT , GET_THERAPIST_SUCCESS , GET_THERAPIST_FAILURE} from '../../../utils/constants';

export const getTherapistInit = () => {
    return{
        type : GET_THERAPIST_INIT
    }
}

export const getTherapistSuccess = (payload) => {
    return { 
        type : GET_THERAPIST_SUCCESS,
        payload
    }
}

export const getTherapistFailure = (payload) => {
    return {
        type : GET_THERAPIST_FAILURE,
        payload
    }
}