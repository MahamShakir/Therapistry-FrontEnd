import { PUT_SLOTS_FAILURE, PUT_SLOTS_SUCCESS, PUT_SLOTS_INIT } from '../../../utils/constants';

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    data: null,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case PUT_SLOTS_INIT:
            return {
                ...state,
                isLoading: true
            }
        
        case PUT_SLOTS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload
            }


        case PUT_SLOTS_FAILURE:
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