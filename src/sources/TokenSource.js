import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import { loginUserFailure, loginUserInit, loginUserSuccess } from "../redux/actions";
import { API_PUT_TOKEN } from "../utils/constants";
import messaging from '@react-native-firebase/messaging';

export const getToken = (errorHandler = (err) => {}) => {
  return dispatch => {
    dispatch(loginUserInit());

    AsyncStorage.getItem('token', (err, token) => {
      if(err) {
        errorHandler(err);
        console.log("abcd-2");
        dispatch(loginUserFailure(err));
      } else {
        if(token){
          AsyncStorage.getItem('user', (err, user) => {
            if(err) {
              errorHandler(err);
              dispatch(loginUserFailure(err));
            }
            else {
              messaging().hasPermission().then(enabled => {
                if(!enabled) {
                  messaging().requestPermission();
                  console.log("abcd0");
                  errorHandler(err);
                  dispatch(loginUserFailure(err));
                } else {
                  let userObj = JSON.parse(user);
                  messaging().getToken().then(fcmToken => {
                    axios.put(API_PUT_TOKEN + userObj.user_id, {
                      fcm: fcmToken
                    }).then(res => {
                      dispatch(loginUserSuccess(JSON.parse(user)));
                    }).catch(err => {
                      errorHandler(err);
                      dispatch(loginUserFailure(err));
                    })
                  }).catch(err => {
                    errorHandler(err);
                    dispatch(loginUserFailure(err));
                  });
                }
              }).catch(err => {
                errorHandler(err);
                dispatch(loginUserFailure(err));
              })
            }
          }).catch(err => {
            errorHandler(err);
            dispatch(loginUserFailure(err));
          });
        } else {
          dispatch(loginUserFailure());
        }
      }
    }).catch(err => {
      errorHandler(err);
      dispatch(loginUserFailure(err));
    });
  }
};