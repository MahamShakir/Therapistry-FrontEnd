/* navigators */
export const NAVIGATORS = {
    ROOT_NAVIGATOR: "RootNavigator",
    HOME_NAVIGATOR: "HomeNavigator"
}

/*screens*/
export const SCREENS = {
    SPLASH_SCREEN: "SplashScreen",
    LOGIN_SCREEN: "LoginScreen",
    HOME_SCREEN: "HomeScreen",
    SIGNUP_SCREEN: "SignupScreen"
}


/*actions*/

export const LOGIN_USER_INIT = "LOGIN_USER_INIT";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGIN_USER_CLEAR = "LOGIN_USER_CLEAR";

export const SIGNUP_USER_INIT = "SIGNUP_USER_INIT";
export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS"
export const SIGNUP_USER_FAILURE = "SIGNUP_USER_FAILURE";

/*APIS*/

export const API_LOGIN = "https://therapistry.herokuapp.com/login";
export const API_PATIENTS = "https://therapistry.herokuapp.com/patients";
export const API_THERAPISTS = "https://therapistry.herokuapp.com/therapists";