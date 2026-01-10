import { configureStore } from "@reduxjs/toolkit";
import LogoutReducer from '../Feature/LogoutUi.js'
import ThemeReducer from '../Feature/Theme.js'
import AuthReducer from '../Feature/Auth.js'
import SideBarReducer from '../Feature/SideBar.js'
import FormOpenDataReducer from '../Feature/FormOpenName.js'
const store=configureStore({
  reducer:{
    logoutState:LogoutReducer,
    theme:ThemeReducer,
    auth:AuthReducer,
    sidebarstate:SideBarReducer,
    formopendata:FormOpenDataReducer,
  }
});

export default store;