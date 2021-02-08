import axios from 'axios';
import baseURL from '../constants/apiURL';
const get = (endpoint, query) => {
  return axios({
    method: 'GET',
    url: `${baseURL}/${endpoint}`,
    params: query,
  });
};

const post = (endpoint, payload) => {
  return axios({
    method: 'POST',
    url: `${baseURL}/${endpoint}`,
    data: payload,
  });
};

const del = (endpoint, payload) => {
  return axios({
    method: 'DELETE',
    url: `${baseURL}/${endpoint}`,
    data: payload,
  });
};

export default {
  get,
  post,
  del,
};
