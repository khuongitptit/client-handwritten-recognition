import authRequest from '../services/auth'
import authConstants from '../constants/auth'

export const login = payload => {
  return dispatch => {
    dispatch({type: authConstants.LOGIN,payload});
    return authRequest.login(payload);
  }
}

export const signUp = payload => {
    return dispatch => {
      dispatch({type: authConstants.SIGNUP,payload});
      return authRequest.signUp(payload);
    }
}
