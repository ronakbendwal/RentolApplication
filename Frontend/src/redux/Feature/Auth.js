import { createSlice } from "@reduxjs/toolkit";
import { storeData } from "../../LocalStorage/localStorage";
const AuthSlice=createSlice({
  name:"auth",
  initialState:{
    data:null,
    status:false
  },
  reducers:{
    login:(state,action)=>{
      state.data=action.payload,
      state.status=true
      storeData("auth",state.data);
    },
    logout:(state,action)=>{
      state.data=null,
      state.status=false
      storeData("auth",state.data);
    }
  }
})

export const {login,logout}=AuthSlice.actions;

export default AuthSlice.reducer