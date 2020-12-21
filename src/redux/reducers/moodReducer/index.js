import postmood from './post-mood.reducer';
import getmoods from './get-moods.reducer';
import {combineReducers} from 'redux';

export default combineReducers({
    postmood,
    getmoods
});