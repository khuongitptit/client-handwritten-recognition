import request from './request';

const signUp = payload => {
  return request.post('/signup', payload);
};

export default {
  signUp,
};
