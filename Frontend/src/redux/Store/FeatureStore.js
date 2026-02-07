import { configureStore } from "@reduxjs/toolkit";
import ThemeReducer from '../Feature/Theme.js'
import AuthReducer from '../Feature/Auth.js'
import FormOpenDataReducer from '../Feature/FormOpenName.js'
import LocationReducer from '../Feature/Location.js'
import ProfilePictureReducer from '../Feature/ProfilePicture.js'
import ComponentStatusReducer from '../Feature/Status.js';
import WishlistItemReducer from '../Feature/WishList.js';
import YourItemReducer from '../Feature/YourItem.js'
const store=configureStore({
  reducer:{
    theme:ThemeReducer,
    auth:AuthReducer,
    formopendata:FormOpenDataReducer,
    location:LocationReducer,
    profilepicture:ProfilePictureReducer,
    componentstatus:ComponentStatusReducer,
    wishlistitem:WishlistItemReducer,
    youritem:YourItemReducer,
  }
});

export default store;