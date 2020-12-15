import {BOOK_APPOINTMENT_FAILURE, BOOK_APPOINTMENT_INIT, BOOK_APPOINTMENT_SUCCESS } from '../../../utils/constants';

export const bookAppointmentInit = () => {
    return {
        type: BOOK_APPOINTMENT_INIT
    }
}

export const bookAppointmentSuccess = (payload) => {
    return {
        type: BOOK_APPOINTMENT_SUCCESS,
        payload
    }
}

export const bookAppointmentFailure = (payload) => {
    return {
        type: BOOK_APPOINTMENT_FAILURE,
        payload
    }
}
