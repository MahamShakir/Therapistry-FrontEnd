import { POST_MOOD_FAILURE, POST_MOOD_INIT, POST_MOOD_SUCCESS } from '../../../utils/constants';

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    data: null,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case POST_MOOD_INIT:
            return {
                ...state,
                isLoading: true
            }
        
        case POST_MOOD_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload
            }


        case POST_MOOD_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailed: true,
                error: action.payload
            }

        default:
            return state
    }
}