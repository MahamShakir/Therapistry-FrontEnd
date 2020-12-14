import axios from 'axios';
import { API_THERAPISTS } from '../utils/constants'
import { getTherapistsFailure, getTherapistsInit, getTherapistsSuccess } from '../redux/actions/patientActions';


export const getTherapists = (errorHandler = (err) => { }) => {
    return (dispatch) => {
        dispatch(getTherapistsInit());
        axios.get( API_THERAPISTS
        ).then(res => {
            dispatch(getTherapistsSuccess(res.data));
        })
        .catch(err => {
            dispatch(getTherapistsFailure(err));
            errorHandler(err);
        });
    }
};
