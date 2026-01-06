import {createSlice} from '@reduxjs/toolkit'

const LogoutSlice=createSlice({
  name:"logoutState",
  initialState:{
    isLogoutConform:false
  },
  reducers:{
    setIsLogoutConform:(state,action)=>{
      state.isLogoutConform=action.payload
    }
  }
})

export const {setIsLogoutConform}= LogoutSlice.actions;

export default LogoutSlice.reducer;
