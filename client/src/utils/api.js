import axios from 'axios';

import setAuthToken from './setAuthToken';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response.status === 401) {
      setAuthToken(null);
    }
    return Promise.reject(err);
  }
);

export default api;
