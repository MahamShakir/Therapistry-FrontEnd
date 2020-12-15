import {GET_THERAPISTS_INIT , GET_THERAPISTS_SUCCESS , GET_THERAPISTS_FAILURE} from '../../../utils/constants';

export const getTherapistsInit = () => {
    return{
        type : GET_THERAPISTS_INIT
    }
}

export const getTherapistsSuccess = (payload) => {
    return { 
        type : GET_THERAPISTS_SUCCESS,
        payload
    }
}

export const getTherapistsFailure = (payload) => {
    return {
        type : GET_THERAPISTS_FAILURE,
        payload
    }
}