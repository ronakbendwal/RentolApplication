import { configureStore } from "@reduxjs/toolkit";
import LogoutReducer from '../Feature/LogoutUi.js'
const store=configureStore({
  reducer:{
    logout:LogoutReducer
  }
});

export default store;