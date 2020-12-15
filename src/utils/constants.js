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
    CONVERSATIONS_SCREEN: "ConversationsScreen",
    MOOD_SCREEN: "MoodScreen",
    PATIENT_HOME_SCREEN: "PatientHomeScreen"
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

export const GET_THERAPISTS_INIT = "GET_THERAPISTS_INIT";
export const GET_THERAPISTS_SUCCESS = "GET_THERAPISTS_SUCCESS" ;
export const GET_THERAPISTS_FAILURE = "GET_THERAPISTS_FAILURE";

export const GET_THERAPIST_INIT = "GET_THERAPIST_INIT";
export const GET_THERAPIST_SUCCESS = "GET_THERAPIST_SUCCESS" ;
export const GET_THERAPIST_FAILURE = "GET_THERAPIST_FAILURE";

export const PUT_SLOTS_INIT = "PUT_SLOTS_INIT";
export const PUT_SLOTS_SUCCESS = "PUT_SLOTS_SUCCESS";
export const PUT_SLOTS_FAILURE = "PUT_SLOTS_FAILURE";

export const GET_APPOINTMENTS_INIT = "GET_APPOINTMENTS_INIT";
export const GET_APPOINTMENTS_SUCCESS = "GET_APPOINTMENTS_SUCCESS";
export const GET_APPOINTMENTS_FAILURE = "GET_APPOINTMENTS_FAILURE";

export const BOOK_APPOINTMENT_INIT = "BOOK_APPOINTMENT_INIT";
export const BOOK_APPOINTMENT_SUCCESS = "BOOK_APPOINTMENT_SUCCESS";
export const BOOK_APPOINTMENT_FAILURE = "BOOK_APPOINTMENT_FAILURE";

/*APIS*/
export const API_LOGIN = "https://therapistry.herokuapp.com/login";
export const API_PATIENTS = "https://therapistry.herokuapp.com/patients/";
export const API_THERAPISTS = "https://therapistry.herokuapp.com/therapists/";
export const API_APPOINTMENTS = "https://therapistry.herokuapp.com/appointments/";
export const API_SLOTS = "https://therapistry.herokuapp.com/slots/therapists/";
export const CREATE_SLOTS = "/create-slots";
export const CONFIRM_SLOT = "/confirm-slot";