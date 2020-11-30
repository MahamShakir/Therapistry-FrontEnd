import { SIGNUP_USER_FAILURE, SIGNUP_USER_INIT, SIGNUP_USER_SUCCESS } from '../../../utils/constants';

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    data: null,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case SIGNUP_USER_INIT:
            return {
                ...state,
                isLoading: true
            }
        
        case SIGNUP_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload
            }


        case SIGNUP_USER_FAILURE:
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