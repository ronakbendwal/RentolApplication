import { configureStore } from "@reduxjs/toolkit";
import LogoutReducer from '../Feature/LogoutUi.js'
import ThemeReducer from '../Feature/Theme.js'
import AuthReducer from '../Feature/Auth.js'
import SideBarReducer from '../Feature/SideBar.js'
import FormOpenDataReducer from '../Feature/FormOpenName.js'
import LocationReducer from '../Feature/Location.js'
import ProfilePictureReducer from '../Feature/ProfilePicture.js'
const store=configureStore({
  reducer:{
    logoutState:LogoutReducer,
    theme:ThemeReducer,
    auth:AuthReducer,
    sidebarstate:SideBarReducer,
    formopendata:FormOpenDataReducer,
    location:LocationReducer,
    profilepicture:ProfilePictureReducer,
  }
});

export default store;