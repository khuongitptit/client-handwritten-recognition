import { checkAuth } from '../utils/auth';
import appConstants from '../constants/app';
import appServices from '../services/app';

export const appLoad = () => {
  return dispatch => {
    if (!checkAuth()) {
      dispatch({type: appConstants.APP_LOAD_FAIL});
      return;
    }
    appServices.load().then(data => {
      console.log('data11111111111', data);
    });
    dispatch({ type: appConstants.APP_LOADED });
  };
};
