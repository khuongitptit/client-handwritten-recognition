import _ from 'lodash';
import axios from 'axios';
import base from '../constants/base';
import { getTokenHeader } from '../utils/auth';
const BASE_REQUEST_URL = base.BASE_REQUEST_URL;

const get = (endpoint, query) => {
  return axios({
    method: 'GET',
    // headers: { Authorization: getTokenHeader() },
    url: `${BASE_REQUEST_URL}${endpoint}`,
    params: _.assign(query, { userId: _.get(JSON.parse(localStorage.getItem('auth')), '_id') }),
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data;
    });
};

const post = (endpoint, payload) => {
  return axios({
    method: 'POST',
    // headers: { Authorization: getTokenHeader() },
    url: `${BASE_REQUEST_URL}${endpoint}`,
    params: { userId: _.get(JSON.parse(localStorage.getItem('auth')), '_id') },
    data: payload,
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data;
    });
};

const del = (endpoint, payload) => {
  return axios({
    method: 'DELETE',
    // headers: { Authorization: getTokenHeader() },
    url: `${BASE_REQUEST_URL}${endpoint}`,
    params: { userId: _.get(JSON.parse(localStorage.getItem('auth')), '_id') },
    data: payload,
  })
    .then(res => res.data)
    .catch(err => {
      throw err.response.data;
    });
};

export default {
  get,
  post,
  del,
};
