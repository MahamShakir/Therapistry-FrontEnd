import userReducer from './userReducer';
import therapistReducer from './therapistReducer';
import slotsReducer from './slotsReducer';
import appointmentsReducer from './appointmentsReducer'
import { combineReducers } from 'redux';

export default combineReducers({
    userReducer,
    therapistReducer,
    slotsReducer,
    appointmentsReducer
});