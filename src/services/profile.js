import request from './request';

const searchProfile = payload => {
  return request.get('/profile', payload);
};

export default {
  searchProfile
}