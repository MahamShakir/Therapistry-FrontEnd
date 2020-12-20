import getappointments from './get-appointments.reducer';
import bookappointment from './post-book-appointment.reducer';
import deleteappointment from './delete-cancel-appointment.reducer';
import {combineReducers} from 'redux';

export default combineReducers({
    getappointments,
    bookappointment,
    deleteappointment
});