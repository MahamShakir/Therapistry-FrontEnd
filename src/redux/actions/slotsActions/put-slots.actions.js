import { PUT_SLOTS_FAILURE, PUT_SLOTS_INIT, PUT_SLOTS_SUCCESS } from '../../../utils/constants';

export const putSlotsInit = () => {
    return{
        type : PUT_SLOTS_INIT
    }
}

export const putSlotsSuccess = (payload) => {
    return { 
        type : PUT_SLOTS_SUCCESS,
        payload
    }
}

export const putSlotsFaiure = (payload) => {
    return {
        type : PUT_SLOTS_FAILURE,
        payload
    }
}