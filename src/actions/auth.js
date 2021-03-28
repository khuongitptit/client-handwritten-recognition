import _ from 'lodash'
import authRequest from '../services/auth'
import authConstants from '../constants/auth'
import {store} from '../store/configStore';
export const login = payload => {
  return dispatch => {
    dispatch({type: authConstants.LOGIN,payload});
    return authRequest.login(payload);
  }
}

export const signUp = payload => {
    return (dispatch) => {
      const state = store.getState();
      dispatch({type: authConstants.SIGNUP,payload});
      const signUpData = _.assign(_.get(state, 'signup'),payload);
      return authRequest.signUp(signUpData).then(data => {
        dispatch({type: authConstants.SIGNUP_INFO, payload: data});
        return data;
      });
    }
}
