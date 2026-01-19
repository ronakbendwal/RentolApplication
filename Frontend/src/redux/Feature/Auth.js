import { createSlice } from "@reduxjs/toolkit";
import { getData, removeFromStorage, storeData } from "../../LocalStorage/localStorage";
const dataFromStore=getData("auth");
const AuthSlice=createSlice({
  name:"auth",
  initialState:{
    data: dataFromStore || null,
    status:dataFromStore ? true : false,
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
      removeFromStorage("auth")
    }
  }
})

export const {login,logout}=AuthSlice.actions;

export default AuthSlice.reducer