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

export const updateAccount = payload => {
  return (dispatch) => {
    dispatch({type: authConstants.UPDATE_ACCOUNT, payload});
    const state = store.getState();
    const accountId = _.get(state, 'signup._id') || _.get(state, 'auth._id');
    return authRequest.updateAccount(accountId, payload);
  }
}

export const verifyEmail = payload => {
  return dispatch => {
    dispatch({type: authConstants.VERIFY_EMAIL, payload});
    const state = store.getState();
    const accountId = _.get(state, 'signup._id') || _.get(state, 'auth._id');
    return authRequest.verifyEmail(accountId, payload);
  }
}