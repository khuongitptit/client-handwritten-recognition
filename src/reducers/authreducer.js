import * as authConstants from '../constants/authConstants'
const initialState = {
    accessToken: '',
    refreshToken: '',
    signing_up: null,
    signup_success: null,
    signup_fail: null,
    logging_in: null,
    login_success: null,
    login_fail: null,
}
const authreducer = (state = initialState, action) => {
    switch (action.type) {
        //signup
        case authConstants.SIGNING_UP:
            return { ...state, signing_up: action.signing_up }
        case authConstants.SIGNUP_SUCCESS:
            return {
                ...state,
                signup_success: action.signup_success,
                signup_fail: null,
            }
        case authConstants.SIGNUP_FAIL:
            return {
                ...state,
                signup_fail: action.signup_fail,
                signup_success: null,
            }
        //login
        case authConstants.LOGGING_IN:
            return { ...state, logging_in: action.logging_in }
        case authConstants.LOGIN_SUCCESS:
            return {
                ...state,
                login_success: action.login_success,
                login_fail: null,
            }
        case authConstants.LOGIN_FAIL:
            return {
                ...state,
                login_fail: action.login_fail,
                login_success: null,
            }
        case authConstants.RECEIVE_TOKEN:
            return {
                ...state,
                accessToken: action.payload.accessToken,
                refreshToken: action.payload.refreshToken,
            }
        default:
            return state
    }
}
export default authreducer
