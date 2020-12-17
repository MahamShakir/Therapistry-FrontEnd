import { GET_THERAPIST_FAILURE, GET_THERAPIST_INIT, GET_THERAPIST_SUCCESS } from '../../../utils/constants';

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    data: null,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_THERAPIST_INIT:
            return {
                ...state,
                isLoading: true
            }
        
        case GET_THERAPIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload
            }


        case GET_THERAPIST_FAILURE:
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