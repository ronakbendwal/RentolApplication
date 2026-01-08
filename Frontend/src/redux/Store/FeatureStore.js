import { configureStore } from "@reduxjs/toolkit";
import LogoutReducer from '../Feature/LogoutUi.js'
import ThemeReducer from '../Feature/Theme.js'
import AuthReducer from '../Feature/Auth.js'
const store=configureStore({
  reducer:{
    logoutState:LogoutReducer,
    theme:ThemeReducer,
    auth:AuthReducer
  }
});

export default store;