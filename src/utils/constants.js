/* custom */
export const ROLES = {
    THERAPIST: "therapist",
    PATIENT: "patient"
}

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
    SIGNUP_SCREEN: "SignupScreen",
    THERAPIST_HOME_SCREEN: "TherapistHomeScreen",
    CALENDAR_SCREEN: "CalendarScreen",
    CONVERSATIONS_SCREEN: "ConversationsScreen"
}


/*actions*/

export const LOGIN_USER_INIT = "LOGIN_USER_INIT";
export const LOGIN_USER_SUCCESS = "LOGIN_USER_SUCCESS";
export const LOGIN_USER_FAILURE = "LOGIN_USER_FAILURE";
export const LOGIN_USER_CLEAR = "LOGIN_USER_CLEAR";

export const LOGOUT_USER_INIT = "LOGOUT_USER_INIT";
export const LOGOUT_USER_SUCCESS = "LOGOUT_USER_SUCCESS";
export const LOGOUT_USER_FAILURE = "LOGOUT_USER_FAILURE";
export const LOGOUT_USER_CLEAR = "LOGOUT_USER_CLEAR";

export const SIGNUP_USER_INIT = "SIGNUP_USER_INIT";
export const SIGNUP_USER_SUCCESS = "SIGNUP_USER_SUCCESS"
export const SIGNUP_USER_FAILURE = "SIGNUP_USER_FAILURE";

export const GET_PATIENTS_INIT = "GET_PATIENTS_INIT";
export const GET_PATIENTS_SUCCESS = "GET_PATIENTS_SUCCESS";
export const GET_PATIENTS_FAILURE = "GET_PATIENTS_FAILURE";

/*APIS*/

export const API_LOGIN = "https://therapistry.herokuapp.com/login";
export const API_PATIENTS = "https://therapistry.herokuapp.com/patients";
export const API_THERAPISTS = "https://therapistry.herokuapp.com/therapists";