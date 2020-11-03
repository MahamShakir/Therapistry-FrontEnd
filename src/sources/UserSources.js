import axios from 'axios';

// export const loginUser = ({ email, password }, errorHandler = () => { }) => {
//     return (dispatch) => {
//     }
// };

export const loginUser = ({ email, password }, errorHandler = () => { }) => {
    return (dispatch) => {
        dispatch(loginUserInit());
        if (!email || !password) {
            dispatch(loginUserFail('Email or password is invalid.'));
            return;
        }
        axios.post(LOGIN_USER, {
            email,
            password
        }).then(res => {
        res.data['token'] = res.headers['x-auth-token'];
        axios.defaults.headers.common['x-auth-token'] = res.data.token;
        setToLocalStorage('user', res.data).then(_ => dispatch(loginUserSuccess(res.data)));
        })
        .catch(err => {
            let message = "";
            if (err && err.response && err.response.status === UNAUTHORIZED) {
            message = "Email or password is invalid";
            }
            else if (err && err.message === "Network Error") {
            message = "Network error: please make sure you are connected to the internet"
            }
            else if (err && err.message) {
            message = `Something went wrong: ${err}`
            }
            errorHandler(message);
            dispatch(loginUserFail(message))
        })
    }
}