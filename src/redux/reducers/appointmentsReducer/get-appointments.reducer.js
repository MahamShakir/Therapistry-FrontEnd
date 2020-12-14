import { GET_APPOINTMENTS_FAILURE, GET_APPOINTMENTS_INIT, GET_APPOINTMENTS_SUCCESS } from '../../../utils/constants';

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    data: null,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_APPOINTMENTS_INIT:
            return {
                ...state,
                isLoading: true
            }
        
        case GET_APPOINTMENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload
            }


        case GET_APPOINTMENTS_FAILURE:
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