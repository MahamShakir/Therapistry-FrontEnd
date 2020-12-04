import { LOGIN_USER_CLEAR, LOGIN_USER_FAILURE, LOGIN_USER_INIT, LOGIN_USER_SUCCESS } from '../../../utils/constants';

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    data: null,
    error: null,
    isLoggedIn: false
};

export default (state = initialState, action) => {
    switch(action.type) {
        case LOGIN_USER_INIT:
            return {
                ...state,
                isLoading: true
            }
        
        case LOGIN_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                isLoggedIn: true,
                data: action.payload
            }


        case LOGIN_USER_FAILURE:
            return {
                ...state,
                isLoading: false,
                isFailed: true,
                error: action.payload
            }
        case LOGIN_USER_CLEAR:
            return {
                ...initialState
            }
        default:
            return state
    }
}

