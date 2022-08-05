import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
// import logger from "redux-logger";

import auth from "./actions/auth";

let middleware = getDefaultMiddleware => getDefaultMiddleware();
// let middleware = getDefaultMiddleware => getDefaultMiddleware().concat(logger);


const rootReducer = combineReducers({
  auth: auth
});

const store = configureStore({
  middleware,
  reducer: rootReducer
});

export default store;
