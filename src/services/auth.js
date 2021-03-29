import request from './request';

const login = payload => {
  return request.post('/auth/login', payload);
};

const signUp = payload => {
  return request.post('/auth/signup', payload);
};

const updateAccount = (accountId, payload) => {
  return request.post(`/auth/update/${accountId}`,payload);
}

const verifyEmail = (accountId, payload) => {
  return request.post(`/auth/verify-email/${accountId}`, payload);
}

export default {
  login,
  signUp,
  updateAccount,
  verifyEmail
};
