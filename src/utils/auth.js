import _ from 'lodash';
import jwtDecode from 'jwt-decode';

export const getTokenHeader = () => {
  const authData = JSON.parse(localStorage.getItem('auth')) || {};
  const accessToken = _.get(authData, 'accessToken') || '';
  return `Bearer ${accessToken}`; 
}

export const checkAuth = () => {
  const authData = JSON.parse(localStorage.getItem('auth')) || {};
  if (_.isEmpty(authData)) {
    return false;
  }
  const accessToken = _.get(authData, 'accessToken') || '';
  if (accessToken === '' || _.get(jwtDecode(accessToken), 'exp') < Date.now() / 1000) {
    localStorage.removeItem('auth');
    return false;
  }
  return true;
}