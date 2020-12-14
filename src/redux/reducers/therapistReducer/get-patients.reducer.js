import { GET_PATIENTS_FAILURE, GET_PATIENTS_INIT, GET_PATIENTS_SUCCESS } from '../../../utils/constants';

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    data: null,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case GET_PATIENTS_INIT:
            return {
                ...state,
                isLoading: true
            }
        
        case GET_PATIENTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload
            }


        case GET_PATIENTS_FAILURE:
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