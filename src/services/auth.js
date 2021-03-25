import request from './request';

const login = payload => {
  return request.post('/auth/login', payload);
};

const signUp = payload => {
  return request.post('/auth/signup', payload);
};

export default {
  login,
  signUp,
};
