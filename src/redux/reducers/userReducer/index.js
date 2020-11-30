import login from './login.reducer';
import signup from './signup.reducer';
import {combineReducers} from 'redux';

export default combineReducers({
    login,
    signup
});