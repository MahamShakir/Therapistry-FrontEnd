import { CANCEL_APPOINTMENT_FAILURE, CANCEL_APPOINTMENT_INIT, CANCEL_APPOINTMENT_SUCCESS } from '../../../utils/constants';

export const cancelAppointmentInit = () => {
    return {
        type: CANCEL_APPOINTMENT_INIT
    }
}

export const cancelAppointmentSuccess = (payload) => {
    return {
        type: CANCEL_APPOINTMENT_SUCCESS,
        payload
    }
}

export const cancelAppointmentFailure = (payload) => {
    return {
        type: CANCEL_APPOINTMENT_FAILURE,
        payload
    }
}