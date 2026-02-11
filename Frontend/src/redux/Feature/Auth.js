import { createSlice } from "@reduxjs/toolkit";
import { getData, removeFromStorage, storeData } from "../../LocalStorage/localStorage";
const dataFromStore=getData("auth");
const AuthSlice=createSlice({
  name:"auth",
  initialState:{
    data: dataFromStore || '',
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
    },
    setUserData:(state,action)=>{
      state.data=action.payload,
      state.status=true,
      storeData("auth",state.data)
    }
  }
});

export const {login,logout,setUserData}=AuthSlice.actions;

export default AuthSlice.reducer