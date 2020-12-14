import { GET_THERAPISTS_FAILURE, GET_THERAPISTS_INIT, GET_THERAPISTS_SUCCESS } from '../../../utils/constants';

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    data: null,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_THERAPISTS_INIT:
            return {
                ...state,
                isLoading: true
            }
        
        case GET_THERAPISTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload
            }


        case GET_THERAPISTS_FAILURE:
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