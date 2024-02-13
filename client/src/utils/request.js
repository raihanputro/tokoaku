import axios from 'axios';

import store from '../configureStore';

axios.interceptors.request.use((reqConfig) => {
  const state = store.getState();
  const { token } = state.client;
  if (token) {
    reqConfig.headers.Authorization = `Bearer ${token}`;
  }
  return reqConfig;
});

axios.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const request = (options) => axios(options);

export default request;
