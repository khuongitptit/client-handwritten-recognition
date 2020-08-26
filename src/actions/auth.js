import * as authConstants from '../constants/authConstants'
export const actionSignup = signupData => {
    return {
        type: authConstants.SIGNUP,
        signupData,
    }
}
export const actionLogin = loginData => {
    return {
        type: authConstants.LOGIN,
        loginData,
    }
}
export const actionLogout = () => {
    return { type: authConstants.LOGOUT }
}
