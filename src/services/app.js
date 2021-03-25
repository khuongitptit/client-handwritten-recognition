import request from './request';

const load = () => {
  return request.get('/');
};

export default {
  load
};
