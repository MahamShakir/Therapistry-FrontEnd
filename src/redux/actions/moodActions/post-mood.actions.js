import {POST_MOOD_INIT , POST_MOOD_SUCCESS , POST_MOOD_FAILURE} from '../../../utils/constants';

export const postMoodInit = () => {
    return{
        type : POST_MOOD_INIT
    }
}

export const postMoodSuccess = (payload) => {
    return { 
        type : POST_MOOD_SUCCESS,
        payload
    }
}

export const postMoodFailure = (payload) => {
    return {
        type : POST_MOOD_FAILURE,
        payload
    }
}