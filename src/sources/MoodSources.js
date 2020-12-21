import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { API_POST_MOOD, API_GET_MOODS } from '../utils/constants';
import {  
    postMoodFailure,
    postMoodInit,
    postMoodSuccess,
    getMoodsInit,
    getMoodsFailure,
    getMoodsSuccess
} from '../redux/actions';


export const postMood = ({res, ext}, errorHandler = (err) => {}) => {
    return (dispatch) => {
        dispatch(postMoodInit());
        AsyncStorage.getItem('token').then(token => {
            axios.post( API_POST_MOOD, {
                audio: {
                    ext,
                    data: res
                }
            }, {
                headers: {
                    "x-auth-token": token
                }
            }).then(res => {
                dispatch(postMoodSuccess(res.data));
            }).catch( err => {
                dispatch(postMoodFailure(err));
                errorHandler(err);
            })
        }).catch( err => {
            dispatch(postMoodFailure(err));
            errorHandler(err);
        });
    }
}


export const getMoods = (id, errorHandler = (err) => {}) => {
    return (dispatch) => {
        dispatch(getMoodsInit());
        axios.get( API_GET_MOODS+id

        ).then(res => {
            dispatch(getMoodsSuccess(res.data));

        }).catch(err => {
            dispatch(getMoodsFailure(err));
            errorHandler(err);
        })

    }
}

