import {GET_MOODS_INIT , GET_MOODS_SUCCESS , GET_MOODS_FAILURE} from '../../../utils/constants';

export const getMoodsInit = () => {
    return{
        type : GET_MOODS_INIT
    }
}

export const getMoodsSuccess = (payload) => {
    return { 
        type : GET_MOODS_SUCCESS,
        payload
    }
}

export const getMoodsFailure = (payload) => {
    return {
        type : GET_MOODS_FAILURE,
        payload
    }
}