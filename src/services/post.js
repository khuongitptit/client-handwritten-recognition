import request from './request';

const addPost = payload => {
  return request.post('/post', payload);
};

export default {
  addPost
}