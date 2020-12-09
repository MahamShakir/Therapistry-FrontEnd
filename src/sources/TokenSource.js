import AsyncStorage from "@react-native-community/async-storage";
import { loginUserFailure, loginUserInit, loginUserSuccess } from "../redux/actions";

export const getToken = (errorHandler = (err) => {}) => {
  return dispatch => {
    dispatch(loginUserInit());
    AsyncStorage.getItem('token', (err, token) => {
      if(err) errorHandler(err);
      else {
        if(token){
          AsyncStorage.getItem('user', (err, user) => {
            if(err) errorHandler(err);
            else {
              dispatch(loginUserSuccess(JSON.parse(user)));
            }
          })
        } else {
          dispatch(loginUserFailure());
        }
      }
    });
  }
}