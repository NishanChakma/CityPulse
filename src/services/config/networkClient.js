import { request } from './axiosConfig';

const get = async (url, params = {}) => {
  const header = {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${Token}`, FUTURE SCOPE
  };
  const config = {
    url,
    // baseURL: API_BASE_URL,
    method: 'get',
    headers: header,
    params: params,
    timeout: 30000, // default is `0` (no timeout)// 30 sec
    maxRedirects: 2,
  };
  return request(config);
};

const post = async (url, body) => {
  const headers = {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${Token}`,
  };
  const config = {
    url,
    // baseURL: API_BASE_URL,
    method: 'post',
    headers: headers,
    data: body,
    timeout: 30000,
    maxRedirects: 2,
  };
  return request(config);
};

const del = async (url, params = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${Token}`,
  };
  const config = {
    url,
    // baseURL: API_BASE_URL,
    method: 'delete',
    headers: headers,
    timeout: 30000,
    maxRedirects: 2,
  };
  return request(config);
};

const put = async (url, body) => {
  const headers = {
    'Content-Type': 'application/json',
    // Authorization: `Bearer ${Token}`,
  };
  const config = {
    url,
    // baseURL: API_BASE_URL,
    method: 'put',
    headers: headers,
    data: body,
    timeout: 30000,
    maxRedirects: 2,
  };
  return request(config);
};

const http = {
  get,
  post, //FUTURE SCOPE
  put, //FUTURE SCOPE
  del, //FUTURE SCOPE
};

export default http;
