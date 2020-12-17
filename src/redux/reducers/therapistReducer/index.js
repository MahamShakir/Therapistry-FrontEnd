import gettherapists from './get-therapists.reducer';
import putslots from './put-create-slots.reducer';
import gettherapist from './get-therapist.reducer';
import { combineReducers } from 'redux';

export default combineReducers({
    gettherapists,
    putslots,
    gettherapist
});