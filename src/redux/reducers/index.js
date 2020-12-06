import userReducer from './userReducer';
import therapistReducer from './therapistReducer';
import { combineReducers } from 'redux';

export default combineReducers({
    userReducer,
    therapistReducer
});