import userReducer from './userReducer';
import therapistReducer from './therapistReducer';
import appointmentsReducer from './appointmentsReducer';
import patientReducer from './patientReducer';
import moodReducer from './moodReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    userReducer,
    therapistReducer,
    appointmentsReducer,
    patientReducer,
    moodReducer
});