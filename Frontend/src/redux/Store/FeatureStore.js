import { configureStore } from "@reduxjs/toolkit";
import LogoutReducer from '../Feature/LogoutUi.js'
const store=configureStore({
  reducer:{
    logoutState:LogoutReducer
  }
});

export default store;