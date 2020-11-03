import {CREATE_PATIENT_INIT , CREATE_PATIENT_SUCCESS , CREATE_PATIENT_FAILURE} from '../../../utils/constants';

export const createPatientInit = () => {
    return{
        type : CREATE_PATIENT_INIT
    }
}

export const createPatientSuccess = () => {
    return { 
        type : CREATE_PATIENT_SUCCESS
    }
}

export const createPatientFailure = () => {
    return {
        type : CREATE_PATIENT_FAILURE
    }
}




// export const createNewArticle = () => {
//     return {
//         type: ADD_ARTICLE,
//         index : 01,
//         email: hello
//     }
// }
