import { configureStore } from "@reduxjs/toolkit";
import LogoutReducer from '../Feature/LogoutUi.js'
import ThemeReducer from '../Feature/Theme.js'
const store=configureStore({
  reducer:{
    logoutState:LogoutReducer,
    theme:ThemeReducer,
  }
});

export default store;