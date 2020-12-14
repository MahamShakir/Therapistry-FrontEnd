import { GET_APPOINTMENTS_FAILURE, GET_APPOINTMENTS_INIT, GET_APPOINTMENTS_SUCCESS, GET_APPOINTMENTS_CLEAR} from '../../../utils/constants';

export const getAppointmentsInit = () => {
    return {
        type: GET_APPOINTMENTS_INIT
    }
}

export const getAppointmentsSuccess = (payload) => {
    return {
        type: GET_APPOINTMENTS_SUCCESS,
        payload
    }
}

export const getAppointmentsFailure = (payload) => {
    return {
        type: GET_APPOINTMENTS_FAILURE,
        payload
    }
}
