import axios from 'axios';
import { API_SLOTS, CREATE_SLOTS } from '../utils/constants'
import { putSlotsFaiure, putSlotsInit, putSlotsSuccess } from '../redux/actions/slotsActions';
import AsyncStorage from '@react-native-community/async-storage';

export const createSlots = ({slots} , errorHandler = (err) => { }) => {
    return (dispatch, getState) => {
        dispatch(putSlotsInit);
        console.log(slots);
        AsyncStorage.getItem('token'
        ).then(token => {
            let user = getState().userReducer.login.data;
            axios.put( API_SLOTS + user.role_id + CREATE_SLOTS , {
                slots
            }, {
                headers : {
                    "x-auth-token" : token
                } 
            }
            ).then(res => {
                dispatch(putSlotsSuccess(res.data));
            })
            .catch(err => {
                dispatch(putSlotsFaiure(err));
                errorHandler(err);
            });
        })
        .catch(err => errorHandler(err));



        
    }
};