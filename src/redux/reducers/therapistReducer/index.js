import gettherapists from './get-therapists.reducer';
import putslots from './put-slots.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    gettherapists,
    putslots
});