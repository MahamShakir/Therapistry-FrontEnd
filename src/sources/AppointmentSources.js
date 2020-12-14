import axios from 'axios';
import {API_THERAPISTS } from '../utils/constants';
import { getAppointmentsFailure, getAppointmentsInit, getAppointmentsSuccess } from '../redux/actions/appointmentsActions';

export const displayAppointments = (errorHandler = (err) => { }) => {
    return(dispatch, getState) => {
        dispatch(getAppointmentsInit());
        let user = getState().userReducer.login.data;

        axios.get( API_THERAPISTS + user.role_id
        ).then(res => {
            dispatch(getAppointmentsSuccess(res.data));
        })
        .catch(err => {
            dispatch(getAppointmentsFailure(err));
            errorHandler(err);
        })
    }
}