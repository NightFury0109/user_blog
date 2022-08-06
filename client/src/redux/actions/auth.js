import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import jwt_decode from 'jwt-decode';

import setAuthToken from '../../utils/setAuthToken';

import { api } from '../../utils/api';

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {}
};

const auth = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setAuthStatus(state, action) {
      state.isAuthenticated = action.payload;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    }
  }
});

export const { setAuthStatus, setUser, setErrors } = auth.actions;

export const userLogin = (userData) => {
  return async dispatch => {
    dispatch(setErrors({}));

    try {
      const res = await axios.post(api + '/users/login', userData);

      const { token } = res.data;

      localStorage.setItem("token", token);
      setAuthToken(token);

      const decoded = jwt_decode(token);

      dispatch(setAuthStatus(true));
      dispatch(setUser(decoded));

      return 0;
    } catch (error) {
      console.log(error);
      dispatch(setErrors(error.response.data));
      return -1;
    }
  }
}

export const createUser = (userData) => {
  return async dispatch => {
    dispatch(setErrors({}));

    try {
      const res = await axios.post(api + '/users/register', userData);

      return 0;
    } catch (error) {
      console.log(error);
      dispatch(setErrors(error.response.data));
      return -1;
    }
  }
}

export const logout = () => {
  return async dispatch => {
    dispatch(setErrors({}));

    await localStorage.removeItem("token");
    await setAuthToken(null);
    dispatch(setUser({}));
  }
}

export const clearErrors = () => {
  return async dispatch => {
    dispatch(setErrors({}));
  }
}

export default auth.reducer;
