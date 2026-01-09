import { createSlice } from "@reduxjs/toolkit";
import { getData, storeData } from "../../LocalStorage/localStorage";
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
      storeData("auth",null);
    }
  }
})

export const {login,logout}=AuthSlice.actions;

export default AuthSlice.reducer