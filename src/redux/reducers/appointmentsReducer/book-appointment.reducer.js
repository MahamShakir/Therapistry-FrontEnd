import { BOOK_APPOINTMENT_FAILURE, BOOK_APPOINTMENT_INIT, BOOK_APPOINTMENT_SUCCESS } from '../../../utils/constants';

const initialState = {
    isLoading: false,
    isFailed: false,
    isSuccess: false,
    data: null,
    error: null
};

export default (state = initialState, action) => {
    switch(action.type) {
        case BOOK_APPOINTMENT_INIT:
            return {
                ...state,
                isLoading: true
            }
        
        case BOOK_APPOINTMENT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true,
                data: action.payload
            }


        case BOOK_APPOINTMENT_FAILURE:
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