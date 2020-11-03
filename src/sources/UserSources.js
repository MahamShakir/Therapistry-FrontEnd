import axios from 'axios';
import { AsyncStorage } from '@react-native-community/async-storage';
import { loginUserFailure, loginUserInit, loginUserSuccess } from '../redux/actions/login';

export const loginUser = ({ email, password }, errorHandler = (err) => { }) => {
    return (dispatch) => {
        dispatch(loginUserInit());
        axios.post('https://therapistry.herokuapp.com/login' , {
            email,
            password
        }).then(async res => {
            const token = res.data["token"];
            await AsyncStorage.setItem(
                'token',
                token
            );
            dispatch(loginUserSuccess(res.data));
        })
        .catch(err => {
            dispatch(loginUserFailure(err));
            errorHandler(err);
        });
    }
};
